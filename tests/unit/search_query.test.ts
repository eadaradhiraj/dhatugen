import { describe, it, expect } from 'vitest';
import { buildQueryReadings } from '../../src/commands/search.js';
import {
  schemeTokenDeva,
  detailsDeva,
  renderDetailsDeva,
  stackDeva,
  vacanaLabelDeva,
} from '../../src/formatters/labels.js';

describe('Search Query Readings', () => {
  it('resolves SLP1-typed aspirates ("Bavati") to Devanagari', () => {
    const { devaReadings, slp1Readings } = buildQueryReadings('Bavati');
    expect(devaReadings.has('भवति')).toBe(true);
    expect(slp1Readings.has('Bavati')).toBe(true);
  });

  it('resolves HK-typed digraphs with capital B ("Bhavati") to Devanagari', () => {
    const { devaReadings, slp1Readings } = buildQueryReadings('Bhavati');
    expect(devaReadings.has('भवति')).toBe(true);
    expect(slp1Readings.has('Bavati')).toBe(true);
  });

  it('resolves plain HK input ("bhavati") directly', () => {
    const { devaReadings, slp1Readings } = buildQueryReadings('bhavati');
    expect(devaReadings.has('भवति')).toBe(true);
    expect(slp1Readings.has('Bavati')).toBe(true);
  });

  it('handles Devanagari input and provides its SLP1 reading', () => {
    const { devaReadings, slp1Readings } = buildQueryReadings('भवति');
    expect(devaReadings.has('भवति')).toBe(true);
    expect(slp1Readings.has('Bavati')).toBe(true);
  });

  it('resolves causative forms for cross-reading matching', () => {
    const { devaReadings } = buildQueryReadings('corayati');
    expect(devaReadings.has('चोरयति')).toBe(true);
    const { devaReadings: d2 } = buildQueryReadings('Corayati');
    expect(d2.has('चोरयति')).toBe(true);
  });

  it('reduces no-reading noise for bogus latin words', () => {
    const { devaReadings } = buildQueryReadings('geth');
    // Should not crash and should produce at least the literal fallback.
    expect(devaReadings.size).toBeGreaterThan(0);
  });
});

describe('Search Detail Labels', () => {
  it('maps romanized family tokens to Devanagari (no mangling)', () => {
    expect(schemeTokenDeva('shuddha')).toBe('शुद्ध');
    expect(schemeTokenDeva('nich')).toBe('णिच्');
    expect(schemeTokenDeva('san_krut')).toBe('सन् + कृत्');
    expect(schemeTokenDeva('kartari')).toBe('कर्तरि');
  });

  it('maps pada-prefixed lakara raw keys', () => {
    expect(schemeTokenDeva('plat')).toBe('लट् (प)');
    expect(schemeTokenDeva('alit')).toBe('लिट् (आ)');
    expect(schemeTokenDeva('aashirling')).toBe('आशीर्लिङ् (आ)');
    expect(schemeTokenDeva('lat')).toBe('लट्');
  });

  it('transliterates pure slp1 scheme codes', () => {
    expect(schemeTokenDeva('SAnac')).toBe('शानच्');
    expect(schemeTokenDeva('kta')).toBe('क्त');
  });

  it('renders details across scripts from one deva label string', () => {
    const deva = detailsDeva(['shuddha', 'plat']);
    expect(deva).toBe('शुद्ध · लट् (प)');
    expect(renderDetailsDeva(deva, 'deva')).toBe(deva);
    expect(renderDetailsDeva(deva, 'slp1')).toContain('SudDa');
    expect(renderDetailsDeva(deva, 'iast')).toContain('śuddha');
  });

  it('joins slp1 upasarga stacks and labels subanta slots', () => {
    expect(stackDeva('aDi;AN')).toBe('अधि + आङ्');
    expect(stackDeva('प्र')).toBe('प्र');
    expect(vacanaLabelDeva('praTamA', 'eka')).toBe('प्रथमा एकवचनम्');
    expect(vacanaLabelDeva('bahu', 'bahu')).toBe('बहुवचनम्');
    expect(vacanaLabelDeva('dvitIyA', 'dvivacanam')).toBe('द्वितीया द्विवचनम्');
  });
});
