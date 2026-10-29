import pc from 'picocolors';
import { DhatuRepository } from '../data/repo.js';
import { renderKrutTable } from '../formatters/table.js';
import { formatOutput } from '../formatters/index.js';
import { OutputFormat, ScriptType, KrutFamily } from '../types.js';
import { transliterate } from '../translit/index.js';

export interface KrutCommandOptions {
  family?: string;
  pratyaya?: string;
  prefix?: string;
  format?: OutputFormat;
  script?: ScriptType;
  json?: boolean;
}

export function handleKrut(dhatuIdOrName: string, options: KrutCommandOptions): void {
  const format: OutputFormat = options.json ? 'json' : (options.format || 'table');
  const script: ScriptType = options.script || 'slp1';
  let family = options.family?.toLowerCase() || 'shuddha';
  if (family === 'shuddha') family = 'krut';
  else if (!family.endsWith('_krut') && family !== 'krut') family = `${family}_krut`;

  const pratyayaFilter = options.pratyaya ? transliterate(options.pratyaya, 'slp1').toLowerCase() : null;

  const entry = DhatuRepository.getDhatu(dhatuIdOrName);
  if (!entry) {
    console.error(pc.red(`Error: Dhatu not found: "${dhatuIdOrName}"`));
    process.exit(1);
  }

  const participlesMap = entry.participles[family] || {};
  const rows: Array<{ pratyaya: string; base: string; m: string; f: string; n: string }> = [];

  for (const [prat, val] of Object.entries(participlesMap)) {
    if (pratyayaFilter && transliterate(prat, 'slp1').toLowerCase() !== pratyayaFilter) {
      continue;
    }

    const items = Array.isArray(val) ? val : [val];
    for (const item of items) {
      if (typeof item === 'string') {
        const parts = item.split(',');
        rows.push({
          pratyaya: prat,
          base: parts[0] || '',
          m: parts[1] || '',
          f: parts[2] || '',
          n: parts[3] || '',
        });
      } else if (item && typeof item === 'object') {
        rows.push({
          pratyaya: prat,
          base: item.base || '',
          m: item.m || '',
          f: item.f || '',
          n: item.n || '',
        });
      }
    }
  }

  if (rows.length === 0) {
    console.error(pc.yellow(`No krdanta participles found for family: ${family}${pratyayaFilter ? `, pratyaya: ${pratyayaFilter}` : ''}`));
    return;
  }

  if (format === 'json') {
    const raw = {
      dhatu: entry.id,
      family,
      participles: rows.map(r => ({
        pratyaya: transliterate(r.pratyaya, script),
        base: transliterate(r.base, script),
        m: transliterate(r.m, script),
        f: transliterate(r.f, script),
        n: transliterate(r.n, script),
      })),
    };
    console.log(JSON.stringify(raw, null, 2));
    return;
  }

  const headers = ['Pratyaya', 'Base Stem', 'Masculine (m)', 'Feminine (f)', 'Neuter (n)'];
  const tableRows = rows.map(r => [
    transliterate(r.pratyaya, script, 'slp1'),
    transliterate(r.base, script, 'slp1'),
    transliterate(r.m, script, 'slp1'),
    transliterate(r.f, script, 'slp1'),
    transliterate(r.n, script, 'slp1'),
  ]);

  const output = formatOutput(
    { headers, rows: tableRows, raw: rows },
    format,
    () => renderKrutTable(rows, entry.id, family, script)
  );

  console.log(output);
}
