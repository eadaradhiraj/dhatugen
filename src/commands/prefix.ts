import pc from 'picocolors';
import { formatOutput } from '../formatters/index.js';
import { OutputFormat, ScriptType } from '../types.js';
import { transliterate } from '../translit/index.js';
import { WasmEngine } from '../engine/wasm.js';

export interface PrefixCommandOptions {
  format?: OutputFormat;
  script?: ScriptType;
  json?: boolean;
}

export function handlePrefix(stack: string, base: string, options: PrefixCommandOptions): void {
  const format: OutputFormat = options.json ? 'json' : (options.format || 'table');
  const script: ScriptType = options.script || 'slp1';

  if (!stack || !base) {
    console.error(pc.red("Error: Please provide both prefix stack and base form (e.g. `dhatugen prefix 'vi + ati' Bavati`)."));
    process.exit(1);
  }

  const devaStack = transliterate(stack, 'deva');
  const devaBase = transliterate(base, 'deva');

  const surfaces = WasmEngine.prefixedForms(devaStack, devaBase);

  if (surfaces.length === 0) {
    console.log(pc.yellow(`No surface forms generated for prefix "${stack}" + base "${base}".`));
    return;
  }

  const converted = surfaces.map(s => transliterate(s, script));

  if (format === 'json') {
    console.log(JSON.stringify({ stack, base, surfaces: converted }, null, 2));
    return;
  }

  console.log(pc.bold(pc.green(`=== Prefix Derivation: ${transliterate(stack, script)} + ${transliterate(base, script)} ===`)));
  for (const s of converted) {
    console.log(pc.cyan(` • ${s}`));
  }
}
