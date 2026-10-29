import { ScriptType } from '../types.js';

const VIRAMA = '\u094D';
const AVAGRAHA = '\u093D';
const ANUSVARA = '\u0902';
const CANDRABINDU = '\u0901';
const VISARGA = '\u0903';

// Independent vowels Deva -> SLP1
const INDEPENDENT_VOWELS: Record<string, string> = {
  'अ': 'a',
  'आ': 'A',
  'इ': 'i',
  'ई': 'I',
  'उ': 'u',
  'ऊ': 'U',
  'ऋ': 'f',
  'ॠ': 'F',
  'ऌ': 'x',
  'ॡ': 'X',
  'ए': 'e', 'ऍ': 'e', 'ऎ': 'e',
  'ऐ': 'E',
  'ओ': 'o', 'ऑ': 'o', 'ऒ': 'o',
  'औ': 'O',
};

// Dependent vowel signs (matras) Deva -> SLP1
const MATRAS: Record<string, string> = {
  'ा': 'A',
  'ि': 'i',
  'ी': 'I',
  'ु': 'u',
  'ू': 'U',
  'ृ': 'f',
  'ॄ': 'F',
  'ॢ': 'x',
  'ॣ': 'X',
  'े': 'e', 'ॅ': 'e', 'ॆ': 'e',
  'ै': 'E',
  'ो': 'o', 'ॉ': 'o', 'ॊ': 'o',
  'ौ': 'O',
};

// Consonants Deva -> SLP1
const CONSONANTS: Record<string, string> = {
  'क': 'k', 'ख': 'K', 'ग': 'g', 'घ': 'G', 'ङ': 'N',
  'च': 'c', 'छ': 'C', 'ज': 'j', 'झ': 'J', 'ञ': 'Y',
  'ट': 'w', 'ठ': 'W', 'ड': 'q', 'ढ': 'Q', 'ण': 'R',
  'त': 't', 'थ': 'T', 'द': 'd', 'ध': 'D', 'न': 'n',
  'प': 'p', 'फ': 'P', 'ब': 'b', 'भ': 'B', 'म': 'm',
  'य': 'y', 'र': 'r', 'ल': 'l', 'व': 'v',
  'श': 'S', 'ष': 'z', 'स': 's', 'ह': 'h',
  'ळ': 'L',
};

// SLP1 -> Deva independent vowels
const SLP1_INDEP_VOWELS: Record<string, string> = {
  'a': 'अ', 'A': 'आ', 'i': 'इ', 'I': 'ई', 'u': 'उ', 'U': 'ऊ',
  'f': 'ऋ', 'F': 'ॠ', 'x': 'ऌ', 'X': 'ॡ', 'e': 'ए', 'E': 'ऐ',
  'o': 'ओ', 'O': 'औ',
};

// SLP1 -> Deva matras
const SLP1_MATRAS: Record<string, string> = {
  'a': '', 'A': 'ा', 'i': 'ि', 'I': 'ी', 'u': 'ु', 'U': 'ू',
  'f': 'ृ', 'F': 'ॄ', 'x': 'ॢ', 'X': 'ॣ', 'e': 'े', 'E': 'ै',
  'o': 'ो', 'O': 'ौ',
};

// SLP1 -> Deva consonants
const SLP1_CONSONANTS: Record<string, string> = {
  'k': 'क', 'K': 'ख', 'g': 'ग', 'G': 'घ', 'N': 'ङ',
  'c': 'च', 'C': 'छ', 'j': 'ज', 'J': 'झ', 'Y': 'ञ',
  'w': 'ट', 'W': 'ठ', 'q': 'ड', 'Q': 'ढ', 'R': 'ण',
  't': 'त', 'T': 'थ', 'd': 'द', 'D': 'ध', 'n': 'न',
  'p': 'प', 'P': 'फ', 'b': 'ब', 'B': 'भ', 'm': 'म',
  'y': 'य', 'r': 'र', 'l': 'ल', 'v': 'व',
  'S': 'श', 'z': 'ष', 's': 'स', 'h': 'ह',
  'L': 'ळ',
};

export function containsDevanagari(text: string): boolean {
  return /[\u0900-\u097F]/.test(text);
}

/**
 * Transliterates Devanagari text to SLP1
 */
export function devaToSlp1(text: string): string {
  let result = '';
  let i = 0;
  const chars = Array.from(text);

  while (i < chars.length) {
    const ch = chars[i];

    if (INDEPENDENT_VOWELS[ch]) {
      result += INDEPENDENT_VOWELS[ch];
      i++;
    } else if (CONSONANTS[ch]) {
      const cons = CONSONANTS[ch];
      const next = chars[i + 1];

      if (next === VIRAMA) {
        result += cons;
        i += 2;
      } else if (next && MATRAS[next]) {
        result += cons + MATRAS[next];
        i += 2;
      } else {
        result += cons + 'a';
        i++;
      }
    } else if (ch === ANUSVARA) {
      result += 'M';
      i++;
    } else if (ch === CANDRABINDU) {
      result += '~';
      i++;
    } else if (ch === VISARGA) {
      result += 'H';
      i++;
    } else if (ch === AVAGRAHA) {
      result += "'";
      i++;
    } else {
      result += ch;
      i++;
    }
  }

  return result;
}

/**
 * Transliterates SLP1 text to Devanagari
 */
export function slp1ToDeva(text: string): string {
  let result = '';
  let i = 0;
  const chars = Array.from(text);

  while (i < chars.length) {
    const ch = chars[i];

    if (SLP1_CONSONANTS[ch]) {
      const devaCons = SLP1_CONSONANTS[ch];
      const next = chars[i + 1];

      if (next && SLP1_MATRAS[next] !== undefined) {
        result += devaCons + SLP1_MATRAS[next];
        i += 2;
      } else {
        result += devaCons + VIRAMA;
        i++;
      }
    } else if (SLP1_INDEP_VOWELS[ch]) {
      result += SLP1_INDEP_VOWELS[ch];
      i++;
    } else if (ch === 'M') {
      result += ANUSVARA;
      i++;
    } else if (ch === '~') {
      result += CANDRABINDU;
      i++;
    } else if (ch === 'H') {
      result += VISARGA;
      i++;
    } else if (ch === "'") {
      result += AVAGRAHA;
      i++;
    } else {
      result += ch;
      i++;
    }
  }

  return result;
}

/**
 * Transliterates Harvard-Kyoto (HK) to SLP1
 */
export function hkToSlp1(text: string): string {
  let result = '';
  let i = 0;

  while (i < text.length) {
    if (text.startsWith('lRR', i)) {
      result += 'X';
      i += 3;
    } else if (text.startsWith('lR', i)) {
      result += 'x';
      i += 2;
    } else if (text.startsWith('RR', i)) {
      result += 'F';
      i += 2;
    } else if (text.startsWith('ai', i)) {
      result += 'E';
      i += 2;
    } else if (text.startsWith('au', i)) {
      result += 'O';
      i += 2;
    } else if (text.startsWith('kh', i)) {
      result += 'K';
      i += 2;
    } else if (text.startsWith('gh', i)) {
      result += 'G';
      i += 2;
    } else if (text.startsWith('ch', i)) {
      result += 'C';
      i += 2;
    } else if (text.startsWith('jh', i)) {
      result += 'J';
      i += 2;
    } else if (text.startsWith('Th', i)) {
      result += 'W';
      i += 2;
    } else if (text.startsWith('Dh', i)) {
      result += 'Q';
      i += 2;
    } else if (text.startsWith('th', i)) {
      result += 'T';
      i += 2;
    } else if (text.startsWith('dh', i)) {
      result += 'D';
      i += 2;
    } else if (text.startsWith('ph', i)) {
      result += 'P';
      i += 2;
    } else if (text.startsWith('bh', i)) {
      result += 'B';
      i += 2;
    } else {
      const c = text[i];
      switch (c) {
        case 'R': result += 'f'; break;
        case 'G': result += 'N'; break;
        case 'J': result += 'Y'; break;
        case 'T': result += 'w'; break;
        case 'D': result += 'q'; break;
        case 'N': result += 'R'; break;
        case 'z': result += 'S'; break;
        case 'S': result += 'z'; break;
        case 'M': result += 'M'; break;
        case 'H': result += 'H'; break;
        default: result += c; break;
      }
      i++;
    }
  }

  return result;
}

/**
 * Transliterates SLP1 to Harvard-Kyoto (HK)
 */
export function slp1ToHk(text: string): string {
  let result = '';
  for (const c of text) {
    switch (c) {
      case 'f': result += 'R'; break;
      case 'F': result += 'RR'; break;
      case 'x': result += 'lR'; break;
      case 'X': result += 'lRR'; break;
      case 'E': result += 'ai'; break;
      case 'O': result += 'au'; break;
      case 'K': result += 'kh'; break;
      case 'G': result += 'gh'; break;
      case 'C': result += 'ch'; break;
      case 'J': result += 'jh'; break;
      case 'w': result += 'T'; break;
      case 'W': result += 'Th'; break;
      case 'q': result += 'D'; break;
      case 'Q': result += 'Dh'; break;
      case 'R': result += 'N'; break;
      case 'T': result += 'th'; break;
      case 'D': result += 'dh'; break;
      case 'P': result += 'ph'; break;
      case 'B': result += 'bh'; break;
      case 'N': result += 'G'; break;
      case 'Y': result += 'J'; break;
      case 'S': result += 'z'; break;
      case 'z': result += 'S'; break;
      default: result += c; break;
    }
  }
  return result;
}

/**
 * Transliterates SLP1 to IAST
 */
export function slp1ToIast(text: string): string {
  let result = '';
  for (const c of text) {
    switch (c) {
      case 'A': result += 'ā'; break;
      case 'I': result += 'ī'; break;
      case 'U': result += 'ū'; break;
      case 'f': result += 'ṛ'; break;
      case 'F': result += 'ṝ'; break;
      case 'x': result += 'ḷ'; break;
      case 'X': result += 'ḹ'; break;
      case 'E': result += 'ai'; break;
      case 'O': result += 'au'; break;
      case 'M': result += 'ṃ'; break;
      case 'H': result += 'ḥ'; break;
      case '~': result += 'm̐'; break;
      case 'K': result += 'kh'; break;
      case 'G': result += 'gh'; break;
      case 'N': result += 'ṅ'; break;
      case 'C': result += 'ch'; break;
      case 'J': result += 'jh'; break;
      case 'Y': result += 'ñ'; break;
      case 'w': result += 'ṭ'; break;
      case 'W': result += 'ṭh'; break;
      case 'q': result += 'ḍ'; break;
      case 'Q': result += 'ḍh'; break;
      case 'R': result += 'ṇ'; break;
      case 'T': result += 'th'; break;
      case 'D': result += 'dh'; break;
      case 'P': result += 'ph'; break;
      case 'B': result += 'bh'; break;
      case 'S': result += 'ś'; break;
      case 'z': result += 'ṣ'; break;
      default: result += c; break;
    }
  }
  return result;
}

/**
 * Transliterates IAST to SLP1
 */
export function iastToSlp1(text: string): string {
  let result = '';
  let i = 0;

  while (i < text.length) {
    if (text.startsWith('kh', i)) { result += 'K'; i += 2; }
    else if (text.startsWith('gh', i)) { result += 'G'; i += 2; }
    else if (text.startsWith('ch', i)) { result += 'C'; i += 2; }
    else if (text.startsWith('jh', i)) { result += 'J'; i += 2; }
    else if (text.startsWith('ṭh', i)) { result += 'W'; i += 2; }
    else if (text.startsWith('ḍh', i)) { result += 'Q'; i += 2; }
    else if (text.startsWith('th', i)) { result += 'T'; i += 2; }
    else if (text.startsWith('dh', i)) { result += 'D'; i += 2; }
    else if (text.startsWith('ph', i)) { result += 'P'; i += 2; }
    else if (text.startsWith('bh', i)) { result += 'B'; i += 2; }
    else if (text.startsWith('ai', i)) { result += 'E'; i += 2; }
    else if (text.startsWith('au', i)) { result += 'O'; i += 2; }
    else {
      const c = text[i];
      switch (c) {
        case 'ā': result += 'A'; break;
        case 'ī': result += 'I'; break;
        case 'ū': result += 'U'; break;
        case 'ṛ': result += 'f'; break;
        case 'ṝ': result += 'F'; break;
        case 'ḷ': result += 'x'; break;
        case 'ḹ': result += 'X'; break;
        case 'ṃ': result += 'M'; break;
        case 'ḥ': result += 'H'; break;
        case 'm̐': result += '~'; break;
        case 'ṅ': result += 'N'; break;
        case 'ñ': result += 'Y'; break;
        case 'ṭ': result += 'w'; break;
        case 'ḍ': result += 'q'; break;
        case 'ṇ': result += 'R'; break;
        case 'ś': result += 'S'; break;
        case 'ṣ': result += 'z'; break;
        default: result += c; break;
      }
      i++;
    }
  }

  return result;
}

/**
 * Detect script of input string
 */
export function detectScript(text: string): ScriptType {
  if (containsDevanagari(text)) return 'deva';
  if (/[āīūṛṝḷḹṃḥṅñṭḍṇśṣ]/.test(text)) return 'iast';

  // Distinctive HK digraphs
  if (/(kh|gh|ch|jh|Th|Dh|th|dh|ph|bh|lRR|lR|RR)/.test(text)) return 'hk';

  // Distinctive SLP1 single-character aspirates and retroflexes
  if (/[KGCJWQTDPBwWqQz]/.test(text)) return 'slp1';

  // SLP1 vocalic r/l
  if (/[fFxX]/.test(text)) return 'slp1';

  // R followed by a vowel is SLP1 retroflex n (e.g. Ra, Re, Ri, etc.)
  if (/R[aAiIuUeEoO]/.test(text)) return 'slp1';

  // Default ASCII: if it starts with or contains HK-style characters
  return 'hk';
}

/**
 * Universal transliterator: converts any supported script to targetScript
 */
export function transliterate(text: string, targetScript: ScriptType, sourceScript?: ScriptType): string {
  if (!text) return text;
  const src = sourceScript || detectScript(text);

  if (src === targetScript) return text;

  // Convert source to SLP1 first
  let slp1 = text;
  if (src === 'deva') slp1 = devaToSlp1(text);
  else if (src === 'hk') slp1 = hkToSlp1(text);
  else if (src === 'iast') slp1 = iastToSlp1(text);

  // Convert SLP1 to target
  if (targetScript === 'slp1') return slp1;
  if (targetScript === 'deva') return slp1ToDeva(slp1);
  if (targetScript === 'hk') return slp1ToHk(slp1);
  if (targetScript === 'iast') return slp1ToIast(slp1);

  return text;
}
