/**
 * Pure completion engine for `dhatugen`.
 *
 * Input model (mirrors bash/zsh/fish conventions):
 *   tokens = committed words (after "dhatugen") + current fragment (may be "").
 *
 * The engine is a pure function over the token list. It only touches the
 * 409KB dhatu lite index (via `DhatuRepository.init()`) when the user is
 * actually completing a dhatu identifier — enum values and option flags
 * resolve from static sets in O(1).
 */

import {
  COMMAND_SPECS,
  VALUE_SETS,
  TOP_LEVEL_FLAGS,
  ValueKind,
} from './spec.js';
import { DhatuRepository } from '../data/repo.js';
import { transliterate } from '../translit/index.js';

/** Result cap for dhatu identifier completion (keeps COMPREPLY snappy). */
const DHATU_COMPLETION_CAP = 100;

interface DhatuCandidate {
  id: string;
  deva: string;
  forms: string[]; // baseindex, deva, slp1, slp1(lc), hk, hk(lc) — literal-prefix matchable
}

let dhatuCandidates: DhatuCandidate[] | null = null;

function loadDhatuCandidates(): DhatuCandidate[] {
  if (dhatuCandidates) return dhatuCandidates;
  DhatuRepository.init();
  const items = DhatuRepository.liteItems();
  dhatuCandidates = items.map((it) => {
    const deva = it.dhatu.trim();
    const slp1 = transliterate(deva, 'slp1', 'deva');
    const hk = transliterate(deva, 'hk', 'deva');
    return {
      id: it.baseindex,
      deva,
      forms: [it.baseindex, deva, slp1, slp1.toLowerCase(), hk, hk.toLowerCase()],
    };
  });
  return dhatuCandidates;
}

function filterByPrefix(values: string[], fragment: string): string[] {
  if (!fragment) return values;
  const frag = fragment.toLowerCase();
  return values.filter((v) => v.toLowerCase().startsWith(frag));
}

function completeDhatu(fragment: string): string[] {
  // Empty fragment: browsing 2,259 ids is not useful; require a prefix.
  if (!fragment) return [];
  const seen = new Set<string>();
  const out: string[] = [];
  for (const cand of loadDhatuCandidates()) {
    // Only literal prefix matches survive the shells' own re-filtering
    // (compgen/compadd), so every emitted form must start with `fragment`
    // exactly as typed. Devanagari, SLP1 (both cases) and HK (both cases)
    // are offered; `show`/`ting` normalize every one of these spellings.
    for (const form of cand.forms) {
      if (form.startsWith(fragment) && !seen.has(form)) {
        seen.add(form);
        out.push(form);
      }
    }
    if (out.length >= DHATU_COMPLETION_CAP) break;
  }
  return out.length > DHATU_COMPLETION_CAP ? out.slice(0, DHATU_COMPLETION_CAP) : out;
}

/** Resolves suggestions for a value kind; `text`/`number` yield nothing. */
function completeValueKind(kind: ValueKind, fragment: string): string[] {
  if (kind === 'dhatu') return completeDhatu(fragment);
  const set = VALUE_SETS[kind];
  return set ? filterByPrefix(set, fragment) : [];
}

/** Maps a flag token (e.g. "--lakara", "-l", "--format=json") to its value kind. */
function resolveFlagValueKind(
  token: string,
  spec: { options: Record<string, ValueKind | null>; shorts: Record<string, string> },
): ValueKind | null | undefined {
  const bare = token.split('=')[0];
  const longName = bare.startsWith('--')
    ? bare.slice(2)
    : spec.shorts[bare.slice(1)] || '';
  if (!longName || !(longName in spec.options)) return undefined;
  return spec.options[longName];
}

/**
 * Walks committed tokens and returns how many positional slots were consumed
 * (option flag + its value pairs are skipped).
 */
function countPositionals(
  committed: string[],
  spec: { options: Record<string, ValueKind | null>; shorts: Record<string, string> },
): number {
  let count = 0;
  // Index 0 is the subcommand name; positional slots start after it.
  for (let i = 1; i < committed.length; i++) {
    const tok = committed[i];
    if (tok.startsWith('-')) {
      const kind = resolveFlagValueKind(tok, spec);
      // Consume the next token as this (non-"=") option's value.
      if (kind !== null && kind !== undefined && tok.indexOf('=') === -1) i++;
      continue;
    }
    count++;
  }
  return count;
}

/**
 * Computes completion candidates.
 * @param tokens committed words (after "dhatugen") followed by the current
 *   fragment as the final element ("" when the cursor opens a fresh word).
 */
export function computeCompletions(tokens: string[]): string[] {
  const committed = tokens.slice(0, -1);
  const fragment = tokens.length > 0 ? tokens[tokens.length - 1] : '';

  // Tolerate empty *leading* tokens (possible when a shell wrapper passes a
  // stale empty first word); they carry no positional meaning at the top.
  while (committed.length > 0 && committed[0] === '') {
    committed.shift();
  }

  // Top level: subcommand names, or top-level flags for a "-" fragment.
  if (committed.length === 0) {
    if (fragment.startsWith('-')) {
      return filterByPrefix(TOP_LEVEL_FLAGS, fragment);
    }
    return filterByPrefix(Object.keys(COMMAND_SPECS), fragment).sort();
  }

  const cmdName = committed[0];
  const spec = COMMAND_SPECS[cmdName];
  if (!spec) return []; // unknown subcommand: no suggestions

  // "--format=ta<TAB>" style: complete the value part, emitted as
  // `${flag}=${value}` so the shells' own prefix re-filtering matches.
  const eq = fragment.indexOf('=');
  if (eq > 0 && fragment.startsWith('--') && fragment.slice(2, eq).length > 0) {
    const longName = fragment.slice(2, eq);
    const valueKind = spec.options[longName];
    if (valueKind) {
      const valuePrefix = fragment.slice(eq + 1);
      return completeValueKind(valueKind, valuePrefix).map((v) => `--${longName}=${v}`);
    }
    return [];
  }

  // Option-name completion.
  if (fragment.startsWith('-') && cmdName !== 'help') {
    const flags: string[] = ['--help'];
    for (const name of Object.keys(spec.options)) {
      flags.push(`--${name}`);
    }
    for (const short of Object.keys(spec.shorts)) {
      flags.push(`-${short}`);
    }
    const filtered = filterByPrefix(flags, fragment);
    return Array.from(new Set(filtered));
  }

  // Option-value completion: previous committed word is a value-taking flag.
  if (committed.length >= 2) {
    const prev = committed[committed.length - 1];
    if (prev.startsWith('-') && prev.indexOf('=') === -1) {
      const kind = resolveFlagValueKind(prev, spec);
      if (kind !== null && kind !== undefined) {
        return completeValueKind(kind, fragment);
      }
    }
  }

  // Positional completion.
  const used = countPositionals(committed, spec);
  if (spec.positionals.length === 0 || used >= spec.positionals.length) {
    return [];
  }
  const kind = spec.positionals[Math.min(used, spec.positionals.length - 1)];
  return completeValueKind(kind, fragment);
}
