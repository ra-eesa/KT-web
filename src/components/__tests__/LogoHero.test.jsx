import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import LogoHero, { INTRO_KEY } from '../LogoHero';
import { sectors } from '../../data/sectors';

const setWidth = (width) => {
  act(() => {
    window.innerWidth = width;
    window.dispatchEvent(new Event('resize'));
  });
};

beforeEach(() => {
  vi.useRealTimers();
  sessionStorage.clear();
  window.innerWidth = 1280;
});

afterEach(() => {
  window.innerWidth = 1024;
});

const sectorButton = (sector) =>
  screen.getByRole('button', { name: `Learn about ${sector.name}` });

describe('LogoHero - opening shot', () => {
  describe('renders the hero', () => {
    it('renders the main logo from /public', () => {
      render(<LogoHero />);
      const logo = screen.getByAltText('Kabir Technologies');
      expect(logo).toHaveAttribute('src', '/logo-main.svg');
    });

    it('renders as a full-height section', () => {
      const { container } = render(<LogoHero />);
      expect(container.querySelector('section')).toHaveClass('min-h-screen');
    });

    it('renders the badge, instruction and tagline', () => {
      render(<LogoHero />);
      expect(screen.getByText(/early-stage deep tech studio/i)).toBeInTheDocument();
      expect(screen.getByText(/hover over an icon to discover each sector/i)).toBeInTheDocument();
      expect(screen.getByText(/tap an icon to discover each sector/i)).toBeInTheDocument();
      expect(
        screen.getByText(/turning complex, under-served problems into quietly powerful prototypes/i)
      ).toBeInTheDocument();
    });

    it('scrolls to About when "Enter the maze" is clicked', () => {
      const about = document.createElement('div');
      about.id = 'about';
      about.scrollIntoView = vi.fn();
      document.body.appendChild(about);

      render(<LogoHero />);
      fireEvent.click(screen.getByRole('button', { name: /enter the maze/i }));

      expect(about.scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' });
      about.remove();
    });
  });

  describe('plays once per browser session', () => {
    it('plays the opening sequence on first visit and remembers it', () => {
      const { container } = render(<LogoHero />);
      expect(container.querySelector('section')).toHaveClass('play');
      expect(sessionStorage.getItem(INTRO_KEY)).toBe('1');
    });

    it('opens on the final frame when the sequence already played', () => {
      sessionStorage.setItem(INTRO_KEY, '1');
      const { container } = render(<LogoHero />);
      expect(container.querySelector('section')).not.toHaveClass('play');
    });
  });

  describe('sector marks keep their positions from sectors.js', () => {
    it('renders one button and icon per sector', () => {
      render(<LogoHero />);
      expect(screen.getAllByRole('button', { name: /learn about/i })).toHaveLength(5);
      sectors.forEach((sector) => {
        expect(screen.getByAltText(sector.name)).toHaveAttribute('src', sector.icon);
      });
    });

    it.each(sectors.map((s) => [s.id, s]))('places %s at its desktop hotspot', (_, sector) => {
      render(<LogoHero />);
      const button = sectorButton(sector);
      expect(button.style.left).toBe(sector.hotspot.desktop.left);
      expect(button.style.top).toBe(sector.hotspot.desktop.top);
    });

    it.each(sectors.map((s) => [s.id, s]))('places %s at its mobile hotspot', (_, sector) => {
      render(<LogoHero />);
      setWidth(375);
      const button = sectorButton(sector);
      expect(button.style.left).toBe(sector.hotspot.mobile.left);
      expect(button.style.top).toBe(sector.hotspot.mobile.top);
    });

    it('keeps the space mark larger than the others', () => {
      render(<LogoHero />);
      const space = sectors.find((s) => s.id === 'space');
      const heritage = sectors.find((s) => s.id === 'heritage');
      expect(sectorButton(space).style.getPropertyValue('--w')).toBe('11.9%');
      expect(sectorButton(heritage).style.getPropertyValue('--w')).toBe('9.5%');
    });
  });

  describe('focus pull on desktop', () => {
    it('shows the lower third for a hovered sector and hides it on leave', () => {
      render(<LogoHero />);
      const heritage = sectors[0];

      fireEvent.mouseEnter(sectorButton(heritage));
      expect(screen.getByRole('heading', { name: heritage.name })).toBeInTheDocument();
      expect(screen.getByText(heritage.strapline)).toBeInTheDocument();
      expect(screen.getByText(heritage.idealPartner)).toBeInTheDocument();
      expect(sectorButton(heritage)).toHaveAttribute('aria-pressed', 'true');

      fireEvent.mouseLeave(sectorButton(heritage));
      expect(screen.queryByRole('heading', { name: heritage.name })).not.toBeInTheDocument();
    });

    it('opens the lower third on the same side as the old sector card', () => {
      const { container } = render(<LogoHero />);
      sectors.forEach((sector) => {
        fireEvent.mouseEnter(sectorButton(sector));
        expect(container.querySelector('.kt-lt-card')).toHaveClass(`kt-lt-${sector.cardPosition}`);
        fireEvent.mouseLeave(sectorButton(sector));
      });
    });

    it('dims the pyramid while a sector is in focus', () => {
      const { container } = render(<LogoHero />);
      const pyramid = container.querySelector('.kt-pyr');
      expect(pyramid).toHaveAttribute('data-focusing', 'false');
      fireEvent.mouseEnter(sectorButton(sectors[1]));
      expect(pyramid).toHaveAttribute('data-focusing', 'true');
    });
  });

  describe('tap to explore on mobile', () => {
    beforeEach(() => {
      window.innerWidth = 375;
    });

    it('toggles the lower third when the same mark is tapped twice', () => {
      render(<LogoHero />);
      const heritage = sectors[0];

      fireEvent.click(sectorButton(heritage));
      expect(screen.getByRole('heading', { name: heritage.name })).toBeInTheDocument();

      fireEvent.click(sectorButton(heritage));
      expect(screen.queryByRole('heading', { name: heritage.name })).not.toBeInTheDocument();
    });

    it('switches sectors when a different mark is tapped', () => {
      render(<LogoHero />);
      fireEvent.click(sectorButton(sectors[0]));
      fireEvent.click(sectorButton(sectors[1]));
      expect(screen.queryByRole('heading', { name: sectors[0].name })).not.toBeInTheDocument();
      expect(screen.getByRole('heading', { name: sectors[1].name })).toBeInTheDocument();
    });

    it('closes the lower third when tapping outside it', () => {
      render(<LogoHero />);
      fireEvent.click(sectorButton(sectors[0]));
      fireEvent.click(document.body);
      expect(screen.queryByRole('heading', { name: sectors[0].name })).not.toBeInTheDocument();
    });

    it('ignores hover so taps are not doubled', () => {
      render(<LogoHero />);
      fireEvent.mouseEnter(sectorButton(sectors[0]));
      expect(screen.queryByRole('heading', { name: sectors[0].name })).not.toBeInTheDocument();
    });
  });
});
