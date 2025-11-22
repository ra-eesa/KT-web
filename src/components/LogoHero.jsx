import { useState } from 'react';
import { sectors } from '../data/sectors';
import SectorCard from './SectorCard';

export default function LogoHero() {
  const [activeSector, setActiveSector] = useState(null);

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-kt-cream via-kt-cream to-kt-cream-dark flex items-center justify-center px-4 py-20">
      <div className="max-w-7xl w-full grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        
        {/* Left Side - Intro Text & Sector Card */}
        <div className="space-y-8">
          <div className="space-y-4">
            <div className="inline-block">
              <span className="text-xs font-semibold uppercase tracking-widest text-kt-forest bg-kt-forest/10 px-4 py-2 rounded-full">
                Early-stage deep tech studio
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold text-kt-navy leading-tight">
              Kabir
              <br />
              Technologies
            </h1>

            <p className="text-lg md:text-xl text-kt-navy/80 leading-relaxed max-w-xl">
              Turning complex, under-served problems into quietly powerful prototypes.
            </p>
          </div>

          {/* Dynamic Sector Card */}
          <SectorCard sector={activeSector} />

          {/* Scroll Hint */}
          <button
            onClick={() => scrollToSection('about')}
            className="group flex items-center gap-2 text-kt-forest hover:text-kt-gold transition-colors duration-300"
          >
            <span className="text-sm font-medium">Enter the maze</span>
            <span className="text-xl animate-bounce-slow group-hover:translate-y-1 transition-transform">
              ↓
            </span>
          </button>
        </div>

        {/* Right Side - Interactive Logo */}
        <div className="relative flex items-center justify-center">
          {/* Main Logo */}
          <div className="relative w-full max-w-lg aspect-square">
            <img
              src="/logo-main.svg"
              alt="Kabir Technologies"
              className="w-full h-full object-contain drop-shadow-2xl"
            />

            {/* Invisible Hotspot Buttons */}
            {sectors.map((sector) => (
              <button
                key={sector.id}
                onMouseEnter={() => setActiveSector(sector)}
                onMouseLeave={() => setActiveSector(null)}
                onClick={() => setActiveSector(sector)}
                aria-label={`Learn about ${sector.name}`}
                className="absolute w-16 h-16 -translate-x-1/2 -translate-y-1/2 rounded-full 
                         hover:bg-kt-gold/20 hover:ring-4 hover:ring-kt-gold/30 
                         transition-all duration-300 cursor-pointer
                         focus:outline-none focus:ring-4 focus:ring-kt-gold/50"
                style={{
                  left: sector.hotspot.left,
                  top: sector.hotspot.top,
                }}
              >
                {/* Pulsing indicator dot */}
                <span className="absolute inset-0 flex items-center justify-center">
                  <span className="w-3 h-3 bg-kt-gold rounded-full opacity-0 group-hover:opacity-100 animate-pulse-slow"></span>
                </span>
              </button>
            ))}

            {/* Subtle glow effect behind logo */}
            <div className="absolute inset-0 -z-10 bg-gradient-to-br from-kt-gold/10 to-transparent rounded-full blur-3xl animate-pulse-slow"></div>
          </div>
        </div>
      </div>
    </section>
  );
}