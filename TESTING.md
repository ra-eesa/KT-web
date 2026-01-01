# Testing

## Quick Start

```bash
# Run all tests
npm run test:all

# Unit tests only
npm run test:run

# E2E tests only
npm run test:e2e

# Watch mode (development)
npm test
```

## What's Tested

**Landing Page Load** (62 automated tests)
- Logo and hero section rendering
- All 5 sector icons display and positioning
- Snake maze canvas initialization
- Mobile responsiveness
- Performance benchmarks

## CI/CD

Tests run automatically on push/PR via GitHub Actions. Check the Actions tab for results.

## Test Files

- `src/components/__tests__/*.test.jsx` - Unit tests
- `e2e/landing-page.spec.js` - E2E tests
- See [TESTING_PLAN.md](TESTING_PLAN.md) for full test strategy
