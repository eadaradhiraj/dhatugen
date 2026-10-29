import Table from 'cli-table3';
import pc from 'picocolors';
import { ScriptType, OutputFormat, DhatuEntry, InfoItem } from '../types.js';
import { transliterate } from '../translit/index.js';
import { DhatuLiteItem } from '../data/repo.js';

export const LAKARA_NAMES: Record<string, { deva: string; slp1: string; name: string }> = {
  lat: { deva: 'लट्', slp1: 'law', name: 'Present (lat)' },
  lit: { deva: 'लिट्', slp1: 'liw', name: 'Perfect (lit)' },
  lut: { deva: 'लुट्', slp1: 'luw', name: 'First Future (lut)' },
  lrut: { deva: 'लृट्', slp1: 'lruw', name: 'Second Future (lrut)' },
  lot: { deva: 'लोट्', slp1: 'low', name: 'Imperative (lot)' },
  lang: { deva: 'लङ्', slp1: 'laN', name: 'Imperfect (lang)' },
  vidhiling: { deva: 'विधिलिङ्', slp1: 'viDiliN', name: 'Optative / Potential (vidhiling)' },
  ashirling: { deva: 'आशीर्लिङ्', slp1: 'ASIriN', name: 'Benedictive (ashirling)' },
  lung: { deva: 'लुङ्', slp1: 'luN', name: 'Aorist (lung)' },
  lrung: { deva: 'लृङ्', slp1: 'lruN', name: 'Conditional (lrung)' },
};

export const VIBHAKTI_NAMES = [
  { deva: 'प्रथमा', slp1: 'praTamA', key: 'praTamA' },
  { deva: 'द्वितीया', slp1: 'dvitIyA', key: 'dvitIyA' },
  { deva: 'तृतीया', slp1: 'tFtIyA', key: 'tFtIyA' },
  { deva: 'चतुर्थी', slp1: 'caturTI', key: 'caturTI' },
  { deva: 'पञ्चमी', slp1: 'paYcamI', key: 'paYcamI' },
  { deva: 'षष्ठी', slp1: 'zazWI', key: 'zazWI' },
  { deva: 'सप्तमी', slp1: 'saptamI', key: 'saptamI' },
  { deva: 'सम्बोधनम्', slp1: 'samboDanam', key: 'sambodana' },
];

export const PURUSHA_NAMES = [
  { deva: 'प्रथमपुरुषः', slp1: 'praTama-puruzaH' },
  { deva: 'मध्यमपुरुषः', slp1: 'maDyama-puruzaH' },
  { deva: 'उत्तमपुरुषः', slp1: 'uttama-puruzaH' },
];

export const VACANA_NAMES = [
  { deva: 'एकवचनम्', slp1: 'ekavacanam' },
  { deva: 'द्विवचनम्', slp1: 'dvivacanam' },
  { deva: 'बहुवचनम्', slp1: 'bahuvacanam' },
];

/**
 * Format 3x3 Tiṅanta matrix table
 */
export function renderTingTable(
  slots: string[],
  lakaraKey: string,
  script: ScriptType = 'slp1'
): string {
  const isDeva = script === 'deva';
  const rawLakara = lakaraKey.replace(/^[pa]/, '');
  const padaType = lakaraKey.startsWith('p') ? (isDeva ? 'परस्मैपदम्' : 'parasmEpadam') : (isDeva ? 'आत्मनेपदम्' : 'Atmanepadam');
  const lakaraMeta = LAKARA_NAMES[rawLakara] || { deva: lakaraKey, slp1: lakaraKey, name: lakaraKey };
  const title = `${isDeva ? lakaraMeta.deva : lakaraMeta.slp1} (${lakaraMeta.name}) · ${padaType}`;

  const colHeaders = [
    pc.bold(isDeva ? 'पुरुषः' : 'puruzaH'),
    pc.cyan(pc.bold(isDeva ? VACANA_NAMES[0].deva : VACANA_NAMES[0].slp1)),
    pc.cyan(pc.bold(isDeva ? VACANA_NAMES[1].deva : VACANA_NAMES[1].slp1)),
    pc.cyan(pc.bold(isDeva ? VACANA_NAMES[2].deva : VACANA_NAMES[2].slp1)),
  ];

  const table = new Table({
    head: colHeaders,
    style: { head: [], border: ['grey'] },
  });

  for (let p = 0; p < 3; p++) {
    const rowLabel = isDeva ? PURUSHA_NAMES[p].deva : PURUSHA_NAMES[p].slp1;
    const cell0 = transliterate(slots[p * 3 + 0] || '—', script, 'slp1');
    const cell1 = transliterate(slots[p * 3 + 1] || '—', script, 'slp1');
    const cell2 = transliterate(slots[p * 3 + 2] || '—', script, 'slp1');

    table.push([pc.yellow(rowLabel), cell0, cell1, cell2]);
  }

  return pc.bold(pc.green(`=== ${title} ===`)) + '\n' + table.toString();
}

/**
 * Format 8x3 Subanta matrix table
 */
export function renderSubantaTable(
  matrix: Record<string, { eka: string[]; dvi: string[]; bahu: string[] }>,
  stem: string,
  gender: string,
  script: ScriptType = 'slp1',
  meta?: string
): string {
  const isDeva = script === 'deva';
  const titleStem = transliterate(stem, script);
  const metaSuffix = meta ? ` · ${meta}` : '';
  const title = `Subanta: ${titleStem} (${gender})${metaSuffix}`;

  const colHeaders = [
    pc.bold(isDeva ? 'विभक्तिः' : 'viBaktiH'),
    pc.cyan(pc.bold(isDeva ? VACANA_NAMES[0].deva : VACANA_NAMES[0].slp1)),
    pc.cyan(pc.bold(isDeva ? VACANA_NAMES[1].deva : VACANA_NAMES[1].slp1)),
    pc.cyan(pc.bold(isDeva ? VACANA_NAMES[2].deva : VACANA_NAMES[2].slp1)),
  ];

  const table = new Table({
    head: colHeaders,
    style: { head: [], border: ['grey'] },
  });

  for (const vibh of VIBHAKTI_NAMES) {
    const rowLabel = isDeva ? vibh.deva : vibh.slp1;
    const rowData = matrix[vibh.key] || { eka: [], dvi: [], bahu: [] };

    const eka = (rowData.eka || []).map(f => transliterate(f, script, /[\u0900-\u097F]/.test(f) ? 'deva' : 'slp1')).join(', ') || '—';
    const dvi = (rowData.dvi || []).map(f => transliterate(f, script, /[\u0900-\u097F]/.test(f) ? 'deva' : 'slp1')).join(', ') || '—';
    const bahu = (rowData.bahu || []).map(f => transliterate(f, script, /[\u0900-\u097F]/.test(f) ? 'deva' : 'slp1')).join(', ') || '—';

    table.push([pc.yellow(rowLabel), eka, dvi, bahu]);
  }

  return pc.bold(pc.green(`=== ${title} ===`)) + '\n' + table.toString();
}

/**
 * Format Krdanta Participles Table
 */
export function renderKrutTable(
  rows: Array<{ pratyaya: string; base: string; m: string; f: string; n: string }>,
  dhatuId: string,
  family: string,
  script: ScriptType = 'slp1'
): string {
  const isDeva = script === 'deva';
  const title = `Krdanta (${family}) · ${dhatuId}`;

  const colHeaders = [
    pc.bold(isDeva ? 'प्रत्ययः' : 'pratyayaH'),
    pc.cyan(pc.bold(isDeva ? 'प्रातिपदिकम्' : 'prAtipadikam')),
    pc.cyan(pc.bold(isDeva ? 'पुंल्लिङ्गम्' : 'puMlliNgam (m)')),
    pc.cyan(pc.bold(isDeva ? 'स्त्रीलिङ्गम्' : 'strIliNgam (f)')),
    pc.cyan(pc.bold(isDeva ? 'नपुंसकलिङ्गम्' : 'napuMsakaliNgam (n)')),
  ];

  const table = new Table({
    head: colHeaders,
    style: { head: [], border: ['grey'] },
  });

  for (const row of rows) {
    table.push([
      pc.yellow(transliterate(row.pratyaya, script, 'slp1')),
      transliterate(row.base || '—', script, 'slp1'),
      transliterate(row.m || '—', script, 'slp1'),
      transliterate(row.f || '—', script, 'slp1'),
      transliterate(row.n || '—', script, 'slp1'),
    ]);
  }

  return pc.bold(pc.green(`=== ${title} ===`)) + '\n' + table.toString();
}

/**
 * Format Dhatu List Table
 */
export function renderDhatuListTable(
  items: DhatuLiteItem[],
  total: number,
  script: ScriptType = 'slp1'
): string {
  const isDeva = script === 'deva';

  const colHeaders = [
    pc.bold('ID'),
    pc.cyan(pc.bold(isDeva ? 'धातुः' : 'DAtuH')),
    pc.cyan(pc.bold('Gaṇa')),
    pc.cyan(pc.bold('Pada')),
    pc.cyan(pc.bold('Seṭ')),
    pc.cyan(pc.bold('Karma')),
    pc.cyan(pc.bold(isDeva ? 'अर्थः' : 'arTaH')),
    pc.cyan(pc.bold('English Meaning')),
  ];

  const table = new Table({
    head: colHeaders,
    style: { head: [], border: ['grey'] },
  });

  for (const item of items) {
    table.push([
      pc.yellow(item.baseindex),
      transliterate(item.dhatu, script),
      item.gana,
      item.pada,
      item.settva,
      item.karma,
      transliterate(item.artha, script),
      item.artha_english || '',
    ]);
  }

  const footer = pc.gray(`Showing ${items.length} of ${total} dhatus`);
  return table.toString() + '\n' + footer;
}

/**
 * Format Dhatu Info Card
 */
export function renderDhatuCard(
  dhatu: DhatuEntry,
  script: ScriptType = 'slp1'
): string {
  const isDeva = script === 'deva';
  const table = new Table({
    style: { head: [], border: ['grey'] },
    colWidths: [26, 60],
  });

  table.push([{ colSpan: 2, content: pc.bold(pc.green(`=== DHATU CARD: ${dhatu.id} ===`)), hAlign: 'center' }]);

  for (const item of dhatu.info) {
    if (!item.value) continue;
    const label = pc.yellow(transliterate(item.name, script));
    const val = transliterate(item.value, script);
    table.push([label, val]);
  }

  return table.toString();
}
