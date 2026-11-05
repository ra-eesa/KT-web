import { useRef, useState } from 'react';
import { clamp01, useScrollProgress } from '../hooks/useScrollProgress';
import { useMediaQuery, usePrefersReducedMotion } from '../hooks/useMedia';
import { PRINCIPLES } from '../data/studio';

// Maze geometry in the style of the green lines inside the logo.
// Each lit segment ends at the node for the matching principle.
const SEGMENTS = [
  'M8 36 H92 V72 H150',
  'M150 72 H198 V42 H258',
  'M258 42 V112 H212 V140',
  'M212 140 H112 V160 H62 V122',
];
const NODES = [
  { x: 150, y: 72, label: 'Clarity', lx: 150, ly: 62, anchor: 'middle' },
  { x: 258, y: 42, label: 'Ethics', lx: 258, ly: 32, anchor: 'middle' },
  { x: 212, y: 140, label: 'Niche', lx: 222, ly: 130, anchor: 'start' },
  { x: 62, y: 122, label: 'Prototypes', lx: 62, ly: 112, anchor: 'middle' },
];
const DIM_LINES =
  'M20 160 H44 M24 14 V60 M290 18 V64 M300 150 H272 V168 M120 22 H176 M98 100 V130 M236 70 H286 M170 108 V128 M30 90 H70 M128 40 V58 M300 96 V128 M4 118 H34 M232 166 H300';

// Scene 03: a lit path routes through the maze and reaches each principle.
export default function Philosophy() {
  const sectionRef = useRef(null);
  const segmentRefs = useRef([]);
  const reducedMotion = usePrefersReducedMotion();
  const roomy = useMediaQuery('(min-width: 1024px) and (min-height: 720px)');
  const pinned = roomy && !reducedMotion;
  const [lit, setLit] = useState(0);

  useScrollProgress(
    sectionRef,
    (p) => {
      // Small hold at both ends of the scene
      const t = p * 4.4 - 0.2;
      segmentRefs.current.forEach((path, k) => {
        if (path) path.style.strokeDashoffset = String(1 - clamp01(t - k));
      });
      setLit(Math.max(0, Math.min(4, Math.floor(t + 0.001))));
    },
    { enabled: !reducedMotion, pinned }
  );

  const litCount = reducedMotion ? PRINCIPLES.length : lit;

  return (
    <section
      id="philosophy"
      ref={sectionRef}
      className="kt-philosophy"
      style={pinned ? { height: '240vh' } : undefined}
    >
      <div className={pinned ? 'kt-pin kt-philo-frame' : 'kt-philo-frame is-flow'}>
        <div className="kt-philo-grid">
          <div className="kt-philo-copy">
            <h2 className="kt-h2">Philosophy &amp; principles</h2>
            <p className="kt-lede">
              KT exists to build tools that quietly change how people work, not noisy demos that
              vanish in a year. We care about clarity, ethics and long-term utility.
            </p>
            <ol className="kt-principles">
              {PRINCIPLES.map((principle, k) => (
                <li key={principle.title} className={k < litCount ? 'is-lit' : ''}>
                  <h3>{principle.title}</h3>
                  <p>{principle.desc}</p>
                </li>
              ))}
            </ol>
          </div>

          <div className="kt-maze-wrap" aria-hidden="true">
            <svg className="kt-maze" viewBox="0 0 320 180">
              <path className="kt-maze-dim" d={DIM_LINES} />
              {SEGMENTS.map((d) => (
                <path key={d} className="kt-maze-dim" d={d} />
              ))}
              {SEGMENTS.map((d, k) => (
                <path
                  key={`lit-${d}`}
                  ref={(el) => {
                    segmentRefs.current[k] = el;
                  }}
                  className="kt-maze-lit"
                  d={d}
                  pathLength="1"
                  style={reducedMotion ? undefined : { strokeDashoffset: 1 }}
                />
              ))}
              {NODES.map((node, k) => (
                <g key={node.label} className={k < litCount ? 'is-lit' : ''}>
                  <circle className="kt-maze-node" cx={node.x} cy={node.y} r="4.5" />
                  <text x={node.lx} y={node.ly} textAnchor={node.anchor}>
                    {node.label}
                  </text>
                </g>
              ))}
            </svg>
          </div>
        </div>
        <span className="kt-slate kt-mono" aria-hidden="true">SC 03 · Philosophy</span>
      </div>
    </section>
  );
}
