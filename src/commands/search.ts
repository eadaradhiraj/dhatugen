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

export interface SearchCommandOptions {
  dhatu?: string;
  family?: string;
  limit?: string;
  format?: OutputFormat;
  script?: ScriptType;
  json?: boolean;
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
  const querySlp1 = transliterate(cleanQuery, 'slp1');
  const queryDeva = transliterate(cleanQuery, 'deva');

  const results: SearchResultItem[] = [];

  // Fast Shard Index Lookup (if available)
  const shardDir = path.resolve(__dirname, '../../data/shards');
  if (!options.dhatu && fs.existsSync(shardDir)) {
    try {
      const shardRes = WasmEngine.indexShard(queryDeva, 256);
      if (shardRes.ok && shardRes.shard !== undefined) {
        const shardNum = String(shardRes.shard).padStart(2, '0');
        const shardFile = path.join(shardDir, `shard-${shardNum}.index.json`);
        if (fs.existsSync(shardFile)) {
          const shardData = JSON.parse(fs.readFileSync(shardFile, 'utf8'));
          const matches = shardData.forms?.[queryDeva] || [];

          for (const m of matches) {
            const dhatuId = m[0];
            const typeKey = m[1];
            const family = m[2];
            const prayoga = m[3];
            const lakaraOrPrat = m[4];
            const slot = m[5];

            const entry = DhatuRepository.getDhatu(dhatuId);
            const opadesha = entry?.info.find(i => i.name === 'OpadeSikasvarUpam')?.value || dhatuId;
            const artha = entry?.info.find(i => i.name === 'arTaH')?.value || '';
            const gana = entry?.info.find(i => i.name === 'gaRaH')?.value || '';

            results.push({
              dhatuId,
              dhatuName: opadesha,
              gana,
              meaning: artha,
              matchType: typeKey === 't' ? 'ting' : 'krut',
              form: queryDeva,
              family,
              prayoga,
              lakara: typeKey === 't' ? lakaraOrPrat : undefined,
              pratyaya: typeKey === 'k' ? lakaraOrPrat : undefined,
              slot: String(slot),
            });
            if (results.length >= limit) break;
          }
        }
      }
    } catch {
      // Fallback to sequential scan below
    }
  }

  // If already found matches via shard index, skip slow sequential scan
  if (results.length === 0) {
    // Determine target dhatus
    let targetDhatus: string[] = [];
    if (options.dhatu) {
      const id = DhatuRepository.normalizeBaseindex(options.dhatu);
      if (!id) {
        console.error(pc.red(`Error: Dhatu not found: "${options.dhatu}"`));
        process.exit(1);
      }
      targetDhatus = [id];
    } else {
      // Cross-dhatu search fallback: check all 2259 dhatus
      const { items } = DhatuRepository.listDhatus({ limit: 0 });
      targetDhatus = items.map(i => i.baseindex);
    }

  for (const id of targetDhatus) {
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
            if (vSlp1 === querySlp1 || v === queryDeva || v === cleanQuery) {
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
            if (vSlp1 === querySlp1 || v === queryDeva || v === cleanQuery) {
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
                if (vSlp1 === querySlp1 || v === queryDeva || v === cleanQuery) {
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
    if (r.matchType === 'ting') details = `${r.family || ''} · ${r.lakara || ''}`;
    else if (r.matchType === 'krut') details = `${r.family || ''} · ${r.pratyaya || ''}`;
    else if (r.matchType === 'prefixed') details = `${r.prefix || ''} + ${r.family || ''} · ${r.lakara || ''}`;

    return [
      transliterate(r.dhatuName, script),
      r.dhatuId,
      transliterate(r.form, script),
      r.matchType,
      transliterate(details, script),
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
