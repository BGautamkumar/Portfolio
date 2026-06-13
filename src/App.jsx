import React, { Suspense, lazy, useState, useCallback, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Navbar from "./sections/Navbar";
import Hero from "./sections/Hero";

import Preloader from "./components/Preloader";
import PageTransition from "./components/PageTransition";
import { getLenis } from "./hooks/useLenis";

// Lazy load below-fold sections
const About = lazy(() => import("./sections/About"));
const Projects = lazy(() => import("./sections/Projects"));
const Experience = lazy(() => import("./sections/Experience"));
const Contact = lazy(() => import("./sections/Contact"));

const AllProjects = lazy(() => import("./pages/AllProjects"));

const SectionFallback = () => <div className="min-h-[50vh]" />;

const HomePage = ({ preloaderDone }) => (
  <main className="relative">
    <Hero preloaderDone={preloaderDone} />

    <div className="bg-[#010210]">
      <Suspense fallback={<SectionFallback />}>
        <About />
      </Suspense>
            <Suspense fallback={<SectionFallback />}>
        <Projects />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <Experience />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <Contact />
      </Suspense>
    </div>
  </main>
);

const App = () => {
  const [preloaderDone, setPreloaderDone] = useState(false);
  const location = useLocation();

  const handlePreloaderComplete = useCallback(() => {
    setPreloaderDone(true);
  }, []);

  // Scroll to top on route change
  useEffect(() => {
    const lenis = getLenis();
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [location.pathname]);

  return (
    <>
      {/* Preloader */}
      <Preloader onComplete={handlePreloaderComplete} />

      {/* ═══ Cinematic Background System ═══ */}
      <div className="fixed inset-0 -z-50 bg-black"></div>

      {/* ═══ Navbar sits OUTSIDE PageTransition so transform doesn't break position:fixed ═══ */}
      <Navbar />

      {/* ═══ Content ═══ */}
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={
            <PageTransition>
              <HomePage preloaderDone={preloaderDone} />
            </PageTransition>
          } />
          <Route 
            path="/projects" 
            element={
              <PageTransition>
                <Suspense fallback={<SectionFallback />}>
                  <AllProjects />
                </Suspense>
              </PageTransition>
            } 
          />
        </Routes>
      </AnimatePresence>
    </>
  );
};

export default App;