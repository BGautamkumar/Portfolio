import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const PerformanceIndicator = () => {
  const [fps, setFps] = useState(60);
  const [memory, setMemory] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let frameCount = 0;
    let lastTime = performance.now();
    let animationId;

    const measureFPS = () => {
      frameCount++;
      const currentTime = performance.now();
      
      if (currentTime >= lastTime + 1000) {
        const currentFps = Math.round((frameCount * 1000) / (currentTime - lastTime));
        setFps(currentFps);
        frameCount = 0;
        lastTime = currentTime;
      }
      
      animationId = requestAnimationFrame(measureFPS);
    };

    measureFPS();

    // Measure memory usage
    const measureMemory = () => {
      if (performance.memory) {
        const used = (performance.memory.usedJSHeapSize / 1024 / 1024).toFixed(1);
        const total = (performance.memory.totalJSHeapSize / 1024 / 1024).toFixed(1);
        setMemory(`${used}/${total} MB`);
      }
    };

    const memoryInterval = setInterval(measureMemory, 2000);

    return () => {
      cancelAnimationFrame(animationId);
      clearInterval(memoryInterval);
    };
  }, []);

  // Toggle visibility with 'p' key
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'p' && e.ctrlKey) {
        setIsVisible(!isVisible);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isVisible]);

  if (!isVisible) {
    return (
      <div className="fixed bottom-4 right-4 text-xs text-neutral-500 z-50">
        Press Ctrl+P for performance stats
      </div>
    );
  }

  const getFpsColor = (fps) => {
    if (fps >= 55) return 'text-green-400';
    if (fps >= 30) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed top-4 right-4 bg-black/80 backdrop-blur-md border border-neutral-700 rounded-lg p-4 text-white font-mono text-sm z-50 min-w-[200px]"
    >
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-neutral-400">FPS:</span>
          <span className={`font-bold ${getFpsColor(fps)}`}>{fps}</span>
        </div>
        
        {memory && (
          <div className="flex justify-between items-center">
            <span className="text-neutral-400">Memory:</span>
            <span className="text-blue-400 text-xs">{memory}</span>
          </div>
        )}
        
        <div className="flex justify-between items-center">
          <span className="text-neutral-400">Status:</span>
          <span className={fps >= 30 ? 'text-green-400' : 'text-red-400'}>
            {fps >= 30 ? 'Smooth' : 'Laggy'}
          </span>
        </div>
      </div>
      
      <div className="mt-3 pt-3 border-t border-neutral-700 text-xs text-neutral-500">
        Press Ctrl+P to hide
      </div>
    </motion.div>
  );
};

export default PerformanceIndicator;
