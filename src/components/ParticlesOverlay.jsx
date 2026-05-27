import React, { useEffect, useRef, useCallback } from 'react';
import { useReducedMotion } from '../hooks/useReducedMotion';

const ParticlesOverlay = ({ className = '' }) => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const particlesRef = useRef([]);
  const lastTimeRef = useRef(0);
  const frameCountRef = useRef(0);
  const prefersReducedMotion = useReducedMotion();

  // Performance-optimized particle count based on device
  const getParticleCount = useCallback(() => {
    if (prefersReducedMotion) return 0;
    const isMobile = window.innerWidth < 768;
    const isLowEnd = navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 2;
    
    if (isMobile || isLowEnd) return 20;
    return 35;
  }, [prefersReducedMotion]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || prefersReducedMotion) return;

    const ctx = canvas.getContext('2d', { 
      alpha: true,
      desynchronized: true,
      willReadFrequently: false
    });
    if (!ctx) return;

    // Set canvas size with device pixel ratio support
    const resizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = window.innerWidth + 'px';
      canvas.style.height = window.innerHeight + 'px';
      ctx.scale(dpr, dpr);
    };
    resizeCanvas();
    
    const resizeHandler = () => {
      resizeCanvas();
      // Reinitialize particles on resize
      initParticles();
    };
    
    let resizeTimeout;
    const throttledResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(resizeHandler, 250);
    };
    
    window.addEventListener('resize', throttledResize);

    // Optimized particle class with object pooling
    class Particle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * window.innerWidth;
        this.y = Math.random() * window.innerHeight;
        this.size = Math.random() * 1.5 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.2;
        this.speedY = (Math.random() - 0.5) * 0.2;
        this.opacity = Math.random() * 0.2 + 0.05;
        this.pulseSpeed = Math.random() * 0.01 + 0.005;
        this.pulsePhase = Math.random() * Math.PI * 2;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.pulsePhase += this.pulseSpeed;

        // Wrap around edges
        if (this.x < -10) this.x = window.innerWidth + 10;
        if (this.x > window.innerWidth + 10) this.x = -10;
        if (this.y < -10) this.y = window.innerHeight + 10;
        if (this.y > window.innerHeight + 10) this.y = -10;
      }

      draw(ctx) {
        const pulseOpacity = this.opacity + Math.sin(this.pulsePhase) * 0.05;
        ctx.globalAlpha = Math.max(0.05, Math.min(0.4, pulseOpacity));
        
        // Create gradient for depth effect
        const gradient = ctx.createRadialGradient(
          this.x, this.y, 0,
          this.x, this.y, this.size
        );
        gradient.addColorStop(0, 'rgba(255, 255, 255, 0.8)');
        gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.4)');
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Initialize particles with object pooling
    const initParticles = () => {
      const particleCount = getParticleCount();
      particlesRef.current = [];
      
      // Object pooling for better performance
      for (let i = 0; i < particleCount; i++) {
        particlesRef.current.push(new Particle());
      }
    };
    
    initParticles();

    // Performance-optimized animation loop
    const animate = (currentTime) => {
      // Frame rate limiting for better performance
      if (currentTime - lastTimeRef.current < 16.67) { // 60fps cap
        animationRef.current = requestAnimationFrame(animate);
        return;
      }
      
      lastTimeRef.current = currentTime;
      frameCountRef.current++;

      // Clear canvas with optimization
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Batch particle updates and draws
      ctx.save();
      particlesRef.current.forEach(particle => {
        particle.update();
        particle.draw(ctx);
      });
      ctx.restore();

      // Performance monitoring (every 60 frames)
      if (frameCountRef.current % 60 === 0) {
        const fps = 1000 / (currentTime - lastTimeRef.current);
        if (fps < 30) {
          console.warn(`Low FPS detected: ${fps.toFixed(1)}`);
          // Reduce particle count if performance is poor
          if (particlesRef.current.length > 15) {
            particlesRef.current = particlesRef.current.slice(0, 15);
          }
        }
      }

      animationRef.current = requestAnimationFrame(animate);
    };
    
    animationRef.current = requestAnimationFrame(animate);

    // Cleanup
    return () => {
      window.removeEventListener('resize', throttledResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      clearTimeout(resizeTimeout);
    };
  }, [getParticleCount]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-none z-10 ${className}`}
      style={{ mixBlendMode: 'screen' }}
    />
  );
};

export default ParticlesOverlay;
