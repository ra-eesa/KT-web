import { useState } from 'react';
import { sectors } from '../data/sectors';
import { ventures as allVentures, layoutFor } from '../data/ventures';
import TitleCard from './TitleCard';

const sectorsById = Object.fromEntries(sectors.map((s) => [s.id, s]));

// 4–8 ventures: one feature frame plus a strip to switch between them
function LabReel({ ventures }) {
  const [selectedId, setSelectedId] = useState(ventures[0].id);
  const selected = ventures.find((v) => v.id === selectedId) ?? ventures[0];

  return (
    <div className="kt-lab-reel">
      <TitleCard key={selected.id} venture={selected} />
      <div className="kt-strip" role="tablist" aria-label="KT Lab ventures">
        {ventures.map((v) => (
          <button
            key={v.id}
            type="button"
            role="tab"
            aria-selected={v.id === selected.id}
            className={`kt-thumb kt-grade-${v.sector ?? 'studio'}`}
            onClick={() => setSelectedId(v.id)}
          >
            <img src={v.icon ?? sectorsById[v.sector]?.icon ?? '/logo-letters.svg'} alt="" />
            <span>
              <b>{v.name}</b>
              <small>
                Phase {v.phase.step} · {v.phase.label}
              </small>
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

// 9+ ventures: a grid filtered by sector; hovering a tile replays its title
function LabIndex({ ventures }) {
  const [filter, setFilter] = useState('all');
  const present = [...new Set(ventures.map((v) => v.sector).filter(Boolean))];
  const shown = ventures.filter((v) => filter === 'all' || v.sector === filter);

  return (
    <div className="kt-lab-index">
      <div className="kt-chips">
        {['all', ...present].map((id) => (
          <button
            key={id}
            type="button"
            className="kt-chip"
            aria-pressed={filter === id}
            onClick={() => setFilter(id)}
          >
            {id === 'all' ? 'All sectors' : sectorsById[id].name}
          </button>
        ))}
      </div>
      <div className="kt-lab-grid">
        {shown.map((v) => (
          <TitleCard key={v.id} venture={v} variant="compact" replayOnHover />
        ))}
      </div>
    </div>
  );
}

// Scene 05
export default function Lab({ ventures = allVentures }) {
  const layout = layoutFor(ventures.length);

  return (
    <section id="lab" className="kt-lab" data-layout={layout}>
      <div className="kt-container">
        <div className="kt-lab-head">
          <h2 className="kt-h2">KT Lab</h2>
          <p className="kt-lede">
            The internal proto-lab where tools are born. Some experiments stay on the shelf;
            others earn their moment.
          </p>
          <p className="kt-lab-aside">Here&apos;s what&apos;s taking shape behind the curtain.</p>
        </div>

        {layout === 'feature' && (
          <div className="kt-lab-feature">
            {ventures.map((v) => (
              <TitleCard key={v.id} venture={v} />
            ))}
          </div>
        )}
        {layout === 'reel' && <LabReel ventures={ventures} />}
        {layout === 'index' && <LabIndex ventures={ventures} />}
      </div>
      <span className="kt-slate kt-mono" aria-hidden="true">SC 05 · KT Lab</span>
    </section>
  );
}
