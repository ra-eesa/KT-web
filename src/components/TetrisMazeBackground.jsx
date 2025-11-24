import { useEffect, useRef } from 'react';

export default function TetrisMazeBackground() {
  const canvasRef = useRef(null);
  const snakesRef = useRef([]);
  const animationFrameRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const gridSize = 100;
    
    const setCanvasSize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    // Easing function for smooth movement
    const easeInOutQuad = (t) => {
      return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
    };

    // Get color based on position along snake and time
    const getGreenShade = (segmentIndex, totalSegments, time) => {
      // Create a wave that travels along the snake
      const wave = Math.sin((segmentIndex / totalSegments) * Math.PI * 2 + time * 0.003);
      
      // Map wave to color range
      // Dark forest green: rgb(6, 78, 59)
      // Medium green: rgb(16, 120, 95)
      // Bright emerald: rgb(16, 185, 129)
      
      const t = (wave + 1) / 2; // Normalize to 0-1
      
      if (t < 0.5) {
        // Interpolate between dark and medium
        const local_t = t * 2;
        return {
          r: 6 + (16 - 6) * local_t,
          g: 78 + (120 - 78) * local_t,
          b: 59 + (95 - 59) * local_t
        };
      } else {
        // Interpolate between medium and bright
        const local_t = (t - 0.5) * 2;
        return {
          r: 16,
          g: 120 + (185 - 120) * local_t,
          b: 95 + (129 - 95) * local_t
        };
      }
    };

    // Snake class - a path that grows, travels, and fades
    class MazeSnake {
      constructor(canvasWidth, canvasHeight) {
        this.gridSize = gridSize;
        this.maxLength = 6 + Math.floor(Math.random() * 8); // 6-14 segments
        this.segments = [];
        this.age = 0;
        this.lifeStage = 'growing'; // growing -> traveling -> fading
        this.direction = this.getRandomDirection();
        
        // Start position on grid
        const cols = Math.floor(canvasWidth / gridSize);
        const rows = Math.floor(canvasHeight / gridSize);
        const startX = Math.floor(Math.random() * cols) * gridSize;
        const startY = Math.floor(Math.random() * rows) * gridSize;
        
        this.segments.push({ 
          x: startX, 
          y: startY, 
          targetX: startX,
          targetY: startY,
          opacity: 0,
          interpolation: 1 // 1 means fully arrived at target
        });
        
        // Timing
        this.growthRate = 600; // ms per segment (slightly faster for smoother feel)
        this.timeSinceLastGrowth = 0;
        this.travelDuration = 3000; // Travel for 3 seconds
        this.fadeDuration = 2000; // Fade over 2 seconds
        this.interpolationSpeed = 0.003; // How fast segments move to target
      }

      getRandomDirection() {
        const directions = [
          { dx: 1, dy: 0 },   // right
          { dx: -1, dy: 0 },  // left
          { dx: 0, dy: 1 },   // down
          { dx: 0, dy: -1 }   // up
        ];
        return directions[Math.floor(Math.random() * directions.length)];
      }

      changeDirection() {
        const currentDir = this.direction;
        const possibleDirs = [
          { dx: 1, dy: 0 },
          { dx: -1, dy: 0 },
          { dx: 0, dy: 1 },
          { dx: 0, dy: -1 }
        ].filter(dir => 
          // Don't go backwards
          !(dir.dx === -currentDir.dx && dir.dy === -currentDir.dy)
        );
        
        this.direction = possibleDirs[Math.floor(Math.random() * possibleDirs.length)];
      }

      update(deltaTime, canvasWidth, canvasHeight) {
        this.age += deltaTime;

        // Smoothly interpolate all segments towards their targets
        this.segments.forEach(seg => {
          if (seg.interpolation < 1) {
            seg.interpolation = Math.min(1, seg.interpolation + this.interpolationSpeed * deltaTime);
            const t = easeInOutQuad(seg.interpolation);
            
            // Interpolate from current position to target
            const startX = seg.x;
            const startY = seg.y;
            seg.x = startX + (seg.targetX - startX) * t;
            seg.y = startY + (seg.targetY - startY) * t;
          } else {
            // Fully arrived
            seg.x = seg.targetX;
            seg.y = seg.targetY;
          }
        });

        if (this.lifeStage === 'growing') {
          this.timeSinceLastGrowth += deltaTime;
          
          // Fade in existing segments
          this.segments.forEach(seg => {
            if (seg.opacity < 0.7) {
              seg.opacity = Math.min(0.7, seg.opacity + (deltaTime / 500));
            }
          });
          
          // Add new segment
          if (this.timeSinceLastGrowth >= this.growthRate && this.segments.length < this.maxLength) {
            const head = this.segments[this.segments.length - 1];
            const newTargetX = head.targetX + this.direction.dx * gridSize;
            const newTargetY = head.targetY + this.direction.dy * gridSize;
            
            // Check bounds and possibly change direction
            if (newTargetX < 0 || newTargetX >= canvasWidth || newTargetY < 0 || newTargetY >= canvasHeight) {
              this.changeDirection();
              const altX = head.targetX + this.direction.dx * gridSize;
              const altY = head.targetY + this.direction.dy * gridSize;
              
              if (altX >= 0 && altX < canvasWidth && altY >= 0 && altY < canvasHeight) {
                this.segments.push({ 
                  x: head.x, // Start at current head position
                  y: head.y,
                  targetX: altX, 
                  targetY: altY, 
                  opacity: 0,
                  interpolation: 0 
                });
              }
            } else {
              this.segments.push({ 
                x: head.x, // Start at current head position
                y: head.y,
                targetX: newTargetX, 
                targetY: newTargetY, 
                opacity: 0,
                interpolation: 0 
              });
              
              // Random chance to change direction
              if (Math.random() < 0.3) {
                this.changeDirection();
              }
            }
            
            this.timeSinceLastGrowth = 0;
          }
          
          // Move to traveling stage when fully grown
          if (this.segments.length >= this.maxLength) {
            this.lifeStage = 'traveling';
            this.age = 0;
          }
        }
        
        else if (this.lifeStage === 'traveling') {
          // Just exist and pulse gently
          const pulseSpeed = 0.002;
          const pulse = Math.sin(this.age * pulseSpeed) * 0.15 + 0.7;
          this.segments.forEach(seg => {
            seg.opacity = pulse;
          });
          
          if (this.age >= this.travelDuration) {
            this.lifeStage = 'fading';
            this.age = 0;
          }
        }
        
        else if (this.lifeStage === 'fading') {
          // Fade out from tail to head
          const fadeProgress = this.age / this.fadeDuration;
          this.segments.forEach((seg, idx) => {
            const segmentFadeStart = (idx / this.segments.length) * 0.7;
            const segmentProgress = Math.max(0, (fadeProgress - segmentFadeStart) / 0.3);
            seg.opacity = Math.max(0, 0.7 * (1 - segmentProgress));
          });
          
          if (this.age >= this.fadeDuration) {
            this.lifeStage = 'dead';
          }
        }
      }

      draw(ctx) {
        if (this.segments.length === 0) return;
        
        const currentTime = Date.now();
        
        // Draw segments with animated color gradient
        for (let i = 0; i < this.segments.length - 1; i++) {
          const seg1 = this.segments[i];
          const seg2 = this.segments[i + 1];
          
          // Get animated colors for each segment
          const color1 = getGreenShade(i, this.segments.length, currentTime);
          const color2 = getGreenShade(i + 1, this.segments.length, currentTime);
          
          // Create gradient along segment
          const gradient = ctx.createLinearGradient(seg1.x, seg1.y, seg2.x, seg2.y);
          
          const opacity1 = seg1.opacity;
          const opacity2 = seg2.opacity;
          
          gradient.addColorStop(0, `rgba(${color1.r}, ${color1.g}, ${color1.b}, ${opacity1})`);
          gradient.addColorStop(1, `rgba(${color2.r}, ${color2.g}, ${color2.b}, ${opacity2})`);
          
          ctx.strokeStyle = gradient;
          ctx.lineWidth = 3;
          ctx.lineCap = 'round';
          ctx.beginPath();
          ctx.moveTo(seg1.x, seg1.y);
          ctx.lineTo(seg2.x, seg2.y);
          ctx.stroke();
        }
      }

      isDead() {
        return this.lifeStage === 'dead';
      }
    }

    // Animation loop
    let lastTime = Date.now();
    const maxSnakes = 5;
    const spawnInterval = 2000; // Spawn every 2 seconds
    let timeSinceLastSpawn = 0;

    const animate = () => {
      const now = Date.now();
      const deltaTime = now - lastTime;
      lastTime = now;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw snakes
      snakesRef.current = snakesRef.current.filter(snake => {
        snake.update(deltaTime, canvas.width, canvas.height);
        snake.draw(ctx);
        return !snake.isDead();
      });

      // Spawn new snakes
      timeSinceLastSpawn += deltaTime;
      if (timeSinceLastSpawn >= spawnInterval && snakesRef.current.length < maxSnakes) {
        snakesRef.current.push(new MazeSnake(canvas.width, canvas.height));
        timeSinceLastSpawn = 0;
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', setCanvasSize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.85, zIndex: 0 }}
    />
  );
}