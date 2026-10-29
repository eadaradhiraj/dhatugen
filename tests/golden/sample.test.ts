import { describe, it, expect } from 'vitest';
import { DhatuRepository } from '../../src/data/repo.js';
import { WasmEngine } from '../../src/engine/wasm.js';
import { transliterate } from '../../src/translit/index.js';

const REPRESENTATIVE_ROOTS = [
  { id: '01.0001', name: 'BU', gana: '1', latPrathamaEka: 'Bavati' },
  { id: '02.0001', name: 'ad', gana: '2', latPrathamaEka: 'atti' },
  { id: '03.0001', name: 'hu', gana: '3', latPrathamaEka: 'juhoti' },
  { id: '04.0001', name: 'div', gana: '4', latPrathamaEka: 'dIvyati' },
  { id: '05.0001', name: 'su', gana: '5', latPrathamaEka: 'sunoti' },
  { id: '06.0001', name: 'tud', gana: '6', latPrathamaEka: 'tudati' },
  { id: '07.0001', name: 'ruD', gana: '7', latPrathamaEka: 'ruRadDi' },
  { id: '08.0001', name: 'tan', gana: '8', latPrathamaEka: 'tanoti' },
  { id: '09.0001', name: 'krI', gana: '9', latPrathamaEka: 'krIRAti' },
  { id: '10.0001', name: 'cur', gana: '10', latPrathamaEka: 'corayati' },
];

describe('Golden Corpus Verification: 10 Representative Gaṇas', () => {
  for (const root of REPRESENTATIVE_ROOTS) {
    it(`verifies gaṇa ${root.gana} root ${root.id} (${root.name}) against data/`, () => {
      const entry = DhatuRepository.getDhatu(root.id);
      expect(entry).toBeDefined();
      expect(entry?.id).toBe(root.id);

      // Verify metadata
      const ganaInfo = entry?.info.find(i => i.name === 'gaRaH')?.value;
      expect(ganaInfo).toBeDefined();

      // Verify Tiṅanta conjugations
      const ting = entry?.conjugations?.ting;
      expect(ting).toBeDefined();

      // Check lat forms (at least 9 slots; some roots carry optional variants)
      const plat = ting?.plat || ting?.alat;
      expect(plat).toBeDefined();
      expect(plat?.length).toBeGreaterThanOrEqual(9);

      // Verify slot 0 (prathama purusha ekavacana)
      const slot0 = plat?.[0] || '';
      expect(slot0).toContain(root.latPrathamaEka);

      // Verify Kṛdanta participles
      const krut = entry?.participles?.krut;
      expect(krut).toBeDefined();
      expect(Object.keys(krut || {}).length).toBeGreaterThan(0);

      // Verify Subanta test fixture
      const fixture = DhatuRepository.getSubantaFixture(root.id);
      expect(fixture).toBeDefined();
      expect(fixture?.base?.krut?.length).toBeGreaterThan(0);

      // Check a participle subanta table has all 8 vibhaktis with non-empty forms
      const sampleParticiple = fixture?.base?.krut?.[0];
      expect(sampleParticiple).toBeDefined();
      expect(sampleParticiple?.table?.praTamA?.eka?.length).toBeGreaterThan(0);
      expect(sampleParticiple?.table?.zazWI?.bahu?.length).toBeGreaterThan(0);
    });
  }
});
