import pc from 'picocolors';
import { DhatuRepository } from '../data/repo.js';
import { renderSubantaTable } from '../formatters/table.js';
import { formatOutput } from '../formatters/index.js';
import { OutputFormat, ScriptType } from '../types.js';
import { transliterate } from '../translit/index.js';
import { WasmEngine } from '../engine/wasm.js';

export interface SubantaCommandOptions {
  dhatu?: string;
  krt?: string;
  family?: string;
  gender?: string;
  prefix?: string;
  format?: OutputFormat;
  script?: ScriptType;
  json?: boolean;
}

export function handleSubanta(
  stemArg?: string,
  genderArg?: string,
  options: SubantaCommandOptions = {}
): void {
  const format: OutputFormat = options.json ? 'json' : (options.format || 'table');
  const script: ScriptType = options.script || 'slp1';

  let stem = stemArg ? stemArg.trim() : '';
  let gender = (genderArg || options.gender || 'm').toLowerCase();

  // Normalize gender token (m/pu, f/strI, n/napuM)
  if (gender === 'pu' || gender === 'pullinga' || gender === 'masculine') gender = 'm';
  if (gender === 'strI' || gender === 'stri' || gender === 'strilinga' || gender === 'feminine') gender = 'f';
  if (gender === 'napuM' || gender === 'napumsaka' || gender === 'neuter') gender = 'n';

  // If dhatu + krt participle requested
  if (options.dhatu) {
    const entry = DhatuRepository.getDhatu(options.dhatu);
    if (!entry) {
      console.error(pc.red(`Error: Dhatu not found: "${options.dhatu}"`));
      process.exit(1);
    }

    const fixture = DhatuRepository.getSubantaFixture(options.dhatu);
    const krtName = options.krt ? transliterate(options.krt, 'slp1').toLowerCase() : 'satf';
    const family = options.family || 'krut';
    const prefix = options.prefix ? transliterate(options.prefix, 'deva') : null;

    let subantaEntry: any = null;
    if (fixture) {
      const pfxObj: any = prefix ? (fixture.upasarga?.[prefix] || fixture.upasarga?.[transliterate(prefix, 'slp1')]) : null;
      const list = pfxObj ? (pfxObj.tabs?.[family] || pfxObj[family] || []) : (fixture.base?.[family] || []);
      subantaEntry = list.find((e: any) =>
        transliterate(e.pratyaya, 'slp1').toLowerCase() === krtName &&
        (gender === 'm' ? e.gender === 'pu' : gender === 'f' ? e.gender === 'strI' : e.gender === 'napuM')
      );
    }

    if (subantaEntry && subantaEntry.table) {
      // Use exact verified subanta table
      if (format === 'json') {
        console.log(JSON.stringify(subantaEntry, null, 2));
        return;
      }
      console.log(renderSubantaTable(subantaEntry.table, subantaEntry.pratipadika, gender, script));
      return;
    }

    // Fallback: look up participle stem in dhatu.participles
    const participles = entry.participles[family] || {};
    for (const [p, val] of Object.entries(participles)) {
      if (transliterate(p, 'slp1').toLowerCase() === krtName) {
        if (typeof val === 'string') {
          const parts = val.split(',');
          stem = gender === 'm' ? (parts[1] || parts[0]) : gender === 'f' ? (parts[2] || parts[0]) : (parts[3] || parts[0]);
        } else if (val && typeof val === 'object') {
          stem = gender === 'm' ? (val.m || val.base) : gender === 'f' ? (val.f || val.base) : (val.n || val.base);
        }
        break;
      }
    }
  }

  if (!stem) {
    console.error(pc.red('Error: Please provide a nominal stem (e.g. `dhatugen subanta rAma m`) or specify `--dhatu <id> --krt <pratyaya>`.'));
    process.exit(1);
  }

  // Generate subanta table using WASM Engine
  const res = WasmEngine.subantaTable(stem, gender);
  if (!res.ok || res.tables.length === 0) {
    console.error(pc.red(`Error: Unable to generate subanta declension for stem "${stem}" (${gender}): ${res.error || 'Unknown error'}`));
    process.exit(1);
  }

  const tableData = res.tables[0];

  // Convert cells into slot matrix
  const matrix: Record<string, { eka: string[]; dvi: string[]; bahu: string[] }> = {
    praTamA: { eka: [], dvi: [], bahu: [] },
    dvitIyA: { eka: [], dvi: [], bahu: [] },
    tFtIyA: { eka: [], dvi: [], bahu: [] },
    caturTI: { eka: [], dvi: [], bahu: [] },
    paYcamI: { eka: [], dvi: [], bahu: [] },
    zazWI: { eka: [], dvi: [], bahu: [] },
    saptamI: { eka: [], dvi: [], bahu: [] },
    sambodana: { eka: [], dvi: [], bahu: [] },
  };

  for (const cell of tableData.cells) {
    let vibhKey = cell.vibhakti as string;
    if (vibhKey === 'prathamA') vibhKey = 'praTamA';
    if (vibhKey === 'tftIyA') vibhKey = 'tFtIyA';
    if (vibhKey === 'paJcamI') vibhKey = 'paYcamI';
    if (vibhKey === 'sambodhana') vibhKey = 'sambodana';

    let vacKey: 'eka' | 'dvi' | 'bahu' = 'eka';
    if (cell.vacana.startsWith('dvi')) vacKey = 'dvi';
    else if (cell.vacana.startsWith('bahu')) vacKey = 'bahu';

    if (matrix[vibhKey]) {
      matrix[vibhKey][vacKey] = cell.forms;
    }
  }

  if (format === 'json') {
    console.log(JSON.stringify({ stem, gender, table: matrix }, null, 2));
    return;
  }

  console.log(renderSubantaTable(matrix, stem, gender, script));
}
