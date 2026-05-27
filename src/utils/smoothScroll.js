// Smooth scroll utility for better cross-browser compatibility
import { throttle } from './throttle';

export const smoothScrollTo = (elementId, duration = 500) => {
  const element = document.getElementById(elementId);
  
  if (!element) {
    console.warn(`Element with id "${elementId}" not found`);
    return;
  }

  // Calculate scroll position with navbar offset
  const navbarHeight = 64; // Adjust based on your navbar height
  const elementPosition = element.offsetTop - navbarHeight;
  
  // Smooth scroll using requestAnimationFrame for better performance
  const startPosition = window.pageYOffset;
  const distance = elementPosition - startPosition;
  let startTime = null;
  let animationId = null;

  const animation = (currentTime) => {
    if (startTime === null) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const progress = Math.min(timeElapsed / duration, 1);
    
    // Use easeInOutCubic for smoother animation
    const easeProgress = progress < 0.5 
      ? 4 * progress * progress * progress 
      : 1 - Math.pow(-2 * progress + 2, 3) / 2;
    
    const currentPosition = startPosition + (distance * easeProgress);
    
    window.scrollTo(0, currentPosition);
    
    if (progress < 1) {
      animationId = requestAnimationFrame(animation);
    } else {
      // Cleanup
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    }
  };

  animationId = requestAnimationFrame(animation);
  
  return () => {
    if (animationId) {
      cancelAnimationFrame(animationId);
    }
  };
};

// Optimized scroll handler with performance monitoring
export const createOptimizedScrollHandler = (callback) => {
  let lastScrollY = window.scrollY;
  let scrollDirection = 'down';
  let scrollVelocity = 0;
  let lastScrollTime = Date.now();
  let ticking = false;

  const updateScroll = () => {
    const currentScrollY = window.scrollY;
    const currentTime = Date.now();
    const timeDelta = currentTime - lastScrollTime;
    const scrollDelta = Math.abs(currentScrollY - lastScrollY);
    
    // Calculate scroll direction
    const newDirection = currentScrollY > lastScrollY ? 'down' : 'up';
    if (newDirection !== scrollDirection) {
      scrollDirection = newDirection;
    }
    
    // Calculate velocity (pixels per millisecond)
    scrollVelocity = timeDelta > 0 ? scrollDelta / timeDelta : 0;
    
    callback({
      scrollY: currentScrollY,
      scrollDirection,
      scrollDelta,
      scrollVelocity,
      isScrolling: scrollDelta > 0
    });
    
    lastScrollY = currentScrollY;
    lastScrollTime = currentTime;
    ticking = false;
  };

  return {
    handler: () => {
      if (!ticking) {
        requestAnimationFrame(updateScroll);
        ticking = true;
      }
    },
    cleanup: () => {
      ticking = false;
    }
  };
};

// Handle smooth scroll for navigation links with performance optimization
export const initSmoothScroll = () => {
  // Throttled click handler for better performance
  const handleClick = throttle((e) => {
    const target = e.target.closest('a[href^="#"]');
    
    if (target) {
      e.preventDefault();
      const targetId = target.getAttribute('href').substring(1);
      
      // Add visual feedback
      target.style.transition = 'opacity 0.2s';
      target.style.opacity = '0.7';
      
      const cleanup = smoothScrollTo(targetId);
      
      // Restore opacity after scroll starts
      setTimeout(() => {
        target.style.opacity = '1';
      }, 200);
      
      // Update URL without page jump
      history.pushState(null, null, `#${targetId}`);
      
      // Cleanup animation if component unmounts
      return cleanup;
    }
  }, 100);

  // Use passive event listener for better scroll performance
  document.addEventListener('click', handleClick, { passive: true });

  // Handle initial page load with hash (optimized)
  if (window.location.hash) {
    // Use requestIdleCallback for non-critical initialization
    if (window.requestIdleCallback) {
      window.requestIdleCallback(() => {
        const targetId = window.location.hash.substring(1);
        smoothScrollTo(targetId, 800); // Longer duration for initial load
      }, { timeout: 1000 });
    } else {
      setTimeout(() => {
        const targetId = window.location.hash.substring(1);
        smoothScrollTo(targetId, 800);
      }, 100);
    }
  }

  // Return cleanup function
  return () => {
    document.removeEventListener('click', handleClick);
  };
};

// Scroll progress indicator utility
export const createScrollProgress = () => {
  const progressBar = document.createElement('div');
  progressBar.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    height: 3px;
    background: linear-gradient(90deg, #7c3aed, #06b6d4);
    z-index: 9999;
    transition: width 0.1s ease-out;
    pointer-events: none;
  `;
  document.body.appendChild(progressBar);

  const { handler, cleanup } = createOptimizedScrollHandler(({ scrollY }) => {
    const winHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = (scrollY / winHeight) * 100;
    progressBar.style.width = `${Math.min(100, Math.max(0, scrolled))}%`;
  });

  window.addEventListener('scroll', handler, { passive: true });

  return {
    destroy: () => {
      cleanup();
      window.removeEventListener('scroll', handler);
      progressBar.remove();
    }
  };
};
