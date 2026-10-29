#!/usr/bin/env node

import { Command } from 'commander';
import { handleList } from './commands/list.js';
import { handleShow } from './commands/show.js';
import { handleTing } from './commands/ting.js';
import { handleKrut } from './commands/krut.js';
import { handleSubanta } from './commands/subanta.js';
import { handleSearch } from './commands/search.js';
import { handleWord } from './commands/word.js';
import { handlePrefix } from './commands/prefix.js';
import { handleTranslit } from './commands/translit.js';
import { startRepl } from './commands/repl.js';
import { handleCompletion, handleComplete } from './commands/complete.js';

const program = new Command();

program
  .name('dhatugen')
  .description('Comprehensive TypeScript CLI for Sanskrit verbal morphology, Ashtadhyayi dhaturupa, and subanta declensions')
  .version('1.0.0');

// REPL command
program
  .command('repl')
  .description('Start interactive REPL mode')
  .option('-s, --script <script>', 'Default script: slp1, deva, hk, iast', 'slp1')
  .action((opts) => {
    startRepl(opts.script);
  });

// LIST command
program
  .command('list')
  .description('List and search dhatus with rich grammatical filters')
  .option('-g, --gana <number>', 'Filter by gaṇa (1..10)')
  .option('-p, --pada <pada>', 'Filter by pada: P (parasmai), A (atmane), U (ubhaya)')
  .option('-s, --settva <settva>', 'Filter by iḍāgama: S (seṭ), A (aniṭ), V (veṭ)')
  .option('-k, --karma <karma>', 'Filter by karmakatva: A (akarmaka), S (sakarmaka), D (dvikarmaka)')
  .option('-q, --search <query>', 'Search by root name, Sanskrit artha, or English gloss')
  .option('--sort <sort>', 'Sort order: num, az, gana', 'num')
  .option('-l, --limit <number>', 'Number of items to show', '50')
  .option('-o, --offset <number>', 'Offset for pagination', '0')
  .option('-f, --format <format>', 'Output format: table, json, markdown, csv, tsv', 'table')
  .option('--script <script>', 'Script for Sanskrit forms: slp1, deva, hk, iast', 'slp1')
  .option('--json', 'Shortcut for --format json')
  .action((opts) => {
    handleList(opts);
  });

// SHOW command
program
  .command('show <dhatu>')
  .description('Display detailed metadata and reference card for a dhatu')
  .option('-a, --all', 'Show all sections (info, upasargas, chandrika, prayoga)')
  .option('-u, --upasarga', 'Include upasarga meanings')
  .option('-c, --chandrika', 'Include Upasargārtha Candrikā commentary & citations')
  .option('-p, --prayoga', 'Include classical literature citations')
  .option('-f, --format <format>', 'Output format: table, json', 'table')
  .option('--script <script>', 'Script for Sanskrit forms: slp1, deva, hk, iast', 'slp1')
  .option('--json', 'Shortcut for --format json')
  .action((dhatu, opts) => {
    handleShow(dhatu, opts);
  });

// TING command
program
  .command('ting <dhatu>')
  .description('Display 3×3 tiṅanta verbal conjugation matrix tables')
  .option('--family <family>', 'Dhatu family: shuddha, nich, san, yang, yangluk', 'shuddha')
  .option('--prayoga <prayoga>', 'Voice: kartari (active) or karmani (passive)', 'kartari')
  .option('-l, --lakara <lakara>', 'Filter by lakara: lat, lit, lut, lrut, lot, lang, vidhiling, ashirling, lung, lrung, or all', 'all')
  .option('--prefix <upasarga>', 'Upasarga prefix (e.g. pra, vi + ati, sam)')
  .option('-f, --format <format>', 'Output format: table, json, markdown, csv, tsv', 'table')
  .option('--script <script>', 'Script for Sanskrit forms: slp1, deva, hk, iast', 'slp1')
  .option('--json', 'Shortcut for --format json')
  .action((dhatu, opts) => {
    handleTing(dhatu, opts);
  });

// KRUT command
program
  .command('krut <dhatu>')
  .description('Display kṛdanta participle forms (base, m, f, n)')
  .option('--family <family>', 'Dhatu family: shuddha, nich, san, yang, yangluk', 'shuddha')
  .option('-p, --pratyaya <pratyaya>', 'Filter by specific kṛt pratyaya (e.g. ktavatu, Satf, tfc)')
  .option('--prefix <upasarga>', 'Upasarga prefix (e.g. pra, vi + ati)')
  .option('-f, --format <format>', 'Output format: table, json, markdown, csv, tsv', 'table')
  .option('--script <script>', 'Script for Sanskrit forms: slp1, deva, hk, iast', 'slp1')
  .option('--json', 'Shortcut for --format json')
  .action((dhatu, opts) => {
    handleKrut(dhatu, opts);
  });

// SUBANTA command
program
  .command('subanta [stem] [gender]')
  .description('Display 8×3 subanta nominal declension matrix')
  .option('-d, --dhatu <dhatu>', 'Dhatu identifier to decline a kṛt participle from')
  .option('-k, --krt <pratyaya>', 'Kṛt pratyaya name (e.g. Satf, ktavatu, tfc)')
  .option('--family <family>', 'Dhatu family for participle: shuddha, nich, san, yang, yangluk', 'krut')
  .option('-g, --gender <gender>', 'Gender: m (pu), f (strI), n (napuM)', 'm')
  .option('--prefix <upasarga>', 'Upasarga prefix for kṛt participle')
  .option('-f, --format <format>', 'Output format: table, json, markdown, csv, tsv', 'table')
  .option('--script <script>', 'Script for Sanskrit forms: slp1, deva, hk, iast', 'slp1')
  .option('--json', 'Shortcut for --format json')
  .action((stem, gender, opts) => {
    handleSubanta(stem, gender, opts);
  });

// WORD / DECLINE command
program
  .command('word <word>')
  .description('Analyze an inflected word and display candidate readings and Shabda oracle declensions')
  .option('-f, --format <format>', 'Output format: table, json', 'table')
  .option('--script <script>', 'Script for Sanskrit forms: slp1, deva, hk, iast', 'slp1')
  .option('--json', 'Shortcut for --format json')
  .action((word, opts) => {
    handleWord(word, opts);
  });

program
  .command('decline <stem> <gender>')
  .description('Decline any nominal word in 8×3 matrix with traditional Shabda oracle lookup')
  .option('-f, --format <format>', 'Output format: table, json, markdown, csv, tsv', 'table')
  .option('--script <script>', 'Script for Sanskrit forms: slp1, deva, hk, iast', 'slp1')
  .option('--json', 'Shortcut for --format json')
  .action((stem, gender, opts) => {
    handleSubanta(stem, gender, opts);
  });

// SEARCH command
program
  .command('search <form>')
  .description('Reverse-search an inflected form across all dhatus and identify lakāras, persons, or kṛt participles')
  .option('-d, --dhatu <dhatu>', 'Restrict search to a specific dhatu')
  .option('-l, --limit <number>', 'Maximum matches to display', '25')
  .option('-f, --format <format>', 'Output format: table, json, markdown, csv, tsv', 'table')
  .option('--script <script>', 'Script for Sanskrit forms: slp1, deva, hk, iast', 'slp1')
  .option('--json', 'Shortcut for --format json')
  .action((form, opts) => {
    handleSearch(form, opts);
  });

// PREFIX command
program
  .command('prefix <stack> <base>')
  .description('Derive surface forms when applying an upasarga prefix to a verbal form')
  .option('-f, --format <format>', 'Output format: table, json', 'table')
  .option('--script <script>', 'Script for Sanskrit forms: slp1, deva, hk, iast', 'slp1')
  .option('--json', 'Shortcut for --format json')
  .action((stack, base, opts) => {
    handlePrefix(stack, base, opts);
  });

// COMPLETION command (shell script generator)
program
  .command('completion <shell>')
  .description('Generate shell auto-completion script (bash, zsh, fish)')
  .option('-f, --format <format>', 'Output format: table (raw script), json, markdown, csv, tsv', 'table')
  .option('--script <script>', 'Accepted for script parity; completion output is shell code (ignored)', 'slp1')
  .option('--json', 'Shortcut for --format json')
  .action((shell, opts) => {
    handleCompletion(shell, opts);
  });

// HIDDEN __complete entrypoint (shell completion engine)
program
  .command('__complete <words...>', { hidden: true })
  .description('Internal shell completion engine (not for direct use)')
  .allowUnknownOption()
  .action((words, opts) => {
    handleComplete(words as string[]);
  });

// TRANSLIT command
program
  .command('translit <text>')
  .description('Transliterate Sanskrit text between Devanagari, SLP1, Harvard-Kyoto (HK), and IAST')
  .option('-t, --to <script>', 'Target script: slp1, deva, hk, iast')
  .option('-f, --from <script>', 'Source script: slp1, deva, hk, iast')
  .option('-s, --script <script>', 'Target script (equivalent to --to); kept for --script parity across commands')
  .option('--format <format>', 'Output format: table (raw text), json, markdown, csv, tsv', 'table')
  .option('--json', 'Shortcut for --format json')
  .action((text, opts) => {
    handleTranslit(text, opts);
  });

// ---------------------------------------------------------------------------
// Fast path BEFORE commander parsing: the hidden shell-completion engine must
// receive raw argv intact (empty-string fragments and "--" fragments are
// semantically meaningful to the engine but are eaten by option parsing).
// ---------------------------------------------------------------------------
if (process.argv[2] === '__complete') {
  handleComplete(process.argv.slice(3));
} else {
  program.parse(process.argv);
}
