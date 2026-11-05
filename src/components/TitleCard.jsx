import { useRef } from 'react';
import { sectors } from '../data/sectors';
import { PHASE_COUNT } from '../data/ventures';
import { useInView } from '../hooks/useInView';
import { usePrefersReducedMotion } from '../hooks/useMedia';

const sectorsById = Object.fromEntries(sectors.map((s) => [s.id, s]));

// A venture's title sequence: the mark resolves out of blur, the name rises
// letter by letter, then the logline and phase meter follow.
export default function TitleCard({ venture, variant = 'wide', replayOnHover = false }) {
  const ref = useRef(null);
  const inView = useInView(ref, { threshold: 0.4 });
  const reducedMotion = usePrefersReducedMotion();
  // With reduced motion the card simply stays in its final frame
  const armed = !reducedMotion;
  const sector = venture.sector ? sectorsById[venture.sector] : null;

  const replay = () => {
    const el = ref.current;
    if (!replayOnHover || reducedMotion || !el) return;
    el.classList.remove('is-run');
    void el.offsetWidth;
    el.classList.add('is-run');
  };

  return (
    <article
      ref={ref}
      onMouseEnter={replay}
      onFocus={replay}
      className={[
        'kt-tc',
        `kt-tc-${variant}`,
        `kt-grade-${venture.sector ?? 'studio'}`,
        armed ? 'is-armed' : '',
        armed && inView ? 'is-run' : '',
      ].join(' ')}
    >
      <div className="kt-tc-body">
        <p className="kt-mono kt-tc-tag">{venture.tag}</p>
        <h3 className="kt-tc-name" aria-label={venture.name}>
          {[...venture.name].map((char, i) => (
            <span key={i} aria-hidden="true" style={{ '--i': i }}>
              {char === ' ' ? ' ' : char}
            </span>
          ))}
        </h3>
        <p className="kt-tc-log">{venture.logline}</p>
        <div className="kt-tc-phase">
          <span className="kt-ticks" aria-hidden="true">
            {Array.from({ length: PHASE_COUNT }, (_, n) => (
              <i key={n} className={n < venture.phase.step ? 'is-on' : ''} style={{ '--i': n }} />
            ))}
          </span>
          <span className="kt-mono">
            Phase {venture.phase.step} · {venture.phase.label}
          </span>
        </div>
        {venture.url && (
          <a className="kt-tc-link" href={venture.url} target="_blank" rel="noopener noreferrer">
            Visit {venture.name} →
          </a>
        )}
      </div>
      <div className="kt-tc-art" aria-hidden="true">
        <img src={venture.icon ?? sector?.icon ?? '/logo-letters.svg'} alt="" className="kt-tc-icon" />
      </div>
    </article>
  );
}
