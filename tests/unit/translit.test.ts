import { describe, it, expect } from 'vitest';
import {
  devaToSlp1,
  slp1ToDeva,
  hkToSlp1,
  slp1ToHk,
  slp1ToIast,
  iastToSlp1,
  transliterate,
} from '../../src/translit/index.js';

describe('Transliteration Engine', () => {
  it('converts Devanagari to SLP1 and back', () => {
    const deva = 'भवति';
    const slp1 = devaToSlp1(deva);
    expect(slp1).toBe('Bavati');
    expect(slp1ToDeva(slp1)).toBe(deva);

    const deva2 = 'गच्छन्ति';
    const slp1_2 = devaToSlp1(deva2);
    expect(slp1_2).toBe('gacCanti');
    expect(slp1ToDeva(slp1_2)).toBe(deva2);
  });

  it('converts Harvard-Kyoto to SLP1 and back', () => {
    const hk = 'bhavati';
    const slp1 = hkToSlp1(hk);
    expect(slp1).toBe('Bavati');
    expect(slp1ToHk(slp1)).toBe(hk);

    const hk2 = 'rAmaH';
    const slp1_2 = hkToSlp1(hk2);
    expect(slp1_2).toBe('rAmaH');
    expect(slp1ToHk(slp1_2)).toBe(hk2);
  });

  it('converts SLP1 to IAST and back', () => {
    const slp1 = 'Bavati';
    const iast = slp1ToIast(slp1);
    expect(iast).toBe('bhavati');
    expect(iastToSlp1(iast)).toBe(slp1);

    const slp1_2 = 'kftavAn';
    const iast_2 = slp1ToIast(slp1_2);
    expect(iast_2).toBe('kṛtavān');
    expect(iastToSlp1(iast_2)).toBe(slp1_2);
  });

  it('universal transliterate helper works across scripts', () => {
    expect(transliterate('भवति', 'slp1')).toBe('Bavati');
    expect(transliterate('bhavati', 'slp1', 'hk')).toBe('Bavati');
    expect(transliterate('bhavati', 'deva', 'hk')).toBe('भवति');
    expect(transliterate('Bavati', 'iast')).toBe('bhavati');
    expect(transliterate('Bavati', 'deva')).toBe('भवति');
  });
});
