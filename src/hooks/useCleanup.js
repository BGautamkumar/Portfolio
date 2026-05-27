import { useEffect, useRef } from 'react';

// Hook for managing cleanup of animations, event listeners, and timers
export const useCleanup = () => {
  const cleanupFunctions = useRef(new Set());

  useEffect(() => {
    return () => {
      // Execute all cleanup functions
      cleanupFunctions.current.forEach(cleanup => {
        try {
          cleanup();
        } catch (error) {
          console.warn('Cleanup function failed:', error);
        }
      });
      cleanupFunctions.current.clear();
    };
  }, []);

  const addCleanup = (cleanup) => {
    cleanupFunctions.current.add(cleanup);
    
    // Return function to remove specific cleanup
    return () => {
      cleanupFunctions.current.delete(cleanup);
    };
  };

  return { addCleanup };
};

// Hook for managing animation frames
export const useAnimationFrame = () => {
  const animationFrames = useRef(new Set());
  const { addCleanup } = useCleanup();

  const requestAnimation = (callback) => {
    const frameId = requestAnimationFrame(callback);
    animationFrames.current.add(frameId);
    
    // Return cleanup function for this specific frame
    return () => {
      cancelAnimationFrame(frameId);
      animationFrames.current.delete(frameId);
    };
  };

  const cancelAllAnimations = () => {
    animationFrames.current.forEach(frameId => {
      cancelAnimationFrame(frameId);
    });
    animationFrames.current.clear();
  };

  // Auto-cleanup on unmount
  addCleanup(cancelAllAnimations);

  return { requestAnimation, cancelAllAnimations };
};

// Hook for managing timers
export const useTimers = () => {
  const timers = useRef(new Set());
  const { addCleanup } = useCleanup();

  const setTimeout = (callback, delay) => {
    const timerId = window.setTimeout(() => {
      callback();
      timers.current.delete(timerId);
    }, delay);
    
    timers.current.add(timerId);
    
    // Return cleanup function
    return () => {
      clearTimeout(timerId);
      timers.current.delete(timerId);
    };
  };

  const setInterval = (callback, delay) => {
    const timerId = window.setInterval(callback, delay);
    timers.current.add(timerId);
    
    // Return cleanup function
    return () => {
      clearInterval(timerId);
      timers.current.delete(timerId);
    };
  };

  const clearTimeout = (timerId) => {
    window.clearTimeout(timerId);
    timers.current.delete(timerId);
  };

  const clearInterval = (timerId) => {
    window.clearInterval(timerId);
    timers.current.delete(timerId);
  };

  const clearAllTimers = () => {
    timers.current.forEach(timerId => {
      window.clearTimeout(timerId);
      window.clearInterval(timerId);
    });
    timers.current.clear();
  };

  // Auto-cleanup on unmount
  addCleanup(clearAllTimers);

  return { setTimeout, setInterval, clearTimeout, clearInterval };
};

// Hook for managing event listeners
export const useEventListeners = () => {
  const listeners = useRef(new Set());
  const { addCleanup } = useCleanup();

  const addEventListener = (element, event, handler, options) => {
    element.addEventListener(event, handler, options);
    
    const listener = { element, event, handler, options };
    listeners.current.add(listener);
    
    // Return cleanup function
    return () => {
      element.removeEventListener(event, handler, options);
      listeners.current.delete(listener);
    };
  };

  const removeEventListener = (element, event, handler, options) => {
    element.removeEventListener(event, handler, options);
    
    // Find and remove from tracking
    listeners.current.forEach(listener => {
      if (
        listener.element === element &&
        listener.event === event &&
        listener.handler === handler
      ) {
        listeners.current.delete(listener);
      }
    });
  };

  const removeAllListeners = () => {
    listeners.current.forEach(({ element, event, handler, options }) => {
      element.removeEventListener(event, handler, options);
    });
    listeners.current.clear();
  };

  // Auto-cleanup on unmount
  addCleanup(removeAllListeners);

  return { addEventListener, removeEventListener };
};

// Hook for managing intersection observers
export const useIntersectionObserver = () => {
  const observers = useRef(new Set());
  const { addCleanup } = useCleanup();

  const createObserver = (callback, options = {}) => {
    const observer = new IntersectionObserver(callback, options);
    observers.current.add(observer);
    
    // Return cleanup function
    return () => {
      observer.disconnect();
      observers.current.delete(observer);
    };
  };

  const disconnectAll = () => {
    observers.current.forEach(observer => {
      observer.disconnect();
    });
    observers.current.clear();
  };

  // Auto-cleanup on unmount
  addCleanup(disconnectAll);

  return { createObserver };
};

// Hook for managing resize observers
export const useResizeObserver = () => {
  const observers = useRef(new Set());
  const { addCleanup } = useCleanup();

  const createObserver = (callback) => {
    const observer = new ResizeObserver(callback);
    observers.current.add(observer);
    
    // Return cleanup function
    return () => {
      observer.disconnect();
      observers.current.delete(observer);
    };
  };

  const disconnectAll = () => {
    observers.current.forEach(observer => {
      observer.disconnect();
    });
    observers.current.clear();
  };

  // Auto-cleanup on unmount
  addCleanup(disconnectAll);

  return { createObserver };
};

// Comprehensive cleanup hook that combines all utilities
export const useResourceManagement = () => {
  const { addCleanup } = useCleanup();
  const { requestAnimation, cancelAllAnimations } = useAnimationFrame();
  const { setTimeout, setInterval, clearTimeout, clearInterval } = useTimers();
  const { addEventListener, removeEventListener } = useEventListeners();
  const { createObserver: createIntersectionObserver } = useIntersectionObserver();
  const { createObserver: createResizeObserver } = useResizeObserver();

  return {
    // Cleanup management
    addCleanup,
    
    // Animation management
    requestAnimation,
    cancelAllAnimations,
    
    // Timer management
    setTimeout,
    setInterval,
    clearTimeout,
    clearInterval,
    
    // Event listener management
    addEventListener,
    removeEventListener,
    
    // Observer management
    createIntersectionObserver,
    createResizeObserver
  };
};

// Memory leak detection utility
export const useMemoryLeakDetection = (componentName) => {
  const mountTime = useRef(Date.now());
  const { addCleanup } = useCleanup();

  useEffect(() => {
    const cleanupTime = Date.now();
    const lifespan = cleanupTime - mountTime.current;
    
    console.log(`Component ${componentName} mounted for ${lifespan}ms`);
    
    // Check for unusually long-lived components
    if (lifespan > 300000) { // 5 minutes
      console.warn(`Component ${componentName} has been mounted for over 5 minutes - possible memory leak`);
    }
  });

  // Track DOM nodes
  const nodeCount = useRef(0);
  
  const trackNode = () => {
    nodeCount.current++;
    return addCleanup(() => {
      nodeCount.current--;
    });
  };

  return {
    trackNode,
    getNodeCount: () => nodeCount.current
  };
};
