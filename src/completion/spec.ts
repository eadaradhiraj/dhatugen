/**
 * Completion specification registry for `dhatugen`.
 *
 * Static value lists (kṛt pratyayas, upasargas) are compiled once from the
 * `data/01..10` corpus so that shell completion never needs to scan the
 * 2,259 dhatu JSON files — preserving the <150ms cold execution invariant.
 */

export const SCRIPTS = ['slp1', 'deva', 'hk', 'iast'];
export const FORMATS = ['table', 'json', 'markdown', 'csv', 'tsv'];
export const LAKARAS = [
  'lat', 'lit', 'lut', 'lrut', 'lot', 'lang',
  'vidhiling', 'ashirling', 'lung', 'lrung', 'all',
];
export const FAMILIES = ['shuddha', 'nich', 'san', 'yang', 'yangluk'];
export const PRAYOGAS = ['kartari', 'karmani'];
export const GANAS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
export const PADAS = ['P', 'A', 'U'];
export const SETTVAS = ['S', 'A', 'V'];
export const KARMAS = ['A', 'S', 'D'];
export const SORTS = ['num', 'az', 'gana'];
export const GENDERS = ['m', 'f', 'n'];

/**
 * Union of all kṛt pratyaya names found in `participles.*` across
 * data/01..10 (63 values, extracted from the full 2,259-dhatu corpus).
 */
export const KRT_PRATYAYAS = [
  'Aluc', 'Aru', 'BAvakarma-SAnac', 'GaY', 'GinuR', 'Gurac', 'Nvanip',
  'Ra', 'Ramul', 'Rvul', 'Ryat', 'Ryuw', 'SAnac', 'SAnan', 'Sa', 'Satf',
  'Takan', 'a', 'aN', 'aTuc', 'ac', 'anIyar', 'ap', 'atfn', 'cAnaS',
  'gsnu', 'itra', 'klukan', 'kmarac', 'knu', 'kru', 'krukan', 'kta',
  'ktavatu', 'ktin', 'ktri', 'ktvA', 'kurac', 'kvarap', 'kvasu', 'kyap',
  'lyap', 'lyu', 'lyuw', 'naN', 'najiN', 'nan', 'ra', 'sya-BAvakarma-SAnac',
  'sya-SAnac', 'sya-Satf', 'tavya', 'tfc', 'tumun', 'u', 'ukaY', 'varac',
  'vuY', 'vun', 'yat', 'zAkan', 'zvun', 'zwran',
];

/**
 * Single-token upasarga stacks found in `upasarga_forms` across data/01..10
 * (23 values; the `vipra` key in the corpus is a stack-separator artifact).
 */
export const UPASARGAS = [
  'A', 'AN', 'aBi', 'aDi', 'anu', 'apa', 'api', 'ati', 'ava', 'dur', 'dus',
  'ni', 'nir', 'nis', 'parA', 'pari', 'pra', 'prati', 'sam', 'su', 'ud',
  'upa', 'vi',
];

/**
 * Kinds of values an option or positional slot may take.
 * Kinds backed by a static set resolve instantly; `dhatu` resolves via the
 * fast lite index; `number` / `text` yield no meaning-preserving suggestions.
 */
export type ValueKind =
  | 'script' | 'format' | 'lakara' | 'family' | 'prayoga' | 'gana' | 'pada'
  | 'settva' | 'karma' | 'sort' | 'pratyaya' | 'upasarga' | 'gender'
  | 'shell' | 'dhatu' | 'number' | 'text';

export const SHELLS = ['bash', 'zsh', 'fish'];

export const VALUE_SETS: Partial<Record<ValueKind, string[]>> = {
  script: SCRIPTS,
  format: FORMATS,
  lakara: LAKARAS,
  family: FAMILIES,
  prayoga: PRAYOGAS,
  gana: GANAS,
  pada: PADAS,
  settva: SETTVAS,
  karma: KARMAS,
  sort: SORTS,
  pratyaya: KRT_PRATYAYAS,
  upasarga: UPASARGAS,
  gender: GENDERS,
  shell: SHELLS,
};

export interface CommandCompletionSpec {
  /**
   * Long option name -> value kind. `null` means the option is boolean
   * (takes no value).
   */
  options: Record<string, ValueKind | null>;
  /** Short option name -> long option name. */
  shorts: Record<string, string>;
  /** Positional slots in declared order (last entry repeats for extras). */
  positionals: ValueKind[];
}

export const COMMAND_SPECS: Record<string, CommandCompletionSpec> = {
  list: {
    options: {
      gana: 'gana', pada: 'pada', settva: 'settva', karma: 'karma',
      search: 'text', sort: 'sort', limit: 'number', offset: 'number',
      format: 'format', script: 'script', json: null,
    },
    shorts: { g: 'gana', p: 'pada', s: 'settva', k: 'karma', q: 'search', f: 'format' },
    positionals: ['text'],
  },
  show: {
    options: {
      all: null, upasarga: null, chandrika: null, prayoga: null,
      format: 'format', script: 'script', json: null,
    },
    shorts: { a: 'all', u: 'upasarga', c: 'chandrika', p: 'prayoga', f: 'format' },
    positionals: ['dhatu'],
  },
  ting: {
    options: {
      family: 'family', prayoga: 'prayoga', lakara: 'lakara', prefix: 'upasarga',
      format: 'format', script: 'script', json: null,
    },
    shorts: { l: 'lakara', f: 'format' },
    positionals: ['dhatu'],
  },
  krut: {
    options: {
      family: 'family', pratyaya: 'pratyaya', prefix: 'upasarga',
      format: 'format', script: 'script', json: null,
    },
    shorts: { p: 'pratyaya', f: 'format' },
    positionals: ['dhatu'],
  },
  subanta: {
    options: {
      dhatu: 'dhatu', krt: 'pratyaya', family: 'family', gender: 'gender',
      prefix: 'upasarga', format: 'format', script: 'script', json: null,
    },
    shorts: { d: 'dhatu', k: 'krt', g: 'gender', f: 'format' },
    positionals: ['text', 'gender'],
  },
  word: {
    options: { format: 'format', script: 'script', json: null },
    shorts: { f: 'format' },
    positionals: ['text'],
  },
  decline: {
    options: { format: 'format', script: 'script', json: null },
    shorts: { f: 'format' },
    positionals: ['text', 'gender'],
  },
  search: {
    options: {
      dhatu: 'dhatu', limit: 'number',
      format: 'format', script: 'script', json: null,
    },
    shorts: { d: 'dhatu', l: 'limit', f: 'format' },
    positionals: ['text'],
  },
  prefix: {
    options: { format: 'format', script: 'script', json: null },
    shorts: { f: 'format' },
    positionals: ['upasarga', 'dhatu'],
  },
  translit: {
    options: {
      to: 'script', from: 'script', script: 'script',
      format: 'format', json: null,
    },
    shorts: { t: 'to', f: 'from', s: 'script' },
    positionals: ['text'],
  },
  repl: {
    options: { script: 'script' },
    shorts: { s: 'script' },
    positionals: [],
  },
  completion: {
    options: { format: 'format', script: 'script', json: null },
    shorts: { f: 'format' },
    positionals: ['shell'],
  },
  help: {
    options: {},
    shorts: {},
    positionals: ['text'],
  },
};

export const COMMAND_NAMES = Object.keys(COMMAND_SPECS);

export const TOP_LEVEL_FLAGS = ['--help', '--version'];
