import pc from 'picocolors';
import { ScriptType, OutputFormat } from '../types.js';
import { transliterate, detectScript } from '../translit/index.js';

export interface TranslitCommandOptions {
  to?: ScriptType;
  from?: ScriptType;
  script?: ScriptType; // parity alias for --to (invariant: --script on every command)
  format?: string;
  json?: boolean;
}

const TRANSLIT_FORMATS: OutputFormat[] = ['table', 'json', 'markdown', 'csv', 'tsv'];

export function handleTranslit(text: string, options: TranslitCommandOptions): void {
  if (!text) {
    console.error(pc.red('Error: Please provide text to transliterate.'));
    process.exit(1);
  }

  const detected = options.from || detectScript(text);

  // Item 3 invariant: every command honours --script (default slp1).
  // Precedence: --to (canonical) > --script (parity alias) > default slp1
  // (identical to the previously-shipped behaviour where --to defaulted to
  // slp1; the unreachable flip-flop branch is retired).
  const target: ScriptType =
    options.to || options.script || 'slp1';

  let format: OutputFormat | string = options.format || 'table';
  if (options.json) {
    format = 'json';
  }
  if (!TRANSLIT_FORMATS.includes(format as OutputFormat)) {
    console.error(pc.red(`Error: unknown format '${format}'. Available: table, json, markdown, csv, tsv`));
    process.exit(1);
  }

  let result: string;
  try {
    result = transliterate(text, target, detected);
  } catch {
    console.error(pc.red(`Error: transliteration failed for '${text}'.`));
    process.exit(1);
  }

  switch (format) {
    case 'json': {
      console.log(JSON.stringify({ text, from: detected, to: target, script: options.script || undefined, result }, null, 2));
      break;
    }
    case 'markdown': {
      console.log(`**${text}** (${detected} → ${target})`);
      console.log('');
      console.log('```sanskrit');
      console.log(result);
      console.log('```');
      break;
    }
    case 'csv': {
      console.log('input,from,to,result');
      console.log(`"${text.replace(/"/g, '""')}","${detected}","${target}","${result.replace(/"/g, '""')}"`);
      break;
    }
    case 'tsv': {
      console.log('input\tfrom\tto\tresult');
      console.log(`${text}\t${detected}\t${target}\t${result}`);
      break;
    }
    case 'table':
    default: {
      console.log(result);
      break;
    }
  }
}
