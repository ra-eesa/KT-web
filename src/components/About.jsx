import { useRef, useState } from 'react';
import { useScrollProgress } from '../hooks/useScrollProgress';
import { usePrefersReducedMotion } from '../hooks/useMedia';

const LINES = ['A small deep-tech studio', 'for overlooked problems', 'in five sectors.'];

// Scene 02: the camera pushes through the apex while the statement rises in.
export default function About() {
  const sectionRef = useRef(null);
  const reducedMotion = usePrefersReducedMotion();
  const [arrived, setArrived] = useState(false);

  useScrollProgress(
    sectionRef,
    (_, enter) => {
      if (enter > 0.5) setArrived(true);
    },
    { enabled: !reducedMotion }
  );

  const shown = reducedMotion || arrived;

  return (
    <section
      id="about"
      ref={sectionRef}
      className={`kt-about ${reducedMotion ? 'is-static' : ''}`}
      style={reducedMotion ? undefined : { height: '190vh' }}
    >
      <div className={reducedMotion ? 'kt-about-frame' : 'kt-pin kt-about-frame'}>
        <svg className="kt-apex" viewBox="0 0 100 86" aria-hidden="true">
          <polygon points="50,2 2,84 98,84" />
        </svg>
        <div className="kt-leak" aria-hidden="true" />

        <div className={`kt-about-copy ${shown ? 'is-in' : ''}`}>
          <h2 className="kt-eyebrow">Who we are</h2>
          <p className="kt-statement">
            {LINES.map((line, k) => (
              <span className="kt-ln" key={line}>
                <span style={{ '--k': k }}>{line}</span>
              </span>
            ))}
          </p>
          <p className="kt-about-body">
            Kabir Technologies is a small deep-tech studio focused on overlooked problems in
            architecture, agriculture, healthcare, biodiversity and space. We design and build
            early-stage AI-driven tools, then partner, license or spin them out once they prove
            their value.
          </p>
        </div>

        <span className="kt-slate kt-mono" aria-hidden="true">SC 02 · Who we are</span>
      </div>
    </section>
  );
}
