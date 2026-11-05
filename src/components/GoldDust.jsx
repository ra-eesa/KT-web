import { useEffect, useRef } from 'react';
import { usePrefersReducedMotion } from '../hooks/useMedia';

// Slow-rising gold motes behind the hero. Fills its positioned parent.
export default function GoldDust() {
  const canvasRef = useRef(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext?.('2d');
    if (!canvas || !ctx) return undefined;

    let width = 0;
    let height = 0;
    let motes = [];
    let frame = 0;
    let visible = true;

    const resize = () => {
      const parent = canvas.parentElement;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = parent.clientWidth;
      height = parent.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.round(Math.min(110, width / 12));
      motes = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 1.4 + 0.3,
        vy: -(Math.random() * 0.18 + 0.04),
        vx: (Math.random() - 0.5) * 0.08,
        alpha: Math.random() * 0.6 + 0.15,
        phase: Math.random() * Math.PI * 2,
        bokeh: Math.random() < 0.08,
      }));
      if (reducedMotion) draw(0);
    };

    const draw = (time) => {
      ctx.clearRect(0, 0, width, height);
      for (const m of motes) {
        if (!reducedMotion) {
          m.y += m.vy;
          m.x += m.vx;
          if (m.y < -8) {
            m.y = height + 8;
            m.x = Math.random() * width;
          }
        }
        const twinkle = 0.55 + 0.45 * Math.sin(time / 900 + m.phase);
        if (m.bokeh) {
          const glow = ctx.createRadialGradient(m.x, m.y, 0, m.x, m.y, m.r * 9);
          glow.addColorStop(0, `rgba(245, 214, 137, ${0.16 * twinkle})`);
          glow.addColorStop(1, 'rgba(245, 214, 137, 0)');
          ctx.fillStyle = glow;
          ctx.beginPath();
          ctx.arc(m.x, m.y, m.r * 9, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.fillStyle = `rgba(245, 214, 137, ${m.alpha * twinkle})`;
          ctx.beginPath();
          ctx.arc(m.x, m.y, m.r, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    };

    const tick = () => {
      frame = 0;
      if (!visible) return;
      draw(performance.now());
      frame = requestAnimationFrame(tick);
    };

    resize();
    const resizeObserver = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(resize) : null;
    resizeObserver?.observe(canvas.parentElement);

    const intersection = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && !reducedMotion && !frame) frame = requestAnimationFrame(tick);
    });
    intersection.observe(canvas);

    if (!reducedMotion) frame = requestAnimationFrame(tick);

    return () => {
      resizeObserver?.disconnect();
      intersection.disconnect();
      if (frame) cancelAnimationFrame(frame);
    };
  }, [reducedMotion]);

  return <canvas ref={canvasRef} className="kt-dust" aria-hidden="true" />;
}
