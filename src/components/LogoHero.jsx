import { useState } from 'react';
import { sectors } from '../data/sectors';
import SectorCard from './SectorCard';

export default function LogoHero() {
  const [activeSector, setActiveSector] = useState(null);

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-kt-black via-kt-black to-kt-black-lighter flex flex-col items-center justify-center px-4 py-20 relative overflow-hidden">
      
      {/* Subtle grey texture overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-kt-black-lighter/20 via-transparent to-kt-black-lighter/10 pointer-events-none"></div>
      
      {/* Early-stage badge - LEFT SIDE */}
      <div className="absolute top-16 md:top-32 left-8 md:left-16 z-10">
        <span className="inline-block text-[10px] font-semibold uppercase tracking-[0.2em] text-kt-gold-light bg-kt-forest/20 border border-kt-gold/30 px-5 py-2.5 rounded-full">
          Early-stage deep tech studio
        </span>
      </div>

      {/* CENTERED CONTENT WITH SIDE CARDS */}
      <div className="relative z-10 flex flex-col items-center space-y-12 max-w-7xl w-full mt-20 md:mt-0">
        
        {/* LOGO + SIDE CARDS CONTAINER */}
        <div className="relative w-full flex items-center justify-center">
          
          {/* LEFT SECTOR CARD */}
          <div className="hidden lg:block absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12">
            {activeSector && activeSector.cardPosition === 'left' && (
              <SectorCard sector={activeSector} position="left" />
            )}
          </div>

          {/* MAIN LOGO - BIGGER */}
          <div className="relative w-full max-w-xl md:max-w-2xl aspect-square flex items-center justify-center">
            
            {/* Glow effects behind logo */}
            <div className="absolute inset-0 bg-gradient-radial from-kt-gold/5 via-kt-gold/2 to-transparent rounded-full blur-3xl animate-pulse-slow"></div>
            <div className="absolute inset-0 scale-75 bg-gradient-radial from-kt-gold/8 via-transparent to-transparent rounded-full blur-2xl"></div>
            
            {/* Main Logo Image (base layer) */}
            <img
              src="/logo-main.svg"
              alt="Kabir Technologies"
              className="relative w-full h-full object-contain drop-shadow-2xl z-10"
            />

            {/* Interactive Sector Icon Overlays */}
            {sectors.map((sector) => (
              <button
                key={sector.id}
                onMouseEnter={() => setActiveSector(sector)}
                onMouseLeave={() => setActiveSector(null)}
                onClick={() => setActiveSector(sector)}
                aria-label={`Learn about ${sector.name}`}
                className="absolute -translate-x-1/2 -translate-y-1/2 
                         transition-all duration-300 cursor-pointer group
                         focus:outline-none z-20"
                style={{
                  left: sector.hotspot.left,
                  top: sector.hotspot.top,
                }}
              >
                {/* Sector Icon */}
                <img
                  src={sector.icon}
                  alt={sector.name}
                  className={`object-contain transition-all duration-300
                           group-hover:scale-125 group-hover:drop-shadow-[0_0_12px_rgba(245,214,137,0.8)]
                           group-focus:scale-125 group-focus:drop-shadow-[0_0_12px_rgba(245,214,137,0.8)]
                           ${sector.id === 'space' ? 'w-16 h-16 md:w-20 md:h-20' : 'w-12 h-12 md:w-16 md:h-16'}`}
                />
                
                {/* Subtle glow ring on hover */}
                <span className="absolute inset-0 rounded-full bg-kt-gold/0 group-hover:bg-kt-gold/10 transition-all duration-300 -z-10 scale-150"></span>
              </button>
            ))}
          </div>

          {/* RIGHT SECTOR CARD */}
          <div className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 translate-x-12">
            {activeSector && activeSector.cardPosition === 'right' && (
              <SectorCard sector={activeSector} position="right" />
            )}
          </div>
        </div>

        {/* Hover Instruction - BELOW LOGO (replaces title) */}
        <div className="text-center space-y-3 -mt-12">
          <p className="text-kt-gold-light/90 text-base md:text-lg font-medium">
            Hover over an icon to discover each sector
          </p>
          <p className="text-kt-grey text-sm md:text-base max-w-2xl leading-relaxed">
            Turning complex, under-served problems into quietly powerful prototypes.
          </p>
        </div>

        {/* MOBILE: Show sector card below instruction */}
        <div className="lg:hidden w-full max-w-xl">
          {activeSector && (
            <SectorCard sector={activeSector} position="center" />
          )}
        </div>

        {/* Scroll Hint - BOTTOM CENTER */}
        <button
          onClick={() => scrollToSection('about')}
          className="group flex flex-col items-center gap-2 text-kt-gold-light/70 hover:text-kt-gold transition-all duration-300 mt-8"
        >
          <span className="text-sm font-medium tracking-wide">Enter the maze</span>
          <span className="text-2xl animate-bounce-slow group-hover:translate-y-1 transition-transform">
            ↓
          </span>
        </button>
      </div>
    </section>
  );
}