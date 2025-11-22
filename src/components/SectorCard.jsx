import { useEffect, useState } from 'react';

export default function SectorCard({ sector }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger animation when sector changes
    setIsVisible(false);
    const timer = setTimeout(() => setIsVisible(true), 50);
    return () => clearTimeout(timer);
  }, [sector]);

  if (!sector) {
    return (
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-kt-gold/20 shadow-lg">
        <p className="text-kt-grey text-sm">
          Hover over or tap an icon to discover each sector
        </p>
      </div>
    );
  }

  return (
    <div
      className={`bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-kt-gold/30 shadow-lg transition-all duration-300 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
    >
      <div className="flex items-start gap-4 mb-4">
        <img
          src={sector.icon}
          alt=""
          className="w-12 h-12 object-contain flex-shrink-0"
        />
        <div>
          <h3 className="text-kt-navy font-display font-semibold text-xl mb-1">
            {sector.name}
          </h3>
          <p className="text-kt-gold font-medium text-sm">
            {sector.strapline}
          </p>
        </div>
      </div>

      <p className="text-kt-navy text-sm leading-relaxed mb-4">
        {sector.description}
      </p>

      <div className="pt-4 border-t border-kt-gold/20">
        <p className="text-xs text-kt-grey mb-1 font-semibold uppercase tracking-wider">
          Ideal Partner
        </p>
        <p className="text-kt-navy text-sm">{sector.idealPartner}</p>
      </div>
    </div>
  );
}