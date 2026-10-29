import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { describe, it, expect } from 'vitest';
import { DhatuRepository } from '../../src/data/repo.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.resolve(__dirname, '../../data');

describe('Exhaustive Golden Corpus Verification (All 2,259 Dhātus)', () => {
  it('validates all 2,259 dhatu data files across 10 ganas', () => {
    let totalDhatus = 0;
    let validConjugations = 0;
    let validParticiples = 0;

    for (let g = 1; g <= 10; g++) {
      const ganaDir = path.join(DATA_DIR, String(g).padStart(2, '0'));
      if (!fs.existsSync(ganaDir)) continue;

      const files = fs.readdirSync(ganaDir).filter(f => f.endsWith('.json'));
      totalDhatus += files.length;

      for (const f of files) {
        const filePath = path.join(ganaDir, f);
        const content = fs.readFileSync(filePath, 'utf8');
        const entry = JSON.parse(content);

        expect(entry.id).toBeDefined();
        expect(entry.info).toBeDefined();
        expect(Array.isArray(entry.info)).toBe(true);

        if (entry.conjugations && entry.conjugations.ting) {
          validConjugations++;
          const ting = entry.conjugations.ting;
          for (const [lakara, slots] of Object.entries(ting)) {
            expect(Array.isArray(slots)).toBe(true);
            expect((slots as any[]).length).toBeGreaterThanOrEqual(9);
          }
        }

        if (entry.participles && entry.participles.krut) {
          validParticiples++;
          expect(Object.keys(entry.participles.krut).length).toBeGreaterThan(0);
        }
      }
    }

    expect(totalDhatus).toBe(2259);
    expect(validConjugations).toBeGreaterThan(2200);
    expect(validParticiples).toBeGreaterThan(2200);
  }, 120000); // 120s timeout for scanning all 2,259 files
});
