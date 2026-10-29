import { describe, it, expect } from 'vitest';
import { computeCompletions } from '../../src/completion/engine.js';
import { COMMAND_SPECS, COMMAND_NAMES, VALUE_SETS, ValueKind } from '../../src/completion/spec.js';
import { COMPLETION_SCRIPTS } from '../../src/completion/scripts.js';

describe('Completion Spec Registry', () => {
  it('covers every public command and mirrors CLI command names', () => {
    const expected = [
      'list', 'show', 'ting', 'krut', 'subanta', 'word', 'decline',
      'search', 'prefix', 'translit', 'repl', 'completion', 'help',
    ];
    expect(Array.from(COMMAND_NAMES).sort()).toEqual([...expected].sort());
  });

  it('declares only valid ValueKinds and marks boolean options with null', () => {
    const knownKinds = new Set([
      'script', 'format', 'lakara', 'family', 'prayoga', 'gana', 'pada',
      'settva', 'karma', 'sort', 'pratyaya', 'upasarga', 'gender', 'shell',
      'dhatu', 'number', 'text',
    ]);
    for (const spec of Object.values(COMMAND_SPECS)) {
      for (const [name, kind] of Object.entries(spec.options)) {
        if (kind === null) {
          // boolean flags take no value
        } else {
          expect(knownKinds.has(kind as string)).toBe(true);
        }
        if (name === 'json') expect(kind).toBeNull();
      }
      for (const kind of spec.positionals) {
        expect(knownKinds.has(kind as string)).toBe(true);
      }
    }
  });

  it('provides static sets for enumerable kinds', () => {
    expect(VALUE_SETS.script).toEqual(['slp1', 'deva', 'hk', 'iast']);
    expect(VALUE_SETS.format).toEqual(['table', 'json', 'markdown', 'csv', 'tsv']);
    expect(VALUE_SETS.lakara).toContain('lat');
    expect(VALUE_SETS.family).toContain('san');
    expect(VALUE_SETS.gender).toEqual(['m', 'f', 'n']);
    expect((VALUE_SETS.pratyaya as string[]).length).toBeGreaterThan(50);
    expect(VALUE_SETS.upasarga).toContain('pra');
  });
});

describe('Completion Engine', () => {
  it('suggests all subcommands for an empty top-level fragment', () => {
    const out = computeCompletions(['']);
    for (const name of ['list', 'show', 'ting', 'krut', 'subanta', 'search', 'translit', 'repl', 'completion']) {
      expect(out).toContain(name);
    }
    expect(out).not.toContain('__complete');
  });

  it('filters subcommands by prefix', () => {
    expect(computeCompletions(['li'])).toEqual(['list']);
    expect(computeCompletions(['t'])).toEqual(['ting', 'translit']);
  });

  it('suggets top-level flags for dash fragments', () => {
    const out = computeCompletions(['--']);
    expect(out).toContain('--help');
    expect(out).toContain('--version');
  });

  it('lists command flags for dash fragments after a subcommand', () => {
    const out = computeCompletions(['ting', '--la']);
    expect(out).toEqual(['--lakara']);
    const all = computeCompletions(['ting', '-']);
    expect(all).toContain('--family');
    expect(all).toContain('--lakara');
    expect(all).toContain('--json');
  });

  it('suggests enumerated option values against the previous flag', () => {
    expect(computeCompletions(['ting', '--lakara', 'lo'])).toEqual(['lot']);
    expect(computeCompletions(['show', '--script', ''])).toEqual(['slp1', 'deva', 'hk', 'iast']);
    expect(computeCompletions(['ting', '-f', ''])).toEqual(['table', 'json', 'markdown', 'csv', 'tsv']);
    expect(computeCompletions(['list', '--gana', ''])).toEqual(VALUE_SETS.gana);
  });

  it('supports --option=value fragments', () => {
    expect(computeCompletions(['ting', '--format=j'])).toEqual(['--format=json']);
    expect(computeCompletions(['ting', '--format='])).toEqual([
      '--format=table', '--format=json', '--format=markdown', '--format=csv', '--format=tsv',
    ]);
    expect(computeCompletions(['ting', '--nonsense='])).toEqual([]);
  });

  it('completes subanta gender positionally and via --gender', () => {
    expect(computeCompletions(['subanta', '', ''])).toEqual(['m', 'f', 'n']);
    expect(computeCompletions(['subanta', 'rAma', 'ba'])).toEqual([]);
    expect(computeCompletions(['subanta', '--gender', 'n'])).toEqual(['n']);
  });

  it('completes prefix command stacks from the upasarga corpus set', () => {
    expect(computeCompletions(['prefix', 'p'])).toEqual(['parA', 'pari', 'pra', 'prati']);
    expect(computeCompletions(['prefix', 'ni'])).toEqual(['ni', 'nir', 'nis']);
  });

  it('completes dhatu identifiers from multiple spellings', () => {
    // SLP1 lowercase prefix (e.g. bu = bU)
    const b = computeCompletions(['show', 'b']);
    expect(b).toContain('bu');
    expect(b.length).toBeLessThanOrEqual(100);
    // baseindex prefix
    const zeroOne = computeCompletions(['show', '01.']);
    expect(zeroOne).toContain('01.0001');
    expect(zeroOne).toContain('01.0002');
    // Devanagari prefix
    expect(computeCompletions(['show', 'भ'])).toContain('भू');
    // HK lowercase prefix (bh = bhU)
    expect(computeCompletions(['show', 'bh'])).toContain('bhu');
    // ting second positional also completes dhatus
    expect(computeCompletions(['ting', '01.'])).toContain('01.0001');
    // Bare TAB offers nothing (2,259 ids would flood the display)
    expect(computeCompletions(['show', ''])).toEqual([]);
  });

  it('returns no suggestions for unknown subcommands or exhausted positionals', () => {
    expect(computeCompletions(['xyz', ''])).toEqual([]);
    expect(computeCompletions(['show', '01.0001', ''])).toEqual([]);
  });

  it('re-derives flag-only completion after an exhausted positional with flags skipped', () => {
    // boolean flags must not be treated as value-taking
    expect(computeCompletions(['show', '--all', '--j'])).toEqual(['--json']);
    expect(computeCompletions(['show', '--json', '--a'])).toContain('--all');
  });
});

describe('Completion Script Generators', () => {
  it('bash script wires COMP_WORDS to the hidden engine', () => {
    const s = COMPLETION_SCRIPTS.bash();
    expect(s).toContain('complete -F _dhatugen_completions');
    expect(s).toContain('__complete');
    expect(s).toContain('${COMP_WORDS[COMP_CWORD]}');
    expect(s).toContain('${DHATUGEN_BIN:-dhatugen}');
  });

  it('zsh script declares #compdef and uses words[1,n]', () => {
    const s = COMPLETION_SCRIPTS.zsh();
    expect(s).toContain('#compdef dhatugen');
    expect(s).toContain('words[1,n]');
    expect(s).toContain('compadd');
  });

  it('fish script uses commandline -opc / -ct', () => {
    const s = COMPLETION_SCRIPTS.fish();
    expect(s).toContain('commandline -opc');
    expect(s).toContain('commandline -ct');
    expect(s).toContain("complete -f -c dhatugen");
  });
});
