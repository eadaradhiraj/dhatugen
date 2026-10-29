import { describe, it, expect } from 'vitest';
import { DhatuRepository } from '../../src/data/repo.js';

describe('Dhatu Repository', () => {
  it('normalizes baseindex across varied input notations', () => {
    expect(DhatuRepository.normalizeBaseindex('01.0001')).toBe('01.0001');
    expect(DhatuRepository.normalizeBaseindex('1.1')).toBe('01.0001');
    expect(DhatuRepository.normalizeBaseindex('01.1')).toBe('01.0001');
    expect(DhatuRepository.normalizeBaseindex('10.4')).toBe('10.0004');
    expect(DhatuRepository.normalizeBaseindex('BU')).toBe('01.0001');
    expect(DhatuRepository.normalizeBaseindex('भू')).toBe('01.0001');
    expect(DhatuRepository.normalizeBaseindex('bhU')).toBe('01.0001');
  });

  it('loads full dhatu entry for 01.0001 (BU)', () => {
    const entry = DhatuRepository.getDhatu('01.0001');
    expect(entry).toBeDefined();
    expect(entry?.id).toBe('01.0001');
    expect(entry?.conjugations).toBeDefined();
    expect(entry?.conjugations.ting).toBeDefined();
    expect(entry?.conjugations.ting.plat).toBeDefined();
    expect(entry?.conjugations.ting.plat.length).toBe(9);
    // Plat slot 0 is 'Bavati'
    expect(entry?.conjugations.ting.plat[0]).toBe('Bavati');
  });

  it('filters and lists dhatus by gana, pada, settva', () => {
    const res = DhatuRepository.listDhatus({ gana: 1, pada: 'P', limit: 10 });
    expect(res.total).toBeGreaterThan(0);
    expect(res.items.length).toBe(10);
    expect(res.items[0].baseindex).toBe('01.0001');
  });

  it('searches dhatus by English gloss', () => {
    const res = DhatuRepository.listDhatus({ search: 'exist' });
    expect(res.total).toBeGreaterThan(0);
    const hasBu = res.items.some(d => d.baseindex === '01.0001');
    expect(hasBu).toBe(true);
  });

  it('loads subanta test fixture for 01.0001', () => {
    const fixture = DhatuRepository.getSubantaFixture('01.0001');
    expect(fixture).toBeDefined();
    expect(fixture?.id).toBe('01.0001');
    expect(fixture?.base).toBeDefined();
    expect(fixture?.base.krut).toBeDefined();
    expect(fixture?.base.krut.length).toBeGreaterThan(0);
  });

  it('reads Shabda oracle entries', () => {
    const entries = DhatuRepository.getShabdaEntries('अ');
    expect(entries.length).toBeGreaterThan(0);
    expect(entries[0].cells.length).toBe(24);
  });
});
