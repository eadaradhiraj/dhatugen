import { transliterate } from '../translit/index.js';
import { LAKARA_NAMES } from './table.js';
import { ScriptType } from '../types.js';

/**
 * Internal corpus tokens that are romanized labels (not SLP1 scheme codes) and
 * would mangle under blind slp1->deva transliteration ("shuddha" -> "स्हुद्ध").
 * Mapped to their proper Devanagari displaylabels.
 */
const ROMAN_TOKEN_LABELS: Record<string, string> = {
  krut: 'कृत्',
  ting: 'तिङ्',
  shuddha: 'शुद्ध',
  nich: 'णिच्',
  san: 'सन्',
  yak: 'यक्',
  yang: 'यङ्',
  yangluk: 'यङ्लुक्',
  kartari: 'कर्तरि',
  karmani: 'कर्मणि',
};

/**
 * Vibhakti and vacana slp1 keys -> Devanagari display labels (subanta rows).
 */
export const VIBHAKTI_DEVA: Record<string, string> = {
  praTamA: 'प्रथमा',
  dvitIyA: 'द्वितीया',
  tftIyA: 'तृतीया',
  tFtIyA: 'तृतीया',
  caturTI: 'चतुर्थी',
  paJcamI: 'पञ्चमी',
  paYcamI: 'पञ्चमी',
  zazWI: 'षष्ठी',
  saptamI: 'सप्तमी',
  sambodhana: 'सम्बोधनम्',
  sambodhanaM: 'सम्बोधनम्',
};

export const VACANA_DEVA: Record<string, string> = {
  eka: 'एकवचनम्',
  ekavacana: 'एकवचनम्',
  ekavacanam: 'एकवचनम्',
  dvi: 'द्विवचनम्',
  dvivacana: 'द्विवचनम्',
  dvivacanam: 'द्विवचनम्',
  bahu: 'बहुवचनम्',
  bahuvacana: 'बहुवचनम्',
  bahuvacanam: 'बहुवचनम्',
};

/**
 * Resolves one scheme token (family, lakara raw key, prayoga, prefix, pratyaya)
 * to a Devanagari display label. Recognizes:
 *  - romanized family/prayoga tokens (ROMAN_TOKEN_LABELS)
 *  - composite family tokens ("san_krut", "yangluk_yak") split on "_"
 *  - lakara keys with the corpus pada prefix: "plat" -> "लट् (प)", "alit" -> "लिट् (आ)"
 *  - bare SLP1 scheme codes ("bhvAdi", "SAnac") via slp1 transliteration
 *  - already-Devanagari tokens (prefix stacks, pratyayas) pass through
 */
export function schemeTokenDeva(token: string): string {
  const t = (token || '').trim();
  if (!t) return '';
  if (ROMAN_TOKEN_LABELS[t]) return ROMAN_TOKEN_LABELS[t];

  // Composite family tokens: "san_krut" -> "सन् + कृत्"
  if (t.includes('_')) {
    return t.split('_').map((p) => schemeTokenDeva(p)).filter(Boolean).join(' + ');
  }

  // Lakara raw keys carry an optional pada prefix ("plat", "alit", "aashirling")
  let raw: string | null = null;
  let pada = '';
  if (LAKARA_NAMES[t]) {
    raw = t;
  } else if (t.length > 1 && (t[0] === 'p' || t[0] === 'a') && LAKARA_NAMES[t.slice(1)]) {
    pada = t[0];
    raw = t.slice(1);
  }
  if (raw !== null) {
    const meta = LAKARA_NAMES[raw]!;
    if (pada === 'p') return `${meta.deva} (प)`;
    if (pada === 'a') return `${meta.deva} (आ)`;
    return meta.deva;
  }

  if (/[\u0900-\u097F]/.test(t)) return t;
  // Pure scheme code in SLP1
  return transliterate(t, 'deva', 'slp1');
}

/**
 * Builds the search Details cell from scheme tokens, always as Devanagari, so
 * rendering to other scripts goes through one clean transliteration instead of
 * mangling romanized labels.
 */
export function detailsDeva(tokens: string[]): string {
  return tokens.filter((x) => schemeTokenDeva(x)).map((x) => schemeTokenDeva(x)).join(' · ');
}

/**
 * Renders the deva-labeled details string in the requested script.
 */
export function renderDetailsDeva(deva: string, script: ScriptType): string {
  if (!deva) return '';
  if (script === 'deva') return deva;
  return transliterate(deva, script, 'deva');
}

/**
 * Upasarga stacks: slp1 ("aDi;AN") or deva ("प्र"), rendered as
 * "अदि + आन्" style Devanagari.
 */
export function stackDeva(stack: string): string {
  const t = (stack || '').trim();
  if (!t) return '';
  if (/[\u0900-\u097F]/.test(t)) return t;
  return t.split(/[;+]/).map((p) => schemeTokenDeva(p)).filter(Boolean).join(' + ');
}

/**
 * Subanta row suffix: "प्रथमा एकवचनम्" (falls back to the raw token).
 */
export function vacanaLabelDeva(vibh: string, vacana: string): string {
  const vd = VIBHAKTI_DEVA[(vibh || '').trim()];
  const cd = VACANA_DEVA[(vacana || '').trim()];
  const parts = [vd || '', cd || ''].filter(Boolean).map((x) => x);
  if (parts.length) return parts.join(' ');
  return '';
}
