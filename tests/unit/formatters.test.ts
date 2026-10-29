import { describe, it, expect } from 'vitest';
import { toMarkdown, toCsv, toTsv, formatOutput } from '../../src/formatters/index.js';
import { renderTingTable, renderSubantaTable } from '../../src/formatters/table.js';

describe('Formatters', () => {
  const headers = ['A', 'B', 'C'];
  const rows = [
    ['1', '2', '3'],
    ['x,y', 'val"quote', 'multi\nline'],
  ];

  it('renders markdown table correctly', () => {
    const md = toMarkdown(headers, rows);
    expect(md).toContain('| A | B | C |');
    expect(md).toContain('| --- | --- | --- |');
    expect(md).toContain('| 1 | 2 | 3 |');
  });

  it('renders CSV with escaping for commas and quotes', () => {
    const csv = toCsv(headers, rows);
    expect(csv).toContain('A,B,C');
    expect(csv).toContain('1,2,3');
    expect(csv).toContain('"x,y"');
    expect(csv).toContain('"val""quote"');
  });

  it('renders TSV table correctly', () => {
    const tsv = toTsv(headers, rows);
    expect(tsv).toContain('A\tB\tC');
    expect(tsv).toContain('1\t2\t3');
  });

  it('renders 3x3 ting table with box borders', () => {
    const slots = ['Bavati', 'BavataH', 'Bavanti', 'Bavasi', 'BavaTaH', 'BavaTa', 'BavAmi', 'BavAvaH', 'BavAmaH'];
    const out = renderTingTable(slots, 'plat', 'slp1');
    expect(out).toContain('law');
    expect(out).toContain('Bavati');
    expect(out).toContain('BavAmaH');
  });

  it('renders 8x3 subanta table with all 8 cases', () => {
    const matrix = {
      praTamA: { eka: ['rAmaH'], dvi: ['rAmO'], bahu: ['rAmAH'] },
      dvitIyA: { eka: ['rAmam'], dvi: ['rAmO'], bahu: ['rAmAn'] },
      tFtIyA: { eka: ['rAmeRa'], dvi: ['rAmAByAm'], bahu: ['rAmEH'] },
      caturTI: { eka: ['rAmAya'], dvi: ['rAmAByAm'], bahu: ['rAmeByaH'] },
      paYcamI: { eka: ['rAmAt'], dvi: ['rAmAByAm'], bahu: ['rAmeByaH'] },
      zazWI: { eka: ['rAmasya'], dvi: ['rAmayoH'], bahu: ['rAmARAm'] },
      saptamI: { eka: ['rAme'], dvi: ['rAmayoH'], bahu: ['rAmezu'] },
      sambodana: { eka: ['rAma'], dvi: ['rAmO'], bahu: ['rAmAH'] },
    };
    const out = renderSubantaTable(matrix, 'rAma', 'm', 'slp1');
    expect(out).toContain('Subanta: rAma (m)');
    expect(out).toContain('rAmaH');
    expect(out).toContain('rAmARAm');
  });
});
