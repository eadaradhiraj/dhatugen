#!/usr/bin/env node
/**
 * Generate two-level chunks of the Shabda oracle (data/shabda2.json).
 *
 * Why: `word` performs a single-word lookup against the oracle, but the only
 * runtime representation was the full ~6.7MB JSON whose parse costs ~90ms —
 * nearly the whole cold-CLI budget. This generator splits the canonical file
 * (kept unchanged) into chunks keyed by the entry word's first two codepoints
 * (`<c0>-<c1>.json`, tens of KB; `<c0>.json` for single-char words), so a
 * lookup reads and parses one small file.
 *
 * Re-run offline any time data/shabda2.json changes:
 *   node scripts/gen-shabda-chunks.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const SRC = path.join(ROOT, 'data', 'shabda2.json');
const OUT_DIR = path.join(ROOT, 'data', 'shabda');
const OUT_FILE = path.join(OUT_DIR, 'chunks.json');

const hex4 = (n) => n.toString(16).padStart(4, '0');

const raw = JSON.parse(fs.readFileSync(SRC, 'utf8'));
const entries = (raw.entries || []).slice().sort((a, b) => String(a[0]).localeCompare(String(b[0])));

const buckets = new Map(); // fileKey -> entries[]
let skipped = 0;
for (const e of entries) {
  const word = String(e[0]);
  if (!word) { skipped++; continue; }
  const c0 = word.codePointAt(0);
  const c0len = String.fromCodePoint(c0).length;
  let key;
  if (word.length <= c0len) {
    key = hex4(c0);
  } else {
    const c1 = word.codePointAt(c0len);
    key = `${hex4(c0)}-${c1 === undefined ? '0000' : hex4(c1)}`;
  }
  let arr = buckets.get(key);
  if (!arr) { arr = []; buckets.set(key, arr); }
  arr.push(e);
}

fs.rmSync(OUT_DIR, { recursive: true, force: true });
fs.mkdirSync(OUT_DIR, { recursive: true });

const chunkManifest = [];
for (const [key, arr] of [...buckets.entries()].sort((a, b) => a[0].localeCompare(b[0]))) {
  const file = `${key}.json`;
  const payload = { v: 1, key, entries: arr };
  fs.writeFileSync(path.join(OUT_DIR, file), JSON.stringify(payload));
  chunkManifest.push({ file, count: arr.length });
}

fs.writeFileSync(
  OUT_FILE,
  JSON.stringify(
    {
      v: 1,
      source: 'shabda2.json',
      total: entries.length,
      skipped,
      chunks: chunkManifest.length,
      totalBytes: chunkManifest.reduce(
        (acc, c) => acc + fs.statSync(path.join(OUT_DIR, c.file)).size,
        0
      ),
      rawFileBytes: fs.statSync(SRC).size,
    },
    null,
    2
  )
);

const biggest = chunkManifest.reduce((a, c) => (c.count > a.count ? c : a), chunkManifest[0]);
console.log(
  `shabda chunks: ${chunkManifest.length} files, ${entries.length} entries, ${skipped} skipped, total ${(
    fs.statSync(OUT_DIR).size / 1024
  ).toFixed(0)}K, biggest ${biggest.file} (${biggest.count} entries)`
);
