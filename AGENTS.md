# Agent Instructions: dhatugen

This file is automatically loaded by OpenCode and agentic coding harnesses. Follow all guidelines below when working in this repository.

---

## 1. Autonomous Execution Directives

1. **Be Autonomous & Relentless**:
   - Do not stop midway to ask for confirmation or permission for routine development steps.
   - Proceed methodically through the task until all objectives, tests, and verifications are 100% complete.
   - If tests fail or errors occur, self-diagnose and fix them immediately.

2. **Session Start Protocol**:
   - Always read `PROGRESS.md` and `ROADMAP.md` first.
   - Run `npm test` to verify a green baseline (all 29 unit & golden sample tests must pass in <2s).

3. **Session Completion Protocol**:
   - Run `npm run build` (`tsc`) and `npm test`.
   - Update `PROGRESS.md` with the latest status, changes made, and test outputs before concluding.

---

## 2. Invariants & Guardrails

1. **Keep it Ultra-Fast**:
   - Cold CLI execution must remain under **150ms**.
   - Always use the fast-path in `DhatuRepository.normalizeBaseindex` to avoid reading the 409KB lite index when standard IDs (`01.0001`, `1.1`) are given.
   - In `search`, always use the 256 hash shards in `data/shards/` for O(1) millisecond lookup.

2. **100% Wholly Self-Sufficient & Offline**:
   - Zero remote network dependencies (no APIs, CDNs, external fetches).
   - Zero relative path references outside `dhatugen/`. All assets resolve relative to `PROJECT_ROOT`.
   - The compiled WebAssembly bundle lives in `vendor/pkg-node/`.

3. **Script & Format Parity**:
   - Default output script is **SLP1** (`Bavati`, `rAma`).
   - Every command must support `--script <slp1|deva|hk|iast>`.
   - Every command must support `--format <table|json|markdown|csv|tsv>` and `--json`.

---

## 3. Quick Reference

- **Build**: `npm run build` (`tsc`)
- **Direct Run**: `node dist/cli.js <command>` or `npm run dev -- <command>`
- **Fast Test Suite (<2s)**: `npm test`
- **Subanta Tests**: `npm run test:subanta`
- **Audit Tests**: `npm run test:audit`
- **Exhaustive Tests (all 2,259 roots & 2,333 subanta files)**: `npm run test:full`
