import { OutputFormat, ScriptType } from '../types.js';
import { transliterate } from '../translit/index.js';

export interface FormattableData {
  headers: string[];
  rows: string[][];
  raw?: any;
}

/**
 * Converts headers and rows to GitHub Flavored Markdown Table
 */
export function toMarkdown(headers: string[], rows: string[][]): string {
  const headerLine = `| ${headers.join(' | ')} |`;
  const separatorLine = `| ${headers.map(() => '---').join(' | ')} |`;
  const rowLines = rows.map(r => `| ${r.join(' | ')} |`).join('\n');
  return `${headerLine}\n${separatorLine}\n${rowLines}`;
}

/**
 * Converts headers and rows to CSV
 */
export function toCsv(headers: string[], rows: string[][]): string {
  const escapeCell = (val: string) => {
    if (val.includes(',') || val.includes('"') || val.includes('\n')) {
      return `"${val.replace(/"/g, '""')}"`;
    }
    return val;
  };

  const headerLine = headers.map(escapeCell).join(',');
  const rowLines = rows.map(r => r.map(escapeCell).join(',')).join('\n');
  return `${headerLine}\n${rowLines}`;
}

/**
 * Converts headers and rows to TSV
 */
export function toTsv(headers: string[], rows: string[][]): string {
  const headerLine = headers.join('\t');
  const rowLines = rows.map(r => r.join('\t')).join('\n');
  return `${headerLine}\n${rowLines}`;
}

/**
 * Universal formatter handler
 */
export function formatOutput(
  data: FormattableData,
  format: OutputFormat,
  renderTableFn: () => string
): string {
  switch (format) {
    case 'json':
      return JSON.stringify(data.raw !== undefined ? data.raw : { headers: data.headers, rows: data.rows }, null, 2);
    case 'markdown':
      return toMarkdown(data.headers, data.rows);
    case 'csv':
      return toCsv(data.headers, data.rows);
    case 'tsv':
      return toTsv(data.headers, data.rows);
    case 'table':
    default:
      return renderTableFn();
  }
}
