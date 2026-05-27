import React, { useEffect, Suspense, lazy } from "react";
import { motion } from "framer-motion";
import Navbar from "./sections/Navbar";
import Hero from "./sections/Hero";
import { initSmoothScroll } from "./utils/smoothScroll";
import { performanceMonitor } from "./utils/performanceMonitor";
import { SectionLoader, CardSkeleton } from "./components/LoadingSkeleton";
import PerformanceIndicator from "./components/PerformanceIndicator";

// Lazy load heavy components
const About = lazy(() => import("./sections/About-premium"));
const Projects = lazy(() => import("./sections/Projects-3x3"));
const Experiences = lazy(() => import("./sections/Experiences"));
const Contact = lazy(() => import("./sections/Contact"));

const App = () => {
  useEffect(() => {
    // Initialize smooth scrolling
    initSmoothScroll();
    
    // Start performance monitoring in development
    if (process.env.NODE_ENV === 'development') {
      performanceMonitor.startMonitoring();
      
      // Log performance report every 30 seconds
      const interval = setInterval(() => {
        console.log('Performance Report:', performanceMonitor.getReport());
      }, 30000);
      
      return () => {
        clearInterval(interval);
        performanceMonitor.stopMonitoring();
      };
    }
  }, []);

  return (
    <main className="min-h-screen relative overflow-hidden">
      {/* Multi-layer animated background */}
      <div className="fixed inset-0 -z-50">
        {/* Base mesh gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-950 to-black" />
        
        {/* Animated radial glows */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/15 rounded-full blur-3xl animate-pulse" />
          <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
          <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-purple-700/15 rounded-full blur-3xl animate-pulse delay-2000" />
        </div>
        
        {/* Subtle animated noise texture */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-900/8 to-transparent animate-pulse" />
        </div>
        
        {/* Soft floating light blobs */}
        <div className="absolute inset-0">
          <motion.div
            animate={{
              x: [0, 100, 0],
              y: [0, -50, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-purple-500/12 to-purple-700/12 rounded-full blur-2xl"
          />
          <motion.div
            animate={{
              x: [0, -80, 0],
              y: [0, 60, 0],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute bottom-1/3 right-1/4 w-56 h-56 bg-gradient-to-r from-purple-600/10 to-purple-800/10 rounded-full blur-2xl"
          />
        </div>
      </div>
      
      {/* 3D perspective container */}
      <div className="relative" style={{ perspective: '1000px' }}>
        <Navbar />
        <Hero />
        <Suspense fallback={<SectionLoader />}>
          <About />
        </Suspense>
        <Suspense fallback={
          <div className="container-premium py-20">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <CardSkeleton key={i} />
              ))}
            </div>
          </div>
        }>
          <Projects />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <Experiences />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <Contact />
        </Suspense>
      </div>
      
      {/* Performance Indicator */}
      <PerformanceIndicator />
    </main>
  );
};

export default App;