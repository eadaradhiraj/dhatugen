import { describe, it, expect } from 'vitest';
import { WasmEngine } from '../../src/engine/wasm.js';

describe('WASM Engine Bindings', () => {
  it('returns valid engine stamp', () => {
    const stamp = WasmEngine.engineStamp();
    expect(stamp).toBeDefined();
    expect(stamp.length).toBeGreaterThan(0);
  });

  it('generates subanta table for rAma (m)', () => {
    const res = WasmEngine.subantaTable('rAma', 'm');
    expect(res.ok).toBe(true);
    expect(res.tables.length).toBeGreaterThan(0);
    const table = res.tables[0];
    expect(table.stem).toBe('राम');
    expect(table.cells.length).toBe(24);
    // Prathama ekavacana should be रामः
    expect(table.cells[0].forms).toContain('रामः');
  });

  it('analyzes inflected subanta form', () => {
    const res = WasmEngine.subantaAnalyze('रामेण');
    expect(res.ok).toBe(true);
    expect(res.analyses.length).toBeGreaterThan(0);
    const hasRamaInst = res.analyses.some(a => a.stem === 'राम' && a.vibhakti === 'tftIyA');
    expect(hasRamaInst).toBe(true);
  });

  it('derives prefixed surface forms', () => {
    const forms = WasmEngine.prefixedForms('प्र', 'भवति');
    expect(forms).toContain('प्रभवति');
  });
});
