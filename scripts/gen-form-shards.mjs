#!/usr/bin/env node
/**
 * Generate per-form shard tiers for search:
 *   data/shards/sub/    bare krDanta subanta declensions (data/subanta_test/*.json)
 *   data/shards/stack/  prefixed forms: upasarga tiṅ + prefixed krDanta declensions
 *
 * Each tier partitions forms by the engine's FNV-1a shard hash
 * (`WasmEngine.indexShard(devaForm, 256)` — the same bucketing the WASM
 * revindex and the existing base shards use), so a lookup touches exactly one
 * small file and keeps `search` inside the <150ms cold budget.
 *
 * Two-pass writer (disk-cheap, heap-light: ~15M forms, ~50M rows):
 *   Pass 1 streams rows into data/shards/_work/<tier>-<shard>.tmp.tsv
 *   Pass 2 groups rows per shard into <tier>/shard-XX.json, deduped.
 *
 * Re-run offline any time the corpus changes (data/ + data/subanta_test/):
 *   node scripts/gen-form-shards.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const DATA = path.join(ROOT, 'data');
const SUB_TEST = path.join(DATA, 'subanta_test');
const WORK = path.join(ROOT, 'data', 'shards', '_work');
const SUB_DIR = path.join(ROOT, 'data', 'shards', 'sub');
const STACK_DIR = path.join(ROOT, 'data', 'shards', 'stack');

const translitMod = await import(path.join(ROOT, 'dist', 'translit', 'index.js'));
const trav = translitMod.transliterate;
const engineMod = await import(path.join(ROOT, 'dist', 'engine', 'wasm.js'));
const { WasmEngine } = engineMod;

fs.rmSync(WORK, { recursive: true, force: true });
fs.mkdirSync(WORK, { recursive: true });
fs.rmSync(SUB_DIR, { recursive: true, force: true });
fs.rmSync(STACK_DIR, { recursive: true, force: true });
fs.mkdirSync(SUB_DIR, { recursive: true });
fs.mkdirSync(STACK_DIR, { recursive: true });

const engineStamp = WasmEngine.engineStamp();
const pending = new Map(); // key "tier|shard" -> string[]
const shardOf = (formSlp1) => {
  const deva = trav(formSlp1, 'deva', 'slp1');
  const res = WasmEngine.indexShard(deva, 256);
  return res.ok && res.shard !== undefined ? res.shard : null;
};

function emit(tier, shardNum, formSlp1, rowFields) {
  if (shardNum === null) return;
  const key = `${tier}|${shardNum}`;
  let buf = pending.get(key);
  if (!buf) { buf = []; pending.set(key, buf); }
  buf.push(formSlp1 + '\t' + rowFields.join('\t'));
  if (buf.length >= 4000) {
    fs.appendFileSync(path.join(WORK, `${tier}-${shardNum}.tmp.tsv`), buf.join('\n') + '\n');
    buf.length = 0;
  }
}
const flush = () => {
  for (const [key, buf] of pending) {
    if (!buf.length) continue;
    fs.appendFileSync(path.join(WORK, `${key.replace('|', '-')}.tmp.tsv`), buf.join('\n') + '\n');
    buf.length = 0;
  }
};

let rows = 0;
let files = 0;
const started = Date.now();

// ---- fixtures: bare + prefixed krDanta subanta declensions ----
for (const day of fs.readdirSync(SUB_TEST)) {
  for (const f of fs.readdirSync(path.join(SUB_TEST, day))) {
    if (!f.endsWith('.json')) continue;
    const p = path.join(SUB_TEST, day, f);
    let j;
    try { j = JSON.parse(fs.readFileSync(p, 'utf8')); } catch { continue; }
    if (!j.base || !j.tabs) continue;
    files++;
    const id = j.id;
    for (const [fam, tableRows] of Object.entries(j.base)) {
      for (const row of tableRows) {
        for (const [vib, cells] of Object.entries(row.table || {})) {
          for (const [va, arr] of Object.entries(cells)) {
            for (const form of arr) {
              const ff = typeof form === 'string' ? form.trim() : '';
              if (!ff) continue;
              emit('sub', shardOf(ff), ff, [id, 's', fam, row.pratyaya || '', vib, va, ff]);
              rows++;
            }
          }
        }
      }
    }
    for (const [stack, u] of Object.entries(j.upasarga || {})) {
      for (const [fam, tableRows] of Object.entries(u.tabs || {})) {
        for (const row of tableRows) {
          for (const [vib, cells] of Object.entries(row.table || {})) {
            for (const [va, arr] of Object.entries(cells)) {
              for (const form of arr) {
                const ff = typeof form === 'string' ? form.trim() : '';
                if (!ff) continue;
                emit('stack', shardOf(ff), ff, [id, 'ps', stack, fam, row.pratyaya || '', vib, va, ff]);
                rows++;
              }
            }
          }
        }
      }
    }
  }
}

// ---- full entries: prefixed (upasarga) tiṅ forms ----
for (const day of fs.readdirSync(DATA).filter((d) => /^\d\d$/.test(d))) {
  for (const f of fs.readdirSync(path.join(DATA, day))) {
    if (!f.endsWith('.json')) continue;
    const p = path.join(DATA, day, f);
    let j;
    try { j = JSON.parse(fs.readFileSync(p, 'utf8')); } catch { continue; }
    if (!j.conjugations) continue;
    for (const [stack, u] of Object.entries(j.upasarga_forms || {})) {
      const tings = (u.conjugations || {}).ting || {};
      for (const [lakara, slots] of Object.entries(tings)) {
        if (!Array.isArray(slots)) continue;
        slots.forEach((slotVal, slotIdx) => {
          for (const v of String(slotVal).split(/[,;/]/)) {
            const ff = v.trim();
            if (!ff) continue;
            emit('stack', shardOf(ff), ff, [j.id, 'pt', stack, 'ting', lakara, slotIdx]);
            rows++;
          }
        });
      }
    }
  }
}
flush();

// ---- pass 2: group, dedupe, write shard JSONs ----
const sizes = { sub: 0, stack: 0 };
const counts = { sub: 0, stack: 0 };

/**
 * Writes a tier shard file plus a companion sorted binary index
 * (<name>.idx.bin): u32 entryCount, then per entry
 * [u16 keyLen][keyBytes utf8][u32 valueByteOffset][u32 valueByteLen]
 * (absolute utf8 byte offsets into the shard JSON file). The runtime
 * binary-searches the idx and reads only the value slice, so a lookup never
 * loads the multi-MB shard file.
 */
function writeShardWithIdx(outDir: string, shardNum: number, tier: string, groups: Map<string, Set<string>>): void {
  const sortedKeys = [...groups.keys()].sort((a, b) => Buffer.compare(Buffer.from(a, 'utf8'), Buffer.from(b, 'utf8')));
  const byteLen = (s: string) => Buffer.byteLength(s, 'utf8');
  const header = `{"v":1,"tier":"${tier}","forms":{`;
  let cursor = byteLen(header);
  const idxEntries: Array<{ key: string; off: number; len: number }> = [];
  const parts: string[] = [];
  for (let i = 0; i < sortedKeys.length; i++) {
    const keyJson = JSON.stringify(sortedKeys[i]);
    const rows = [...groups.get(sortedKeys[i]) as Set<string>].map((r) => r.split('\t'));
    const value = JSON.stringify(rows);
    const comma = i === 0 ? 0 : 1;
    const entry = (comma ? ',' : '') + keyJson + ':' + value;
    idxEntries.push({
      key: sortedKeys[i],
      off: cursor + comma + byteLen(keyJson) + 1, // skip [comma][key][colon]
      len: byteLen(value),
    });
    parts.push(entry);
    cursor += byteLen(entry);
  }
  const json = header + parts.join('') + '}}';
  // consistency guard: rebuilt offsets must match produced bytes
  if (cursor + byteLen('}}') !== byteLen(json)) {
    throw new Error(`shard ${tier}/${shardNum}: offset drift`);
  }
  const dataFile = path.join(outDir, `shard-${String(shardNum).padStart(2, '0')}.index.json`);
  fs.writeFileSync(dataFile, Buffer.from(json, 'utf8'));
  const idx = Buffer.alloc(4 + sortedKeys.reduce((a, k) => a + 2 + byteLen(k) + 8, 0));
  idx.writeUInt32LE(sortedKeys.length, 0);
  let pos = 4;
  for (const e of idxEntries) {
    const kb = Buffer.from(e.key, 'utf8');
    idx.writeUInt16LE(kb.length, pos); pos += 2;
    kb.copy(idx, pos); pos += kb.length;
    idx.writeUInt32LE(e.off, pos); pos += 4;
    idx.writeUInt32LE(e.len, pos); pos += 4;
  }
  fs.writeFileSync(path.join(outDir, `shard-${String(shardNum).padStart(2, '0')}.idx.bin`), idx);
}


for (const tier of ['sub', 'stack']) {
  const outDir = tier === 'sub' ? SUB_DIR : STACK_DIR;
  for (let shard = 0; shard < 256; shard++) {
    const tmp = path.join(WORK, `${tier}-${shard}.tmp.tsv`);
    const groups = new Map();
    if (fs.existsSync(tmp)) {
      const raw = fs.readFileSync(tmp, 'utf8');
      for (const line of raw.split('\n')) {
        const tab = line.indexOf('\t');
        if (tab <= 0) continue;
        const formSlp1 = line.slice(0, tab);
        const rowStr = line.slice(tab + 1);
        const deva = trav(formSlp1, 'deva', 'slp1');
        let set = groups.get(deva);
        if (!set) { set = new Set(); groups.set(deva, set); }
        set.add(rowStr);
      }
      fs.unlinkSync(tmp);
    }
    writeShardWithIdx(outDir, shard, tier, groups);
    const file = path.join(outDir, `shard-${String(shard).padStart(2, '0')}.index.json`);
    sizes[tier] += fs.statSync(file).size;
    counts[tier] += groups.size;
  }
}
fs.rmSync(WORK, { recursive: true, force: true });

// ---- manifest (valid JSON): documents tiers, stamps, family map ----
fs.writeFileSync(
  path.join(ROOT, 'data', 'shards', 'manifest.json'),
  JSON.stringify(
    {
      kind: 'dhaturupa-forms-index',
      engineStamp,
      generator: 'scripts/gen-form-shards.mjs',
      generatedAt: new Date().toISOString(),
      sharding: 'FNV-1a over Devanagari form, mirroring revindex::shard_of (WasmEngine.indexShard, 256)',
      tiers: {
        base: { files: 256, kind: 'tiṅ + krDanta rows from full dhatu entries (pre-existing generator)' },
        sub: { files: 256, forms: counts.sub, bytes: sizes.sub, kind: 'bare krDanta subanta declensions (data/subanta_test)' },
        stack: { files: 256, forms: counts.stack, bytes: sizes.stack, kind: 'prefixed tiṅ (upasarga_forms) + prefixed krDanta subanta declensions' },
      },
      rowTypes: {
        t: '[id, "t", family, prayoga, lakara, slot] (base only)',
        k: '[id, "k", family, pratyaya, idx, gender] (base only)',
        p: '[id, "p", stackDeva, "t"|"k", ...main-row tail] (base only, existing)',
        s: '[id, "s", family, pratyaya, vibhakti, vacana, form]',
        ps: '[id, "ps", stack, family, pratyaya, vibhakti, vacana, form]',
        pt: '[id, "pt", stack, family("ting"), lakara, slot]',
      },
    },
    null,
    2
  )
);

console.log(
  JSON.stringify(
    {
      files,
      rows,
      elapsed: ((Date.now() - started) / 1000).toFixed(0) + 's',
      counts,
      sizesMB: { sub: (sizes.sub / 1024 / 1024).toFixed(0), stack: (sizes.stack / 1024 / 1024).toFixed(0) },
    },
    null,
    2
  )
);
