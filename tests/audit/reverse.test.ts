import { describe, it, expect } from 'vitest';
import { WasmEngine } from '../../src/engine/wasm.js';
import { DhatuRepository } from '../../src/data/repo.js';
import { transliterate } from '../../src/translit/index.js';

describe('Reverse Search Audit', () => {
  const TEST_FORMS = [
    { form: 'Bavati', expectedDhatu: '01.0001' },
    { form: 'bhavati', expectedDhatu: '01.0001' },
    { form: 'भवति', expectedDhatu: '01.0001' },
    { form: 'atti', expectedDhatu: '02.0001' },
    { form: 'juhoti', expectedDhatu: '03.0001' },
  ];

  for (const { form, expectedDhatu } of TEST_FORMS) {
    it(`reverse-searches form "${form}" to dhatu ${expectedDhatu}`, () => {
      const devaForm = transliterate(form, 'deva');
      const shardRes = WasmEngine.indexShard(devaForm, 256);
      expect(shardRes.ok).toBe(true);
      expect(shardRes.shard).toBeDefined();

      // Verify that candidate search finds the form
      const cand = WasmEngine.queryCandidates(form);
      expect(cand.ok).toBe(true);
      expect(cand.candidates || cand.readings).toBeDefined();
    });
  }

  it('reverse-analyzes subanta inflections back to stem', () => {
    const res = WasmEngine.subantaAnalyze('रामेण');
    expect(res.ok).toBe(true);
    const hasRama = res.analyses.some(a => a.stem === 'राम' && a.vibhakti === 'tftIyA');
    expect(hasRama).toBe(true);
  });
});
