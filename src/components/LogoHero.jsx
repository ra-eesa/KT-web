import { useState, useEffect, useRef } from 'react';
import { sectors } from '../data/sectors';
import GoldDust from './GoldDust';
import LowerThird from './LowerThird';
import { usePrefersReducedMotion } from '../hooks/useMedia';

// Scene 01, the opening shot. Plays once per browser session.
export const INTRO_KEY = 'kt-intro-played';

// How far each sector mark drifts with the pointer (parallax depth)
const DEPTH = { heritage: 0.7, agriculture: 1.2, healthcare: 0.9, biodiversity: 1.4, space: 0.5 };

function introAlreadyPlayed() {
  try {
    return sessionStorage.getItem(INTRO_KEY) === '1';
  } catch {
    return false;
  }
}

const pad = (n) => String(n).padStart(2, '0');
const formatTimecode = (frames) =>
  `00:${pad(Math.floor(frames / 1440) % 60)}:${pad(Math.floor(frames / 24) % 60)}:${pad(frames % 24)}`;

export default function LogoHero() {
  const reducedMotion = usePrefersReducedMotion();
  const [activeSector, setActiveSector] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [playIntro] = useState(() => !introAlreadyPlayed());
  const heroRef = useRef(null);
  const pyramidRef = useRef(null);
  const timecodeRef = useRef(null);
  const lowerThirdRef = useRef(null);
  const pointer = useRef({ x: 0, y: 0 });

  // Detect screen size for responsive icon positioning
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768); // md breakpoint
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  useEffect(() => {
    if (!playIntro) return;
    try {
      sessionStorage.setItem(INTRO_KEY, '1');
    } catch {
      // Storage blocked: the intro simply plays again next time
    }
  }, [playIntro]);

  // Handle click outside to close the caption on mobile
  useEffect(() => {
    if (!activeSector) return;

    const handleClickOutside = (event) => {
      if (window.innerWidth >= 1024) return;

      const isClickOnButton = event.target.closest('[data-sector-button]');
      const isClickOnCaption = lowerThirdRef.current?.contains(event.target);

      if (!isClickOnButton && !isClickOnCaption) {
        setActiveSector(null);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [activeSector]);

  // Camera drift toward the pointer, and the running timecode
  useEffect(() => {
    if (reducedMotion) return undefined;
    const hero = heroRef.current;
    const pyramid = pyramidRef.current;
    const start = performance.now();
    let frame = 0;
    let visible = true;
    let cx = 0;
    let cy = 0;

    const tick = () => {
      frame = 0;
      if (!visible) return;
      cx += (pointer.current.x - cx) * 0.06;
      cy += (pointer.current.y - cy) * 0.06;
      pyramid.style.setProperty('--ry', `${(cx * 12).toFixed(2)}deg`);
      pyramid.style.setProperty('--rx', `${(-cy * 8).toFixed(2)}deg`);
      pyramid.style.setProperty('--px', (cx * 26).toFixed(2));
      pyramid.style.setProperty('--py', (cy * 26).toFixed(2));
      if (timecodeRef.current) {
        timecodeRef.current.textContent = formatTimecode(
          Math.floor(((performance.now() - start) * 24) / 1000)
        );
      }
      frame = requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && !frame) frame = requestAnimationFrame(tick);
    });
    observer.observe(hero);
    frame = requestAnimationFrame(tick);

    return () => {
      observer.disconnect();
      if (frame) cancelAnimationFrame(frame);
    };
  }, [reducedMotion]);

  const handlePointerMove = (event) => {
    if (event.pointerType !== 'mouse') return;
    const rect = heroRef.current.getBoundingClientRect();
    pointer.current = {
      x: (event.clientX - rect.left) / rect.width - 0.5,
      y: (event.clientY - rect.top) / rect.height - 0.5,
    };
  };

  const handlePointerLeave = () => {
    pointer.current = { x: 0, y: 0 };
  };

  const handleSectorClick = (sector) => {
    const isMobileView = window.innerWidth < 1024;

    if (isMobileView) {
      // Toggle behavior on mobile: tapping the same sector closes it
      setActiveSector(activeSector?.id === sector.id ? null : sector);
    } else {
      setActiveSector(sector);
    }
  };

  const handleSectorHover = (sector) => {
    if (window.innerWidth >= 1024) {
      setActiveSector(sector);
    }
  };

  const handleSectorLeave = () => {
    if (window.innerWidth >= 1024) {
      setActiveSector(null);
    }
  };

  const handleSectorFocus = (event, sector) => {
    // Keyboard focus pulls focus too; taps are handled by click
    if (event.currentTarget.matches?.(':focus-visible')) setActiveSector(sector);
  };

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      ref={heroRef}
      className={`kt-hero min-h-screen ${playIntro && !reducedMotion ? 'play' : ''}`}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <GoldDust />

      <div className="kt-bar kt-bar-top" aria-hidden="true" />

      <div className="kt-hero-main">
        <span className="kt-badge">Early-stage deep tech studio</span>

        <div className="kt-rig">
          <div
            ref={pyramidRef}
            className="kt-pyr"
            data-focusing={activeSector ? 'true' : 'false'}
          >
            <div className="kt-pyr-glow" aria-hidden="true" />
            <svg className="kt-frame-draw" viewBox="0 0 682 682" aria-hidden="true">
              <defs>
                <linearGradient id="kt-gold-stroke" x1="0" y1="0" x2="0" y2="1">
                  <stop offset=".06" stopColor="#ffd173" />
                  <stop offset=".8" stopColor="#8b703c" />
                  <stop offset="1" stopColor="#816837" />
                </linearGradient>
              </defs>
              <polygon points="341,61 5,619 677,619" pathLength="1" />
            </svg>

            <div className="kt-logo-clip">
              <img src="/logo-main.svg" alt="Kabir Technologies" className="kt-logo" />
              <div className="kt-sheen" aria-hidden="true" />
            </div>

            {sectors.map((sector, k) => {
              const hotspot = isMobile ? sector.hotspot.mobile : sector.hotspot.desktop;
              const isActive = activeSector?.id === sector.id;
              return (
                <button
                  key={sector.id}
                  type="button"
                  data-sector-button
                  data-sector={sector.id}
                  onMouseEnter={() => handleSectorHover(sector)}
                  onMouseLeave={handleSectorLeave}
                  onFocus={(event) => handleSectorFocus(event, sector)}
                  onBlur={handleSectorLeave}
                  onClick={() => handleSectorClick(sector)}
                  aria-label={`Learn about ${sector.name}`}
                  aria-pressed={isActive}
                  className={`kt-hs ${isActive ? 'is-on' : ''}`}
                  style={{
                    left: hotspot.left,
                    top: hotspot.top,
                    '--w': sector.id === 'space' ? '11.9%' : '9.5%',
                    '--k': k,
                    '--z': DEPTH[sector.id] ?? 1,
                    '--fx': `${Math.round((parseFloat(hotspot.left) - 50) * 14)}%`,
                    '--fy': `${Math.round((parseFloat(hotspot.top) - 55) * 14)}%`,
                  }}
                >
                  <span className="kt-fly">
                    <img src={sector.icon} alt={sector.name} className="kt-ico" />
                    <span className="kt-ring" aria-hidden="true" />
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <p className="kt-hint">
          <span className="lg:inline hidden">Hover over an icon to discover each sector</span>
          <span className="lg:hidden">Tap an icon to discover each sector</span>
        </p>

        <LowerThird ref={lowerThirdRef} sector={activeSector} />
      </div>

      <div className="kt-bar kt-bar-bot">
        <span className="kt-mono kt-hud">
          SC 01 · {activeSector ? `Focus · ${activeSector.name.split(' ')[0]}` : 'Ignition'}
        </span>
        <div className="kt-bot-center">
          <p className="kt-subtitle">
            Turning complex, under-served problems into quietly powerful prototypes.
          </p>
          <button type="button" onClick={() => scrollToSection('about')} className="kt-enter">
            <span>Enter the maze</span>
            <span aria-hidden="true" className="kt-enter-arrow">↓</span>
          </button>
        </div>
        <span ref={timecodeRef} className="kt-mono kt-hud kt-hud-right" aria-hidden="true">
          00:00:00:00
        </span>
      </div>
    </section>
  );
}
