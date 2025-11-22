import { useEffect, useState } from 'react';

export default function SectorCard({ sector, position }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger animation when sector changes
    setIsVisible(false);
    const timer = setTimeout(() => setIsVisible(true), 50);
    return () => clearTimeout(timer);
  }, [sector]);

  if (!sector) {
    return null;
  }

  // Determine slide direction based on position
  const slideClass = position === 'left' 
    ? (isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8')
    : (isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8');

  return (
    <div
      className={`bg-kt-black-lighter/80 backdrop-blur-md rounded-2xl p-6 border border-kt-gold/30 shadow-2xl transition-all duration-500 ${slideClass} max-w-sm`}
    >
      <div className="flex items-start gap-4 mb-4">
        <img
          src={sector.icon}
          alt=""
          className="w-10 h-10 object-contain flex-shrink-0 opacity-90"
        />
        <div>
          <h3 className="text-kt-cream font-display font-semibold text-lg mb-1 leading-tight">
            {sector.name}
          </h3>
          <p className="text-kt-gold-light font-medium text-xs">
            {sector.strapline}
          </p>
        </div>
      </div>

      <p className="text-kt-grey-light text-xs leading-relaxed mb-3">
        {sector.description}
      </p>

      <div className="pt-3 border-t border-kt-gold/20">
        <p className="text-[10px] text-kt-grey mb-1 font-semibold uppercase tracking-wider">
          Ideal Partner
        </p>
        <p className="text-kt-grey-light text-xs">{sector.idealPartner}</p>
      </div>
    </div>
  );
}