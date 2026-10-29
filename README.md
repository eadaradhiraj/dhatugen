# dhatugen

> **Comprehensive TypeScript CLI for Sanskrit verbal morphology, Ashtadhyayi dhaturupa, and subanta declensions.**

`dhatugen` brings the full functionality of `dhaturupa-wasm` (the standalone WebAssembly clone of `ashtadhyayi.com/dhatu`) to the command line, with exhaustive options, multi-format export, multi-script transliteration, and a complete Paninian morphology test suite.

---

## Features

- **Tiṅanta Conjugations (`ting`)**: Full 3×3 conjugation matrices across all 10 lakāras, 5 families (`shuddha`, `nich`, `san`, `yang`, `yangluk`), 2 voices (`kartari`, `karmani`), and prefix stacks (`pra`, `vi + ati`, etc.).
- **Kṛdanta Participles (`krut`)**: Complete participle tables with `base`, `m`, `f`, `n` forms for ~60+ kṛt pratyayas.
- **Subanta Declensions (`subanta`)**: Traditional 8×3 nominal declension matrices (prathamā to sambodhana × eka, dvi, bahu) for any stem, or direct kṛdanta click-through.
- **Word View & Reverse Analysis (`word` / `decline`)**: Analyze any inflected word to its base stem, gender, case, and number, backed by the 9,007-word Ashtadhyayi Shabda oracle (`shabda2.json`).
- **Lightning-Fast Reverse Search (`search`)**: O(1) hash-sharded reverse search across 2,259 dhātus and ~19.2 million forms (three tiers × 256 shards: bare tiṅ/kṛt/prefixed, kṛdanta declensions, upasarga-prefixed forms) at ~130-190ms cold per process, byte-offset shard indexes — no multi-second scans. Multi-reading query normalization resolves the classic latin ambiguity (`Bhavati` vs `Bavati` vs `bhavati`) automatically.
- **Shell Auto-Completion (`completion`)**: One-command generation of bash, zsh, and fish completion scripts. Suggestions cover subcommands, per-command options, enumerated grammatical values, and dhātu identifiers, driven by the CLI's own live engine.
- **Dhatu Metadata & Literature (`show`)**: Complete Upadeśa form, gaṇa, pada, seṭ/aniṭ, karmakatva, Upasargārtha Candrikā citations, and classical literature quotations (Rāmāyaṇa, Gītā, Raghuvaṃśa).
- **Interactive REPL (`repl`)**: Full interactive shell with command history and prompt.
- **Universal Multi-Script Support**: Seamless conversion between **SLP1** (default), **Devanagari**, **Harvard-Kyoto (HK)**, and **IAST** via `--script <deva|slp1|hk|iast>`.
- **Flexible Output Formats**: Human-readable Unicode box tables, pure JSON (`--json`), GitHub Flavored Markdown (`--format markdown`), CSV, and TSV.
- **Exhaustive Test Suites**: Multi-tiered verification against `data/` (2,259 dhātu JSONs) and `data/subanta_test/` (2,333 subanta test files).

---

## Installation & Setup

Requirements:
- Node.js v22+
- NPM

```bash
git clone https://github.com/ashtadhyayi-com/dhatugen.git
cd dhatugen
npm install
npm run build
```

Link globally (optional):
```bash
npm link
dhatugen --help
```

---

## CLI Usage & Commands

### 1. Interactive REPL Mode
```bash
dhatugen repl
# or in Devanagari:
dhatugen repl --script deva
```

### 2. Shell Auto-Completion (`completion`)
Generate tab-completion scripts for your shell. Suggestions are produced live by
the CLI itself (`dhatugen __complete`), so they always cover the full command
registry, every option, enumerated values (`--script`, `--format`, `--lakara`,
`--family`, `--pratyaya`, `--gender`, ...) and dhātu identifiers.

```bash
# bash (requires bash >= 4):
dhatugen completion bash >> ~/.bashrc

# zsh: place in a $fpath directory (as "_dhatugen"):
mkdir -p ~/.zfunc && dhatugen completion zsh > ~/.zfunc/_dhatugen
#  and in ~/.zshrc, before compinit:  fpath=(~/.zfunc $fpath)

# fish:
dhatugen completion fish > ~/.config/fish/completions/dhatugen.fish
```

Notes:
- When the package is not globally linked, set `DHATUGEN_BIN` to the entrypoint
  used by the completion scripts, e.g.
  `export DHATUGEN_BIN="node /path/to/dhatugen/dist/cli.js"`.
- Dhātu identifier completion requires a prefix (e.g. `01.`, `bh`, `भ`) to avoid
  flooding the terminal with all 2,259 ids.
- All completion scripts support `--format json|markdown|csv|tsv` for
  programmatic generation.

### 3. Listing & Filtering Dhātus (`list`)
Filter by gaṇa, pada, iḍāgama, karmakatva, or search term:
```bash
# List first 10 dhatus in Gana 1 (Bvadi)
dhatugen list --gana 1 --limit 10

# Filter Parasmaipada, Set roots in Gana 1
dhatugen list --gana 1 --pada P --settva S

# Search by English gloss
dhatugen list --search "exist"

# Output as markdown table
dhatugen list --limit 5 --format markdown

# Output as JSON
dhatugen list --limit 3 --json
```

### 4. Detailed Dhātu Card (`show`)
```bash
# Basic metadata card
dhatugen show 01.0001
dhatugen show BU
dhatugen show 1.1

# Include Upasargas, Chandrika commentary, and classical literature quotations
dhatugen show 01.0001 --all
dhatugen show 01.0001 --chandrika
dhatugen show 01.0001 --prayoga
```

### 5. Tiṅanta Verbal Conjugations (`ting`)
```bash
# Present tense (lat) for root BU
dhatugen ting 01.0001 --lakara lat

# In Devanagari script
dhatugen ting 01.0001 --lakara lat --script deva

# Causative (nich), passive (karmani)
dhatugen ting 01.0001 --family nich --prayoga karmani --lakara lat

# With Upasarga prefixing
dhatugen ting 01.0001 --lakara lat --prefix pra
dhatugen ting 01.0001 --lakara lat --prefix 'vi + ati'
```

### 6. Kṛdanta Participles (`krut`)
```bash
# All participles for root BU
dhatugen krut 01.0001

# Filter for a specific pratyaya (e.g. ktavatu)
dhatugen krut 01.0001 --pratyaya ktavatu

# Participles in Desiderative (san) family
dhatugen krut 01.0001 --family san
```

### 7. Subanta Nominal Declensions (`subanta`)
```bash
# Decline stem in masculine (m)
dhatugen subanta rAma m

# Decline in feminine (f)
dhatugen subanta BavantI f

# Direct click-through from a dhatu participle
dhatugen subanta --dhatu 01.0001 --krt Satf --gender f
```

### 8. Word View & Reverse Analysis (`word` / `decline`)
```bash
# Reverse-analyze inflected noun to find base stem and case
dhatugen word rAmeRa
dhatugen word सरिद्भ्याम्

# Decline an arbitrary word using traditional Shabda oracle
dhatugen decline sarit f
```

### 9. Reverse Search (`search`)
```bash
# Cross-dhatu search across all 2,259 roots (works in HK, SLP1, or Devanagari)
dhatugen search Bavati
dhatugen search bhavati
dhatugen search भवति

# In-dhatu search restricted to root 01.0001
dhatugen search Bavati --dhatu 01.0001
```

### 10. Upasarga Prefix Derivation (`prefix`)
```bash
dhatugen prefix pra Bavati
dhatugen prefix 'vi + ati' Bavati
dhatugen prefix 'वि + अति' भवति --script deva
```

### 11. Script Transliteration (`translit`)
```bash
dhatugen translit भवति               # -> Bavati
dhatugen translit Bavati --to deva    # -> भवति
dhatugen translit bhavati --to iast   # -> bhavati

# --script parity with all other commands (acts as the target script):
dhatugen translit भू --script hk      # -> bhU
# Machine-readable output:
dhatugen translit भवति --format json
dhatugen translit Bavati --format csv
```

---

## Testing

`dhatugen` features an exhaustive, multi-tiered test suite:

```bash
# 1. Fast suite: Unit tests + 10 representative roots from all 10 ganas (<2s)
npm test

# 2. Subanta test suite against ground truth fixtures:
npm run test:subanta

# 3. Reverse search audit:
npm run test:audit

# 4. Exhaustive golden verification (all 2,259 dhatus and 2,333 subanta files):
npm run test:full

# 5. (OPTIONAL, ~40 min) Per-cell cross-implementation recompute sweep:
#    re-derives all ~51.4M subanta cells via the wasm engine and diffs them
#    against the upstream-generated fixtures (86.6% exact; the remainder are
#    classified valid alternant policies — see tests/subanta/recompute.test.ts):
npm run test:recompute
```

---

## Project Structure

```
dhatugen/
├── bin/
├── data/
│   ├── 01/ .. 10/              # 2,259 full dhatu JSON entries
│   ├── subanta_test/01/ .. 10/ # 2,333 subanta declension test fixtures
│   ├── dhatu_data_lite.json    # Fast metadata index
│   ├── shabda2.json            # 9,007-word Shabda oracle
│   └── shards/                 # 3 tiers × 256 hash shards + .idx.bin byte-offset indexes (base: tiṅ/kṛt/prefixed, sub/: kṛdanta declensions, stack/: upasarga-prefixed)
├── src/
│   ├── cli.ts                  # Commander CLI entrypoint
│   ├── types.ts                # TypeScript interfaces
│   ├── translit/               # Bidirectional SLP1, Devanagari, HK, IAST engine
│   ├── engine/wasm.ts          # Safe wrapper for Vidyut WASM module
│   ├── data/repo.ts            # High-speed data repository & caching
│   ├── formatters/             # Unicode tables, Markdown, CSV, TSV, JSON
│   └── commands/               # CLI subcommand handlers (list, show, ting, etc.)
├── tests/
│   ├── unit/                   # Unit tests (translit, wasm, repo, formatters)
│   ├── golden/                 # Golden corpus verification (sample & full)
│   ├── subanta/                # Subanta verification against data/subanta_test/
│   └── audit/                  # Reverse search audit
├── ROADMAP.md                  # Comprehensive project engineering specification
└── PROGRESS.md                 # State, decisions, milestones, and session handover log
```

---

## License

MIT
