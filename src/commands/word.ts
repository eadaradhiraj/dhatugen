import pc from 'picocolors';
import Table from 'cli-table3';
import { DhatuRepository } from '../data/repo.js';
import { renderSubantaTable } from '../formatters/table.js';
import { formatOutput } from '../formatters/index.js';
import { OutputFormat, ScriptType } from '../types.js';
import { transliterate } from '../translit/index.js';
import { WasmEngine } from '../engine/wasm.js';
import { formatSubanta } from './subanta.js';

export interface WordCommandOptions {
  gender?: string;
  format?: OutputFormat;
  script?: ScriptType;
  json?: boolean;
}

export function handleWord(word: string, options: WordCommandOptions): void {
  const format: OutputFormat = options.json ? 'json' : (options.format || 'table');
  const script: ScriptType = options.script || 'slp1';

  if (!word || !word.trim()) {
    console.error(pc.red('Error: Please provide a word to analyze/decline.'));
    process.exit(1);
  }

  const cleanWord = word.trim();
  const devaWord = transliterate(cleanWord, 'deva');

  // 1. Check Shabda Oracle first
  const shabdaMatches = DhatuRepository.getShabdaEntries(devaWord);

  // 2. Perform Subanta Reverse Analysis via WASM
  const wasmRes = WasmEngine.subantaAnalyze(devaWord);

  if (format === 'json') {
    console.log(JSON.stringify({
      word: cleanWord,
      shabdaOracleMatches: shabdaMatches,
      wasmAnalysis: wasmRes,
    }, null, 2));
    return;
  }

  if (format !== 'table') {
    const sections: string[] = [];
    if (wasmRes.ok && wasmRes.analyses.length > 0) {
      const headers = ['Base Stem', 'Gender', 'Vibhakti', 'Vacana', 'Class'];
      const rows = wasmRes.analyses.map(a => [
        transliterate(a.stem, script),
        a.linga,
        transliterate(a.vibhakti, script),
        transliterate(a.vacana, script),
        a.class || '—',
      ]);
      sections.push(formatOutput({ headers, rows }, format, () => ''));
    }

    if (shabdaMatches.length > 0 && shabdaMatches[0].cells.length === 24) {
      const cells = shabdaMatches[0].cells;
      const matrix: Record<string, { eka: string[]; dvi: string[]; bahu: string[] }> = {
        praTamA: { eka: [cells[0]], dvi: [cells[1]], bahu: [cells[2]] },
        dvitIyA: { eka: [cells[3]], dvi: [cells[4]], bahu: [cells[5]] },
        tFtIyA: { eka: [cells[6]], dvi: [cells[7]], bahu: [cells[8]] },
        caturTI: { eka: [cells[9]], dvi: [cells[10]], bahu: [cells[11]] },
        paYcamI: { eka: [cells[12]], dvi: [cells[13]], bahu: [cells[14]] },
        zazWI: { eka: [cells[15]], dvi: [cells[16]], bahu: [cells[17]] },
        saptamI: { eka: [cells[18]], dvi: [cells[19]], bahu: [cells[20]] },
        sambodana: { eka: [cells[21]], dvi: [cells[22]], bahu: [cells[23]] },
      };
      sections.push(formatSubanta(matrix, shabdaMatches[0].word, shabdaMatches[0].linga, script, format));
    } else if (wasmRes.tables && wasmRes.tables.length > 0) {
      const primaryTable = wasmRes.tables[0];
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
      for (const cell of primaryTable.cells) {
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
      sections.push(formatSubanta(matrix, primaryTable.stem, primaryTable.linga, script, format));
    }

    console.log(sections.join('\n\n'));
    return;
  }

  console.log(pc.bold(pc.green(`=== Word Analysis for "${cleanWord}" ===\n`)));

  // Display analyses
  if (wasmRes.ok && wasmRes.analyses.length > 0) {
    const table = new Table({
      head: ['Base Stem', 'Gender', 'Vibhakti', 'Vacana', 'Class'].map(h => pc.cyan(pc.bold(h))),
      style: { head: [], border: ['grey'] },
    });

    for (const a of wasmRes.analyses) {
      table.push([
        pc.yellow(transliterate(a.stem, script)),
        a.linga,
        transliterate(a.vibhakti, script),
        transliterate(a.vacana, script),
        a.class || '—',
      ]);
    }
    console.log(pc.bold('Morphological Readings:'));
    console.log(table.toString() + '\n');
  }

  // Display Shabda Oracle matches if available
  if (shabdaMatches.length > 0) {
    console.log(pc.bold(pc.cyan(`Shabda Oracle Match (@${shabdaMatches[0].urlid}):`)));
    const cells = shabdaMatches[0].cells;
    if (cells.length === 24) {
      const matrix: Record<string, { eka: string[]; dvi: string[]; bahu: string[] }> = {
        praTamA: { eka: [cells[0]], dvi: [cells[1]], bahu: [cells[2]] },
        dvitIyA: { eka: [cells[3]], dvi: [cells[4]], bahu: [cells[5]] },
        tFtIyA: { eka: [cells[6]], dvi: [cells[7]], bahu: [cells[8]] },
        caturTI: { eka: [cells[9]], dvi: [cells[10]], bahu: [cells[11]] },
        paYcamI: { eka: [cells[12]], dvi: [cells[13]], bahu: [cells[14]] },
        zazWI: { eka: [cells[15]], dvi: [cells[16]], bahu: [cells[17]] },
        saptamI: { eka: [cells[18]], dvi: [cells[19]], bahu: [cells[20]] },
        sambodana: { eka: [cells[21]], dvi: [cells[22]], bahu: [cells[23]] },
      };
      console.log(renderSubantaTable(matrix, shabdaMatches[0].word, shabdaMatches[0].linga, script));
      return;
    }
  }

  // If WASM tables exist, render the primary reading's declension table
  if (wasmRes.tables && wasmRes.tables.length > 0) {
    const primaryTable = wasmRes.tables[0];
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

    for (const cell of primaryTable.cells) {
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

    console.log(pc.bold('Derived Declension Grid:'));
    console.log(renderSubantaTable(matrix, primaryTable.stem, primaryTable.linga, script));
  }
}
