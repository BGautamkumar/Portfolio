import React from 'react';
import { motion } from 'framer-motion';

const LoadingSkeleton = ({ 
  height = 'h-32', 
  width = 'w-full', 
  className = '',
  animate = true 
}) => {
  if (!animate) {
    return (
      <div 
        className={`${height} ${width} ${className} bg-neutral-800 rounded-lg`}
      />
    );
  }

  return (
    <motion.div
      className={`${height} ${width} ${className} bg-neutral-800 rounded-lg overflow-hidden relative`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-neutral-700 to-transparent"
        animate={{
          x: ['-100%', '100%']
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </motion.div>
  );
};

export const SectionLoader = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="text-center space-y-4">
      <motion.div
        className="w-16 h-16 border-4 border-purple-500/30 border-t-purple-500 rounded-full"
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      <p className="text-neutral-400">Loading amazing content...</p>
    </div>
  </div>
);

export const CardSkeleton = () => (
  <div className="space-y-4">
    <LoadingSkeleton height="h-48" className="rounded-xl" />
    <LoadingSkeleton height="h-4" width="w-3/4" />
    <LoadingSkeleton height="h-4" width="w-1/2" />
    <div className="flex gap-2">
      <LoadingSkeleton height="h-6" width="w-16" className="rounded-full" />
      <LoadingSkeleton height="h-6" width="w-16" className="rounded-full" />
    </div>
  </div>
);

export const TextSkeleton = ({ lines = 3 }) => (
  <div className="space-y-2">
    {[...Array(lines)].map((_, i) => (
      <LoadingSkeleton 
        key={i} 
        height="h-4" 
        width={i === lines - 1 ? "w-2/3" : "w-full"} 
      />
    ))}
  </div>
);

export default LoadingSkeleton;
