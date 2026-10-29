import pc from 'picocolors';
import { ScriptType } from '../types.js';
import { transliterate, detectScript } from '../translit/index.js';

export interface TranslitCommandOptions {
  to?: ScriptType;
  from?: ScriptType;
}

export function handleTranslit(text: string, options: TranslitCommandOptions): void {
  if (!text) {
    console.error(pc.red('Error: Please provide text to transliterate.'));
    process.exit(1);
  }

  const detected = options.from || detectScript(text);
  const target: ScriptType = options.to || (detected === 'slp1' ? 'deva' : 'slp1');

  const converted = transliterate(text, target, detected);
  console.log(converted);
}
