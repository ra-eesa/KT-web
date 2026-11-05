import { sectors } from '../data/sectors';

// Film-style caption that names the sector in focus. Opens on the same side
// as the old sector cards (sector.cardPosition) on desktop, below the pyramid on mobile.
export default function LowerThird({ sector, ref }) {
  const index = sector ? sectors.findIndex((s) => s.id === sector.id) + 1 : 0;

  return (
    <div ref={ref} className="kt-lt" aria-live="polite">
      {sector && (
        <div key={sector.id} className={`kt-lt-card kt-lt-${sector.cardPosition}`}>
          <span className="kt-mono kt-lt-index">
            Sector {String(index).padStart(2, '0')} / {String(sectors.length).padStart(2, '0')}
          </span>
          <h3 className="kt-lt-name">{sector.name}</h3>
          <p className="kt-lt-strap">{sector.strapline}</p>
          <p className="kt-lt-desc">{sector.description}</p>
          <p className="kt-lt-partner">
            <span className="kt-mono">Ideal partner</span>
            {sector.idealPartner}
          </p>
        </div>
      )}
    </div>
  );
}
