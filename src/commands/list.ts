import { DhatuRepository, DhatuListFilters } from '../data/repo.js';
import { renderDhatuListTable } from '../formatters/table.js';
import { formatOutput } from '../formatters/index.js';
import { OutputFormat, ScriptType } from '../types.js';
import { transliterate } from '../translit/index.js';

export interface ListCommandOptions {
  gana?: string;
  pada?: string;
  settva?: string;
  karma?: string;
  search?: string;
  sort?: 'az' | 'num' | 'gana';
  limit?: string;
  offset?: string;
  format?: OutputFormat;
  script?: ScriptType;
  json?: boolean;
}

export function handleList(options: ListCommandOptions): void {
  const format: OutputFormat = options.json ? 'json' : (options.format || 'table');
  const script: ScriptType = options.script || 'slp1';

  const filters: DhatuListFilters = {
    gana: options.gana,
    pada: options.pada,
    settva: options.settva,
    karma: options.karma,
    search: options.search,
    sort: options.sort || 'num',
    limit: options.limit ? parseInt(options.limit, 10) : 50,
    offset: options.offset ? parseInt(options.offset, 10) : 0,
  };

  const { total, items } = DhatuRepository.listDhatus(filters);

  const headers = ['ID', 'Dhatu', 'Gana', 'Pada', 'Settva', 'Karma', 'Artha', 'English Meaning'];
  const rows = items.map(d => [
    d.baseindex,
    transliterate(d.dhatu, script),
    d.gana,
    d.pada,
    d.settva,
    d.karma,
    transliterate(d.artha, script),
    d.artha_english || '',
  ]);

  const output = formatOutput(
    { headers, rows, raw: { total, count: items.length, dhatus: items } },
    format,
    () => renderDhatuListTable(items, total, script)
  );

  console.log(output);
}
