import { useEffect, useRef } from "react";

export function InteractiveGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;
    let pulseTime = 0;

    // Mouse coordinates relative to the canvas
    const mouse = { x: -1000, y: -1000, active: false };

    const parent = canvas.parentElement;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      width = parent ? parent.clientWidth : (canvas.clientWidth || window.innerWidth);
      height = parent ? parent.clientHeight : (canvas.clientHeight || 600);
      
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener("resize", resize);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
    };

    if (parent) {
      parent.addEventListener("mousemove", handleMouseMove);
      parent.addEventListener("mouseleave", handleMouseLeave);
    }

    // Configuration
    const gridSpacing = 40;   // Original grid spacing for dots
    const numRays = 8;        // 8 rays for a very clean starburst
    const maxRadius = 110;    // Even smaller radius of expansion
    const maxDistance = 110;  // Smaller influence radius for dot grid magnet effect

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      const isDarkMode = document.documentElement.classList.contains("dark");
      
      // Update expansion animation timeline (slower speed)
      pulseTime += 0.003; 

      // If mouse is inactive, gently center the effect to the middle of the screen
      const centerX = mouse.active ? mouse.x : width / 2;
      const centerY = mouse.active ? mouse.y : height / 2;
      const influenceActive = mouse.active || true;

      // 1. Draw subtle background radial spotlight glow
      if (influenceActive) {
        const glowRadius = 120; // Smaller glow radius
        const spotlight = ctx.createRadialGradient(
          centerX,
          centerY,
          0,
          centerX,
          centerY,
          glowRadius
        );
        
        if (isDarkMode) {
          spotlight.addColorStop(0, "rgba(148, 203, 114, 0.04)"); 
          spotlight.addColorStop(1, "rgba(0, 0, 0, 0)");
        } else {
          spotlight.addColorStop(0, "rgba(34, 197, 94, 0.03)"); 
          spotlight.addColorStop(1, "rgba(255, 255, 255, 0)");
        }

        ctx.fillStyle = spotlight;
        ctx.fillRect(0, 0, width, height);
      }

      // 2. Draw background magnetic dot grid (Bolinhas de antes)
      const cols = Math.ceil(width / gridSpacing) + 1;
      const rows = Math.ceil(height / gridSpacing) + 1;
      
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = i * gridSpacing;
          const y = j * gridSpacing;

          const dx = centerX - x;
          const dy = centerY - y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          let drawX = x;
          let drawY = y;
          let dotColor = isDarkMode 
            ? "rgba(148, 148, 148, 0.10)" 
            : "rgba(100, 116, 139, 0.12)"; 
          let dotSize = 1.5;

          // Original magnetic pull effect on the dots
          if (influenceActive && dist < maxDistance) {
            const force = (1 - dist / maxDistance);
            const pullAmount = force * 10; // Pull up to 10px towards the cursor
            const angle = Math.atan2(dy, dx);
            
            drawX = x + Math.cos(angle) * pullAmount;
            drawY = y + Math.sin(angle) * pullAmount;

            const greenAlpha = 0.1 + force * 0.7;
            dotColor = isDarkMode
              ? `rgba(148, 203, 114, ${greenAlpha})` 
              : `rgba(34, 197, 94, ${greenAlpha})`; 
            dotSize = 1.5 + force * 1.2; 
          }

          ctx.beginPath();
          ctx.arc(drawX, drawY, dotSize, 0, Math.PI * 2);
          ctx.fillStyle = dotColor;
          ctx.fill();
        }
      }

      // 3. Draw the Straight Radial Lines (Rays) shooting out
      if (influenceActive) {
        for (let r = 0; r < numRays; r++) {
          const angle = (r * Math.PI * 2) / numRays;
          
          const endX = centerX + maxRadius * Math.cos(angle);
          const endY = centerY + maxRadius * Math.sin(angle);

          const grad = ctx.createLinearGradient(centerX, centerY, endX, endY);
          const lineAlpha = mouse.active ? 0.16 : 0.08;
          
          grad.addColorStop(
            0,
            isDarkMode 
              ? `rgba(148, 203, 114, ${lineAlpha})` 
              : `rgba(34, 197, 94, ${lineAlpha})`
          );
          grad.addColorStop(1, "rgba(0, 0, 0, 0)");

          ctx.strokeStyle = grad;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(centerX, centerY);
          ctx.lineTo(endX, endY);
          ctx.stroke();
        }

        // 4. Draw Concentric Wave Rings and Energy Beams expanding outward
        for (let w = 0; w < 3; w++) {
          const progress = (pulseTime + w * 0.33) % 1.0;
          const currentRadius = progress * maxRadius;
          const opacityFactor = 1 - progress;
          
          const waveAlpha = opacityFactor * (mouse.active ? 0.25 : 0.12);
          
          // Expanding circular wave boundary
          ctx.beginPath();
          ctx.arc(centerX, centerY, currentRadius, 0, Math.PI * 2);
          ctx.strokeStyle = isDarkMode
            ? `rgba(148, 203, 114, ${waveAlpha * 0.4})`
            : `rgba(34, 197, 94, ${waveAlpha * 0.4})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();

          // Bright energy dots at the intersections of the wave and the rays
          for (let r = 0; r < numRays; r++) {
            const angle = (r * Math.PI * 2) / numRays;
            const px = centerX + currentRadius * Math.cos(angle);
            const py = centerY + currentRadius * Math.sin(angle);

            const particleAlpha = opacityFactor * (mouse.active ? 0.6 : 0.28);
            const pSize = 1.0 + (1 - progress) * 1.5;

            // Particle glow backing
            ctx.beginPath();
            ctx.arc(px, py, pSize * 2, 0, Math.PI * 2);
            ctx.fillStyle = isDarkMode
              ? `rgba(148, 203, 114, ${particleAlpha * 0.25})`
              : `rgba(34, 197, 94, ${particleAlpha * 0.25})`;
            ctx.fill();

            // Particle solid center core
            ctx.beginPath();
            ctx.arc(px, py, pSize, 0, Math.PI * 2);
            ctx.fillStyle = isDarkMode
              ? `rgba(255, 255, 255, ${particleAlpha})` 
              : `rgba(34, 197, 94, ${particleAlpha})`; 
            ctx.fill();
          }
        }
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", resize);
      if (parent) {
        parent.removeEventListener("mousemove", handleMouseMove);
        parent.removeEventListener("mouseleave", handleMouseLeave);
      }
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full z-0 pointer-events-none transition-opacity duration-300"
      style={{ mixBlendMode: "normal" }}
    />
  );
}
