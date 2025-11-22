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
      <div className="absolute top-32 left-8 md:left-16 z-10">
        <span className="inline-block text-[10px] font-semibold uppercase tracking-[0.2em] text-kt-gold-light bg-kt-forest/20 border border-kt-gold/30 px-5 py-2.5 rounded-full">
          Early-stage deep tech studio
        </span>
      </div>

      {/* CENTERED CONTENT */}
      <div className="relative z-10 flex flex-col items-center space-y-12 max-w-5xl w-full">
        
        {/* Main Logo - HERO */}
        <div className="relative w-full max-w-md md:max-w-lg aspect-square flex items-center justify-center">
          
          {/* Glow effects behind logo */}
          <div className="absolute inset-0 bg-gradient-radial from-kt-gold/5 via-kt-gold/2 to-transparent rounded-full blur-3xl animate-pulse-slow"></div>
          <div className="absolute inset-0 scale-75 bg-gradient-radial from-kt-gold/8 via-transparent to-transparent rounded-full blur-2xl"></div>
          
          {/* Logo Image */}
          <img
            src="/logo-main.svg"
            alt="Kabir Technologies"
            className="relative w-full h-full object-contain drop-shadow-2xl z-10"
          />

          {/* Interactive Hotspot Buttons */}
          {sectors.map((sector) => (
            <button
              key={sector.id}
              onMouseEnter={() => setActiveSector(sector)}
              onMouseLeave={() => setActiveSector(null)}
              onClick={() => setActiveSector(sector)}
              aria-label={`Learn about ${sector.name}`}
              className="absolute w-16 h-16 -translate-x-1/2 -translate-y-1/2 rounded-full 
                       hover:bg-kt-gold/20 hover:ring-4 hover:ring-kt-gold/30 hover:scale-110
                       transition-all duration-300 cursor-pointer
                       focus:outline-none focus:ring-4 focus:ring-kt-gold/50 z-20"
              style={{
                left: sector.hotspot.left,
                top: sector.hotspot.top,
              }}
            >
              {/* Pulsing indicator dot */}
              <span className="absolute inset-0 flex items-center justify-center">
                <span className="w-2 h-2 bg-kt-gold rounded-full animate-pulse-slow"></span>
              </span>
            </button>
          ))}
        </div>

        {/* Title - BELOW LOGO */}
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold text-kt-cream text-center leading-tight">
          Kabir Technologies
        </h1>

        {/* Subtitle - BELOW TITLE */}
        <p className="text-lg md:text-xl text-kt-grey text-center max-w-2xl leading-relaxed">
          Turning complex, under-served problems into quietly powerful prototypes.
        </p>

        {/* Dynamic Sector Card - CENTERED */}
        <div className="w-full max-w-xl">
          <SectorCard sector={activeSector} />
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