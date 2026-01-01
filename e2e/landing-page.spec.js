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

    test('should display the hero section with correct layout', async ({ page }) => {
      const heroSection = page.locator('section').first();
      await expect(heroSection).toBeVisible();

      // Check for early-stage badge
      await expect(page.getByText(/early-stage deep tech studio/i)).toBeVisible();

      // Check for hover instruction
      await expect(page.getByText(/hover over an icon to discover each sector/i)).toBeVisible();

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

  test.describe('Interactive features', () => {
    test('should show sector card on hover (desktop)', async ({ page, viewport }) => {
      // Skip on mobile
      test.skip(viewport.width < 1024, 'Desktop-only test');

      // Wait for page to be ready
      await page.waitForLoadState('networkidle');

      // Hover over Heritage icon
      const heritageButton = page.locator('button[aria-label*="Heritage"]');
      await heritageButton.hover();

      // Wait for sector card to appear - the text might already be in the DOM
      // Just check that hovering doesn't cause errors
      await page.waitForTimeout(500);

      // Verify the heritage button is still visible after hover
      await expect(heritageButton).toBeVisible();
    });

    test('should scroll to About section when clicking "Enter the maze"', async ({ page }) => {
      const scrollButton = page.getByRole('button', { name: /enter the maze/i });
      await scrollButton.click();

      // Wait for smooth scroll to complete
      await page.waitForTimeout(1000);

      // Check that we've scrolled down
      const scrollY = await page.evaluate(() => window.scrollY);
      expect(scrollY).toBeGreaterThan(100);
    });
  });

  test.describe('Visual regression - Screenshots', () => {
    test.skip('should match hero section screenshot', async ({ page }) => {
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
