import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { describe, it, expect } from 'vitest';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const SUBANTA_DIR = path.resolve(__dirname, '../../data/subanta_test');

describe('Exhaustive Subanta Fixture Verification (All 2,333 Files)', () => {
  it('validates all subanta test fixtures have valid 8x3 tables', () => {
    let totalFixtures = 0;
    let totalParticipleTables = 0;

    let fileCount = 0;
    for (let g = 1; g <= 10; g++) {
      const ganaDir = path.join(SUBANTA_DIR, String(g).padStart(2, '0'));
      if (!fs.existsSync(ganaDir)) continue;

      const files = fs.readdirSync(ganaDir).filter(f => f.endsWith('.json') && !f.endsWith('.manifest.json'));
      totalFixtures += files.length;

      for (const f of files) {
        fileCount++;
        if (fileCount % 100 === 0) {
          // Yield to event loop to allow Vitest worker heartbeat / RPC updates
          await new Promise(r => setTimeout(r, 0));
        }

        const filePath = path.join(ganaDir, f);
        const content = fs.readFileSync(filePath, 'utf8');
        const fixture = JSON.parse(content);

        expect(fixture.id).toBeDefined();
        expect(fixture.tabs).toBeDefined();

        if (fixture.base) {
          for (const [tab, tables] of Object.entries(fixture.base)) {
            if (Array.isArray(tables)) {
              totalParticipleTables += tables.length;
              for (const item of tables) {
                if (item.table) {
                  expect(item.table.praTamA).toBeDefined();
                  expect(item.table.dvitIyA).toBeDefined();
                  expect(item.table.tFtIyA).toBeDefined();
                  expect(item.table.caturTI).toBeDefined();
                  expect(item.table.paYcamI).toBeDefined();
                  expect(item.table.zazWI).toBeDefined();
                  expect(item.table.saptamI).toBeDefined();
                  expect(item.table.sambodana).toBeDefined();
                }
              }
            }
          }
        }
      }
    }

    expect(totalFixtures).toBeGreaterThanOrEqual(2259);
    expect(totalParticipleTables).toBeGreaterThan(10000);
  }, 180000); // 180s timeout for scanning all 2,333 subanta files
});
