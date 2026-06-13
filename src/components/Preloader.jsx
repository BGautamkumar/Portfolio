import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Preloader — Cinematic loading screen with smooth, premium reveal.
 */
const Preloader = ({ onComplete }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [count, setCount] = useState(0);

  useEffect(() => {
    // Perfectly smooth deterministic loading progress
    const interval = setInterval(() => {
      setCount((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsLoading(false);
            onComplete?.();
          }, 600); // brief pause at 100% for satisfaction
          return 100;
        }
        return prev + 1; // Smooth increment by 1
      });
    }, 12); // Very fast interval for smooth counting

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: 1.2, ease: [0.76, 0, 0.24, 1] },
          }}
          className="fixed inset-0 z-10000 bg-bg-primary flex flex-col items-center justify-center"
        >
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.98, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            className="mb-12"
          >
            <span className="font-['Clash_Display'] text-5xl md:text-6xl font-semibold text-white tracking-tight">
              GK
            </span>
          </motion.div>

          {/* Progress bar */}
          <div className="w-48 h-px bg-white/10 relative overflow-hidden rounded-full">
            <motion.div
              className="absolute inset-y-0 left-0 bg-linear-to-r from-accent to-secondary"
              initial={{ width: "0%" }}
              animate={{ width: `${Math.min(count, 100)}%` }}
              transition={{ duration: 0.1, ease: "linear" }}
            />
          </div>

          {/* Counter */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 1 }}
            className="mt-6"
          >
            <span className="text-text-subtle text-xs font-mono tracking-widest">
              {Math.floor(Math.min(count, 100)).toString().padStart(3, "0")}
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
