#!/usr/bin/env node
/**
 * Repack existing shard-tier JSON files and emit a companion sorted binary
 * index (<shard>.idx.bin) per file, so the runtime can read a form's rows
 * without loading the whole multi-MB shard.
 *
 * Canonical shard layout (all tiers):
 *   {"v":1,"tier":"<name>","forms":{<key>:<rows>,...}}
 * Keys are sorted by UTF-8 bytes.
 *
 * idx layout: u32 entryCount, then per entry
 *   [u16 keyLen][keyBytes utf8][u32 valueByteOffset][u32 valueByteLen]
 * Byte offsets are absolute utf8 byte positions inside the shard JSON file;
 * valueByteOffset points exactly at the '[' of the value array.
 *
 * Reads with repair: earlier repack runs (v1) rewrote base-tier files with a
 * footer one '}' short; this script re-parses them, appending the missing
 * brace when encountered, so no data was lost.
 *
 * Re-run offline any time shard data changes:
 *   node scripts/gen-shard-idx.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const SHARDS = path.join(ROOT, 'data', 'shards');

const byteLen = (s) => Buffer.byteLength(s, 'utf8');

const TIERS = [
  { dir: SHARDS, name: 'base' },
  { dir: path.join(SHARDS, 'sub'), name: 'sub' },
  { dir: path.join(SHARDS, 'stack'), name: 'stack' },
];

for (const { dir, name: tier } of TIERS) {
  if (!fs.existsSync(dir)) continue;
  for (let shard = 0; shard < 256; shard++) {
    const base2 = `shard-${String(shard).padStart(2, '0')}`;
    const name = `${base2}.index.json`;
    const legacyNames = [`${base2}.json`, name];
    let dataFile = null;
    for (const cand of legacyNames) {
      if (fs.existsSync(path.join(dir, cand))) { dataFile = path.join(dir, cand); break; }
    }
    if (!dataFile) continue;

    // Read + parse with the one-missing-brace repair (v1 footer bug).
    let bytes = fs.readFileSync(dataFile);
    let parsed = null;
    for (let attempt = 0; attempt < 3; attempt++) {
      try { parsed = JSON.parse(bytes.toString('utf8')); break; } catch { /* try repair */ }
      bytes = Buffer.concat([bytes, Buffer.from('}', 'utf8')]);
    }
    if (!parsed || !parsed.forms) {
      throw new Error(`${tier}/${base2}: unparseable even after repair`);
    }
    const forms = parsed.forms;
    // v1's base footer placed the top-level `,"v":1` inside the forms object
    // once the missing brace is appended; drop that stray scalar key.
    if (Object.prototype.hasOwnProperty.call(forms, 'v') && !Array.isArray(forms.v)) {
      delete forms.v;
    }

    // Canonical, deterministic serialization.
    const header = `{"v":1,"tier":"${tier}","forms":{`;
    const footer = '}}';
    const keys = Object.keys(forms)
      .filter((k) => Array.isArray(forms[k]))
      .sort((a, b) => Buffer.compare(Buffer.from(a, 'utf8'), Buffer.from(b, 'utf8')));

    let cursor = byteLen(header);
    const idxEntries = [];
    const parts = [];
    for (let i = 0; i < keys.length; i++) {
      const keyJson = JSON.stringify(keys[i]);
      const value = JSON.stringify(forms[keys[i]]);
      const comma = i === 0 ? 0 : 1; // ',' between entries
      const entry = (comma ? ',' : '') + keyJson + ':' + value;
      // cursor points at the entry's first byte (the comma when present)
      idxEntries.push({
        key: keys[i],
        off: cursor + comma + byteLen(keyJson) + 1, // skip [comma][key][colon]
        len: byteLen(value),
      });
      parts.push(entry);
      cursor += byteLen(entry);
    }
    const json = header + parts.join('') + footer;
    if (cursor + byteLen(footer) !== byteLen(json)) {
      throw new Error(`${tier}/${base2}: offset drift`);
    }
    const jsonBuf = Buffer.from(json, 'utf8');
    // Full verification: every idx entry must land exactly on its value array
    // ('[' opens the value, ']' closes it) — catches mid-file offset drift.
    for (const e of idxEntries) {
      if (jsonBuf[e.off] !== 0x5b || jsonBuf[e.off + e.len - 1] !== 0x5d) {
        throw new Error(
          `${tier}/${base2}: idx slice for <${e.key}> not a value array (off=${e.off}, len=${e.len})`
        );
      }
    }
    if (idxEntries.length) {
      JSON.parse(jsonBuf.toString('utf8', idxEntries[0].off, idxEntries[0].off + idxEntries[0].len));
      const last = idxEntries[idxEntries.length - 1];
      JSON.parse(jsonBuf.toString('utf8', last.off, last.off + last.len));
    }
    fs.writeFileSync(path.join(dir, name), jsonBuf);
    // Canonical name now written: remove the legacy-name source to avoid doubles.
    if (dataFile !== path.join(dir, name)) fs.unlinkSync(dataFile);

    const idx = Buffer.alloc(4 + keys.reduce((a, k) => a + 2 + byteLen(k) + 8, 0));
    idx.writeUInt32LE(keys.length, 0);
    let pos = 4;
    for (const e of idxEntries) {
      const kb = Buffer.from(e.key, 'utf8');
      idx.writeUInt16LE(kb.length, pos); pos += 2;
      kb.copy(idx, pos); pos += kb.length;
      idx.writeUInt32LE(e.off, pos); pos += 4;
      idx.writeUInt32LE(e.len, pos); pos += 4;
    }
    fs.writeFileSync(path.join(dir, `${base2}.idx.bin`), idx);
  }
  console.log(`idx written: ${dir.replace(ROOT + '/', '')} [${tier}]`);
}
