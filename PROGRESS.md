# Progress Log — dhatugen (TypeScript CLI for Sanskrit Morphology)

> **Handover Note for Any Future LLM / Session**:
> Read this file first, then `ROADMAP.md` and `README.md`.
> - **Workspace**: `/home/edhiraj/Documents/projs/dhatugen`
> - **Parent Project**: `/home/edhiraj/Documents/projs/dhaturupa-wasm` (contains Rust source, `pkg-node/` WASM package, web app, and upstream reference files).
> - **Runtime**: Node.js v22.14.0 located at `~/.local/opt/node-v22.14.0-linux-x64/bin/node` (linked to `~/.local/bin/node`).
> - **Corpus Data**:
>   - `data/01/` to `data/10/`: 2,259 individual JSON files for all dhātus with complete metadata, conjugations, participles, upasargas, chandrika, prayoga, and upasarga_forms.
>   - `data/subanta_test/01/` to `data/subanta_test/10/`: 2,333 individual JSON files with complete 8×3 subanta declension tables for all participles (base and upasarga-prefixed).
>   - `data/dhatu_data_lite.json`: 409 KB fast index for listing and searching across all 2,259 dhātus.
>   - `data/shabda2.json`: 6.7 MB dictionary containing 9,007 words with 24 traditional subanta declension cells each (Ashtadhyayi Shabda oracle).
>   - `data/shards/`: 256 hash shards for instant O(1) reverse search across 23 million forms.
> - **WASM Library**: `vendor/pkg-node/dhaturupa_wasm.js` (+ `.wasm` + `.d.ts`), exporting 43 native morphology functions. Tested and verified working with Node.js v22.

---

## 1. Project State & Milestones

- **Current Status**: All Core Phases Implemented & Verified (Phases 0, 1, 2, 3, 4, 5, 6 Complete)
- **Last Updated**: 2026-10-29
- **Overall Completion**: 6 / 6 Phases Complete

### User-Locked Design Specifications (Confirmed)
1. **Default Script**: SLP1 (`Bavati`, `rAma`, etc.), with `--script <deva|iast|hk|slp1>` available on all commands. Input script is auto-detected (Devanagari, HK, SLP1, IAST).
2. **Command Architecture**: Rich subcommand hierarchy (`list`, `show`, `ting`, `krut`, `subanta`, `search`, `word`, `prefix`, `translit`, `audit`) plus interactive REPL (`dhatugen repl`).
3. **Output Formats**: Full suite across all commands via `--format <table|json|markdown|csv|tsv>` (with `--json` as a direct shortcut). Terminal tables use rich Unicode box drawing with 3×3 (tiṅanta) and 8×3 (subanta) matrix formats.
4. **Testing Architecture**:
   - `npm test` / `npm run test:fast`: Unit tests + 10 representative roots covering all 10 gaṇas (~2s).
   - `npm run test:subanta`: Subanta declensions against ground truth fixtures.
   - `npm run test:audit`: Reverse-lookup audit.
   - `npm run test:full`: Exhaustive test runner validating all 2,259 dhātus against `data/` and all 2,333 subanta test files against `data/subanta_test/`.

| Phase | Description | Status | Details |
|---|---|---|---|
| **Phase 0** | Workspace & Scaffolding | ✅ Done | Node v22 configured, package.json, tsconfig.json, vendor/pkg-node |
| **Phase 1** | WASM & Data Access Layer | ✅ Done | Safe typed WasmEngine wrapper, DhatuRepository, fast indexing |
| **Phase 2** | CLI Commands Implementation | ✅ Done | `list`, `show`, `ting`, `krut`, `subanta`, `search`, `word`, `prefix`, `translit`, `repl` |
| **Phase 3** | Formatter & Presentation | ✅ Done | 3×3 and 8×3 Unicode matrices, markdown, csv, tsv, json, transliteration |
| **Phase 4** | Subanta & Word Engine | ✅ Done | Shabda oracle (9,007 words) + Vidyut nominal declension & reverse analysis |
| **Phase 5** | Exhaustive Test Suites | ✅ Done | Fast unit/golden sample tests (29/29 passing), full golden (2,259 dhatus passing) |
| **Phase 6** | Packaging & Documentation | ✅ Done | ROADMAP.md, PROGRESS.md, README.md, executable CLI bin link |

---

## 2. Environment & System Details

- **OS**: Linux x86_64 (Arch Linux)
- **Node.js**: `v22.14.0` (in `~/.local/bin/node`)
- **NPM**: `10.9.2` (in `~/.local/bin/npm`)
- **Node WASM Capability**: Verified. `require('./vendor/pkg-node/dhaturupa_wasm.js')` loads synchronously with 43 exported functions.

---

## 3. Implemented Modules & Architecture

1. **`src/types.ts`**:
   - TypeScript definitions for `DhatuEntry`, `InfoItem`, `SubantaEntry`, `SubantaSlotMatrix`, `SubantaTestFixture`, `SearchResultItem`, `ScriptType`, `OutputFormat`.

2. **`src/translit/index.ts`**:
   - High-performance, zero-dependency bidirectional transliterator between Devanagari, SLP1, Harvard-Kyoto (HK), and IAST.
   - Smart script autodetection (`detectScript`) distinguishing SLP1 aspirates (`B`, `D`, `T`, `G`) from HK digraphs (`bh`, `dh`, `th`, `gh`) and vocalic `R` vs consonant `R`.

3. **`src/engine/wasm.ts`**:
   - Safe, typed wrapper around `vendor/pkg-node/dhaturupa_wasm.js`.
   - Methods: `subantaTable`, `subantaAnalyze`, `prefixedForms`, `prefixedTableCtx`, `krtSubanta`, `queryCandidates`, `toDevanagari`, `indexShard`, `engineStamp`.

4. **`src/data/repo.ts`**:
   - Fast repository for `data/01/` to `data/10/`.
   - Baseindex normalizer (`1.1` -> `01.0001`, `BU` -> `01.0001`, `भू` -> `01.0001`).
   - In-memory cache for fast file retrieval.
   - Shabda oracle reader for `data/shabda2.json` (9,007 words with 24 traditional cells each).
   - Fast filtering, sorting, and pagination across all 2,259 dhātus.

5. **`src/formatters/`**:
   - `table.ts`: Beautiful 3×3 Tiṅanta matrices, 8×3 Subanta matrices, Kṛdanta tables, and metadata cards using `cli-table3` and `picocolors`.
   - `index.ts`: Pluggable serializers for `markdown`, `csv`, `tsv`, and `json`.

6. **`src/commands/`**:
   - `list.ts`: Filtering by gaṇa, pada, seṭ, karma, and text/gloss search.
   - `show.ts`: Metadata card with optional `--all`, `--upasarga`, `--chandrika`, `--prayoga` sections.
   - `ting.ts`: Verbal conjugations across 10 lakāras, 5 families, 2 voices, and prefix stacks.
   - `krut.ts`: Participles with base, m, f, n columns.
   - `subanta.ts`: Nominal declension for arbitrary stems or via dhātu participle click-through.
   - `search.ts`: Reverse search with instant O(1) hash sharding (<50ms).
   - `word.ts`: Morphological reverse analysis + traditional Shabda oracle lookup.
   - `prefix.ts`: Upasarga surface derivation.
   - `translit.ts`: Transliteration CLI tool.
   - `repl.ts`: Interactive REPL shell.

---

## 4. Test Verification Status

- **`npm test`**:
  - `tests/unit/translit.test.ts` (4/4 passed)
  - `tests/unit/wasm.test.ts` (4/4 passed)
  - `tests/unit/repo.test.ts` (6/6 passed)
  - `tests/unit/formatters.test.ts` (5/5 passed)
  - `tests/golden/sample.test.ts` (10/10 representative gaṇas passed)
  - Total: 29 passed in 1.69 seconds.
- **`npm run test:subanta`**:
  - Subanta sample fixtures against `data/subanta_test/` (2/2 passed in 0.86s).
- **`npm run test:audit`**:
  - Reverse lookup audit (6/6 passed in 0.50s).
- **`npm run test:full`**:
  - Exhaustive golden test: all 2,259 dhātus in `data/01/` to `data/10/` verified with 0 errors.
  - Exhaustive subanta test: all 2,333 subanta test files in `data/subanta_test/`.

---

## 5. Key Design Decisions & Performance

1. **Wholly Self-Sufficient & Independent Architecture**:
   - **Zero External Dependencies**: All WASM binaries (`vendor/pkg-node/`), data files (`data/01`..`10`), subanta fixtures (`data/subanta_test/`), Shabda oracle (`data/shabda2.json`), fast lite index (`data/dhatu_data_lite.json`), and 256 hash shards (`data/shards/`) are stored locally inside `dhatugen`.
   - **Zero Network Calls**: Runs 100% offline. No CDNs, no API endpoints, no network overhead.
   - **Relocation Safe**: Zero relative references outside the workspace (`PROJECT_ROOT` resolves internally).
2. **Ultra-High Speed Optimization**:
   - **Cold CLI Boot Time**: ~90ms to 150ms total process execution (from `node` process start to terminal print and exit).
   - **Warm / REPL Execution**:
     - `subanta`: **~10ms**
     - `ting`: **~50ms**
     - `search`: **~80ms** (instant O(1) hash sharding across 23 million forms).
   - **Fast-Path Normalization**: Bypasses index loading when baseindex is already formatted (`01.0001` or `1.1`), loading only the specific requested dhatu JSON in <5ms.
3. **Pluggable Output Formats**:
   - Default: Human-readable terminal matrix (Unicode borders, Devanagari/SLP1 headers).
   - `--json`: Machine-readable JSON output for scripting, pipelines, and tools.
   - `--format markdown`: Clean markdown tables for notes and documentation.
   - `--script <deva|slp1|hk|iast>`: Universal transliteration flag on all commands.
4. **Multi-tiered Testing**:
   - Quick tests run in < 2 seconds for interactive development (`npm test`).
   - Sample golden tests run across 10 gaṇas.
   - Exhaustive tests run across all 2,259 dhatus and 2,333 subanta files with progress indicators.

---

## 6. Protocol for Future LLMs / Autonomous Sessions

When an LLM agent is prompted to resume or extend work in this repository (e.g. via `/goal` or an autonomous prompt):

1. **Orientation**:
   - First read `PROGRESS.md` (this file) and `ROADMAP.md`.
   - Run `npm test` to verify that the environment and 29 baseline tests are passing.
2. **Key Invariants**:
   - **Keep it fast**: Maintain the cold startup time (<150ms) and warm REPL speed (<50ms). Always use the fast-path baseindex check and shard lookup.
   - **Self-sufficiency**: Do not introduce remote network dependencies or hardcode paths outside `dhatugen/`. All assets must resolve relative to `PROJECT_ROOT`.
   - **Script Parity**: All new commands/features must support `--script <slp1|deva|hk|iast>` (default `slp1`).
   - **Multi-Format Output**: All new commands should support `--format <table|json|markdown|csv|tsv>` and `--json`.
3. **Execution Workflow**:
   - Make code edits in `src/`.
   - Run `npm run build` (`tsc`).
   - Run test suite: `npm test`, `npm run test:subanta`, `npm run test:audit`.
   - Update `PROGRESS.md` with new features, test results, and decisions before closing the turn.
