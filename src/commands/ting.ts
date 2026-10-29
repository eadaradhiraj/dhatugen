import pc from 'picocolors';
import { DhatuRepository } from '../data/repo.js';
import { renderTingTable, PURUSHA_NAMES, VACANA_NAMES } from '../formatters/table.js';
import { formatOutput } from '../formatters/index.js';
import { OutputFormat, ScriptType, TingFamily, TingPrayoga } from '../types.js';
import { transliterate } from '../translit/index.js';
import { WasmEngine } from '../engine/wasm.js';

const LAKARAS = new Set([
  'lat',
  'lit',
  'lut',
  'lrut',
  'lot',
  'lang',
  'vidhiling',
  'ashirling',
  'lung',
  'lrung',
]);

export function extractLakara(k: string): string {
  const lower = k.toLowerCase().trim();
  if (lower === 'all' || !lower) return 'all';
  if (LAKARAS.has(lower)) return lower;
  if ((lower.startsWith('p') || lower.startsWith('a')) && LAKARAS.has(lower.slice(1))) {
    return lower.slice(1);
  }
  return lower;
}

export interface TingCommandOptions {
  family?: string;
  prayoga?: string;
  lakara?: string;
  prefix?: string;
  format?: OutputFormat;
  script?: ScriptType;
  json?: boolean;
}

export function handleTing(dhatuIdOrName: string, options: TingCommandOptions): void {
  const format: OutputFormat = options.json ? 'json' : (options.format || 'table');
  const script: ScriptType = options.script || 'slp1';
  const family: TingFamily = (options.family?.toLowerCase() as TingFamily) || 'shuddha';
  const prayoga: TingPrayoga = (options.prayoga?.toLowerCase() as TingPrayoga) || 'kartari';
  const rawLakara = options.lakara ? extractLakara(options.lakara) : 'all';
  const filterLakara = rawLakara === 'all' ? null : rawLakara;
  const prefix = options.prefix ? options.prefix.trim() : null;

  const entry = DhatuRepository.getDhatu(dhatuIdOrName);
  if (!entry) {
    console.error(pc.red(`Error: Dhatu not found: "${dhatuIdOrName}"`));
    process.exit(1);
  }

  // Resolve conjugation key in entry
  let conjKey = 'ting';
  if (family === 'shuddha') {
    conjKey = prayoga === 'karmani' ? 'yak' : 'ting';
  } else {
    conjKey = prayoga === 'karmani' ? `${family}_yak` : family;
  }

  let lakaraMap = entry.conjugations[conjKey] || {};

  // If prefix is requested
  if (prefix) {
    // Check if attested in upasarga_forms
    const prefixDeva = transliterate(prefix, 'deva');
    const pfxForms = entry.upasarga_forms?.[prefix] || entry.upasarga_forms?.[prefixDeva];

    if (pfxForms && pfxForms[conjKey]) {
      lakaraMap = pfxForms[conjKey];
    } else {
      // Derive via WasmEngine.prefixedTableCtx
      const slp1Dhatu = transliterate(entry.info.find(i => i.name === 'OpadeSikasvarUpam')?.value || entry.id, 'slp1');
      const note = entry.info.find(i => i.name === 'DAturUpanandinIwippaRI')?.value || '';
      const newMap: Record<string, string[]> = {};

      for (const [lakara, slots] of Object.entries(lakaraMap)) {
        // slots is array of 9 strings
        const devaSlots = slots.map(s => transliterate(s, 'deva', 'slp1'));
        const prefixed = WasmEngine.prefixedTableCtx(
          prefixDeva,
          devaSlots,
          slp1Dhatu,
          family === 'shuddha' ? 'ting' : family,
          note
        );
        newMap[lakara] = prefixed.map((surfs, idx) =>
          surfs.length > 0 ? surfs.map(s => transliterate(s, 'slp1', 'deva')).join(', ') : slots[idx]
        );
      }
      lakaraMap = newMap;
    }
  }

  const lakaraKeys = Object.keys(lakaraMap).filter(k => {
    if (!filterLakara) return true;
    const plain = extractLakara(k);
    return plain === filterLakara;
  });

  if (lakaraKeys.length === 0) {
    console.error(pc.yellow(`No lakara tables found for family: ${family}, prayoga: ${prayoga}${filterLakara ? `, lakara: ${filterLakara}` : ''}`));
    return;
  }

  if (format === 'json') {
    const raw: Record<string, any> = {
      dhatu: entry.id,
      family,
      prayoga,
      prefix: prefix || null,
      tables: {},
    };
    for (const k of lakaraKeys) {
      raw.tables[k] = lakaraMap[k].map(f => transliterate(f, script));
    }
    console.log(JSON.stringify(raw, null, 2));
    return;
  }

  // Render text / markdown / table
  const outSections: string[] = [];
  const isDeva = script === 'deva';
  const pHeader = isDeva ? 'पुरुषः' : 'puruzaH';
  const col1 = isDeva ? VACANA_NAMES[0].deva : VACANA_NAMES[0].slp1;
  const col2 = isDeva ? VACANA_NAMES[1].deva : VACANA_NAMES[1].slp1;
  const col3 = isDeva ? VACANA_NAMES[2].deva : VACANA_NAMES[2].slp1;
  const headers = [pHeader, col1, col2, col3];

  for (const lakaraKey of lakaraKeys) {
    const slots = lakaraMap[lakaraKey];
    if (format === 'table') {
      outSections.push(renderTingTable(slots, lakaraKey, script));
    } else {
      // markdown / csv / tsv
      const rows = [
        [isDeva ? PURUSHA_NAMES[0].deva : PURUSHA_NAMES[0].slp1, transliterate(slots[0], script), transliterate(slots[1], script), transliterate(slots[2], script)],
        [isDeva ? PURUSHA_NAMES[1].deva : PURUSHA_NAMES[1].slp1, transliterate(slots[3], script), transliterate(slots[4], script), transliterate(slots[5], script)],
        [isDeva ? PURUSHA_NAMES[2].deva : PURUSHA_NAMES[2].slp1, transliterate(slots[6], script), transliterate(slots[7], script), transliterate(slots[8], script)],
      ];
      outSections.push(formatOutput({ headers, rows }, format, () => ''));
    }
  }

  console.log(outSections.join('\n\n'));
}
