import pc from 'picocolors';
import { DhatuRepository } from '../data/repo.js';
import { renderDhatuCard } from '../formatters/table.js';
import { formatOutput } from '../formatters/index.js';
import { OutputFormat, ScriptType, DhatuEntry } from '../types.js';
import { transliterate } from '../translit/index.js';

export interface ShowCommandOptions {
  format?: OutputFormat;
  script?: ScriptType;
  json?: boolean;
  all?: boolean;
  upasarga?: boolean;
  chandrika?: boolean;
  prayoga?: boolean;
}

export function handleShow(dhatuIdOrName: string, options: ShowCommandOptions): void {
  const format: OutputFormat = options.json ? 'json' : (options.format || 'table');
  const script: ScriptType = options.script || 'slp1';

  const entry = DhatuRepository.getDhatu(dhatuIdOrName);
  if (!entry) {
    console.error(pc.red(`Error: Dhatu not found: "${dhatuIdOrName}"`));
    process.exit(1);
  }

  if (format === 'json') {
    console.log(JSON.stringify(entry, null, 2));
    return;
  }

  // Info Card
  console.log(renderDhatuCard(entry, script));

  // Upasargas section
  if (options.all || options.upasarga) {
    console.log('\n' + pc.bold(pc.cyan(`=== UPASARGAS (${entry.id}) ===`)));
    const entries = entry.upasarga?.entries || [];
    if (entries.length === 0) {
      console.log(pc.gray('No specific upasarga list recorded.'));
    } else {
      for (const u of entries) {
        const pfx = pc.yellow(transliterate(u.prefix, script));
        const skt = u.artha_skt ? transliterate(u.artha_skt, script) : '';
        const hin = u.artha_hindi ? transliterate(u.artha_hindi, script) : '';
        console.log(` • ${pfx}: ${skt} ${hin ? `(${hin})` : ''}`);
      }
    }
  }

  // Chandrika section
  if (options.all || options.chandrika) {
    console.log('\n' + pc.bold(pc.cyan(`=== UPASARGARTHA CHANDRIKA CITATIONS (${entry.id}) ===`)));
    const chandrika = entry.chandrika || [];
    if (chandrika.length === 0) {
      console.log(pc.gray('No Chandrika entries recorded.'));
    } else {
      for (const c of chandrika) {
        const pfx = pc.yellow(transliterate(c.prefix, script));
        console.log(pc.bold(`\n[${pfx}]`));
        for (const ex of c.examples) {
          console.log(`  - ${transliterate(ex, script)}`);
        }
      }
    }
  }

  // Literature Prayoga section
  if (options.all || options.prayoga) {
    console.log('\n' + pc.bold(pc.cyan(`=== CLASSICAL LITERATURE USAGE (${entry.id}) ===`)));
    const prayoga = entry.prayoga || [];
    if (prayoga.length === 0) {
      console.log(pc.gray('No classical literature quotations recorded.'));
    } else {
      for (const p of prayoga) {
        const source = pc.yellow(`${transliterate(p.book, script)} ${p.reference}`);
        const text = transliterate(p.text, script);
        console.log(` • ${source}: "${text}"`);
      }
    }
  }
}
