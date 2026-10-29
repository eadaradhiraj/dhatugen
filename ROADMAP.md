# dhatugen: TypeScript CLI for Sanskrit Verbal Morphology & Ashtadhyayi Dhaturupa

Comprehensive Project Roadmap & Engineering Specification.

---

## 1. Executive Summary

`dhatugen` is a high-performance TypeScript CLI tool that replicates and extends the full capabilities of `dhaturupa-wasm` (the standalone WebAssembly clone of `ashtadhyayi.com/dhatu`), bringing all features into an exhaustive, composable, and scriptable command-line interface.

The CLI leverages:
1. **Underlying High-Performance WASM Engine** (`dhaturupa-wasm/pkg-node`): Vidyuṭ Prakriyā morphology engine, SLP1 byte-exact grammar rules, Harvard-Kyoto (HK) & Devanagari transliteration, sandhi, subanta declension, krdanta generation, and upasarga prefix derivation.
2. **Comprehensive Ground-Truth Corpus** (`data/` and `data/subanta_test/`):
   - 2,259 individual dhatu JSON files across all 10 gaṇas (`data/01/` to `data/10/`), containing metadata, 10 tiṅanta families/prayogasa × 10 lakāras, 5 kṛdanta participle families, upasarga meanings, Upasargārtha Candrikā citations, and literature prayoga.
   - 2,333 subanta test fixtures (`data/subanta_test/01/` to `10/`) containing exhaustive 8×3 declension matrices for all base and upasarga-prefixed kṛdantas.
   - Shabda oracle (`shabda2.json` / 9,007 nominals) for traditional word declensions and reverse word analysis.

---

## 2. Architecture & Tech Stack

- **Runtime**: Node.js v22+ (ESM & CommonJS compatible).
- **Language**: TypeScript 5.8+ (Strict mode, full type-safety).
- **CLI Framework**: `commander` (rich subcommands, argument parsing, help generation, auto-completion support).
- **Terminal UI & Styling**:
  - `cli-table3` for pristine Unicode box-drawing tables (3×3 tiṅanta matrices and 8×3 subanta matrices).
  - `chalk` / `picocolors` for terminal highlighting.
  - Pluggable formatters: Pretty Box Table, Compact CSV/TSV, Pure Markdown, Raw JSON.
- **WASM Bridge**: Direct zero-latency binding with `pkg-node/dhaturupa_wasm.js` and `dhaturupa_wasm_bg.wasm`.
- **Test Framework**: Vitest / Node Test Runner with multi-tiered suites:
  - *Tier 1: Unit & Smoke Tests* (instant feedback, script conversion, basic commands).
  - *Tier 2: Representative Gaṇa Golden Tests* (deep validation of key roots across all 10 gaṇas against `data/`).
  - *Tier 3: Exhaustive Golden Suite* (batch validation against all 2,259 dhatus and 2,333 `subanta_test` files).
  - *Tier 4: Reverse Search Audit* (verifying lossless 100% reverse lookup for all generated forms).

---

## 3. Project Phases & Milestones

### Phase 0: Workspace Setup & Foundations
- [x] Initialize `package.json`, `tsconfig.json`, `.gitignore`, and project layout (`src/`, `tests/`, `bin/`).
- [x] Vendor / link `pkg-node` WASM module and establish TypeScript type imports.
- [x] Create CLI entrypoint (`bin/dhatugen.ts` / `src/cli.ts`).
- [x] Set up testing framework (Vitest) with fast execution configuration.
- [x] Initialize `PROGRESS.md` tracking log.

### Phase 1: Core Engine & Data Access Layer
- [x] **WASM Wrapper (`src/engine/wasm.ts`)**:
  - Safe, typed bindings for all 43 WASM exports.
  - Script conversions (`to_devanagari`, `deva_to_slp1`, `hk_to_slp1`, `slp1_to_deva`, `slp1_to_hk`, IAST).
  - Query candidate generation and prefix splitting.
- [x] **Data Loader & Repository (`src/data/repo.ts`)**:
  - Fast lazy-loading for `data/GG/GG.NNNN.json`.
  - Baseindex normalization (`1.1` -> `01.0001`, `sk1` -> `01.0001`).
  - Metadata indexing for rapid filtering (gaṇa, pada, seṭ/aniṭ/veṭ, karmakatva).
  - Integration with `shabda2.json` and `vidyut_dhatupatha_5.tsv`.

### Phase 2: CLI Commands Implementation
- [x] **`dhatugen list`**:
  - Filters: `--gana <1-10>`, `--pada <P|A|U>`, `--settva <set|anit|vet>`, `--karma <sakarmaka|akarmaka|dvikarmaka>`, `--search <query>` (Sanskrit or English gloss).
  - Sorting: `--sort <az|num|gana>`, `--limit <n>`, `--offset <n>`.
- [x] **`dhatugen show <dhatu>`**:
  - Detailed metadata card (Upadeśa form, artha in English/Hindi/Sanskrit, gaṇa, pada, karmakatva, it-saṃjñā, Kaumudī numbers).
  - Section flags: `--all`, `--info`, `--upasarga`, `--chandrika`, `--prayoga`.
- [x] **`dhatugen ting <dhatu>`**:
  - Tiṅanta conjugation matrices (3×3: prathama/madhyama/uttama × eka/dvi/bahu).
  - Families: `shuddha`, `nich` (causative), `san` (desiderative), `yang` (intensive), `yangluk`.
  - Prayoga: `kartari` (active), `karmani` (passive).
  - Options: `--lakara <lat|lit|lut|lrut|lot|lang|vidhiling|ashirling|lung|lrung|all>`, `--prefix <upasarga>` (e.g. `pra`, `vi + ati`).
- [x] **`dhatugen krut <dhatu>`**:
  - Kṛdanta participle table (`base`, `m`, `f`, `n`).
  - Families: `shuddha`, `nich`, `san`, `yang`, `yangluk`.
  - Options: `--pratyaya <name>`, `--prefix <upasarga>`.
- [x] **`dhatugen subanta <stem> <m|f|n>`**:
  - 8×3 subanta declension matrix (prathamā to sambodhana × eka/dvi/bahu).
  - Direct kṛdanta click-through: `dhatugen subanta --dhatu <id> --krt <pratyaya> --gender <m|f|n> [--prefix <upasarga>]`.
- [x] **`dhatugen search <form>`**:
  - Cross-dhatu and in-dhatu reverse lookup.
  - Handles Devanagari, Harvard-Kyoto, and SLP1.
  - Matches tiṅanta, kṛdanta, subanta, and prefixed forms back to dhātu and grammatical coordinates.
- [x] **`dhatugen word <word>` / `dhatugen decline <word>`**:
  - Shabda view: analyze inflected words into base stem, gender, case, and number.
  - Decline any arbitrary noun / prātipadika in `m|f|n` with Shabda oracle fallbacks.
- [x] **`dhatugen prefix <stack> <base>`**:
  - Derive surface forms for upasarga prefixes + verb bases (e.g. `'वि + अति' भवति`).
- [x] **`dhatugen translit <text>`**:
  - Multi-script converter: Devanagari, Harvard-Kyoto (HK), SLP1, IAST.
  - Output formats: plain text, `--format json|markdown|csv|tsv`; `--script` honored as a `--to` parity alias.
- [x] **`dhatugen completion <shell>`** (Phase 5 deliverable):
  - Generates bash / zsh / fish completion scripts wired to the hidden
    `dhatugen __complete` engine, which resolves subcommands, per-command
    options, `--option=value` sequences, enumerated values (scripts,
    formats, lakāras, families, kṛt pratyayas, upasargas, genders, gaṇas)
    and dhātu identifiers via the 409KB lite index.
  - `DHATUGEN_BIN` env override for non-globally-linked installations.

### Phase 3: Output Formatting & Presentation Layer
- [x] Support `--format <table|json|csv|tsv|markdown>` across all commands.
- [x] Support `--script <deva|slp1|hk|iast>` across all commands (input can be HK/Deva/SLP1; output matches requested script).
- [x] Colorized terminal output with optional `--no-color` / `NO_COLOR` environment variable support.
- [x] Traditional Sanskrit matrix headers (प्रथमपुरुषः, मध्यमपुरुषः, उत्तमपुरुषः / एकवचनम्, द्विवचनम्, बहुवचनम्).

### Phase 4: Exhaustive Testing & Verification Suite
- [x] **Unit Tests (`tests/unit/`)**:
  - Script transliteration parity and edge cases.
  - Baseindex normalization and query parsing.
  - CLI argument validation and error handling.
- [x] **Golden Corpus Tests (`tests/golden/`)**:
  - Automated verification of tiṅanta tables against `data/01/`..`data/10/`.
  - Automated verification of kṛdanta tables against `data/01/`..`data/10/`.
  - Automated verification of upasarga prefixed tables against `upasarga_forms`.
- [x] **Subanta Declension Tests (`tests/subanta/`)**:
  - Automated test runner iterating over `data/subanta_test/` fixtures (8×3 cells per kṛt participle).
  - Multi-worker or batch validation for high throughput.
- [x] **Reverse-Lookup Audit (`tests/audit/`)**:
  - Verify every generated form maps back cleanly to its source entry.

### Phase 5: Developer Experience, Documentation & CI
- [x] Comprehensive documentation (`README.md`, man-style help, usage examples).
- [x] Shell auto-completion scripts (bash, zsh, fish) — `dhatugen completion <shell>` + hidden `dhatugen __complete` engine.
- [x] Performance benchmarks (startup time, latency per command, batch throughput).

---

## 4. Testing Plan Matrix

| Suite Name | Scope | Target Files | Invariant / Acceptance Criteria |
|---|---|---|---|
| `test:unit` | Core functions, translit, formats | `src/**/*.ts` | 100% pass, < 2s execution |
| `test:golden:sample` | 10 representative dhātus (one per gaṇa) | `data/01/01.0001.json`, etc. | 100% cell match across all 10 lakāras & kṛdantas |
| `test:subanta:sample` | Sample subanta declensions | `data/subanta_test/01/01.0001.json`, etc. | 100% cell match across all 24 subanta slots |
| `test:golden:full` | All 2,259 dhātus | `data/*/*.json` | 0 discrepancies with upstream scraped truth |
| `test:subanta:full` | All 2,333 subanta files | `data/subanta_test/*/*.json` | Complete match against ground truth tables |
| `test:audit` | Reverse-lookup audit | Generated forms | 100% recall for attested forms |
