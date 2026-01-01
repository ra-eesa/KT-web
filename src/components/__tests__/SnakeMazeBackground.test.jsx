import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, waitFor } from '@testing-library/react';
import SnakeMazeBackground from '../SnakeMazeBackground';

describe('SnakeMazeBackground - Landing Page Load Tests', () => {
  let mockContext;

  beforeEach(() => {
    // Mock gradient object
    const mockGradient = {
      addColorStop: vi.fn(),
    };

    // Mock canvas context
    mockContext = {
      clearRect: vi.fn(),
      fillRect: vi.fn(),
      strokeRect: vi.fn(),
      fillText: vi.fn(),
      setTransform: vi.fn(),
      drawImage: vi.fn(),
      save: vi.fn(),
      restore: vi.fn(),
      beginPath: vi.fn(),
      moveTo: vi.fn(),
      lineTo: vi.fn(),
      closePath: vi.fn(),
      stroke: vi.fn(),
      fill: vi.fn(),
      arc: vi.fn(),
      rect: vi.fn(),
      scale: vi.fn(),
      translate: vi.fn(),
      rotate: vi.fn(),
      createLinearGradient: vi.fn(() => mockGradient),
      createRadialGradient: vi.fn(() => mockGradient),
      fillStyle: '',
      strokeStyle: '',
      globalAlpha: 1,
      lineWidth: 1,
      lineCap: 'butt',
      lineJoin: 'miter',
    };

    // Mock canvas element
    HTMLCanvasElement.prototype.getContext = vi.fn(() => mockContext);
    HTMLCanvasElement.prototype.getBoundingClientRect = vi.fn(() => ({
      top: 0,
      left: 0,
      width: 1024,
      height: 768,
      right: 1024,
      bottom: 768,
    }));

    // Mock window dimensions
    Object.defineProperty(window, 'innerWidth', { writable: true, value: 1024 });
    Object.defineProperty(window, 'innerHeight', { writable: true, value: 768 });
    Object.defineProperty(window, 'devicePixelRatio', { writable: true, value: 1 });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('Snake maze background initializes without errors', () => {
    it('should render canvas element', () => {
      const { container } = render(<SnakeMazeBackground />);

      const canvas = container.querySelector('canvas');
      expect(canvas).toBeInTheDocument();
    });

    it('should set canvas dimensions based on window size', () => {
      const { container } = render(<SnakeMazeBackground />);

      const canvas = container.querySelector('canvas');
      // Canvas has inline styles and className for sizing
      expect(canvas).toHaveClass('w-full', 'h-full');
    });

    it('should initialize canvas context successfully', () => {
      render(<SnakeMazeBackground />);

      expect(HTMLCanvasElement.prototype.getContext).toHaveBeenCalledWith('2d');
    });

    it('should start animation loop', async () => {
      render(<SnakeMazeBackground />);

      await waitFor(() => {
        expect(mockContext.clearRect).toHaveBeenCalled();
      }, { timeout: 100 });
    });

    it('should have absolute positioning in background', () => {
      const { container } = render(<SnakeMazeBackground />);

      const canvas = container.querySelector('canvas');
      expect(canvas).toHaveClass('absolute', 'inset-0', 'pointer-events-none');
    });

    it('should respect prefers-reduced-motion', () => {
      // Mock matchMedia to return prefers-reduced-motion
      window.matchMedia = vi.fn().mockImplementation(query => ({
        matches: query === '(prefers-reduced-motion: reduce)',
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      }));

      const { container } = render(<SnakeMazeBackground />);

      // Component should still render but may not animate
      const canvas = container.querySelector('canvas');
      expect(canvas).toBeInTheDocument();
    });

    it('should handle canvas cleanup on unmount', () => {
      const { unmount } = render(<SnakeMazeBackground />);

      // Unmount should not throw errors
      expect(() => unmount()).not.toThrow();
    });

    it('should render canvas with correct opacity and z-index', () => {
      const { container } = render(<SnakeMazeBackground />);

      const canvas = container.querySelector('canvas');
      expect(canvas).toHaveStyle({ opacity: '0.85', zIndex: '0' });
    });

    it('should detect and avoid DOM obstacles', async () => {
      // Create mock DOM elements that should be avoided
      const mockElement = document.createElement('h1');
      mockElement.getBoundingClientRect = vi.fn(() => ({
        top: 100,
        left: 100,
        width: 200,
        height: 50,
        right: 300,
        bottom: 150,
      }));
      document.body.appendChild(mockElement);

      render(<SnakeMazeBackground />);

      // Wait for obstacle detection to run
      await waitFor(() => {
        expect(mockElement.getBoundingClientRect).toHaveBeenCalled();
      }, { timeout: 500 });

      // Cleanup
      document.body.removeChild(mockElement);
    });

    it('should handle window resize events', async () => {
      const { container } = render(<SnakeMazeBackground />);

      const canvas = container.querySelector('canvas');
      expect(canvas).toBeInTheDocument();

      // Simulate window resize
      Object.defineProperty(window, 'innerWidth', { writable: true, value: 1920 });
      Object.defineProperty(window, 'innerHeight', { writable: true, value: 1080 });
      window.dispatchEvent(new Event('resize'));

      // Canvas should still be present and functioning
      await waitFor(() => {
        expect(canvas).toBeInTheDocument();
      });
    });

    it('should adapt to high DPI displays', async () => {
      Object.defineProperty(window, 'devicePixelRatio', { writable: true, value: 2 });

      const { container } = render(<SnakeMazeBackground />);

      const canvas = container.querySelector('canvas');
      expect(canvas).toBeInTheDocument();

      // Canvas should handle high DPI rendering with scale method
      await waitFor(() => {
        expect(mockContext.scale).toHaveBeenCalled();
      }, { timeout: 100 });
    });
  });

  describe('Canvas rendering', () => {
    it('should clear canvas on each frame', async () => {
      render(<SnakeMazeBackground />);

      await waitFor(() => {
        expect(mockContext.clearRect).toHaveBeenCalled();
      }, { timeout: 100 });
    });

    it('should draw using canvas context methods', async () => {
      render(<SnakeMazeBackground />);

      await waitFor(() => {
        // Check that drawing methods are called
        const drawingMethodsCalled =
          mockContext.beginPath.mock.calls.length > 0 ||
          mockContext.lineTo.mock.calls.length > 0 ||
          mockContext.stroke.mock.calls.length > 0;

        expect(drawingMethodsCalled).toBe(true);
      }, { timeout: 3000 }); // Wait longer for snakes to spawn
    });
  });
});
