// Performance monitoring utility for animations and user interactions
import { useRef, useEffect } from 'react';

export class PerformanceMonitor {
  constructor() {
    this.metrics = {
      fps: [],
      memoryUsage: [],
      animationDurations: [],
      scrollPerformance: []
    };
    this.observers = [];
    this.isMonitoring = false;
    this.frameCount = 0;
    this.lastFrameTime = performance.now();
  }

  startMonitoring() {
    if (this.isMonitoring) return;
    this.isMonitoring = true;

    // Monitor frame rate
    this.monitorFrameRate();
    
    // Monitor memory usage (if available)
    this.monitorMemoryUsage();
    
    // Monitor long tasks
    this.monitorLongTasks();
    
    // Monitor scroll performance
    this.monitorScrollPerformance();
  }

  stopMonitoring() {
    this.isMonitoring = false;
    this.observers.forEach(observer => observer.disconnect());
    this.observers = [];
  }

  monitorFrameRate() {
    const measureFPS = () => {
      if (!this.isMonitoring) return;

      const currentTime = performance.now();
      const deltaTime = currentTime - this.lastFrameTime;
      const fps = 1000 / deltaTime;

      this.metrics.fps.push({
        timestamp: currentTime,
        value: fps
      });

      // Keep only last 100 measurements
      if (this.metrics.fps.length > 100) {
        this.metrics.fps.shift();
      }

      // Warn about low FPS
      if (fps < 30) {
        console.warn(`Low FPS detected: ${fps.toFixed(1)}`);
        this.suggestOptimizations(fps);
      }

      this.lastFrameTime = currentTime;
      this.frameCount++;

      requestAnimationFrame(measureFPS);
    };

    requestAnimationFrame(measureFPS);
  }

  monitorMemoryUsage() {
    if (!performance.memory) return;

    const measureMemory = () => {
      if (!this.isMonitoring) return;

      const memory = performance.memory;
      this.metrics.memoryUsage.push({
        timestamp: performance.now(),
        usedJSHeapSize: memory.usedJSHeapSize,
        totalJSHeapSize: memory.totalJSHeapSize,
        jsHeapSizeLimit: memory.jsHeapSizeLimit
      });

      // Keep only last 50 measurements
      if (this.metrics.memoryUsage.length > 50) {
        this.metrics.memoryUsage.shift();
      }

      // Warn about high memory usage
      const usagePercentage = (memory.usedJSHeapSize / memory.jsHeapSizeLimit) * 100;
      if (usagePercentage > 80) {
        console.warn(`High memory usage: ${usagePercentage.toFixed(1)}%`);
      }

      setTimeout(measureMemory, 5000); // Check every 5 seconds
    };

    measureMemory();
  }

  monitorLongTasks() {
    if (!window.PerformanceObserver) return;

    try {
      const observer = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          if (entry.duration > 50) { // Tasks longer than 50ms
            console.warn(`Long task detected: ${entry.duration.toFixed(1)}ms`);
          }
        });
      });

      observer.observe({ entryTypes: ['longtask'] });
      this.observers.push(observer);
    } catch (error) {
      console.log('Long task monitoring not supported');
    }
  }

  monitorScrollPerformance() {
    let scrollStartTime = 0;
    let scrollTimeout;

    const handleScrollStart = () => {
      scrollStartTime = performance.now();
    };

    const handleScrollEnd = () => {
      if (scrollStartTime === 0) return;

      const scrollDuration = performance.now() - scrollStartTime;
      this.metrics.scrollPerformance.push({
        timestamp: performance.now(),
        duration: scrollDuration
      });

      if (scrollDuration > 100) {
        console.warn(`Slow scroll performance: ${scrollDuration.toFixed(1)}ms`);
      }

      scrollStartTime = 0;
    };

    document.addEventListener('scroll', handleScrollStart, { passive: true });
    
    document.addEventListener('scroll', () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(handleScrollEnd, 150);
    }, { passive: true });
  }

  measureAnimationDuration(animationName, startTime) {
    const duration = performance.now() - startTime;
    this.metrics.animationDurations.push({
      name: animationName,
      duration,
      timestamp: performance.now()
    });

    if (duration > 1000) {
      console.warn(`Long animation detected: ${animationName} took ${duration.toFixed(1)}ms`);
    }
  }

  suggestOptimizations(fps) {
    const suggestions = [];

    if (fps < 20) {
      suggestions.push('Consider reducing particle count');
      suggestions.push('Disable complex animations on mobile');
      suggestions.push('Use CSS transforms instead of position changes');
    } else if (fps < 30) {
      suggestions.push('Optimize animation timing');
      suggestions.push('Reduce simultaneous animations');
      suggestions.push('Add will-change properties carefully');
    }

    if (suggestions.length > 0) {
      console.log('Performance suggestions:', suggestions);
    }
  }

  getReport() {
    const avgFPS = this.metrics.fps.length > 0 
      ? this.metrics.fps.reduce((sum, m) => sum + m.value, 0) / this.metrics.fps.length 
      : 0;

    const latestMemory = this.metrics.memoryUsage[this.metrics.memoryUsage.length - 1];

    return {
      averageFPS: avgFPS.toFixed(1),
      frameDrops: this.metrics.fps.filter(m => m.value < 30).length,
      memoryUsage: latestMemory ? {
        used: (latestMemory.usedJSHeapSize / 1024 / 1024).toFixed(1) + ' MB',
        total: (latestMemory.totalJSHeapSize / 1024 / 1024).toFixed(1) + ' MB'
      } : 'Not available',
      totalAnimations: this.metrics.animationDurations.length,
      averageScrollTime: this.metrics.scrollPerformance.length > 0
        ? (this.metrics.scrollPerformance.reduce((sum, m) => sum + m.duration, 0) / this.metrics.scrollPerformance.length).toFixed(1) + 'ms'
        : 'N/A'
    };
  }
}

// Global performance monitor instance
export const performanceMonitor = new PerformanceMonitor();

// Hook for React components

export const usePerformanceMonitor = (componentName) => {
  const startTime = useRef(performance.now());

  useEffect(() => {
    return () => {
      const duration = performance.now() - startTime.current;
      performanceMonitor.measureAnimationDuration(componentName, startTime.current);
    };
  }, [componentName]);
};
