import { useState, useEffect } from 'react';

export const useReducedMotion = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (event) => {
      setPrefersReducedMotion(event.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  return prefersReducedMotion;
};

export const useMotionPreferences = () => {
  const prefersReducedMotion = useReducedMotion();
  
  const getAnimationProps = (defaultProps = {}) => {
    if (prefersReducedMotion) {
      return {
        initial: false,
        animate: false,
        transition: { duration: 0 },
        ...defaultProps
      };
    }
    
    return defaultProps;
  };

  return {
    prefersReducedMotion,
    getAnimationProps
  };
};
