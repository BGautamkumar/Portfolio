import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { useMotionPreferences } from "../hooks/useReducedMotion";

const Hero = () => {
  const [mounted, setMounted] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef(null);
  const { getAnimationProps } = useMotionPreferences();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        setMousePosition({
          x: ((e.clientX - rect.left) / rect.width - 0.5) * 20,
          y: ((e.clientY - rect.top) / rect.height - 0.5) * 20,
        });
      }
    };

    // Add throttling for better performance
    let ticking = false;
    const throttledHandleMouseMove = (e) => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleMouseMove(e);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('mousemove', throttledHandleMouseMove);
    return () => window.removeEventListener('mousemove', throttledHandleMouseMove);
  }, []);

  const words = ["Secure", "Modern", "Scalable"];

  return (
    <section id="home" ref={heroRef} className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16">
      {/* 3D Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Glass spheres */}
        <motion.div
          animate={{
            rotateY: 360,
            y: [0, 30, 0],
          }}
          transition={{
            rotateY: { duration: 20, repeat: Infinity, ease: "linear" },
            y: { duration: 4, repeat: Infinity, ease: "easeInOut" }
          }}
          className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full backdrop-blur-sm border border-white/10"
          style={{ transform: 'translateZ(50px)' }}
        />
        
        {/* Blurred glowing cubes */}
        <motion.div
          animate={{
            rotateX: 360,
            rotateZ: [0, 180, 360],
          }}
          transition={{
            rotateX: { duration: 25, repeat: Infinity, ease: "linear" },
            rotateZ: { duration: 15, repeat: Infinity, ease: "easeInOut" }
          }}
          className="absolute top-40 right-32 w-24 h-24 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 backdrop-blur-sm border border-white/10"
          style={{ transform: 'translateZ(30px)' }}
        />
        
        {/* Gradient torus rings */}
        <motion.div
          animate={{
            rotate: 360,
            scale: [1, 1.2, 1],
          }}
          transition={{
            rotate: { duration: 30, repeat: Infinity, ease: "linear" },
            scale: { duration: 6, repeat: Infinity, ease: "easeInOut" }
          }}
          className="absolute bottom-40 left-1/3 w-40 h-40 border-4 border-purple-500/20 rounded-full backdrop-blur-sm"
          style={{ transform: 'translateZ(40px)' }}
        />
        
        {/* Organic blob shapes */}
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, 45, -45, 0],
          }}
          transition={{ 
            duration: 2.0, 
            delay: 1.5,
            repeat: Infinity,
            repeatDelay: 3,
            ease: "easeInOut"
          }}
          className="absolute bottom-20 right-1/4 w-36 h-36 bg-gradient-to-r from-indigo-500/15 to-purple-500/15 rounded-[40%_60%_70%_30%] backdrop-blur-sm border border-white/10"
          style={{ transform: 'translateZ(25px)' }}
        />
      </div>

      {/* 3D Hero Content */}
      <div className="container-premium relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Greeting with 3D effect */}
          <motion.div
            {...getAnimationProps({
              initial: { opacity: 0, y: 30, rotateX: 15 },
              animate: mounted ? { opacity: 1, y: 0, rotateX: 0 } : {},
              transition: { duration: 1, delay: 0.2, type: "spring" }
            })}
            className="mb-8 gpu-accelerated"
            style={{
              transform: `perspective(1000px) rotateX(${mousePosition.y * 0.1}deg) rotateY(${mousePosition.x * 0.1}deg)`,
            }}
          >
            <p className="text-neutral-400 text-lg font-medium tracking-wide">
              Hi, I'm Gautam Kumar
            </p>
          </motion.div>

          {/* Main Headline with 3D depth */}
          <motion.div
            initial={{ opacity: 0, y: 40, z: -100 }}
            animate={mounted ? { opacity: 1, y: 0, z: 0 } : {}}
            transition={{ duration: 1.2, delay: 0.4, type: "spring" }}
            className="mb-8"
            style={{
              transform: `perspective(1000px) translateZ(${mousePosition.y * 2}px) rotateX(${mousePosition.y * 0.05}deg)`,
            }}
          >
            <h1 className="text-display text-white mb-8 leading-tight">
              <span className="block mb-2">A Developer Dedicated to</span>
              <span className="block mb-2">Crafting</span>
              <span className="relative block">
                <span className="absolute inset-0 bg-gradient-to-r from-purple-600/30 to-cyan-600/30 blur-xl" />
                <span className="relative bg-gradient-to-r from-purple-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
                  {words.map((word, index) => (
                    <motion.span
                      key={word}
                      initial={{ opacity: 0, y: 30, z: -50 }}
                      animate={{ 
                        opacity: [0, 1, 1, 0], 
                        y: [30, 0, 0, -30],
                        z: [-50, 0, 0, -50]
                      }}
                      transition={{
                        duration: 1.0,
                        delay: index * 0.3,
                        repeat: Infinity,
                        repeatDelay: 1.2,
                        ease: "easeInOut"}}
                      className="inline-block ml-4"
                    >
                      {word}
                    </motion.span>
                  ))}
                </span>
              </span>
              <span className="block mt-2">Web Solutions</span>
            </h1>
          </motion.div>

          {/* Subtitle with depth */}
          <motion.p
            initial={{ opacity: 0, y: 30, z: -50 }}
            animate={mounted ? { opacity: 1, y: 0, z: 0 } : {}}
            transition={{ duration: 1, delay: 1.2, type: "spring" }}
            className="text-body max-w-2xl mx-auto mb-12"
            style={{
              transform: `perspective(1000px) translateZ(${mousePosition.y}px)`,
            }}
          >
            Final-year Computer Science engineer building scalable, high-performance web applications.
            Focused on clean architecture and performance-driven solutions.
          </motion.p>

          {/* 3D CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={mounted ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 1.4 }}
            className="flex items-center justify-center gap-8 mb-16"
          >
            <motion.a
              href="#projects"
              className="relative overflow-hidden group px-8 py-4 rounded-full font-medium transition-all duration-300 backdrop-blur-lg bg-white/10 border border-white/20 text-white hover:bg-white/20 hover:border-white/30 hover:shadow-[0_0_30px_rgba(139,92,246,0.3)] hover:shadow-purple-500/20"
              whileHover={{ 
                scale: 1.05, 
                rotateX: -5,
                rotateY: 5,
                y: -2,
                z: 20
              }}
              whileTap={{ scale: 0.98 }}
              style={{ transformStyle: "preserve-3d" }}
            >
              <span className="relative z-10 text-white">View My Work</span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 opacity-0 group-hover:opacity-100"
                transition={{ duration: 0.3 }}
              />
            </motion.a>

            <motion.a
              href="#contact"
              className="relative overflow-hidden group px-8 py-4 rounded-full font-medium transition-all duration-300 backdrop-blur-lg bg-white/5 border border-white/10 text-white hover:bg-white/15 hover:border-white/20 hover:shadow-[0_0_30px_rgba(6,182,212,0.3)] hover:shadow-cyan-500/20"
              whileHover={{ 
                scale: 1.05, 
                rotateX: -5,
                rotateY: 5,
                y: -2,
                z: 20
              }}
              whileTap={{ scale: 0.98 }}
              style={{ transformStyle: "preserve-3d" }}
            >
              <span className="relative z-10 text-white">Get In Touch</span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-cyan-500/15 to-blue-500/15 opacity-0 group-hover:opacity-100"
                transition={{ duration: 0.3 }}
              />
            </motion.a>
          </motion.div>

          {/* 3D Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={mounted ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 1.8 }}
            className="absolute bottom-8 left-1/2 -translate-x-1"
            style={{
              perspective: '1000px',
              transform: `rotateX(${mousePosition.y * 0.5}deg)`,
            }}
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="relative"
            >
              <div className="w-6 h-12 border-2 border-accent/40 rounded-full backdrop-blur-sm" />
              <motion.div
                animate={{ y: [0, 20, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-2 left-1/2 transform -translate-x-1/2 w-1 h-3 bg-accent rounded-full"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;