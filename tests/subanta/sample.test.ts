import { describe, it, expect } from 'vitest';
import { DhatuRepository } from '../../src/data/repo.js';
import { WasmEngine } from '../../src/engine/wasm.js';
import { transliterate } from '../../src/translit/index.js';

describe('Subanta Verification against data/subanta_test/', () => {
  it('validates 01.0001 (BU) base kṛt subanta tables across masculine, feminine, neuter', () => {
    const fixture = DhatuRepository.getSubantaFixture('01.0001');
    expect(fixture).toBeDefined();

    const participles = fixture?.base?.krut || [];
    expect(participles.length).toBeGreaterThan(0);

    // Test a sample masculine participle (e.g. Bavaka / vun)
    const masc = participles.find(p => p.gender === 'pu');
    expect(masc).toBeDefined();
    expect(masc?.table?.praTamA?.eka?.length).toBeGreaterThan(0);
    expect(masc?.table?.dvitIyA?.eka?.length).toBeGreaterThan(0);
    expect(masc?.table?.tFtIyA?.eka?.length).toBeGreaterThan(0);
    expect(masc?.table?.caturTI?.eka?.length).toBeGreaterThan(0);
    expect(masc?.table?.paYcamI?.eka?.length).toBeGreaterThan(0);
    expect(masc?.table?.zazWI?.eka?.length).toBeGreaterThan(0);
    expect(masc?.table?.saptamI?.eka?.length).toBeGreaterThan(0);
    expect(masc?.table?.sambodana?.eka?.length).toBeGreaterThan(0);

    // Test a sample feminine participle (e.g. BavikA / vun + wAp or BavantI / Satf)
    const fem = participles.find(p => p.gender === 'strI');
    expect(fem).toBeDefined();
    expect(fem?.table?.praTamA?.eka?.length).toBeGreaterThan(0);
    expect(fem?.table?.sambodana?.bahu?.length).toBeGreaterThan(0);

    // Test a sample neuter participle
    const neut = participles.find(p => p.gender === 'napuM');
    expect(neut).toBeDefined();
    expect(neut?.table?.praTamA?.eka?.length).toBeGreaterThan(0);
    expect(neut?.table?.dvitIyA?.eka?.length).toBeGreaterThan(0);
  });

  it('validates upasarga-prefixed subanta tables in fixture (e.g. pra, anu, vi;ati)', () => {
    const fixture = DhatuRepository.getSubantaFixture('01.0001');
    expect(fixture?.upasarga).toBeDefined();

    // Check 'pra' prefix
    const praKrut = fixture?.upasarga?.pra?.tabs?.krut;
    expect(praKrut).toBeDefined();
    expect(praKrut?.length).toBeGreaterThan(0);

    const firstPra = praKrut?.[0];
    expect(firstPra?.table?.praTamA?.eka?.length).toBeGreaterThan(0);
  });
});
