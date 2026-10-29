/**
 * Core type definitions for dhatugen
 */

export type ScriptType = 'slp1' | 'deva' | 'hk' | 'iast';
export type OutputFormat = 'table' | 'json' | 'markdown' | 'csv' | 'tsv';

export type TingFamily = 'shuddha' | 'nich' | 'san' | 'yang' | 'yangluk';
export type TingPrayoga = 'kartari' | 'karmani';

export type KrutFamily = 'shuddha' | 'nich' | 'san' | 'yang' | 'yangluk' | 'krut' | 'nich_krut' | 'san_krut' | 'yang_krut' | 'yangluk_krut';

export type Gender = 'm' | 'f' | 'n' | 'pu' | 'strI' | 'napuM';

export interface InfoItem {
  name: string;
  value: string;
  ext_link?: string;
}

export interface DhatuEntry {
  id: string; // e.g. "01.0001"
  info: InfoItem[];
  conjugations: Record<string, Record<string, string[]>>; // family_prayoga -> lakara -> 9 slots
  participles: Record<string, Record<string, { base: string; m: string; f: string; n: string } | string>>;
  upasarga: {
    dhatu?: string;
    entries?: Array<{
      prefix: string;
      artha_skt?: string;
      artha_hindi?: string;
      [key: string]: any;
    }>;
  };
  chandrika?: Array<{
    prefix: string;
    examples: string[];
  }>;
  prayoga?: Array<{
    book: string;
    reference: string;
    text: string;
    external?: string;
  }>;
  upasarga_forms?: Record<string, any>;
}

export interface SubantaSlotMatrix {
  praTamA: { eka: string[]; dvi: string[]; bahu: string[] };
  dvitIyA: { eka: string[]; dvi: string[]; bahu: string[] };
  tFtIyA: { eka: string[]; dvi: string[]; bahu: string[] };
  caturTI: { eka: string[]; dvi: string[]; bahu: string[] };
  paYcamI: { eka: string[]; dvi: string[]; bahu: string[] };
  zazWI: { eka: string[]; dvi: string[]; bahu: string[] };
  saptamI: { eka: string[]; dvi: string[]; bahu: string[] };
  sambodana: { eka: string[]; dvi: string[]; bahu: string[] };
}

export interface SubantaEntry {
  pratyaya: string;
  pratipadika: string;
  ref?: string;
  derivation?: string;
  gender: string;
  displays?: string[];
  table: SubantaSlotMatrix;
  table_ok?: boolean;
  table_error?: string;
}

export interface SubantaTestFixture {
  id: string;
  source?: string;
  tabs: string[];
  base: Record<string, SubantaEntry[]>;
  upasarga: Record<string, Record<string, SubantaEntry[]>>;
  stats?: Record<string, any>;
  notes?: string[];
}

export interface SearchResultItem {
  dhatuId: string;
  dhatuName: string;
  gana: string;
  meaning: string;
  matchType: 'ting' | 'krut' | 'subanta' | 'prefixed' | 'upasarga';
  form: string;
  lakara?: string;
  slot?: string;
  family?: string;
  prayoga?: string;
  pratyaya?: string;
  gender?: string;
  vibhakti?: string;
  vacana?: string;
  prefix?: string;
}
