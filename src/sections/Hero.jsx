import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MagneticButton from "../components/MagneticButton";
import HeroMachineOverlay from "../components/HeroMachineOverlay";

import { getLenis } from "../hooks/useLenis";

gsap.registerPlugin(ScrollTrigger);

const Hero = ({ preloaderDone = false }) => {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  // GSAP entrance timeline — triggered after preloader
  useEffect(() => {
    if (!contentRef.current || !preloaderDone || hasAnimated) return;

    setHasAnimated(true);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.1 });

      tl.from(".hero-label", {
        opacity: 0,
        y: 20,
        duration: 0.8,
        ease: "power3.out",
      })
        .from(
          ".hero-name-line",
          {
            opacity: 0,
            y: 50,
            skewY: 2,
            duration: 1,
            stagger: 0.1,
            ease: "power4.out",
          },
          "-=0.5"
        )
        .from(
          ".hero-text-block",
          {
            opacity: 0,
            y: 20,
            duration: 0.8,
            stagger: 0.1,
            ease: "power3.out",
          },
          "-=0.6"
        )
        .from(
          ".hero-cta > *",
          {
            opacity: 0,
            y: 15,
            duration: 0.8,
            stagger: 0.1,
            ease: "power3.out",
          },
          "-=0.6"
        );
    }, contentRef);

    return () => ctx.revert();
  }, [preloaderDone, hasAnimated]);

  // Parallax on scroll
  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.to(".hero-content-left", {
        y: -50,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scrollToSection = (selector) => (e) => {
    e.preventDefault();
    const lenis = getLenis();
    const target = document.querySelector(selector);
    if (lenis && target) lenis.scrollTo(target, { offset: -80, duration: 1.2 });
  };

  return (
    <section
      id="home"
      ref={sectionRef}
      className="w-full relative bg-black"
    >
      <div className="h-[110vh] min-h-[800px] w-full flex items-center justify-center relative overflow-hidden">
        <HeroMachineOverlay />

        <div ref={contentRef} className="container-cinematic w-full flex flex-col items-center justify-center z-10 relative mt-[-5vh] pointer-events-none">
          {/* Main Content */}
          <div className="hero-content-left w-full max-w-5xl mx-auto flex flex-col justify-center items-center text-center px-4 pointer-events-auto">
            {/* Giant Name — perfectly aligned */}
            <div className="mb-14 overflow-hidden">
              <h1 className="text-hero text-white leading-[0.95] tracking-[-0.04em] text-center">
                <span className="hero-name-line block">Gautam</span>
                <span className="hero-name-line block">
                  Kumar<span id="hero-red-dot" className="text-[#FF2D2D] relative inline-block">.</span>
                </span>
              </h1>
            </div>

            {/* Typography Blocks */}
            <div className="hero-text-block overflow-hidden mb-10">
              <p className="text-2xl md:text-4xl font-light text-white/90 max-w-4xl mx-auto leading-tight tracking-tight">
                Building scalable, high-performance web applications with engineering precision.
              </p>
            </div>

            <div className="hero-text-block overflow-hidden mb-16">
              <p className="text-base md:text-lg max-w-2xl mx-auto text-white/50">
                Computer Science engineer specializing in clean architecture,
                performant backends, and premium user experiences.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Extra space at the end of the hero section before the dot effect starts */}
      <div className="w-full h-[23vh] bg-transparent relative"></div>

      {/* Halftone Dithered Gradient Fade to Solid - Pushed exactly to the bottom edge */}
      <div className="absolute bottom-0 left-0 w-full h-16 md:h-20 pointer-events-none z-10">
        {/* The dots */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)',
            backgroundSize: '4px 4px',
            WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 90%)',
            maskImage: 'linear-gradient(to bottom, transparent 0%, black 90%)',
          }}
        />
        {/* The seamless solid fade */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0) 40%, #ffffff 100%)'
          }}
        />
      </div>
    </section>
  );
};

export default Hero;