import { describe, it, expect } from 'vitest';
import { ventures, layoutFor, PHASE_COUNT } from '../ventures';
import { sectors } from '../sectors';

describe('ventures data', () => {
  it('only references sectors that exist', () => {
    const ids = new Set(sectors.map((s) => s.id));
    ventures.forEach((v) => {
      if (v.sector) expect(ids.has(v.sector)).toBe(true);
    });
  });

  it('keeps every phase within the phase meter', () => {
    ventures.forEach((v) => {
      expect(v.phase.step).toBeGreaterThanOrEqual(1);
      expect(v.phase.step).toBeLessThanOrEqual(PHASE_COUNT);
    });
  });

  it('uses its own branding for Aqvera', () => {
    expect(ventures.find((v) => v.id === 'aqvera').icon).toBe('/brand-aqvera-icon.svg');
  });

  it('gives every sector a colour grade', () => {
    sectors.forEach((s) => expect(s.grade).toBeTruthy());
  });
});

describe('layoutFor', () => {
  it.each([
    [1, 'feature'],
    [3, 'feature'],
    [4, 'reel'],
    [8, 'reel'],
    [9, 'index'],
    [20, 'index'],
  ])('uses %i ventures → %s', (count, layout) => {
    expect(layoutFor(count)).toBe(layout);
  });
});
