import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { myProjects } from "../constants";
import { Link } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

/* ═══════════════════════════════════════════
   EDITORIAL SPREAD — Project 01
   Image dominant RIGHT, text LEFT
   ═══════════════════════════════════════════ */
const SpreadOne = ({ project }) => {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          end: "bottom 20%",
          toggleActions: "play reverse play reverse",
        },
      });

      tl.from(el.querySelector(".spread-image-wrap"), {
        clipPath: "inset(100% 0% 0% 0%)",
        duration: 1.8,
        ease: "expo.out",
      })
        .from(el.querySelector(".spread-image-wrap img"), {
          scale: 1.1,
          duration: 1.8,
          ease: "expo.out",
        }, "<")
        .from(el.querySelector(".spread-number"), {
          y: 60,
          opacity: 0,
          duration: 1.0,
          ease: "power3.out",
        }, "<0.2")
        .from(
          el.querySelector(".spread-category"),
          { y: 20, opacity: 0, duration: 0.8, ease: "power3.out" },
          "<0.1"
        )
        .from(
          el.querySelector(".spread-title"),
          { y: 30, opacity: 0, duration: 0.8, ease: "power3.out" },
          "<0.1"
        )
        .from(
          el.querySelector(".spread-desc"),
          { y: 20, opacity: 0, duration: 0.8, ease: "power3.out" },
          "<0.1"
        )
        .from(
          el.querySelector(".spread-tags"),
          { y: 20, opacity: 0, duration: 0.8, ease: "power3.out" },
          "<0.1"
        )
        .from(
          el.querySelector(".spread-link"),
          { y: 20, opacity: 0, duration: 0.8, ease: "power3.out" },
          "<0.1"
        );
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} className="editorial-spread spread-layout-right">
      {/* Architectural Number */}
      <div
        className="spread-number"
        aria-hidden="true"
      >
        01
      </div>

      {/* Text Column */}
      <div className="spread-text-col spread-text-left">
        <span className="spread-category">{project.category}</span>
        <h3 className="spread-title">{project.title}</h3>
        <p className="spread-desc">{project.description}</p>
        <div className="spread-tags flex flex-wrap gap-5 mt-4">
          {project.tags.map((tag) => (
            tag.path && (
              <img key={tag.id} src={tag.path} alt="tech icon" className="w-10 h-10 object-contain hover:scale-110 transition-transform duration-300" />
            )
          ))}
        </div>
        <a
          href={project.href || project.github || "#"}
          target="_blank"
          rel="noreferrer"
          className="spread-link"
        >
          <span>View Project</span>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
          </svg>
        </a>
      </div>

      {/* Image Column */}
      <div className="spread-image-col spread-image-right">
        <div className="spread-image-wrap">
          {project.image && (
            <img src={project.image} alt={project.title} loading="lazy" />
          )}
        </div>
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════
   EDITORIAL SPREAD — Project 02
   Image dominant LEFT, text RIGHT
   ═══════════════════════════════════════════ */
const SpreadTwo = ({ project }) => {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          end: "bottom 20%",
          toggleActions: "play reverse play reverse",
        },
      });

      tl.from(el.querySelector(".spread-image-wrap"), {
        clipPath: "inset(0% 100% 0% 0%)",
        duration: 1.8,
        ease: "expo.out",
      })
        .from(el.querySelector(".spread-image-wrap img"), {
          scale: 1.1,
          duration: 1.8,
          ease: "expo.out",
        }, "<")
        .from(el.querySelector(".spread-number"), {
          y: 60,
          opacity: 0,
          duration: 1.0,
          ease: "power3.out",
        }, "<0.2")
        .from(
          el.querySelector(".spread-category"),
          { y: 20, opacity: 0, duration: 0.8, ease: "power3.out" },
          "<0.1"
        )
        .from(
          el.querySelector(".spread-title"),
          { y: 30, opacity: 0, duration: 0.8, ease: "power3.out" },
          "<0.1"
        )
        .from(
          el.querySelector(".spread-desc"),
          { y: 20, opacity: 0, duration: 0.8, ease: "power3.out" },
          "<0.1"
        )
        .from(
          el.querySelector(".spread-tags"),
          { y: 20, opacity: 0, duration: 0.8, ease: "power3.out" },
          "<0.1"
        )
        .from(
          el.querySelector(".spread-link"),
          { y: 20, opacity: 0, duration: 0.8, ease: "power3.out" },
          "<0.1"
        );
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} className="editorial-spread spread-layout-left">
      {/* Architectural Number */}
      <div
        className="spread-number spread-number-right"
        aria-hidden="true"
      >
        02
      </div>

      {/* Image Column */}
      <div className="spread-image-col spread-image-left">
        <div className="spread-image-wrap">
          {project.image && (
            <img src={project.image} alt={project.title} loading="lazy" />
          )}
        </div>
      </div>

      {/* Text Column */}
      <div className="spread-text-col spread-text-right">
        <span className="spread-category">{project.category}</span>
        <h3 className="spread-title">{project.title}</h3>
        <p className="spread-desc">{project.description}</p>
        <div className="spread-tags flex flex-wrap gap-5 mt-4">
          {project.tags.map((tag) => (
            tag.path && (
              <img key={tag.id} src={tag.path} alt="tech icon" className="w-10 h-10 object-contain hover:scale-110 transition-transform duration-300" />
            )
          ))}
        </div>
        <a
          href={project.href || project.github || "#"}
          target="_blank"
          rel="noreferrer"
          className="spread-link"
        >
          <span>View Project</span>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
          </svg>
        </a>
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════
   EDITORIAL SPREAD — Project 03
   Image dominant CENTER, text wrapping below
   ═══════════════════════════════════════════ */
const SpreadThree = ({ project }) => {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          end: "bottom 20%",
          toggleActions: "play reverse play reverse",
        },
      });

      tl.from(el.querySelector(".spread-image-wrap"), {
        clipPath: "inset(50% 50% 50% 50%)",
        duration: 1.8,
        ease: "expo.out",
      })
        .from(el.querySelector(".spread-image-wrap img"), {
          scale: 1.1,
          duration: 1.8,
          ease: "expo.out",
        }, "<")
        .from(el.querySelector(".spread-number"), {
          y: 60,
          opacity: 0,
          duration: 1.0,
          ease: "power3.out",
        }, "<0.2")
        .from(
          el.querySelector(".spread-center-header"),
          { y: 30, opacity: 0, duration: 0.8, ease: "power3.out" },
          "<0.1"
        )
        .from(
          el.querySelector(".spread-center-footer"),
          { y: 30, opacity: 0, duration: 0.8, ease: "power3.out" },
          "<0.1"
        );
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} className="editorial-spread spread-layout-center">
      {/* Architectural Number */}
      <div
        className="spread-number spread-number-center"
        aria-hidden="true"
      >
        03
      </div>

      {/* Header: Category + Title */}
      <div className="spread-center-header">
        <span className="spread-category">{project.category}</span>
        <h3 className="spread-title spread-title-center">{project.title}</h3>
      </div>

      {/* Cinematic Image — Full Width */}
      <div className="spread-image-col spread-image-center">
        <div className="spread-image-wrap spread-image-wrap-center">
          {project.image && (
            <img src={project.image} alt={project.title} loading="lazy" />
          )}
        </div>
      </div>

      {/* Footer: Description + Tags + Link */}
      <div className="spread-center-footer">
        <p className="spread-desc">{project.description}</p>
        <div className="spread-center-meta">
          <div className="spread-tags flex flex-wrap gap-5 mt-4">
            {project.tags.map((tag) => (
              tag.path && (
                <img key={tag.id} src={tag.path} alt="tech icon" className="w-10 h-10 object-contain hover:scale-110 transition-transform duration-300" />
              )
            ))}
          </div>
          <a
            href={project.href || project.github || "#"}
            target="_blank"
            rel="noreferrer"
            className="spread-link"
          >
            <span>View Project</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════
   SECTION HEADER — Massive Editorial Title
   ═══════════════════════════════════════════ */
const EditorialHeader = () => {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: "top 90%",
          toggleActions: "play reverse play reverse",
        },
      });

      tl.from(el.querySelector(".editorial-label"), {
        y: 20,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
      })
        .from(
          el.querySelector(".editorial-title-line-1"),
          { y: 100, opacity: 0, duration: 1.3, ease: "power3.out" },
          "-=0.5"
        )
        .from(
          el.querySelector(".editorial-title-line-2"),
          { y: 100, opacity: 0, duration: 1.3, ease: "power3.out" },
          "-=0.9"
        )
        .from(
          el.querySelector(".editorial-rule"),
          { scaleX: 0, duration: 1.2, ease: "power3.inOut" },
          "-=0.7"
        );
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} className="editorial-header">
      <span className="editorial-label">Selected Works</span>
      <div className="editorial-title-overflow">
        <h2 className="editorial-title-line-1">Featured</h2>
      </div>
      <div className="editorial-title-overflow-visible">
        <h2 className="editorial-title-line-2">Projects</h2>
      </div>
      <div className="editorial-rule" />
    </div>
  );
};

/* ═══════════════════════════════════════════
   MAIN PROJECTS SECTION
   ═══════════════════════════════════════════ */
const Projects = () => {
  const displayedProjects = myProjects.slice(0, 3);
  const spreadComponents = [SpreadOne, SpreadTwo, SpreadThree];

  return (
    <section id="projects" className="editorial-projects-section relative">
      {/* Ambient gradient */}
      <div className="editorial-ambient-top" aria-hidden="true" />
      <div className="editorial-ambient-bottom" aria-hidden="true" />

      <div className="container-cinematic">
        <EditorialHeader />

        {/* Editorial Spreads */}
        <div className="editorial-spreads">
          {displayedProjects.map((project, index) => {
            const SpreadComponent = spreadComponents[index];
            return (
              <SpreadComponent key={project.id} project={project} />
            );
          })}
        </div>

        {/* SEE ALL BUTTON — Preserved exactly */}
        {myProjects.length > 3 && (
          <div className="editorial-see-all">
            <Link
              to="/projects"
              className="group flex items-center gap-4 hover:opacity-80 transition-opacity"
            >
              <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-white/90">
                SEE ALL
              </span>
              <div className="w-10 h-10 rounded-full bg-[#1A1A22] flex items-center justify-center transition-transform group-hover:translate-x-1">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </div>
            </Link>
          </div>
        )}
      </div>

      {/* Halftone Dithered Gradient Fade to White */}
      <div className="absolute bottom-0 left-0 w-full h-10 md:h-20 pointer-events-none z-10">
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
        {/* The seamless solid white fade */}
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

export default Projects;
