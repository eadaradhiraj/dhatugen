import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { DhatuEntry, SubantaTestFixture } from '../types.js';
import { transliterate, detectScript } from '../translit/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECT_ROOT = path.resolve(__dirname, '../../');
const DATA_DIR = path.resolve(PROJECT_ROOT, 'data');

export interface DhatuLiteItem {
  baseindex: string;
  dhatu: string; // Devanagari
  gana: string;
  pada: string; // P | A | U
  settva: string; // S | A | V
  karma: string; // A | S | D
  artha: string; // Devanagari
  artha_english: string;
}

export interface DhatuListFilters {
  gana?: number | string;
  pada?: 'P' | 'A' | 'U' | 'p' | 'a' | 'u' | string;
  settva?: 'S' | 'A' | 'V' | 's' | 'a' | 'v' | string;
  karma?: 'A' | 'S' | 'D' | 'a' | 's' | 'd' | string;
  search?: string;
  sort?: 'az' | 'num' | 'gana';
  limit?: number;
  offset?: number;
}

export interface ShabdaOracleItem {
  word: string;
  linga: string; // P | S | N
  urlid: string;
  cells: string[]; // 24 cells
}

export class DhatuRepository {
  private static liteData: DhatuLiteItem[] | null = null;
  private static rootLookup: Map<string, string> = new Map(); // root (slp1/deva/hk) -> baseindex
  private static kaumudiLookup: Map<string, string> = new Map(); // sk1 -> baseindex
  private static cache: Map<string, DhatuEntry> = new Map();
  private static shabdaData: ShabdaOracleItem[] | null = null;
  private static shabdaLookup: Map<string, ShabdaOracleItem[]> = new Map();
  /** word-key -> entries, per shabda chunk file (first-two-codepoint buckets) */
  private static shabdaChunkCache: Map<string, Map<string, ShabdaOracleItem[]> | null> = new Map();

  /**
   * Initializes the repository index if not already loaded
   */
  static init(): void {
    if (this.liteData) return;

    const litePath = path.join(DATA_DIR, 'dhatu_data_lite.json');
    if (fs.existsSync(litePath)) {
      const raw = JSON.parse(fs.readFileSync(litePath, 'utf8'));
      this.liteData = raw.data || [];
    } else {
      this.liteData = [];
    }

    // Build fast lookup map (preserve primary/earlier gana entry for duplicates)
    for (const item of this.liteData || []) {
      const id = item.baseindex;
      const deva = item.dhatu.trim();
      const slp1 = transliterate(deva, 'slp1', 'deva');
      const hk = transliterate(deva, 'hk', 'deva');

      this.rootLookup.set(id, id);
      if (!this.rootLookup.has(deva)) this.rootLookup.set(deva, id);
      if (!this.rootLookup.has(slp1)) this.rootLookup.set(slp1, id);
      if (!this.rootLookup.has(hk)) this.rootLookup.set(hk, id);
      if (!this.rootLookup.has(slp1.toLowerCase())) this.rootLookup.set(slp1.toLowerCase(), id);
      if (!this.rootLookup.has(hk.toLowerCase())) this.rootLookup.set(hk.toLowerCase(), id);
    }
  }

  /**
   * Returns the full lite index (2,259 items) after initializing it.
   * Used for fast enumeration contexts such as shell completion.
   */
  static liteItems(): DhatuLiteItem[] {
    this.init();
    return this.liteData || [];
  }

  /**
   * Normalizes any identifier (e.g. "1.1", "01.0001", "sk1", "BU", "भू") into "GG.NNNN"
   */
  static normalizeBaseindex(input: string): string | null {
    if (!input) return null;
    const trimmed = input.trim();

    // Fast-path: already standard format: e.g. "01.0001"
    if (/^\d{2}\.\d{4}$/.test(trimmed)) {
      return trimmed;
    }

    // Fast-path: dot format: e.g. "1.1" -> "01.0001", "10.4" -> "10.0004"
    const dotMatch = trimmed.match(/^(\d{1,2})\.(\d{1,4})$/);
    if (dotMatch) {
      const gana = dotMatch[1].padStart(2, '0');
      const num = dotMatch[2].padStart(4, '0');
      return `${gana}.${num}`;
    }

    // Name lookup requires initializing the index map
    this.init();

    // Plain root or identifier lookup
    const direct = this.rootLookup.get(trimmed);
    if (direct) return direct;

    const slp1 = transliterate(trimmed, 'slp1');
    const slp1Match = this.rootLookup.get(slp1);
    if (slp1Match) return slp1Match;

    return null;
  }

  /**
   * Loads the full Dhatu JSON for a given baseindex or name
   */
  static getDhatu(baseindexOrName: string): DhatuEntry | null {
    this.init();
    const id = this.normalizeBaseindex(baseindexOrName);
    if (!id) return null;

    if (this.cache.has(id)) {
      return this.cache.get(id)!;
    }

    const [gana] = id.split('.');
    const filePath = path.join(DATA_DIR, gana, `${id}.json`);

    if (!fs.existsSync(filePath)) {
      return null;
    }

    try {
      const entry: DhatuEntry = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      this.cache.set(id, entry);
      return entry;
    } catch {
      return null;
    }
  }

  /**
   * Loads the subanta test fixture for a given baseindex
   */
  static getSubantaFixture(baseindexOrName: string): SubantaTestFixture | null {
    this.init();
    const id = this.normalizeBaseindex(baseindexOrName);
    if (!id) return null;

    const [gana] = id.split('.');
    const filePath = path.join(DATA_DIR, 'subanta_test', gana, `${id}.json`);

    if (!fs.existsSync(filePath)) {
      return null;
    }

    try {
      const fixture: SubantaTestFixture = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      return fixture;
    } catch {
      return null;
    }
  }

  /**
   * Lists dhatus with rich filtering, search, sorting, and pagination
   */
  static listDhatus(filters: DhatuListFilters = {}): { total: number; items: DhatuLiteItem[] } {
    this.init();
    let items = [...(this.liteData || [])];

    // Gaṇa filter
    if (filters.gana !== undefined && filters.gana !== '') {
      const ganaStr = String(filters.gana).replace(/^0+/, '');
      items = items.filter(d => String(d.gana) === ganaStr);
    }

    // Pada filter (P, A, U)
    if (filters.pada) {
      const p = filters.pada.toUpperCase()[0];
      items = items.filter(d => d.pada === p);
    }

    // Settva filter (S, A, V)
    if (filters.settva) {
      const s = filters.settva.toUpperCase()[0];
      items = items.filter(d => d.settva === s);
    }

    // Karmakatva filter (A: akarmaka, S: sakarmaka, D: dvikarmaka)
    if (filters.karma) {
      const k = filters.karma.toUpperCase()[0];
      items = items.filter(d => d.karma === k);
    }

    // Search filter
    if (filters.search && filters.search.trim()) {
      const query = filters.search.trim();
      const queryDeva = transliterate(query, 'deva');
      const querySlp1 = transliterate(query, 'slp1').toLowerCase();
      const queryLower = query.toLowerCase();

      items = items.filter(d => {
        const deva = d.dhatu;
        const slp1 = transliterate(deva, 'slp1', 'deva').toLowerCase();
        const artha = d.artha;
        const eng = (d.artha_english || '').toLowerCase();

        return (
          deva.includes(query) ||
          deva.includes(queryDeva) ||
          slp1.includes(querySlp1) ||
          artha.includes(query) ||
          artha.includes(queryDeva) ||
          eng.includes(queryLower)
        );
      });
    }

    // Sorting
    const sort = filters.sort || 'num';
    if (sort === 'az') {
      items.sort((a, b) => a.dhatu.localeCompare(b.dhatu));
    } else if (sort === 'gana') {
      items.sort((a, b) => {
        const ga = parseInt(a.gana, 10);
        const gb = parseInt(b.gana, 10);
        if (ga !== gb) return ga - gb;
        return a.baseindex.localeCompare(b.baseindex);
      });
    } else {
      // 'num' default
      items.sort((a, b) => a.baseindex.localeCompare(b.baseindex));
    }

    const total = items.length;
    const offset = filters.offset || 0;
    const limit = filters.limit !== undefined ? filters.limit : 50;

    const paged = limit > 0 ? items.slice(offset, offset + limit) : items.slice(offset);

    return { total, items: paged };
  }

  /**
   * Loads Shabda oracle data (data/shabda2.json). Kept for the rare urlid-data
   * keys ('@...') and as parity fallback for chunked lookups.
   */
  private static ensureFullShabda(): void {
    if (this.shabdaData) return;
    const shabdaPath = path.join(DATA_DIR, 'shabda2.json');
    if (fs.existsSync(shabdaPath)) {
      const raw = JSON.parse(fs.readFileSync(shabdaPath, 'utf8'));
      const entries: ShabdaOracleItem[] = (raw.entries || []).map((e: any[]) => ({
        word: e[0],
        linga: e[1],
        urlid: e[2],
        cells: (e[3] || '').split(';'),
      }));
      this.shabdaData = entries;
      for (const item of entries) {
        const arr = this.shabdaLookup.get(item.word) || [];
        arr.push(item);
        this.shabdaLookup.set(item.word, arr);

        // also index by urlid
        const urlArr = this.shabdaLookup.get(item.urlid) || [];
        urlArr.push(item);
        this.shabdaLookup.set(item.urlid, urlArr);
      }
    } else {
      this.shabdaData = [];
    }
  }

  /**
   * Loads (and caches) one Shabda chunk keyed by the word's leading codepoints:
   * data/shabda/<c0>-<c1>.json (or <c0>.json for single-char words), generated
   * offline by scripts/gen-shabda-chunks.mjs. Returns null when the chunk file
   * is missing (the full-file path then resolves the query).
   */
  private static getShabdaChunk(chunkKey: string): Map<string, ShabdaOracleItem[]> | null {
    const cached = this.shabdaChunkCache.get(chunkKey);
    if (cached !== undefined) return cached;
    const chunkPath = path.join(DATA_DIR, 'shabda', `${chunkKey}.json`);
    let map: Map<string, ShabdaOracleItem[]> | null = null;
    try {
      if (fs.existsSync(chunkPath)) {
        const raw = JSON.parse(fs.readFileSync(chunkPath, 'utf8'));
        map = new Map();
        for (const e of raw.entries || []) {
          const item: ShabdaOracleItem = {
            word: e[0],
            linga: e[1],
            urlid: e[2],
            cells: (e[3] || '').split(';'),
          };
          const arr = map.get(item.word) || [];
          arr.push(item);
          map.set(item.word, arr);
          const urlArr = map.get(item.urlid) || [];
          urlArr.push(item);
          map.set(item.urlid, urlArr);
        }
      }
    } catch {
      map = null;
    }
    this.shabdaChunkCache.set(chunkKey, map);
    return map;
  }

  static getShabdaEntries(wordOrStem: string): ShabdaOracleItem[] {
    const queryDeva = transliterate(wordOrStem, 'deva');

    // urlid keys ('@a1' style) span every chunk; use the full loaded oracle.
    if (wordOrStem.startsWith('@')) {
      this.ensureFullShabda();
      return this.shabdaLookup.get(wordOrStem) || [];
    }

    // Fast path: one small chunk keyed by the leading two codepoints.
    // Because chunks are keyed by the query's own leading codepoints, a loaded
    // chunk that lacks the word proves the oracle has no such Devanagari word:
    // no full-file fallback is needed for those misses (keeps wall <150ms).
    if (queryDeva.length > 0) {
      const c0 = queryDeva.codePointAt(0)!;
      const c0len = String.fromCodePoint(c0).length;
      const isDevaChar = c0 >= 0x0900 && c0 <= 0x097f;
      if (isDevaChar) {
        const hex4 = (n: number) => n.toString(16).padStart(4, '0');
        const chunkKey =
          queryDeva.length <= c0len
            ? hex4(c0)
            : `${hex4(c0)}-${hex4(queryDeva.codePointAt(c0len)!)}`;
        const map = this.getShabdaChunk(chunkKey);
        const hit = map?.get(queryDeva) || map?.get(wordOrStem) || null;
        if (hit) return hit;
        // Devanagari-key miss is authoritative
        return [];
      }
    }

    // Fallback (non-Devanagari key): full oracle.
    this.ensureFullShabda();
    return this.shabdaLookup.get(queryDeva) || this.shabdaLookup.get(wordOrStem) || [];
  }
}
