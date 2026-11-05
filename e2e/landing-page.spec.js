import { test, expect } from '@playwright/test';

const INTRO_KEY = 'kt-intro-played';
const SECTORS = [
  { name: 'Heritage & Architecture', icon: '/icon-heritage.svg' },
  { name: 'Agriculture & Water Systems', icon: '/icon-agriculture.svg' },
  { name: 'Healthcare & Diagnostics', icon: '/icon-healthcare.svg' },
  { name: 'Biodiversity & Climate', icon: '/icon-biodiversity.svg' },
  { name: 'Space & Frontier Systems', icon: '/icon-space.svg' },
];

const sectorButton = (page, name) => page.getByRole('button', { name: `Learn about ${name}` });
const lowerThird = (page) => page.locator('.kt-lt');

test.describe('Landing Page - Critical Path Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Skip the opening sequence so interactions start from the final frame
    await page.addInitScript((key) => sessionStorage.setItem(key, '1'), INTRO_KEY);
    await page.goto('/');
  });

  test.describe('Opening shot', () => {
    test('should display the main logo', async ({ page }) => {
      const logo = page.locator('img[alt="Kabir Technologies"]');
      await expect(logo).toBeVisible();
      await expect(logo).toHaveAttribute('src', '/logo-main.svg');
    });

    test('should display badge, instruction and tagline', async ({ page, viewport }) => {
      await expect(page.getByText(/early-stage deep tech studio/i)).toBeVisible();
      if (viewport.width < 1024) {
        await expect(page.getByText(/tap an icon to discover each sector/i)).toBeVisible();
        await expect(page.getByText(/hover over an icon to discover each sector/i)).toBeHidden();
      } else {
        await expect(page.getByText(/hover over an icon to discover each sector/i)).toBeVisible();
      }
      await expect(page.getByText(/turning complex, under-served problems/i)).toBeVisible();
      await expect(page.getByRole('button', { name: /enter the maze/i })).toBeVisible();
    });

    test('should render all 5 sector marks over the pyramid', async ({ page }) => {
      await expect(page.locator('[data-sector-button]')).toHaveCount(5);

      const logoBox = await page.locator('img[alt="Kabir Technologies"]').boundingBox();
      for (const sector of SECTORS) {
        const icon = page.locator(`img[alt="${sector.name}"]`);
        await expect(icon).toBeVisible();
        await expect(icon).toHaveAttribute('src', sector.icon);

        const box = await sectorButton(page, sector.name).boundingBox();
        expect(box.x).toBeGreaterThan(logoBox.x - 20);
        expect(box.x + box.width).toBeLessThan(logoBox.x + logoBox.width + 20);
      }
    });

    test('should render the gold dust without errors', async ({ page }) => {
      const errors = [];
      page.on('pageerror', (error) => errors.push(error.message));
      page.on('console', (msg) => msg.type() === 'error' && errors.push(msg.text()));

      await page.reload();
      await page.waitForTimeout(1500);

      const dust = page.locator('canvas.kt-dust');
      await expect(dust).toHaveCount(1);
      const box = await dust.boundingBox();
      expect(box.width).toBeGreaterThan(100);
      expect(box.height).toBeGreaterThan(100);
      expect(errors.filter((e) => !e.includes('404'))).toEqual([]);
    });
  });

  test.describe('Opening sequence plays once per session', () => {
    test('plays on a fresh session and not on reload', async ({ browser }) => {
      const context = await browser.newContext();
      const page = await context.newPage();
      await page.goto('/');
      await expect(page.locator('section').first()).toHaveClass(/\bplay\b/);

      await page.reload();
      await expect(page.locator('section').first()).not.toHaveClass(/\bplay\b/);
      await context.close();
    });
  });

  test.describe('Focus pull (desktop)', () => {
    test.beforeEach(async ({ viewport }) => {
      test.skip(viewport.width < 1024, 'Desktop-only test');
    });

    test('hovering each mark names its sector in the lower third', async ({ page }) => {
      for (const sector of SECTORS) {
        await sectorButton(page, sector.name).hover();
        await expect(lowerThird(page).getByRole('heading', { name: sector.name })).toBeVisible();
      }
    });

    test('the lower third holds steady while hovering', async ({ page }) => {
      await sectorButton(page, SECTORS[1].name).hover();
      const card = lowerThird(page).locator('.kt-lt-card');
      await expect(card).toBeVisible();
      await page.waitForTimeout(900);
      await expect(card).toHaveCSS('opacity', '1');
    });

    test('moving away clears the focus', async ({ page }) => {
      await sectorButton(page, SECTORS[0].name).hover();
      await expect(lowerThird(page).locator('h3')).toHaveCount(1);
      await page.mouse.move(5, 300);
      await expect(lowerThird(page).locator('h3')).toHaveCount(0);
    });
  });

  test.describe('Tap to explore (mobile)', () => {
    test.beforeEach(async ({ viewport }) => {
      test.skip(viewport.width >= 1024, 'Mobile-only test');
    });

    test('tapping a mark shows its sector, tapping again hides it', async ({ page }) => {
      const heritage = sectorButton(page, SECTORS[0].name);
      await heritage.click();
      await expect(lowerThird(page).getByRole('heading', { name: SECTORS[0].name })).toBeVisible();

      await heritage.click();
      await expect(lowerThird(page).locator('h3')).toHaveCount(0);
    });

    test('tapping a different mark switches sector', async ({ page }) => {
      await sectorButton(page, SECTORS[0].name).click();
      await sectorButton(page, SECTORS[1].name).click();
      await expect(lowerThird(page).getByRole('heading', { name: SECTORS[0].name })).toHaveCount(0);
      await expect(lowerThird(page).getByRole('heading', { name: SECTORS[1].name })).toBeVisible();
    });

    test('tapping outside closes the sector', async ({ page }) => {
      await sectorButton(page, SECTORS[0].name).click();
      await expect(lowerThird(page).locator('h3')).toHaveCount(1);
      await page.getByText(/turning complex, under-served problems/i).click();
      await expect(lowerThird(page).locator('h3')).toHaveCount(0);
    });
  });

  test.describe('Navigation Flow', () => {
    test('should scroll to About when clicking "Enter the maze"', async ({ page }) => {
      await page.getByRole('button', { name: /enter the maze/i }).click();
      await page.waitForTimeout(1000);
      expect(await page.evaluate(() => window.scrollY)).toBeGreaterThan(100);
    });

    for (const label of ['About', 'Philosophy', 'Sectors', 'KT Lab', 'How we build', 'Contact']) {
      test(`should navigate to ${label} via header link (desktop)`, async ({ page, viewport }) => {
        test.skip(viewport.width < 768, 'Desktop-only test - nav links hidden on mobile');

        await page.locator('header div.hidden.md\\:flex button', { hasText: label }).click();
        await page.waitForTimeout(1200);
        expect(await page.evaluate(() => window.scrollY)).toBeGreaterThan(100);
      });
    }

    test('should land on the contact card from the header', async ({ page, viewport }) => {
      test.skip(viewport.width < 768, 'Desktop-only test - nav links hidden on mobile');

      await page.locator('header div.hidden.md\\:flex button', { hasText: 'Contact' }).click();
      await page.waitForTimeout(1500);
      await expect(page.getByRole('heading', { name: 'Get in touch' })).toBeInViewport();
    });

    test('should return to top when clicking logo in header (desktop)', async ({ page, viewport }) => {
      test.skip(viewport.width < 768, 'Desktop-only test - nav links hidden on mobile');

      await page.locator('header div.hidden.md\\:flex button', { hasText: 'Contact' }).click();
      await page.waitForTimeout(1200);
      expect(await page.evaluate(() => window.scrollY)).toBeGreaterThan(100);

      await page.locator('header button img[alt="KT"]').click();
      await page.waitForTimeout(1500);
      expect(await page.evaluate(() => window.scrollY)).toBeLessThan(100);
    });

    test('should use smooth scroll behavior', async ({ page }) => {
      const scrollBehavior = await page.locator('html').evaluate((el) => getComputedStyle(el).scrollBehavior);
      expect(scrollBehavior).toBe('smooth');
    });
  });

  test.describe('Scroll scenes', () => {
    test('pinned scenes hold the frame while scrolling (desktop)', async ({ page, viewport }) => {
      test.skip(viewport.width < 1024, 'Pins are desktop-only for Sectors');

      const pin = page.locator('#sectors .kt-pin');
      await expect(pin).toHaveCSS('position', 'sticky');

      await page.evaluate(() => {
        const el = document.getElementById('sectors');
        window.scrollTo({ top: el.offsetTop + el.offsetHeight * 0.35, behavior: 'instant' });
      });
      const box = await pin.boundingBox();
      expect(Math.abs(box.y)).toBeLessThan(2);
    });

    test('the pillars scene steps through each sector (desktop)', async ({ page, viewport }) => {
      test.skip(viewport.width < 1024, 'Desktop-only test');

      await page.evaluate(() => {
        const el = document.getElementById('sectors');
        const span = el.offsetHeight - window.innerHeight;
        window.scrollTo({ top: el.offsetTop + span * (2.5 / 6), behavior: 'instant' });
      });
      await expect(
        page.locator('#sectors').getByRole('heading', { name: 'Agriculture & Water Systems' })
      ).toBeVisible();
    });

    test('every pillar is listed on mobile', async ({ page, viewport }) => {
      test.skip(viewport.width >= 1024, 'Mobile-only test');
      await expect(page.locator('.kt-pillar-card')).toHaveCount(5);
    });
  });

  test.describe('KT Lab', () => {
    test('shows Aqvera and links to its site', async ({ page }) => {
      const lab = page.locator('#lab');
      await expect(lab.getByRole('heading', { name: 'Aqvera' })).toBeAttached();
      await expect(lab.getByRole('link', { name: /visit aqvera/i })).toHaveAttribute(
        'href',
        'https://aqvera.co.uk'
      );
    });

    test('plays the title sequence when scrolled into view', async ({ page }) => {
      const card = page.locator('#lab .kt-tc').first();
      await card.scrollIntoViewIfNeeded();
      await expect(card).toHaveClass(/is-run/);
      await expect(card.getByRole('link', { name: /visit aqvera/i })).toBeVisible();
    });

    test('does not list the special commission', async ({ page }) => {
      await expect(page.getByText(/special commission/i)).toHaveCount(0);
    });
  });

  test.describe('Mobile Menu', () => {
    test.beforeEach(async ({ viewport }) => {
      test.skip(viewport.width >= 768, 'Mobile-only test');
    });

    test('should show hamburger menu button on mobile', async ({ page }) => {
      await expect(page.locator('header button[aria-label*="menu"]')).toBeVisible();
    });

    test('should open and list all navigation links', async ({ page }) => {
      await page.locator('header button[aria-label*="menu"]').click();
      const mobileNav = page.locator('nav[role="dialog"]');
      await expect(mobileNav).toBeVisible();
      for (const linkText of ['About', 'Philosophy', 'Sectors', 'KT Lab', 'How we build', 'Contact']) {
        await expect(mobileNav.locator('button', { hasText: linkText })).toBeVisible();
      }
    });

    test('should close menu when close button clicked', async ({ page }) => {
      const hamburgerButton = page.locator('header button[aria-label*="menu"]');
      await hamburgerButton.click();
      await page.waitForTimeout(300);
      await hamburgerButton.click();
      await page.waitForTimeout(400);
      await expect(page.locator('nav[role="dialog"]')).toHaveClass(/translate-x-full/);
    });

    test('should close menu and scroll when navigation link clicked', async ({ page }) => {
      await page.locator('header button[aria-label*="menu"]').click();
      await page.waitForTimeout(300);
      const mobileNav = page.locator('nav[role="dialog"]');
      await mobileNav.locator('button', { hasText: 'About' }).click();
      await page.waitForTimeout(600);

      await expect(mobileNav).toHaveClass(/translate-x-full/);
      expect(await page.evaluate(() => window.scrollY)).toBeGreaterThan(100);
    });
  });

  test.describe('Contact', () => {
    test('should have a single mailto link with the correct address', async ({ page }) => {
      const emailLink = page.locator('a[href^="mailto:"]');
      await expect(emailLink).toHaveCount(1);
      await expect(emailLink).toHaveAttribute('href', 'mailto:ra.eesa@kabirtechnologies.co.uk');
    });

    test('should display the contact section with heading and address', async ({ page }) => {
      const contact = page.locator('section#contact');
      await contact.scrollIntoViewIfNeeded();
      await expect(contact.getByRole('heading', { name: 'Get in touch' })).toBeVisible();
      await expect(contact.getByText('ra.eesa@kabirtechnologies.co.uk')).toBeVisible();
    });
  });

  test.describe('Reduced motion', () => {
    test('shows every scene without pins or the opening sequence', async ({ browser }) => {
      const context = await browser.newContext({ reducedMotion: 'reduce' });
      const page = await context.newPage();
      await page.goto('/');

      await expect(page.locator('section').first()).not.toHaveClass(/\bplay\b/);
      await expect(page.locator('.kt-pin')).toHaveCount(0);
      await expect(page.getByText('A small deep-tech studio', { exact: true })).toBeVisible();
      await context.close();
    });
  });

  test.describe('Visual regression - Screenshots', () => {
    test('should match hero section screenshot', async ({ page }) => {
      // Skip in CI - visual regression works better locally where snapshots are generated
      // eslint-disable-next-line no-undef
      test.skip(!!process.env.CI, 'Screenshot tests run locally only');

      await page.waitForLoadState('networkidle');
      const hero = page.locator('section').first();
      await expect(hero).toHaveScreenshot('hero-section.png', {
        animations: 'disabled',
        mask: [page.locator('canvas.kt-dust'), page.locator('.kt-hud')],
        maxDiffPixels: 100,
      });
    });
  });

  test.describe('Performance', () => {
    test('should load within acceptable time', async ({ page }) => {
      const startTime = Date.now();
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      expect(Date.now() - startTime).toBeLessThan(5000);
    });
  });
});
