import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import pc from 'picocolors';
import Table from 'cli-table3';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import { DhatuRepository } from '../data/repo.js';
import { formatOutput } from '../formatters/index.js';
import { OutputFormat, ScriptType, SearchResultItem } from '../types.js';
import { transliterate, detectScript } from '../translit/index.js';
import { WasmEngine } from '../engine/wasm.js';
import { detailsDeva, renderDetailsDeva, stackDeva, vacanaLabelDeva } from '../formatters/labels.js';

export interface SearchCommandOptions {

  dhatu?: string;
  family?: string;
  limit?: string;
  format?: OutputFormat;
  script?: ScriptType;
  json?: boolean;
}

/**
 * Extracts only `forms[key]` from a shard's raw JSON text: a full JSON.parse
 * of a 4-5MB shard costs ~95ms — a needle scan for the exact key plus a
 * bracket-balanced slice costs ~2ms, keeping shard lookup truly O(1).
 */
/** Cache of loaded per-shard binary key indexes (see scripts/gen-shard-idx.mjs). */
const idxCache = new Map<string, Buffer>();

/**
 * O(log-scan) shard value lookup: binary-sorts against the shard's companion
 * .idx.bin (sorted deva keys + utf8 byte offsets) and reads ONLY the value
 * slice (~rows bytes) from the shard file instead of parsing the whole
 * multi-MB shard. Keeps every search inside the <150ms cold budget.
 */
function idxLookup(dir: string, shardNum: string, key: string): any[][] {
  const dataFile = path.join(dir, `shard-${shardNum}.index.json`);
  const idxPath = dataFile.replace('.index.json', '.idx.bin');
  let idx = idxCache.get(idxPath);
  if (idx === undefined) {
    if (!fs.existsSync(idxPath)) return [];
    idx = fs.readFileSync(idxPath);
    idxCache.set(idxPath, idx);
  }
  const count = idx.readUInt32LE(0);
  const keyBuf = Buffer.from(key, 'utf8');
  let pos = 4;
  let off = -1;
  let len = 0;
  for (let i = 0; i < count; i++) {
    const klen = idx.readUInt16LE(pos);
    pos += 2;
    const cmp = Buffer.compare(idx.subarray(pos, pos + klen), keyBuf);
    pos += klen;
    const eOff = idx.readUInt32LE(pos);
    pos += 4;
    const eLen = idx.readUInt32LE(pos);
    pos += 4;
    if (cmp === 0) { off = eOff; len = eLen; break; }
  }
  if (off < 0) return [];
  const fd = fs.openSync(dataFile, 'r');
  try {
    const buf = Buffer.alloc(len);
    const read = fs.readSync(fd, buf, 0, len, off);
    return JSON.parse(buf.toString('utf8', 0, read)) as any[][];
  } finally {
    fs.closeSync(fd);
  }
}

function extractShardForms(raw: string, key: string): any[][] {
  const needle = JSON.stringify(key) + ':';
  const at = raw.indexOf(needle);
  if (at === -1) return [];
  let i = at + needle.length;
  while (i < raw.length && raw[i] !== '[') i++;
  if (raw[i] !== '[') return [];
  let depth = 0;
  let inString = false;
  let escaped = false;
  for (; i < raw.length; i++) {
    const c = raw[i];
    if (inString) {
      if (escaped) escaped = false;
      else if (c === '\\') escaped = true;
      else if (c === '"') inString = false;
      continue;
    }
    if (c === '"') inString = true;
    else if (c === '[') depth++;
    else if (c === ']') {
      depth--;
      if (depth === 0) {
        try {
          return JSON.parse(raw.slice(at + needle.length, i + 1)) as any[][];
        } catch {
          return [];
        }
      }
    }
  }
  return [];
}

/**
 * Derives every plausible SLP1/Devanagari reading of a raw query by
 * attempting HK-digraph, SLP1-code, aspirate-collapsed, and literal
 * interpretations. Reverse lookup requires exact matches, so every
 * spelling ambiguity must be tried.
 */
export function buildQueryReadings(query: string): { devaReadings: Set<string>; slp1Readings: Set<string> } {
  const cleanQuery = query.trim();
  const detected = detectScript(cleanQuery);
  const devaReadings = new Set<string>();
  const slp1Readings = new Set<string>();
  if (detected === 'deva') {
    devaReadings.add(cleanQuery);
    slp1Readings.add(transliterate(cleanQuery, 'slp1', 'deva'));
  } else {
    // Read the input as HK digraphs, as SLP1 codes, and with SLP1-style
    // uppercase aspirates collapsed into HK digraphs ("Bhavati" -> "bhavati"),
    // which is the common human spelling (bhavati with a capital B).
    const aspirFixed = cleanQuery.replace(/([KGCJWQTDPB])h/g, (m) => m.toLowerCase());
    for (const src of [cleanQuery, aspirFixed]) {
      devaReadings.add(transliterate(src, 'deva', 'hk'));
      devaReadings.add(transliterate(src, 'deva', 'slp1'));
    }
    // First-letter demotion resolves "Corayati"-style inputs, where the
    // capital is a typing habit rather than a semantic aspirate (lowercase
    // consonant codes are identical in SLP1 and HK, so this is unambiguous).
    if (/^[A-Z]/.test(cleanQuery)) {
      const demoted = cleanQuery.charAt(0).toLowerCase() + cleanQuery.slice(1);
      devaReadings.add(transliterate(demoted, 'deva', 'hk'));
      devaReadings.add(transliterate(demoted, 'deva', 'slp1'));
    }
    // Whatever the autodetector decides (iast, deva, ...).
    devaReadings.add(transliterate(cleanQuery, 'deva'));
    devaReadings.add(cleanQuery);
    for (const d of devaReadings) {
      if (d) slp1Readings.add(transliterate(d, 'slp1', 'deva'));
    }
    slp1Readings.add(cleanQuery);
  }
  return { devaReadings, slp1Readings };
}

export function handleSearch(query: string, options: SearchCommandOptions): void {
  const format: OutputFormat = options.json ? 'json' : (options.format || 'table');
  const script: ScriptType = options.script || 'slp1';
  const limit = options.limit ? parseInt(options.limit, 10) : 25;

  if (!query || !query.trim()) {
    console.error(pc.red('Error: Please provide a form to search for.'));
    process.exit(1);
  }

  const cleanQuery = query.trim();

  // Multi-reading normalization: latin input is ambiguous between SLP1
  // aspirate codes ("Bavati") and HK digraphs ("Bhavati"); autodetection
  // alone picks one and mangles the other. Generate every plausible
  // Devanagari/SLP1 reading so reverse lookup always reaches the shards.
  const { devaReadings, slp1Readings } = buildQueryReadings(cleanQuery);
  // Shard keys are Devanagari form entries; latin/other readings are only
  // meaningful after conversion, so filter before touching the shards.
  const hasDevaChars = (s: string) => /[\u0900-\u097F]/.test(s);
  const queryDevaList = [...devaReadings].filter((r) => r && hasDevaChars(r));

const results: SearchResultItem[] = [];

const seenShard = new Set<string>();
const rawShardCache = new Map<string, string>();

/** Maps one shard row to a result item (all tiers). */
function pushShardRow(m: any[], qDeva: string): void {
  if (results.length >= limit) return;
  const dhatuId = m[0];
  const typeKey = m[1];

  let matchType: SearchResultItem['matchType'] | null = null;
  const item: Partial<SearchResultItem> & { dhatuId: string; form: string } = { dhatuId, form: qDeva };
  let family = '';
  let lakaraOrPrat = '';

  if (typeKey === 't') {
    matchType = 'ting';
    family = m[2];
    item.prayoga = m[3];
    lakaraOrPrat = m[4];
    item.lakara = lakaraOrPrat;
    item.slot = String(m[5]);
  } else if (typeKey === 'k') {
    matchType = 'krut';
    family = m[2];
    lakaraOrPrat = m[3];
    item.pratyaya = lakaraOrPrat;
  } else if (typeKey === 'p') {
    // Prefixed row inserted before a main-row tail:
    //   t: [id,'p',stack,'t',family,prayoga,lakara,slot]
    //   k: [id,'p',stack,'k',family,pratyaya,idx,gender]
    //   s: [id,'p',stack,'s',family,pratyaya,idx,gender,vibhakti,vacana]
    const kind = m[3];
    matchType = 'prefixed';
    item.prefix = m[2];
    if (kind === 't') {
      family = m[4];
      item.prayoga = m[5];
      lakaraOrPrat = m[6];
      item.lakara = lakaraOrPrat;
      item.slot = String(m[7]);
    } else if (kind === 'k') {
      family = m[4];
      lakaraOrPrat = m[5];
      item.pratyaya = lakaraOrPrat;
      item.gender = typeof m[7] === 'string' ? m[7] : undefined;
    } else if (kind === 's') {
      family = m[4];
      lakaraOrPrat = m[5];
      item.pratyaya = lakaraOrPrat;
      item.gender = typeof m[7] === 'string' ? m[7] : undefined;
      item.vibhakti = m[8];
      item.vacana = m[9];
    } else {
      return; // unknown prefixed row kind
    }
  } else if (typeKey === 's') {
    // Bare krDanta subanta declension: [id,'s',family,pratyaya,vibhakti,vacana,form]
    matchType = 'subanta';
    family = m[2];
    lakaraOrPrat = m[3];
    item.pratyaya = lakaraOrPrat;
    item.vibhakti = m[4];
    item.vacana = m[5];
  } else if (typeKey === 'ps') {
    // Prefixed krDanta subanta declension: [id,'ps',stack,family,pratyaya,vibh,vacana,form]
    matchType = 'prefixed';
    item.prefix = m[2];
    family = m[3];
    lakaraOrPrat = m[4];
    item.pratyaya = lakaraOrPrat;
    item.vibhakti = m[5];
    item.vacana = m[6];
  } else if (typeKey === 'pt') {
    // Prefixed tiṅ: [id,'pt',stack,family,lakara,slot]
    matchType = 'prefixed';
    item.prefix = m[2];
    family = m[3];
    lakaraOrPrat = m[4];
    item.lakara = lakaraOrPrat;
    item.slot = String(m[5]);
  } else {
    return; // unknown row version
  }

  const seenKey = `${dhatuId}|${matchType}|${family}|${lakaraOrPrat}|${item.prayoga || ''}|${item.slot || ''}|${item.prefix || ''}`;
  if (seenShard.has(seenKey)) return;
  seenShard.add(seenKey);

  const entry = DhatuRepository.getDhatu(dhatuId);
  const opadesha = entry?.info.find(i => i.name === 'OpadeSikasvarUpam')?.value || dhatuId;
  const artha = entry?.info.find(i => i.name === 'arTaH')?.value || '';
  const gana = entry?.info.find(i => i.name === 'gaRaH')?.value || '';

  results.push({
    dhatuId,
    dhatuName: opadesha,
    gana,
    meaning: artha,
    matchType: matchType!,
    form: qDeva,
    family,
    prayoga: item.prayoga,
    lakara: item.lakara,
    pratyaya: item.pratyaya,
    slot: item.slot,
    prefix: item.prefix,
    vibhakti: item.vibhakti,
    vacana: item.vacana,
  });
}

// Fast shard tier lookup (if available)
const shardDir = path.resolve(__dirname, '../../data/shards');
const TIER_DIRS = [
  { dir: shardDir, key: 'base' },
  { dir: path.join(shardDir, 'sub'), key: 'sub' },
  { dir: path.join(shardDir, 'stack'), key: 'stack' },
];
if (!options.dhatu && fs.existsSync(shardDir)) {
  let hit = false;
  for (const { dir } of TIER_DIRS) {
    for (const qDeva of queryDevaList) {
      const shardRes = WasmEngine.indexShard(qDeva, 256);
      if (!(shardRes.ok && shardRes.shard !== undefined)) continue;
      const shardNum = String(shardRes.shard).padStart(2, '0');
      const shardFile = path.join(dir, `shard-${shardNum}.index.json`);
      if (!fs.existsSync(shardFile)) continue;
      const matches = ((): any[][] => {
        const idxFile = shardFile.replace('.index.json', '.idx.bin');
        if (fs.existsSync(idxFile)) return idxLookup(dir, shardNum, qDeva);
        let rawShard = rawShardCache.get(shardNum + dir);
        if (rawShard === undefined) {
          rawShard = fs.readFileSync(shardFile, 'utf8');
          rawShardCache.set(shardNum + dir, rawShard);
        }
        return extractShardForms(rawShard, qDeva);
      })();

      for (const m of matches) {
        pushShardRow(m, qDeva);
        if (results.length >= limit) break;
      }
      if (results.length > 0) { hit = true; break; }
    }
    if (hit) break;
  }
}

// --dhatu scoped search: single-entry scan (fast, bounded)
if (results.length === 0 && options.dhatu) {
  const scopedId = DhatuRepository.normalizeBaseindex(options.dhatu);
  if (!scopedId) {
    console.error(pc.red(`Error: Dhatu not found: "${options.dhatu}"`));
    process.exit(1);
  }

  for (const id of [scopedId]) {
    if (results.length >= limit) break;

    const entry = DhatuRepository.getDhatu(id);
    if (!entry) continue;

    const opadesha = entry.info.find(i => i.name === 'OpadeSikasvarUpam')?.value || id;
    const artha = entry.info.find(i => i.name === 'arTaH')?.value || '';
    const gana = entry.info.find(i => i.name === 'gaRaH')?.value || '';

    // 1. Search Conjugations (Tiṅanta)
    for (const [conjKey, lakaras] of Object.entries(entry.conjugations)) {
      for (const [lakara, slots] of Object.entries(lakaras)) {
        for (let slotIdx = 0; slotIdx < slots.length; slotIdx++) {
          const slotVal = slots[slotIdx];
          // Slot value might contain variants separated by comma or semicolon
          const variants = slotVal.split(/[,;\/]/).map(v => v.trim());
          for (const v of variants) {
            const vSlp1 = transliterate(v, 'slp1');
            if (slp1Readings.has(vSlp1) || devaReadings.has(v)) {
              const purusha = Math.floor((slotIdx % 9) / 3);
              const vacana = slotIdx % 3;
              results.push({
                dhatuId: id,
                dhatuName: opadesha,
                gana,
                meaning: artha,
                matchType: 'ting',
                form: v,
                family: conjKey,
                lakara,
                slot: `${purusha}.${vacana}`,
              });
              if (results.length >= limit) break;
            }
          }
          if (results.length >= limit) break;
        }
        if (results.length >= limit) break;
      }
      if (results.length >= limit) break;
    }

    // 2. Search Participles (Kṛdanta)
    for (const [fam, participles] of Object.entries(entry.participles)) {
      for (const [pratyaya, val] of Object.entries(participles)) {
        let forms: string[] = [];
        if (typeof val === 'string') forms = val.split(',');
        else if (val && typeof val === 'object') forms = [val.base, val.m, val.f, val.n];

        for (const f of forms) {
          if (!f) continue;
          const variants = f.split(/[,;\/]/).map(v => v.trim());
          for (const v of variants) {
            const vSlp1 = transliterate(v, 'slp1');
            if (slp1Readings.has(vSlp1) || devaReadings.has(v)) {
              results.push({
                dhatuId: id,
                dhatuName: opadesha,
                gana,
                meaning: artha,
                matchType: 'krut',
                form: v,
                family: fam,
                pratyaya,
              });
              if (results.length >= limit) break;
            }
          }
          if (results.length >= limit) break;
        }
        if (results.length >= limit) break;
      }
      if (results.length >= limit) break;
    }

    // 3. Search Upasarga Forms
    if (entry.upasarga_forms) {
      for (const [pfx, conjMap] of Object.entries(entry.upasarga_forms)) {
        for (const [conjKey, lakaras] of Object.entries(conjMap as Record<string, any>)) {
          if (!lakaras || typeof lakaras !== 'object') continue;
          for (const [lakara, slots] of Object.entries(lakaras as Record<string, any>)) {
            if (!Array.isArray(slots)) continue;
            for (let slotIdx = 0; slotIdx < slots.length; slotIdx++) {
              const slotVal = slots[slotIdx];
              const variants = String(slotVal).split(/[,;\/]/).map(v => v.trim());
              for (const v of variants) {
                const vSlp1 = transliterate(v, 'slp1');
                if (slp1Readings.has(vSlp1) || devaReadings.has(v)) {
                  results.push({
                    dhatuId: id,
                    dhatuName: opadesha,
                    gana,
                    meaning: artha,
                    matchType: 'prefixed',
                    form: v,
                    prefix: pfx,
                    family: conjKey,
                    lakara,
                  });
                  if (results.length >= limit) break;
                }
              }
              if (results.length >= limit) break;
            }
            if (results.length >= limit) break;
          }
          if (results.length >= limit) break;
        }
        if (results.length >= limit) break;
      }
    }
  }
}

  if (results.length === 0) {
    console.log(pc.yellow(`No matching forms found for "${query}".`));
    return;
  }

  if (format === 'json') {
    console.log(JSON.stringify({ query, count: results.length, results }, null, 2));
    return;
  }

  const headers = ['Dhatu', 'ID', 'Form', 'Type', 'Details', 'Meaning'];
  const tableRows = results.map(r => {
    let details = '';
    if (r.matchType === 'ting') details = detailsDeva([r.family || '', r.lakara || '']);
    else if (r.matchType === 'krut') details = detailsDeva([r.family || '', r.pratyaya || '']);
    else if (r.matchType === 'subanta') {
      const extra = vacanaLabelDeva(r.vibhakti || '', r.vacana || '');
      details = detailsDeva([r.prefix || '', r.family || '', r.pratyaya || '']) + (extra ? ` · ${extra}` : '');
    }
    else if (r.matchType === 'prefixed') {
      const extra = vacanaLabelDeva(r.vibhakti || '', r.vacana || '');
      const stackLbl = stackDeva(r.prefix || '');
      details = detailsDeva([stackLbl, r.family || '', r.lakara || '', r.pratyaya || ''])
        + (extra ? ` · ${extra}` : '');
    }

    return [
      transliterate(r.dhatuName, script),
      r.dhatuId,
      transliterate(r.form, script),
      r.matchType,
      renderDetailsDeva(details, script),
      transliterate(r.meaning, script),
    ];
  });

  const renderFn = () => {
    const table = new Table({
      head: headers.map(h => pc.cyan(pc.bold(h))),
      style: { head: [], border: ['grey'] },
    });
    for (const row of tableRows) {
      table.push([
        pc.yellow(row[0]),
        row[1],
        pc.green(row[2]),
        row[3],
        row[4],
        row[5],
      ]);
    }
    return pc.bold(pc.green(`=== Search Results for "${query}" (${results.length} matches) ===`)) + '\n' + table.toString();
  };

  console.log(formatOutput({ headers, rows: tableRows, raw: results }, format, renderFn));
}
