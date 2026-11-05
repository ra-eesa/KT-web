import { useEffect, useRef } from 'react';

export const clamp01 = (v) => Math.min(1, Math.max(0, v));

/**
 * Tracks how far the user has scrolled through a section and writes it to the
 * section as the CSS variable `--p` (0 → 1), so scenes can be driven from CSS.
 *
 * pinned: the section is taller than the viewport and holds a sticky child;
 *         progress runs from the section top reaching the viewport top until
 *         the sticky child is released.
 * flow:   the section scrolls normally; progress runs while it passes through.
 *
 * onProgress(p, enter) also receives `enter`: 0 when the section top touches
 * the bottom of the viewport, 1 when it reaches the top.
 */
export function useScrollProgress(ref, onProgress, { enabled = true, pinned = true } = {}) {
  const callback = useRef(onProgress);

  useEffect(() => {
    callback.current = onProgress;
  });

  useEffect(() => {
    const el = ref.current;
    if (!el || !enabled) return undefined;

    let frame = 0;
    const measure = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      const p = pinned
        ? clamp01(-rect.top / Math.max(1, rect.height - vh))
        : clamp01((vh * 0.85 - rect.top) / Math.max(1, rect.height * 0.85));
      const enter = clamp01((vh - rect.top) / vh);
      el.style.setProperty('--p', p.toFixed(4));
      callback.current?.(p, enter);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    return () => {
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      if (frame) cancelAnimationFrame(frame);
      el.style.removeProperty('--p');
    };
  }, [ref, enabled, pinned]);
}
