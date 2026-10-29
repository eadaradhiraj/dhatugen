import readline from 'readline';
import pc from 'picocolors';
import { handleList } from './list.js';
import { handleShow } from './show.js';
import { handleTing } from './ting.js';
import { handleKrut } from './krut.js';
import { handleSubanta } from './subanta.js';
import { handleSearch } from './search.js';
import { handleWord } from './word.js';
import { handlePrefix } from './prefix.js';
import { handleTranslit } from './translit.js';
import { ScriptType } from '../types.js';

export function startRepl(initialScript: ScriptType = 'slp1'): void {
  let currentScript: ScriptType = initialScript;

  console.log(pc.bold(pc.green('=====================================================')));
  console.log(pc.bold(pc.cyan(' Welcome to dhatugen Interactive REPL!')));
  console.log(pc.gray(' Type commands like:'));
  console.log(pc.yellow('   ting 01.0001           ') + pc.gray('— View tiṅanta tables'));
  console.log(pc.yellow('   krut 01.0001           ') + pc.gray('— View kṛdanta participles'));
  console.log(pc.yellow('   subanta rAma m         ') + pc.gray('— View 8×3 subanta matrix'));
  console.log(pc.yellow('   word rAmeRa            ') + pc.gray('— Reverse-analyze inflected word'));
  console.log(pc.yellow('   search Bavati          ') + pc.gray('— Reverse-lookup forms across dhatus'));
  console.log(pc.yellow('   prefix pra Bavati      ') + pc.gray('— Upasarga prefix derivation'));
  console.log(pc.yellow('   script deva            ') + pc.gray('— Switch script (slp1, deva, hk, iast)'));
  console.log(pc.yellow('   help                   ') + pc.gray('— Show available commands'));
  console.log(pc.yellow('   exit                   ') + pc.gray('— Quit REPL'));
  console.log(pc.bold(pc.green('=====================================================\n')));

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: pc.bold(pc.magenta('dhatugen> ')),
  });

  rl.prompt();

  rl.on('line', (line) => {
    const raw = line.trim();
    if (!raw) {
      rl.prompt();
      return;
    }

    const [cmd, ...args] = raw.split(/\s+/);

    try {
      switch (cmd.toLowerCase()) {
        case 'exit':
        case 'quit':
        case ':q':
          console.log(pc.cyan('Goodbye!'));
          process.exit(0);
          break;

        case 'script':
          if (args[0] && ['slp1', 'deva', 'hk', 'iast'].includes(args[0].toLowerCase())) {
            currentScript = args[0].toLowerCase() as ScriptType;
            console.log(pc.green(`Output script set to: ${currentScript}`));
          } else {
            console.log(pc.yellow(`Current script: ${currentScript}. Usage: script <slp1|deva|hk|iast>`));
          }
          break;

        case 'list':
          handleList({ script: currentScript, limit: args[0] || '20' });
          break;

        case 'show':
          if (!args[0]) console.log(pc.yellow('Usage: show <dhatu>'));
          else handleShow(args[0], { script: currentScript, all: true });
          break;

        case 'ting':
          if (!args[0]) console.log(pc.yellow('Usage: ting <dhatu> [family] [prayoga]'));
          else handleTing(args[0], { script: currentScript, family: args[1], prayoga: args[2] });
          break;

        case 'krut':
          if (!args[0]) console.log(pc.yellow('Usage: krut <dhatu> [family] [pratyaya]'));
          else handleKrut(args[0], { script: currentScript, family: args[1], pratyaya: args[2] });
          break;

        case 'subanta':
          if (!args[0] || !args[1]) console.log(pc.yellow('Usage: subanta <stem> <m|f|n>'));
          else handleSubanta(args[0], args[1], { script: currentScript });
          break;

        case 'search':
          if (!args[0]) console.log(pc.yellow('Usage: search <form>'));
          else handleSearch(args[0], { script: currentScript });
          break;

        case 'word':
          if (!args[0]) console.log(pc.yellow('Usage: word <word>'));
          else handleWord(args[0], { script: currentScript });
          break;

        case 'prefix':
          if (!args[0] || !args[1]) console.log(pc.yellow('Usage: prefix <stack> <base>'));
          else handlePrefix(args[0], args[1], { script: currentScript });
          break;

        case 'translit':
          if (!args[0]) console.log(pc.yellow('Usage: translit <text> [to]'));
          else handleTranslit(args[0], { to: (args[1] as ScriptType) || currentScript });
          break;

        case 'help':
          console.log(pc.cyan('Available commands:'));
          console.log('  list [limit]                     — List dhatus');
          console.log('  show <dhatu>                     — Show dhatu metadata & references');
          console.log('  ting <dhatu> [family] [prayoga]  — Conjugation tables');
          console.log('  krut <dhatu> [family]            — Participle tables');
          console.log('  subanta <stem> <m|f|n>           — 8x3 Subanta declension matrix');
          console.log('  word <word>                      — Reverse-analyze word & show oracle');
          console.log('  search <form>                    — Reverse-search across all dhatus');
          console.log('  prefix <stack> <base>            — Upasarga prefix derivation');
          console.log('  script <slp1|deva|hk|iast>       — Set output script');
          console.log('  exit                             — Quit REPL');
          break;

        default:
          console.log(pc.red(`Unknown command: "${cmd}". Type "help" for available commands.`));
          break;
      }
    } catch (err: any) {
      console.error(pc.red(`Error: ${err.message}`));
    }

    console.log();
    rl.prompt();
  });
}
