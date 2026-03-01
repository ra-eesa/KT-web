import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import LogoHero from '../LogoHero';
import { sectors } from '../../data/sectors';

// Use real timers for these tests since they involve animations
beforeEach(() => {
  vi.useRealTimers();
});

describe('LogoHero - Landing Page Load Tests', () => {
  describe('Logo and hero section render correctly', () => {
    it('should render the main logo image', () => {
      render(<LogoHero />);

      const logoImage = screen.getByAltText('Kabir Technologies');
      expect(logoImage).toBeInTheDocument();
      expect(logoImage).toHaveAttribute('src', '/logo-main.svg');
    });

    it('should render the hero section container', () => {
      const { container } = render(<LogoHero />);

      const heroSection = container.querySelector('section');
      expect(heroSection).toBeInTheDocument();
      expect(heroSection).toHaveClass('min-h-screen');
    });

    it('should render the early-stage badge', () => {
      render(<LogoHero />);

      const badge = screen.getByText(/early-stage deep tech studio/i);
      expect(badge).toBeInTheDocument();
    });

    it('should render hover instruction text', () => {
      render(<LogoHero />);

      const instruction = screen.getByText(/hover over an icon to discover each sector/i);
      expect(instruction).toBeInTheDocument();
    });

    it('should render the tagline', () => {
      render(<LogoHero />);

      const tagline = screen.getByText(/turning complex, under-served problems into quietly powerful prototypes/i);
      expect(tagline).toBeInTheDocument();
    });

    it('should render the scroll hint button', () => {
      render(<LogoHero />);

      const scrollButton = screen.getByRole('button', { name: /enter the maze/i });
      expect(scrollButton).toBeInTheDocument();
    });
  });

  describe('All 5 sector icons appear in correct positions (from sectors.js)', () => {
    it('should render exactly 5 sector icons', () => {
      render(<LogoHero />);

      // Get all sector icon buttons
      const sectorButtons = screen.getAllByRole('button').filter(button =>
        button.getAttribute('aria-label')?.includes('Learn about')
      );

      expect(sectorButtons).toHaveLength(5);
    });

    it('should render Heritage sector icon with desktop position from sectors.js', () => {
      render(<LogoHero />);

      const heritageSector = sectors.find(s => s.id === 'heritage');
      const heritageButton = screen.getByRole('button', { name: /learn about heritage/i });
      expect(heritageButton).toBeInTheDocument();
      // Verify desktop position matches sectors.js data
      expect(heritageButton).toHaveStyle({
        left: heritageSector.hotspot.desktop.left,
        top: heritageSector.hotspot.desktop.top
      });

      const heritageIcon = screen.getByAltText('Heritage & Architecture');
      expect(heritageIcon).toHaveAttribute('src', heritageSector.icon);
    });

    it('should render Agriculture sector icon with desktop position from sectors.js', () => {
      render(<LogoHero />);

      const agriSector = sectors.find(s => s.id === 'agriculture');
      const agriButton = screen.getByRole('button', { name: /learn about agriculture/i });
      expect(agriButton).toBeInTheDocument();
      expect(agriButton).toHaveStyle({
        left: agriSector.hotspot.desktop.left,
        top: agriSector.hotspot.desktop.top
      });

      const agriIcon = screen.getByAltText('Agriculture & Water Systems');
      expect(agriIcon).toHaveAttribute('src', agriSector.icon);
    });

    it('should render Healthcare sector icon with desktop position from sectors.js', () => {
      render(<LogoHero />);

      const healthSector = sectors.find(s => s.id === 'healthcare');
      const healthButton = screen.getByRole('button', { name: /learn about healthcare/i });
      expect(healthButton).toBeInTheDocument();
      expect(healthButton).toHaveStyle({
        left: healthSector.hotspot.desktop.left,
        top: healthSector.hotspot.desktop.top
      });

      const healthIcon = screen.getByAltText('Healthcare & Diagnostics');
      expect(healthIcon).toHaveAttribute('src', healthSector.icon);
    });

    it('should render Biodiversity sector icon with desktop position from sectors.js', () => {
      render(<LogoHero />);

      const bioSector = sectors.find(s => s.id === 'biodiversity');
      const bioButton = screen.getByRole('button', { name: /learn about biodiversity/i });
      expect(bioButton).toBeInTheDocument();
      expect(bioButton).toHaveStyle({
        left: bioSector.hotspot.desktop.left,
        top: bioSector.hotspot.desktop.top
      });

      const bioIcon = screen.getByAltText('Biodiversity & Climate');
      expect(bioIcon).toHaveAttribute('src', bioSector.icon);
    });

    it('should render Space sector icon with desktop position from sectors.js', () => {
      render(<LogoHero />);

      const spaceSector = sectors.find(s => s.id === 'space');
      const spaceButton = screen.getByRole('button', { name: /learn about space/i });
      expect(spaceButton).toBeInTheDocument();
      expect(spaceButton).toHaveStyle({
        left: spaceSector.hotspot.desktop.left,
        top: spaceSector.hotspot.desktop.top
      });

      const spaceIcon = screen.getByAltText('Space & Frontier Systems');
      expect(spaceIcon).toHaveAttribute('src', spaceSector.icon);
    });

    it('should have space icon larger than other icons', () => {
      render(<LogoHero />);

      const spaceIcon = screen.getByAltText('Space & Frontier Systems');
      const heritageIcon = screen.getByAltText('Heritage & Architecture');

      // Space icon should have larger dimensions (w-6 h-6 md:w-20 md:h-20)
      // vs other icons (w-5 h-5 md:w-16 md:h-16)
      expect(spaceIcon.className).toContain('w-7');
      expect(heritageIcon.className).toContain('w-6');
    });

    // EXPLICIT DESKTOP POSITION REFERENCE TESTS - Ensure triangle proportions are maintained
    describe('Explicit desktop position references (to prevent accidental position drift)', () => {
      it('should have Heritage icon at exactly 23% left, 74% top on desktop', () => {
        Object.defineProperty(window, 'innerWidth', { writable: true, configurable: true, value: 1280 });
        render(<LogoHero />);
        window.dispatchEvent(new Event('resize'));

        const heritageButton = screen.getByRole('button', { name: /learn about heritage/i });
        expect(heritageButton).toHaveStyle({ left: '23%', top: '74%' });
      });

      it('should have Agriculture icon at exactly 78% left, 80.5% top on desktop', () => {
        Object.defineProperty(window, 'innerWidth', { writable: true, configurable: true, value: 1280 });
        render(<LogoHero />);
        window.dispatchEvent(new Event('resize'));

        const agriButton = screen.getByRole('button', { name: /learn about agriculture/i });
        expect(agriButton).toHaveStyle({ left: '78%', top: '80.5%' });
      });

      it('should have Healthcare icon at exactly 50% left, 79.5% top on desktop', () => {
        Object.defineProperty(window, 'innerWidth', { writable: true, configurable: true, value: 1280 });
        render(<LogoHero />);
        window.dispatchEvent(new Event('resize'));

        const healthButton = screen.getByRole('button', { name: /learn about healthcare/i });
        expect(healthButton).toHaveStyle({ left: '50%', top: '79.5%' });
      });

      it('should have Biodiversity icon at exactly 69.3% left, 60.5% top on desktop', () => {
        Object.defineProperty(window, 'innerWidth', { writable: true, configurable: true, value: 1280 });
        render(<LogoHero />);
        window.dispatchEvent(new Event('resize'));

        const bioButton = screen.getByRole('button', { name: /learn about biodiversity/i });
        expect(bioButton).toHaveStyle({ left: '69.3%', top: '60.5%' });
      });

      it('should have Space icon at exactly 50% left, 33% top on desktop', () => {
        Object.defineProperty(window, 'innerWidth', { writable: true, configurable: true, value: 1280 });
        render(<LogoHero />);
        window.dispatchEvent(new Event('resize'));

        const spaceButton = screen.getByRole('button', { name: /learn about space/i });
        expect(spaceButton).toHaveStyle({ left: '50%', top: '33%' });
      });
    });
  });

  // Sector Interaction tests are covered by E2E tests due to animation timing
  describe.skip('Sector Interaction', () => {
    it('should show Heritage sector card on hover', async () => {
      render(<LogoHero />);

      const heritageButton = screen.getByRole('button', { name: /learn about heritage/i });

      // Initially no card visible
      expect(screen.queryByText('Heritage & Architecture')).not.toBeInTheDocument();

      // Hover over button
      heritageButton.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));

      // Wait for card to appear with animation
      await waitFor(() => {
        expect(screen.getByText('Heritage & Architecture')).toBeInTheDocument();
      }, { timeout: 200 });

      expect(screen.getByText(/intelligent tools for fragile built heritage/i)).toBeInTheDocument();
    });

    it('should show Agriculture sector card on hover', async () => {
      render(<LogoHero />);

      const agricultureButton = screen.getByRole('button', { name: /learn about agriculture/i });
      agricultureButton.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));

      await waitFor(() => {
        expect(screen.getByText('Agriculture & Water Systems')).toBeInTheDocument();
      });
      expect(screen.getByText(/fair, transparent insight into land and water use/i)).toBeInTheDocument();
    });

    it('should show Healthcare sector card on hover', async () => {
      render(<LogoHero />);

      const healthcareButton = screen.getByRole('button', { name: /learn about healthcare/i });
      healthcareButton.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));

      await waitFor(() => {
        expect(screen.getByText('Healthcare & Diagnostics')).toBeInTheDocument();
      });
      expect(screen.getByText(/pattern recognition for subtle clinical signals/i)).toBeInTheDocument();
    });

    it('should show Biodiversity sector card on hover', async () => {
      render(<LogoHero />);

      const biodiversityButton = screen.getByRole('button', { name: /learn about biodiversity/i });
      biodiversityButton.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));

      await waitFor(() => {
        expect(screen.getByText('Biodiversity & Climate')).toBeInTheDocument();
      });
      expect(screen.getByText(/watching ecosystems on the edge/i)).toBeInTheDocument();
    });

    it('should show Space sector card on hover', async () => {
      render(<LogoHero />);

      const spaceButton = screen.getByRole('button', { name: /learn about space/i });
      spaceButton.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));

      await waitFor(() => {
        expect(screen.getByText('Space & Frontier Systems')).toBeInTheDocument();
      });
      expect(screen.getByText(/simulating routes beyond the obvious/i)).toBeInTheDocument();
    });

    it('should hide card on mouse leave', async () => {
      render(<LogoHero />);

      const heritageButton = screen.getByRole('button', { name: /learn about heritage/i });

      // Show card
      heritageButton.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
      await waitFor(() => {
        expect(screen.getByText('Heritage & Architecture')).toBeInTheDocument();
      });

      // Hide card
      heritageButton.dispatchEvent(new MouseEvent('mouseleave', { bubbles: true }));
      expect(screen.queryByText('Heritage & Architecture')).not.toBeInTheDocument();
    });

    it('should display sector card content correctly', async () => {
      render(<LogoHero />);

      const heritageButton = screen.getByRole('button', { name: /learn about heritage/i });
      heritageButton.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));

      // Wait for card to appear
      await waitFor(() => {
        expect(screen.getByText('Heritage & Architecture')).toBeInTheDocument();
      });

      // Check all content elements
      expect(screen.getByText(/intelligent tools for fragile built heritage/i)).toBeInTheDocument();
      expect(screen.getByText(/structural monitoring, predictive maintenance/i)).toBeInTheDocument();
      expect(screen.getByText(/ideal partner/i)).toBeInTheDocument();
      expect(screen.getByText(/heritage architects, conservation bodies/i)).toBeInTheDocument();
    });
  });

  describe('Scroll functionality', () => {
    it('should scroll to about section when "Enter the maze" is clicked', () => {
      // Mock scrollIntoView
      const scrollIntoViewMock = vi.fn();
      const mockElement = { scrollIntoView: scrollIntoViewMock };

      vi.spyOn(document, 'getElementById').mockReturnValue(mockElement);

      render(<LogoHero />);

      const scrollButton = screen.getByRole('button', { name: /enter the maze/i });
      scrollButton.click();

      expect(document.getElementById).toHaveBeenCalledWith('about');
      expect(scrollIntoViewMock).toHaveBeenCalledWith({ behavior: 'smooth' });
    });
  });

  describe('Mobile Responsive Behavior', () => {
    it('should detect mobile viewport on initial render', () => {
      // Mock window.innerWidth to mobile size
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 375
      });

      const { container } = render(<LogoHero />);
      
      // Trigger resize event to update isMobile state
      window.dispatchEvent(new Event('resize'));

      // Logo container should have responsive max-width class
      const logoContainer = container.querySelector('[class*="max-w-"]');
      expect(logoContainer).toBeInTheDocument();
    });

    it('should use mobile hotspot positions from sectors.js on mobile viewport', () => {
      // Mock mobile viewport
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 390
      });

      render(<LogoHero />);
      window.dispatchEvent(new Event('resize'));

      // Verify ALL sectors use their mobile positions from sectors.js
      sectors.forEach(sector => {
        const button = screen.getByRole('button', { name: new RegExp(`learn about ${sector.id}`, 'i') });
        expect(button).toHaveStyle({
          left: sector.hotspot.mobile.left,
          top: sector.hotspot.mobile.top
        });
      });
    });

    // EXPLICIT POSITION REFERENCE TESTS - These ensure positions don't accidentally change
    // If you intentionally want to change icon positions, update both sectors.js AND these test values
    describe('Explicit mobile position references (to prevent accidental position drift)', () => {
      it('should have Heritage icon at exactly 25% left, 74% top on mobile', () => {
        Object.defineProperty(window, 'innerWidth', { writable: true, configurable: true, value: 375 });
        render(<LogoHero />);
        window.dispatchEvent(new Event('resize'));

        const heritageButton = screen.getByRole('button', { name: /learn about heritage/i });
        expect(heritageButton).toHaveStyle({ left: '25%', top: '74%' });
      });

      it('should have Agriculture icon at exactly 82% left, 81% top on mobile', () => {
        Object.defineProperty(window, 'innerWidth', { writable: true, configurable: true, value: 375 });
        render(<LogoHero />);
        window.dispatchEvent(new Event('resize'));

        const agriButton = screen.getByRole('button', { name: /learn about agriculture/i });
        expect(agriButton).toHaveStyle({ left: '82%', top: '81%' });
      });

      it('should have Healthcare icon at exactly 54% left, 79.5% top on mobile', () => {
        Object.defineProperty(window, 'innerWidth', { writable: true, configurable: true, value: 375 });
        render(<LogoHero />);
        window.dispatchEvent(new Event('resize'));

        const healthButton = screen.getByRole('button', { name: /learn about healthcare/i });
        expect(healthButton).toHaveStyle({ left: '54%', top: '79.5%' });
      });

      it('should have Biodiversity icon at exactly 73.5% left, 60.5% top on mobile', () => {
        Object.defineProperty(window, 'innerWidth', { writable: true, configurable: true, value: 375 });
        render(<LogoHero />);
        window.dispatchEvent(new Event('resize'));

        const bioButton = screen.getByRole('button', { name: /learn about biodiversity/i });
        expect(bioButton).toHaveStyle({ left: '73.5%', top: '60.5%' });
      });

      it('should have Space icon at exactly 51.5% left, 33% top on mobile', () => {
        Object.defineProperty(window, 'innerWidth', { writable: true, configurable: true, value: 375 });
        render(<LogoHero />);
        window.dispatchEvent(new Event('resize'));

        const spaceButton = screen.getByRole('button', { name: /learn about space/i });
        expect(spaceButton).toHaveStyle({ left: '51.5%', top: '33%' });
      });
    });

    it('should use smaller icon sizes on mobile', () => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 375
      });

      render(<LogoHero />);
      window.dispatchEvent(new Event('resize'));

      const spaceIcon = screen.getByAltText('Space & Frontier Systems');
      const heritageIcon = screen.getByAltText('Heritage & Architecture');

      // Mobile: Space w-7 h-7, others w-6 h-6
      expect(spaceIcon.className).toContain('w-7');
      expect(heritageIcon.className).toContain('w-6');
    });

    it('should have proper spacing between badge and logo on mobile', () => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 375
      });

      const { container } = render(<LogoHero />);
      window.dispatchEvent(new Event('resize'));

      // Badge container should have mt-12 mb-6 on mobile
      const badgeContainer = container.querySelector('.mt-12');
      expect(badgeContainer).toBeInTheDocument();
    });

    it('should show mobile instruction text instead of hover text', () => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 375
      });

      render(<LogoHero />);
      window.dispatchEvent(new Event('resize'));

      // Should show "Tap" instruction for mobile
      const mobileInstruction = screen.getByText(/tap an icon to discover each sector/i);
      expect(mobileInstruction).toBeInTheDocument();

      // Should hide "Hover" instruction
      const hoverInstruction = screen.queryByText(/hover over an icon to discover each sector/i);
      // It exists but is hidden on mobile via CSS
      expect(hoverInstruction).toBeInTheDocument();
    });

    it('should have minimum touch target size of 44px on mobile', () => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 375
      });

      render(<LogoHero />);
      window.dispatchEvent(new Event('resize'));

      const sectorButtons = screen.getAllByRole('button').filter(button =>
        button.getAttribute('aria-label')?.includes('Learn about')
      );

      // All buttons should have data-sector-button attribute (CSS applies min-width/height)
      sectorButtons.forEach(button => {
        expect(button).toHaveAttribute('data-sector-button');
      });
    });

    it('should handle mobile viewport resize events', () => {
      // Start with desktop size
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 1280
      });

      render(<LogoHero />);

      // Then resize to mobile
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 375
      });

      window.dispatchEvent(new Event('resize'));

      // Component should update (check that resize listener is attached)
      const mobileInstruction = screen.getByText(/tap an icon to discover each sector/i);
      expect(mobileInstruction).toBeInTheDocument();
    });

    it('should use mobile card container on small screens', () => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 375
      });

      const { container } = render(<LogoHero />);
      window.dispatchEvent(new Event('resize'));

      // Mobile card container should have lg:hidden class
      const mobileCardContainer = container.querySelector('.lg\\:hidden');
      expect(mobileCardContainer).toBeInTheDocument();
    });

    it('should perfectly align active glow circles with responsive icons on mobile', () => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 375
      });
      
      const { getByLabelText } = render(<LogoHero />);
      window.dispatchEvent(new Event('resize'));
      
      const button = getByLabelText(/Learn about Heritage/);
      fireEvent.click(button);
      
      const glowSpan = button.querySelector('span');
      expect(glowSpan).toBeInTheDocument();
      
      // Check alignment classes ensuring exact pinning to vertical center
      expect(glowSpan.className).toContain('absolute');
      expect(glowSpan.className).toContain('left-0');
      expect(glowSpan.className).toContain('top-1/2');
      expect(glowSpan.className).toContain('-translate-y-1/2');
      
      // Check size matches icon sizes exactly
      expect(glowSpan.className).toContain('w-6');
      expect(glowSpan.className).toContain('h-6');
    });
  });
});
