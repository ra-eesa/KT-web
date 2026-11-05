import { useRef, useState } from 'react';
import { sectors } from '../data/sectors';
import { useScrollProgress } from '../hooks/useScrollProgress';
import { useInView } from '../hooks/useInView';
import { useMediaQuery, usePrefersReducedMotion } from '../hooks/useMedia';

const STEPS = sectors.length + 1; // overview, then one step per pillar
const pad = (n) => String(n).padStart(2, '0');

const INTRO =
  'These are the domains where we see opportunity for thoughtful, leverageable tools. Areas where a precisely built prototype can have outsized impact.';

function PillarLabel({ index, sector }) {
  return (
    <span className="kt-mono kt-pillar-label">
      Pillar {pad(index)} / {pad(sectors.length)} · {sector.grade} grade
    </span>
  );
}

function PillarDetail({ sector }) {
  return (
    <>
      <p className="kt-pillar-strap">{sector.strapline}</p>
      <p className="kt-pillar-desc">{sector.description}</p>
      <div className="kt-pillar-partner">
        <span className="kt-mono">Ideal partner</span>
        <p>{sector.idealPartner}</p>
      </div>
    </>
  );
}

// Desktop: the section pins and the camera dives into the pyramid, one pillar per step.
function SectorsPinned() {
  const sectionRef = useRef(null);
  const [step, setStep] = useState(0);

  useScrollProgress(sectionRef, (p) => setStep(Math.min(STEPS - 1, Math.floor(p * STEPS))));

  const active = step > 0 ? sectors[step - 1] : null;
  const zoom = active
    ? {
        transform: `scale(2.4) translate(${50 - parseFloat(active.hotspot.desktop.left)}%, ${
          50 - parseFloat(active.hotspot.desktop.top)
        }%)`,
      }
    : undefined;

  const jumpTo = (target) => {
    const el = sectionRef.current;
    const top = el.getBoundingClientRect().top + window.scrollY;
    const span = el.offsetHeight - window.innerHeight;
    window.scrollTo({ top: top + (span * (target + 0.5)) / STEPS, behavior: 'smooth' });
  };

  return (
    <section
      id="sectors"
      ref={sectionRef}
      className="kt-sectors is-pinned"
      style={{ height: `${STEPS * 80 + 100}vh` }}
    >
      <div className="kt-pin">
        {sectors.map((s) => (
          <div
            key={s.id}
            className={`kt-grade-layer kt-grade-${s.id} ${active?.id === s.id ? 'is-on' : ''}`}
            aria-hidden="true"
          />
        ))}

        <div className="kt-sectors-grid">
          <div className="kt-lens" aria-hidden="true">
            <div className="kt-dive-box">
              <div className={`kt-dive ${active ? 'is-zoomed' : ''}`} style={zoom}>
                <img src="/logo-main.svg" alt="" className="kt-dive-logo" />
                {sectors.map((s) => (
                  <img
                    key={s.id}
                    src={s.icon}
                    alt=""
                    className={`kt-dive-ico ${active?.id === s.id ? 'is-on' : ''}`}
                    style={{
                      left: s.hotspot.desktop.left,
                      top: s.hotspot.desktop.top,
                      width: s.id === 'space' ? '11.9%' : '9.5%',
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="kt-sector-panel">
            <h2 className="kt-eyebrow">Where we play</h2>
            {active ? (
              <div key={active.id} className="kt-panel-step">
                <PillarLabel index={step} sector={active} />
                <h3 className="kt-h2">{active.name}</h3>
                <PillarDetail sector={active} />
              </div>
            ) : (
              <div key="overview" className="kt-panel-step">
                <p className="kt-pillars-title">The Five Pillars</p>
                <p className="kt-lede">{INTRO}</p>
                <ul className="kt-pillar-index">
                  {sectors.map((s, i) => (
                    <li key={s.id}>
                      <button type="button" onClick={() => jumpTo(i + 1)}>
                        <img src={s.icon} alt="" />
                        <span>{s.name}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="kt-pillar-ticks">
              {sectors.map((s, i) => (
                <button
                  key={s.id}
                  type="button"
                  aria-label={`Show ${s.name}`}
                  className={step === i + 1 ? 'is-on' : ''}
                  onClick={() => jumpTo(i + 1)}
                />
              ))}
            </div>
          </div>
        </div>
        <span className="kt-slate kt-mono" aria-hidden="true">SC 04 · Five pillars</span>
      </div>
    </section>
  );
}

function PillarCard({ sector, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { threshold: 0.3 });

  return (
    <article ref={ref} className={`kt-pillar-card kt-grade-${sector.id} ${inView ? 'is-in' : ''}`}>
      <img src={sector.icon} alt="" className="kt-pillar-card-icon" />
      <PillarLabel index={index} sector={sector} />
      <h3 className="kt-pillar-card-name">{sector.name}</h3>
      <PillarDetail sector={sector} />
    </article>
  );
}

// Phones, short screens and reduced motion: full-height graded cards, no pin.
function SectorsStacked() {
  return (
    <section id="sectors" className="kt-sectors is-stacked">
      <div className="kt-container">
        <h2 className="kt-eyebrow">Where we play</h2>
        <p className="kt-pillars-title">The Five Pillars</p>
        <p className="kt-lede">{INTRO}</p>
      </div>
      <div className="kt-pillar-stack">
        {sectors.map((s, i) => (
          <PillarCard key={s.id} sector={s} index={i + 1} />
        ))}
      </div>
    </section>
  );
}

// Scene 04
export default function Sectors() {
  const reducedMotion = usePrefersReducedMotion();
  const roomy = useMediaQuery('(min-width: 1024px) and (min-height: 640px)');
  return roomy && !reducedMotion ? <SectorsPinned /> : <SectorsStacked />;
}
