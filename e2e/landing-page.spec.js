import { test, expect } from '@playwright/test';

test.describe('Landing Page Load - Critical Path Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test.describe('Logo and hero section render correctly', () => {
    test('should display the main logo', async ({ page }) => {
      const logo = page.locator('img[alt="Kabir Technologies"]');
      await expect(logo).toBeVisible();
      await expect(logo).toHaveAttribute('src', '/logo-main.svg');
    });

    test('should display the hero section with correct layout', async ({ page, viewport }) => {
      const heroSection = page.locator('section').first();
      await expect(heroSection).toBeVisible();

      // Check for early-stage badge
      await expect(page.getByText(/early-stage deep tech studio/i)).toBeVisible();

      // Check for instruction text (desktop shows "hover", mobile shows "tap")
      if (viewport.width < 1024) {
        await expect(page.getByText(/tap an icon to discover each sector/i)).toBeVisible();
      } else {
        await expect(page.getByText(/hover over an icon to discover each sector/i)).toBeVisible();
      }

      // Check for tagline
      await expect(page.getByText(/turning complex, under-served problems/i)).toBeVisible();
    });

    test('should display scroll hint button', async ({ page }) => {
      const scrollButton = page.getByRole('button', { name: /enter the maze/i });
      await expect(scrollButton).toBeVisible();
    });
  });

  test.describe('All 5 sector icons appear in correct positions', () => {
    test('should render exactly 5 sector icon buttons', async ({ page }) => {
      // Wait for sector icons to load
      await page.waitForLoadState('networkidle');

      const sectorButtons = page.locator('button[aria-label*="Learn about"]');
      await expect(sectorButtons).toHaveCount(5);
    });

    test('should display Heritage sector icon', async ({ page }) => {
      const heritageIcon = page.locator('img[alt="Heritage & Architecture"]');
      await expect(heritageIcon).toBeVisible();
      await expect(heritageIcon).toHaveAttribute('src', '/icon-heritage.svg');
    });

    test('should display Agriculture sector icon', async ({ page }) => {
      const agricultureIcon = page.locator('img[alt="Agriculture & Water Systems"]');
      await expect(agricultureIcon).toBeVisible();
      await expect(agricultureIcon).toHaveAttribute('src', '/icon-agriculture.svg');
    });

    test('should display Healthcare sector icon', async ({ page }) => {
      const healthcareIcon = page.locator('img[alt="Healthcare & Diagnostics"]');
      await expect(healthcareIcon).toBeVisible();
      await expect(healthcareIcon).toHaveAttribute('src', '/icon-healthcare.svg');
    });

    test('should display Biodiversity sector icon', async ({ page }) => {
      const biodiversityIcon = page.locator('img[alt="Biodiversity & Climate"]');
      await expect(biodiversityIcon).toBeVisible();
      await expect(biodiversityIcon).toHaveAttribute('src', '/icon-biodiversity.svg');
    });

    test('should display Space sector icon', async ({ page }) => {
      const spaceIcon = page.locator('img[alt="Space & Frontier Systems"]');
      await expect(spaceIcon).toBeVisible();
      await expect(spaceIcon).toHaveAttribute('src', '/icon-space.svg');
    });

    test('sector icons should be positioned within the logo area', async ({ page }) => {
      const logo = page.locator('img[alt="Kabir Technologies"]');
      const logoBox = await logo.boundingBox();

      const heritageButton = page.locator('button[aria-label*="Heritage"]');
      const heritageBox = await heritageButton.boundingBox();

      // Heritage icon should be near the logo
      expect(heritageBox.x).toBeGreaterThan(logoBox.x - 100);
      expect(heritageBox.x).toBeLessThan(logoBox.x + logoBox.width + 100);
    });
  });

  test.describe('Snake maze background initializes without errors', () => {
    test('should render canvas elements in background sections', async ({ page }) => {
      // There are 3 canvas elements - one in Philosophy, Lab, and Contact sections
      const canvases = page.locator('canvas');
      await expect(canvases).toHaveCount(3);

      // Check first canvas is visible
      await expect(canvases.first()).toBeVisible();
    });

    test('should have canvas with correct styling', async ({ page }) => {
      const canvas = page.locator('canvas').first();

      // Check canvas classes
      const classes = await canvas.getAttribute('class');
      expect(classes).toContain('absolute');
      expect(classes).toContain('inset-0');
    });

    test('should initialize canvas without JavaScript errors', async ({ page }) => {
      const consoleErrors = [];
      page.on('console', (msg) => {
        if (msg.type() === 'error') {
          consoleErrors.push(msg.text());
        }
      });

      page.on('pageerror', (error) => {
        consoleErrors.push(error.message);
      });

      await page.waitForTimeout(2000); // Wait for animations to start

      // Check no critical errors occurred
      const criticalErrors = consoleErrors.filter(
        (error) => !error.includes('404') // Ignore 404s for optional resources
      );
      expect(criticalErrors.length).toBe(0);
    });

    test('canvas should have correct dimensions', async ({ page }) => {
      const canvas = page.locator('canvas').first();
      const canvasBox = await canvas.boundingBox();

      // Canvas should have reasonable dimensions
      expect(canvasBox.width).toBeGreaterThan(100);
      expect(canvasBox.height).toBeGreaterThan(100);
    });
  });

  test.describe('Sector Interaction', () => {
    test('should allow hovering over all 5 sector icons without errors (desktop)', async ({ page, viewport }) => {
      test.skip(viewport.width < 1024, 'Desktop-only test');

      await page.waitForLoadState('networkidle');

      const sectors = ['Heritage', 'Agriculture', 'Healthcare', 'Biodiversity', 'Space'];

      for (const sector of sectors) {
        const button = page.locator(`button[aria-label*="${sector}"]`);
        await button.hover();
        await page.waitForTimeout(100);

        // Verify button is still visible after hover (no JavaScript errors)
        await expect(button).toBeVisible();
      }
    });
  });

  test.describe('Navigation Flow', () => {
    test('should scroll to About section when clicking "Enter the maze"', async ({ page }) => {
      const scrollButton = page.getByRole('button', { name: /enter the maze/i });
      await scrollButton.click();

      // Wait for smooth scroll to complete
      await page.waitForTimeout(1000);

      // Check that we've scrolled down
      const scrollY = await page.evaluate(() => window.scrollY);
      expect(scrollY).toBeGreaterThan(100);
    });

    test('should navigate to About section via header link (desktop)', async ({ page, viewport }) => {
      test.skip(viewport.width < 768, 'Desktop-only test - nav links hidden on mobile');

      const aboutButton = page.locator('header div.hidden.md\\:flex button', { hasText: 'About' });
      await aboutButton.click();
      await page.waitForTimeout(1000);

      const scrollY = await page.evaluate(() => window.scrollY);
      expect(scrollY).toBeGreaterThan(100);
    });

    test('should navigate to Philosophy section via header link (desktop)', async ({ page, viewport }) => {
      test.skip(viewport.width < 768, 'Desktop-only test - nav links hidden on mobile');

      const philosophyButton = page.locator('header div.hidden.md\\:flex button', { hasText: 'Philosophy' });
      await philosophyButton.click();
      await page.waitForTimeout(1000);

      const scrollY = await page.evaluate(() => window.scrollY);
      expect(scrollY).toBeGreaterThan(100);
    });

    test('should navigate to Sectors section via header link (desktop)', async ({ page, viewport }) => {
      test.skip(viewport.width < 768, 'Desktop-only test - nav links hidden on mobile');

      const sectorsButton = page.locator('header div.hidden.md\\:flex button', { hasText: 'Sectors' });
      await sectorsButton.click();
      await page.waitForTimeout(1000);

      const scrollY = await page.evaluate(() => window.scrollY);
      expect(scrollY).toBeGreaterThan(100);
    });

    test('should navigate to Lab section via header link (desktop)', async ({ page, viewport }) => {
      test.skip(viewport.width < 768, 'Desktop-only test - nav links hidden on mobile');

      const labButton = page.locator('header div.hidden.md\\:flex button', { hasText: 'KT Lab' });
      await labButton.click();
      await page.waitForTimeout(1000);

      const scrollY = await page.evaluate(() => window.scrollY);
      expect(scrollY).toBeGreaterThan(100);
    });

    test('should navigate to Approach section via header link (desktop)', async ({ page, viewport }) => {
      test.skip(viewport.width < 768, 'Desktop-only test - nav links hidden on mobile');

      const approachButton = page.locator('header div.hidden.md\\:flex button', { hasText: 'Approach' });
      await approachButton.click();
      await page.waitForTimeout(1000);

      const scrollY = await page.evaluate(() => window.scrollY);
      expect(scrollY).toBeGreaterThan(100);
    });

    test('should navigate to Contact section via header link (desktop)', async ({ page, viewport }) => {
      test.skip(viewport.width < 768, 'Desktop-only test - nav links hidden on mobile');

      const contactButton = page.locator('header div.hidden.md\\:flex button', { hasText: 'Contact' });
      await contactButton.click();
      await page.waitForTimeout(1000);

      const scrollY = await page.evaluate(() => window.scrollY);
      expect(scrollY).toBeGreaterThan(100);
    });

    test('should return to top when clicking logo in header (desktop)', async ({ page, viewport }) => {
      test.skip(viewport.width < 768, 'Desktop-only test - nav links hidden on mobile');

      // First scroll down to Contact section
      const contactButton = page.locator('header div.hidden.md\\:flex button', { hasText: 'Contact' });
      await contactButton.click();
      await page.waitForTimeout(1000);

      // Verify we've scrolled down
      let scrollY = await page.evaluate(() => window.scrollY);
      expect(scrollY).toBeGreaterThan(100);

      // Click logo button in header to return to top
      const logoButton = page.locator('header button img[alt="KT"]');
      await logoButton.click();
      await page.waitForTimeout(1000);

      // Verify we're back at the top
      scrollY = await page.evaluate(() => window.scrollY);
      expect(scrollY).toBeLessThan(100);
    });

    test('should use smooth scroll behavior for all navigation', async ({ page }) => {
      // Check that scroll-behavior: smooth is applied
      const htmlElement = page.locator('html');
      const scrollBehavior = await htmlElement.evaluate((el) =>
        window.getComputedStyle(el).scrollBehavior
      );

      expect(scrollBehavior).toBe('smooth');
    });
  });

  test.describe('Mobile Menu', () => {
    test('should show hamburger menu button on mobile', async ({ page, viewport }) => {
      test.skip(viewport.width >= 768, 'Mobile-only test');

      const hamburgerButton = page.locator('header button[aria-label*="menu"]');
      await expect(hamburgerButton).toBeVisible();
    });

    test('should open mobile menu when hamburger clicked', async ({ page, viewport }) => {
      test.skip(viewport.width >= 768, 'Mobile-only test');

      const hamburgerButton = page.locator('header button[aria-label*="menu"]');
      await hamburgerButton.click();

      // Mobile menu should be visible
      const mobileMenu = page.locator('[role="dialog"]').or(page.locator('nav[aria-label*="mobile"]'));
      await expect(mobileMenu).toBeVisible();
    });

    test('should display all navigation links in mobile menu', async ({ page, viewport }) => {
      test.skip(viewport.width >= 768, 'Mobile-only test');

      // Open menu
      const hamburgerButton = page.locator('header button[aria-label*="menu"]');
      await hamburgerButton.click();
      await page.waitForTimeout(500);

      // Check all links are present in the mobile menu
      const mobileNav = page.locator('nav[role="dialog"]');
      const navLinks = ['About', 'Philosophy', 'Sectors', 'KT Lab', 'Approach', 'Contact'];
      for (const linkText of navLinks) {
        const link = mobileNav.locator('button', { hasText: linkText });
        await expect(link).toBeVisible();
      }
    });

    test('should close menu when close button clicked', async ({ page, viewport }) => {
      test.skip(viewport.width >= 768, 'Mobile-only test');

      // Open menu
      const hamburgerButton = page.locator('header button[aria-label*="menu"]');
      await hamburgerButton.click();
      await page.waitForTimeout(300);

      // Close menu by clicking hamburger button again (which is now a close button)
      await hamburgerButton.click();
      await page.waitForTimeout(400);

      // Menu should be translated off-screen
      const mobileMenu = page.locator('nav[role="dialog"]');
      const menuClasses = await mobileMenu.getAttribute('class');
      expect(menuClasses).toContain('translate-x-full');
    });

    test('should close menu and scroll when navigation link clicked', async ({ page, viewport }) => {
      test.skip(viewport.width >= 768, 'Mobile-only test');

      // Open menu
      const hamburgerButton = page.locator('header button[aria-label*="menu"]');
      await hamburgerButton.click();
      await page.waitForTimeout(300);

      // Click About link in mobile menu
      const mobileNav = page.locator('nav[role="dialog"]');
      const aboutLink = mobileNav.locator('button', { hasText: 'About' });
      await aboutLink.click();

      // Wait for transition to complete
      await page.waitForTimeout(400);

      // Menu should have translated off-screen
      const menuClasses = await mobileNav.getAttribute('class');
      expect(menuClasses).toContain('translate-x-full');

      // Page should scroll
      const scrollY = await page.evaluate(() => window.scrollY);
      expect(scrollY).toBeGreaterThan(100);
    });

    test('should animate menu smoothly', async ({ page, viewport }) => {
      test.skip(viewport.width >= 768, 'Mobile-only test');

      const hamburgerButton = page.locator('header button[aria-label*="menu"]');

      // Open menu and check for transition
      await hamburgerButton.click();
      await page.waitForTimeout(100);

      const mobileMenu = page.locator('[role="dialog"]').or(page.locator('nav[aria-label*="mobile"]'));
      const hasTransition = await mobileMenu.evaluate((el) => {
        const style = window.getComputedStyle(el);
        return style.transition !== 'all 0s ease 0s' && style.transition !== '';
      });

      expect(hasTransition).toBeTruthy();
    });
  });

  test.describe('Contact', () => {
    test('should have mailto link with correct email address', async ({ page }) => {
      const emailLink = page.locator('a[href^="mailto:"]');
      await expect(emailLink).toBeVisible();
      await expect(emailLink).toHaveAttribute('href', 'mailto:info@kabirtechnologies.co.uk');
    });

    test('should display contact section with correct heading', async ({ page }) => {
      const contactSection = page.locator('section#contact');
      await expect(contactSection).toBeVisible();

      const heading = contactSection.locator('h2', { hasText: 'Work with us' });
      await expect(heading).toBeVisible();
    });
  });

  test.describe('Visual regression - Screenshots', () => {
    test('should match hero section screenshot', async ({ page }) => {
      // Skip in CI - visual regression works better locally where snapshots are generated
      // eslint-disable-next-line no-undef
      test.skip(!!process.env.CI, 'Screenshot tests run locally only');

      // This test creates baseline screenshots on first run
      // Run with: npx playwright test --update-snapshots
      // to create/update baseline screenshots

      // Wait for page to be fully loaded
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(500); // Wait for animations

      // Take screenshot of hero section
      const heroSection = page.locator('section').first();
      await expect(heroSection).toHaveScreenshot('hero-section.png', {
        maxDiffPixels: 100, // Allow minor rendering differences
      });
    });
  });

  test.describe('Mobile responsiveness', () => {
    test('should display correctly on mobile viewport', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });

      // Logo should be visible
      const logo = page.locator('img[alt="Kabir Technologies"]');
      await expect(logo).toBeVisible();

      // Sector icons should still be visible
      const sectorButtons = page.locator('button[aria-label*="Learn about"]');
      await expect(sectorButtons.first()).toBeVisible();

      // Scroll button should be visible
      const scrollButton = page.getByRole('button', { name: /enter the maze/i });
      await expect(scrollButton).toBeVisible();
    });

    test('should have proper spacing between badge and logo on mobile', async ({ page, viewport }) => {
      test.skip(viewport.width >= 768, 'Mobile-only test');

      // Get badge and logo elements
      const badge = page.locator('span:has-text("Early-stage deep tech studio")');
      const logo = page.locator('img[alt="Kabir Technologies"]');

      await expect(badge).toBeVisible();
      await expect(logo).toBeVisible();

      // Get bounding boxes
      const badgeBox = await badge.boundingBox();
      const logoBox = await logo.boundingBox();

      // Calculate the gap between badge and logo
      const badgeToLogoGap = logoBox.y - (badgeBox.y + badgeBox.height);

      // Should have clearance - badge should be above the logo with mb-12 (48px minimum)
      // Allow for some flex spacing variability
      expect(badgeToLogoGap).toBeGreaterThanOrEqual(30);
    });

    test('should show sector card when tapping icon on mobile', async ({ page, viewport }) => {
      test.skip(viewport.width >= 1024, 'Mobile-only test');

      // Wait for page to be fully loaded
      await page.waitForLoadState('networkidle');

      // Find a sector icon button (Heritage sector)
      const heritageButton = page.locator('[data-sector-button]').first();
      await expect(heritageButton).toBeVisible();

      // Mobile card container should exist but be empty initially
      const mobileCardContainer = page.locator('.lg\\:hidden.w-full.max-w-xl.px-4');

      // Initially no card content
      const initialCount = await mobileCardContainer.locator('h3').count();
      expect(initialCount).toBe(0);

      // Tap the icon
      await heritageButton.click();

      // Card should appear with Heritage title (look for the h3 heading specifically)
      const sectorCardHeading = mobileCardContainer.locator('h3').filter({ hasText: 'Heritage' });
      await expect(sectorCardHeading).toBeVisible({ timeout: 2000 });
    });

    test('should toggle sector card on mobile when tapping same icon twice', async ({ page, viewport }) => {
      test.skip(viewport.width >= 1024, 'Mobile-only test');

      const heritageButton = page.locator('[data-sector-button]').first();
      const mobileCardContainer = page.locator('.lg\\:hidden.w-full.max-w-xl.px-4');

      // First tap - card appears
      await heritageButton.click();
      const sectorCardHeading = mobileCardContainer.locator('h3').filter({ hasText: 'Heritage' });
      await expect(sectorCardHeading).toBeVisible();

      // Second tap - card disappears
      await heritageButton.click();
      const headingCount = await mobileCardContainer.locator('h3').count();
      expect(headingCount).toBe(0);
    });

    test('should switch cards when tapping different sector icons on mobile', async ({ page, viewport }) => {
      test.skip(viewport.width >= 1024, 'Mobile-only test');

      const heritageButton = page.locator('[data-sector-button]').first();
      const agricultureButton = page.locator('[data-sector-button]').nth(1);
      const mobileCardContainer = page.locator('.lg\\:hidden.w-full.max-w-xl.px-4');

      // Tap first icon
      await heritageButton.click();
      await expect(mobileCardContainer.locator('h3').filter({ hasText: 'Heritage' })).toBeVisible();

      // Tap second icon
      await agricultureButton.click();

      // First card should be gone, second should appear
      await expect(mobileCardContainer.locator('h3').filter({ hasText: 'Heritage' })).not.toBeVisible();
      await expect(mobileCardContainer.locator('h3').filter({ hasText: 'Agriculture' })).toBeVisible();
    });

    test('should close card when tapping outside on mobile', async ({ page, viewport }) => {
      test.skip(viewport.width >= 1024, 'Mobile-only test');

      const heritageButton = page.locator('[data-sector-button]').first();
      const mobileCardContainer = page.locator('.lg\\:hidden.w-full.max-w-xl.px-4');

      // Tap icon to show card
      await heritageButton.click();
      const sectorCardHeading = mobileCardContainer.locator('h3').filter({ hasText: 'Heritage' });
      await expect(sectorCardHeading).toBeVisible();

      // Tap outside the card and button (on the background section, forcing through any overlays)
      await page.locator('section').first().click({ position: { x: 10, y: 10 }, force: true });

      // Wait a moment for the click handler to process
      await page.waitForTimeout(300);

      // Card should disappear
      const headingCount = await mobileCardContainer.locator('h3').count();
      expect(headingCount).toBe(0);
    });

    test('should show correct instruction text on mobile', async ({ page, viewport }) => {
      test.skip(viewport.width >= 1024, 'Mobile-only test');

      // Mobile should show "Tap" instruction
      const tapInstruction = page.locator('text=Tap an icon to discover each sector');
      await expect(tapInstruction).toBeVisible();

      // Should not show hover instruction
      const hoverInstruction = page.locator('text=Hover over an icon to discover each sector');
      await expect(hoverInstruction).not.toBeVisible();
    });

  });

  test.describe('Performance', () => {
    test('should load within acceptable time', async ({ page }) => {
      const startTime = Date.now();

      await page.goto('/');
      await page.waitForLoadState('networkidle');

      const loadTime = Date.now() - startTime;

      // Should load within 5 seconds
      expect(loadTime).toBeLessThan(5000);
    });
  });
});
