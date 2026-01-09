import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import LogoHero from '../LogoHero';

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

  describe('All 5 sector icons appear in correct positions', () => {
    it('should render exactly 5 sector icons', () => {
      render(<LogoHero />);

      // Get all sector icon buttons
      const sectorButtons = screen.getAllByRole('button').filter(button =>
        button.getAttribute('aria-label')?.includes('Learn about')
      );

      expect(sectorButtons).toHaveLength(5);
    });

    it('should render Heritage sector icon with correct position', () => {
      render(<LogoHero />);

      const heritageButton = screen.getByRole('button', { name: /learn about heritage/i });
      expect(heritageButton).toBeInTheDocument();
      expect(heritageButton).toHaveStyle({ left: '23%', top: '74%' });

      const heritageIcon = screen.getByAltText('Heritage & Architecture');
      expect(heritageIcon).toHaveAttribute('src', '/icon-heritage.svg');
    });

    it('should render Agriculture sector icon with correct position', () => {
      render(<LogoHero />);

      const agricultureButton = screen.getByRole('button', { name: /learn about agriculture/i });
      expect(agricultureButton).toBeInTheDocument();
      expect(agricultureButton).toHaveStyle({ left: '78%', top: '80.5%' });

      const agricultureIcon = screen.getByAltText('Agriculture & Water Systems');
      expect(agricultureIcon).toHaveAttribute('src', '/icon-agriculture.svg');
    });

    it('should render Healthcare sector icon with correct position', () => {
      render(<LogoHero />);

      const healthcareButton = screen.getByRole('button', { name: /learn about healthcare/i });
      expect(healthcareButton).toBeInTheDocument();
      expect(healthcareButton).toHaveStyle({ left: '50%', top: '79.5%' });

      const healthcareIcon = screen.getByAltText('Healthcare & Diagnostics');
      expect(healthcareIcon).toHaveAttribute('src', '/icon-healthcare.svg');
    });

    it('should render Biodiversity sector icon with correct position', () => {
      render(<LogoHero />);

      const biodiversityButton = screen.getByRole('button', { name: /learn about biodiversity/i });
      expect(biodiversityButton).toBeInTheDocument();
      expect(biodiversityButton).toHaveStyle({ left: '69.3%', top: '60.5%' });

      const biodiversityIcon = screen.getByAltText('Biodiversity & Climate');
      expect(biodiversityIcon).toHaveAttribute('src', '/icon-biodiversity.svg');
    });

    it('should render Space sector icon with correct position', () => {
      render(<LogoHero />);

      const spaceButton = screen.getByRole('button', { name: /learn about space/i });
      expect(spaceButton).toBeInTheDocument();
      expect(spaceButton).toHaveStyle({ left: '50%', top: '33%' });

      const spaceIcon = screen.getByAltText('Space & Frontier Systems');
      expect(spaceIcon).toHaveAttribute('src', '/icon-space.svg');
    });

    it('should have space icon larger than other icons', () => {
      render(<LogoHero />);

      const spaceIcon = screen.getByAltText('Space & Frontier Systems');
      const heritageIcon = screen.getByAltText('Heritage & Architecture');

      // Space icon should have larger dimensions (w-8 h-8 md:w-20 md:h-20)
      // vs other icons (w-6 h-6 md:w-16 md:h-16)
      expect(spaceIcon.className).toContain('w-8');
      expect(heritageIcon.className).toContain('w-6');
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
});
