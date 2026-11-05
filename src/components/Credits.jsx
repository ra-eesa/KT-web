import { useRef } from 'react';
import { sectors } from '../data/sectors';
import { ventures } from '../data/ventures';
import { PRINCIPLES } from '../data/studio';
import { useScrollProgress } from '../hooks/useScrollProgress';
import { usePrefersReducedMotion } from '../hooks/useMedia';

// Scene 07: end credits, rolled by scroll, leading into the contact card.
export default function Credits() {
  const sectionRef = useRef(null);
  const reducedMotion = usePrefersReducedMotion();

  useScrollProgress(sectionRef, null, { enabled: !reducedMotion });

  return (
    <section
      ref={sectionRef}
      className={`kt-credits ${reducedMotion ? 'is-static' : ''}`}
      style={reducedMotion ? undefined : { height: '230vh' }}
      aria-label="Credits"
    >
      <div className={reducedMotion ? 'kt-credits-frame' : 'kt-pin kt-credits-frame'}>
        <div className="kt-roll">
          <img src="/logo-letters.svg" alt="" className="kt-roll-mark" />
          <p className="kt-roll-who kt-roll-studio">Kabir Technologies</p>

          <p className="kt-mono kt-roll-role">A deep-tech studio working in</p>
          {sectors.map((s) => (
            <p key={s.id} className="kt-roll-who">
              {s.name}
            </p>
          ))}

          <p className="kt-mono kt-roll-role">In the lab</p>
          {ventures.map((v) => (
            <p key={v.id} className="kt-roll-who">
              {v.name}
            </p>
          ))}

          <p className="kt-mono kt-roll-role">Guided by</p>
          {PRINCIPLES.map((p) => (
            <p key={p.title} className="kt-roll-who">
              {p.title}
            </p>
          ))}
        </div>
        <span className="kt-slate kt-mono" aria-hidden="true">SC 07 · Credits</span>
      </div>
    </section>
  );
}
