import { createRequire } from 'module';
import { fileURLToPath } from 'url';
import { setFlagsFromString } from 'v8';
import path from 'path';

import { transliterate } from '../translit/index.js';

const require = createRequire(import.meta.url);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path of vendor wasm bundle
const wasmPath = path.resolve(__dirname, '../../vendor/pkg-node/dhaturupa_wasm.js');

/**
 * V8 dynamic tier-up (Liftoff -> TurboFan background recompile of the 1.2MB
 * engine) adds ~230ms of trailing background work after the FIRST engine call,
 * which delays process exit and breaks the <150ms cold CLI budget (measured:
 * one subantaAnalyze costs 12ms but wall time 248ms; both tier-up flags
 * together remove the trailer, wall 51ms). Per-call engine costs are tiny
 * (<=15ms), so the engine runs Liftoff-only. Each flag alone still schedules a
 * background compile; both are required.
 */
let _rawWasm: any = null;
function rawWasm(): any {
  if (_rawWasm === null) {
    setFlagsFromString('--no-wasm-tier-up');
    setFlagsFromString('--no-wasm-dynamic-tiering');
    _rawWasm = require(wasmPath);
  }
  return _rawWasm;
}

export interface WasmSubantaCell {
  forms: string[];
  vacana: 'ekavacanam' | 'dvivacana' | 'dvivacanam' | 'bahuvacana' | 'bahuvacanam';
  vibhakti: 'prathamA' | 'dvitIyA' | 'tftIyA' | 'caturTI' | 'paJcamI' | 'zazWI' | 'saptamI' | 'sambodhana';
}

export interface WasmSubantaTable {
  class: string;
  linga: string;
  stem: string;
  cells: WasmSubantaCell[];
}

export interface WasmSubantaResponse {
  ok: boolean;
  tables: WasmSubantaTable[];
  error?: string;
}

export interface WasmSubantaAnalysis {
  class: string;
  linga: string;
  stem: string;
  vacana: string;
  vibhakti: string;
}

export interface WasmSubantaAnalyzeResponse {
  ok: boolean;
  word: string;
  analyses: WasmSubantaAnalysis[];
  tables: WasmSubantaTable[];
  error?: string;
}

export interface WasmCandidate {
  dhatu: string;
  scheme: string;
}

export interface WasmCandidatesResponse {
  ok: boolean;
  candidates?: WasmCandidate[];
  error?: string;
}

export class WasmEngine {
  /**
   * FNV-1a shard of a form (mirroring revindex::shard_of)
   */
  static indexShard(form: string, shards: number = 256): { ok: boolean; shard?: number; error?: string } {
    try {
      const res = rawWasm().index_shard(form, shards);
      return JSON.parse(res);
    } catch (e: any) {
      return { ok: false, error: e.message };
    }
  }
  static engineStamp(): string {
    return rawWasm().engine_stamp();
  }

  /**
   * Search-box candidate readings for query (Devanagari candidates)
   */
  static queryCandidates(query: string): WasmCandidatesResponse {
    try {
      const res = rawWasm().query_candidates(query);
      const parsed = JSON.parse(res);
      if (parsed && parsed.ok) return parsed;

      // If query was SLP1, convert to Devanagari first
      const deva = transliterate(query, 'deva', 'slp1');
      const retry = rawWasm().query_candidates(deva);
      return JSON.parse(retry);
    } catch (e: any) {
      return { ok: false, error: e.message };
    }
  }

  /**
   * Convert query to Devanagari using WASM portal rule
   */
  static toDevanagari(query: string): { ok: boolean; deva?: string; error?: string } {
    try {
      const res = rawWasm().to_devanagari(query);
      return JSON.parse(res);
    } catch (e: any) {
      return { ok: false, error: e.message };
    }
  }

  /**
   * Generate 24-slot subanta declension table for a stem and gender (m, f, n)
   */
  static subantaTable(stem: string, linga: string): WasmSubantaResponse {
    try {
      const res = rawWasm().subanta_table(stem, linga);
      return JSON.parse(res);
    } catch (e: any) {
      return { ok: false, tables: [], error: e.message };
    }
  }

  /**
   * Reverse-analyze an inflected subanta form into possible stem, linga, vibhakti, and vacana
   */
  static subantaAnalyze(word: string): WasmSubantaAnalyzeResponse {
    try {
      const res = rawWasm().subanta_analyze(word);
      return JSON.parse(res);
    } catch (e: any) {
      return { ok: false, word, analyses: [], tables: [], error: e.message };
    }
  }

  /**
   * Derive prefixed surface forms for a stack + base form
   */
  static prefixedForms(stack: string, base: string): string[] {
    try {
      const res = rawWasm().prefixed_forms(stack, base);
      const parsed = JSON.parse(res);
      if (parsed && Array.isArray(parsed.forms)) {
        return parsed.forms;
      }
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }

  /**
   * Batch prefixing for an array of base forms under an upasarga stack
   */
  static prefixedTable(stack: string, forms: string[]): string[][] {
    try {
      const res = rawWasm().prefixed_table(stack, JSON.stringify(forms));
      const parsed = JSON.parse(res);
      if (parsed && Array.isArray(parsed.tables)) {
        return parsed.tables;
      }
      return Array.isArray(parsed) ? parsed : forms.map(() => []);
    } catch {
      return forms.map(() => []);
    }
  }

  /**
   * Context-aware batch prefixing
   */
  static prefixedTableCtx(
    stack: string,
    forms: string[],
    slp1Dhatu: string,
    engineCategory: string,
    dhatuNote: string
  ): string[][] {
    try {
      const res = rawWasm().prefixed_table_ctx(
        stack,
        JSON.stringify(forms),
        slp1Dhatu,
        engineCategory,
        dhatuNote
      );
      const parsed = JSON.parse(res);
      if (parsed && Array.isArray(parsed.tables)) {
        return parsed.tables;
      }
      return Array.isArray(parsed) ? parsed : forms.map(() => []);
    } catch {
      return forms.map(() => []);
    }
  }

  /**
   * Krdanta subanta declension for a specific krt participle
   */
  static krtSubanta(family: string, krt: string, field: string, value: string, baseindex: string): WasmSubantaResponse {
    try {
      const res = rawWasm().krt_subanta(family, krt, field, value, baseindex);
      return JSON.parse(res);
    } catch (e: any) {
      return { ok: false, tables: [], error: e.message };
    }
  }
}
