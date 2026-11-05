import { useRef, useState } from 'react';
import { useScrollProgress } from '../hooks/useScrollProgress';
import { useMediaQuery, usePrefersReducedMotion } from '../hooks/useMedia';
import { BUILD_STEPS } from '../data/studio';

// Scene 06: a gold mark travels the track and each station lands as it arrives.
export default function Approach() {
  const sectionRef = useRef(null);
  const reducedMotion = usePrefersReducedMotion();
  const roomy = useMediaQuery('(min-width: 768px) and (min-height: 600px)');
  const pinned = roomy && !reducedMotion;
  const [reached, setReached] = useState(1);

  useScrollProgress(
    sectionRef,
    (p) => setReached(Math.min(BUILD_STEPS.length, 1 + Math.floor(p * 3 + 0.02))),
    { enabled: !reducedMotion, pinned }
  );

  const reachedCount = reducedMotion ? BUILD_STEPS.length : reached;

  return (
    <section
      id="approach"
      ref={sectionRef}
      className={`kt-approach ${pinned ? 'is-pinned' : 'is-flow'} ${reducedMotion ? 'is-static' : ''}`}
      style={pinned ? { height: '260vh' } : undefined}
    >
      <div className={pinned ? 'kt-pin kt-approach-frame' : 'kt-approach-frame'}>
        <div className="kt-container">
          <h2 className="kt-h2 kt-approach-title">How we build</h2>
          <div className="kt-track">
            <span className="kt-track-line" aria-hidden="true">
              <span className="kt-runner" />
            </span>
            <ol className="kt-stations">
              {BUILD_STEPS.map((phase, k) => (
                <li key={phase.step} className={k < reachedCount ? 'is-on' : ''}>
                  <span className="kt-station-mark" aria-hidden="true" />
                  <span className="kt-mono kt-station-num">{phase.step}</span>
                  <h3>{phase.title}</h3>
                  <p>{phase.desc}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
        <span className="kt-slate kt-mono" aria-hidden="true">SC 06 · How we build</span>
      </div>
    </section>
  );
}
