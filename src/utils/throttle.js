// Throttling utility for performance optimization
export const throttle = (func, delay) => {
  let timeoutId;
  let lastExecTime = 0;
  
  return function (...args) {
    const currentTime = Date.now();
    
    if (currentTime - lastExecTime > delay) {
      func.apply(this, args);
      lastExecTime = currentTime;
    } else {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func.apply(this, args);
        lastExecTime = Date.now();
      }, delay - (currentTime - lastExecTime));
    }
  };
};

// Debounce utility for input events
export const debounce = (func, delay) => {
  let timeoutId;
  
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
};

// RAF-based throttle for smooth animations
export const rafThrottle = (func) => {
  let rafId;
  let lastArgs;
  
  return function (...args) {
    lastArgs = args;
    
    if (rafId) return;
    
    rafId = requestAnimationFrame(() => {
      func.apply(this, lastArgs);
      rafId = null;
    });
  };
};

// Scroll event throttling with performance optimization
export const createScrollHandler = (callback, options = {}) => {
  const {
    throttleDelay = 16, // ~60fps
    leading = true,
    trailing = true
  } = options;
  
  let lastScrollY = window.scrollY;
  let ticking = false;
  
  const updateScroll = () => {
    const scrollY = window.scrollY;
    const scrollDirection = scrollY > lastScrollY ? 'down' : 'up';
    const scrollDelta = Math.abs(scrollY - lastScrollY);
    
    callback({
      scrollY,
      scrollDirection,
      scrollDelta,
      velocity: scrollDelta / 16 // approximate velocity
    });
    
    lastScrollY = scrollY;
    ticking = false;
  };
  
  const onScroll = () => {
    if (!ticking) {
      requestAnimationFrame(updateScroll);
      ticking = true;
    }
  };
  
  return {
    handler: throttle(onScroll, throttleDelay),
    cleanup: () => {
      // Cleanup handled by throttle function
    }
  };
};

// Resize observer with throttling
export const createResizeObserver = (callback, delay = 100) => {
  let resizeTimeout;
  
  const observer = new ResizeObserver(throttle((entries) => {
    callback(entries);
  }, delay));
  
  return observer;
};

// Intersection observer with performance optimizations
export const createIntersectionObserver = (callback, options = {}) => {
  const {
    threshold = 0.1,
    rootMargin = '0px',
    delay = 16
  } = options;
  
  let timeoutId;
  
  const observer = new IntersectionObserver((entries) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      callback(entries);
    }, delay);
  }, {
    threshold,
    rootMargin
  });
  
  return observer;
};

// Performance-optimized event listener manager
export class EventManager {
  constructor() {
    this.listeners = new Map();
  }
  
  add(element, event, handler, options = {}) {
    const key = `${element.constructor.name}-${event}`;
    
    if (this.listeners.has(key)) {
      this.remove(element, event);
    }
    
    let wrappedHandler = handler;
    
    // Apply throttling if specified
    if (options.throttle) {
      wrappedHandler = throttle(handler, options.throttle);
    }
    
    // Apply debouncing if specified
    if (options.debounce) {
      wrappedHandler = debounce(handler, options.debounce);
    }
    
    // Apply RAF throttling for animations
    if (options.raf) {
      wrappedHandler = rafThrottle(handler);
    }
    
    element.addEventListener(event, wrappedHandler, options.passive ? { passive: true } : false);
    
    this.listeners.set(key, {
      element,
      event,
      handler: wrappedHandler,
      originalHandler: handler,
      options
    });
  }
  
  remove(element, event) {
    const key = `${element.constructor.name}-${event}`;
    const listener = this.listeners.get(key);
    
    if (listener) {
      element.removeEventListener(listener.event, listener.handler);
      this.listeners.delete(key);
    }
  }
  
  removeAll() {
    this.listeners.forEach((listener, key) => {
      listener.element.removeEventListener(listener.event, listener.handler);
    });
    this.listeners.clear();
  }
}

// Global event manager instance
export const eventManager = new EventManager();
