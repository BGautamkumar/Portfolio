import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionHeading from "../components/SectionHeading";
import { skills } from "../constants";

gsap.registerPlugin(ScrollTrigger);

const specializations = [
  {
    title: "System Architecture & Design",
    description:
      "Designing resilient backend systems, microservices, and distributed architectures with clean, maintainable code.",
    icon: "◆",
  },
  {
    title: "Performance Optimization",
    description:
      "Optimizing application speed, reducing latency, and ensuring high availability for mission-critical systems.",
    icon: "◇",
  },
  {
    title: "Scalable Infrastructure",
    description:
      "Building robust architectures that seamlessly handle traffic spikes and scale elegantly with growing user demands.",
    icon: "○",
  },
  {
    title: "Full-Stack Development",
    description:
      "Delivering end-to-end solutions, bridging complex backend logic with intuitive, pixel-perfect frontend interfaces.",
    icon: "◈",
  },
  {
    title: "Cloud Native Solutions",
    description:
      "Leveraging modern cloud platforms like AWS and Azure to deploy secure, highly available, and containerized applications.",
    icon: "⬡",
  },
  {
    title: "API Design & Integration",
    description:
      "Creating well-documented, RESTful APIs that ensure seamless, secure communication between diverse systems.",
    icon: "▣",
  },
];


const About = () => {
  const sectionRef = useRef(null);
  const marqueeItems = [...skills, ...skills, ...skills, ...skills];


  return (
    <section id="about" ref={sectionRef} className="section-spacing relative bg-white overflow-hidden">
      <div className="container-cinematic">
        <SectionHeading theme="light"
          number="01"
          label="About"
          title="Engineering with intention."
          className="mb-12! lg:mb-12!"
        />

        <div className="grid lg:grid-cols-[1fr_0.9fr] gap-22 items-start mb-32">

          {/* LEFT SIDE */}
          <p className="reveal-text text-[36px] md:text-[56px] lg:text-[38px] leading-none tracking-[-0.04em] font-['General Sans'] font-medium text-center md:text-left">

            <span className="text-black">
              I'm a systems-focused
            </span>{" "}

            <span className="inline-flex items-center justify-center bg-[#D9FF43] text-black rounded-full px-[0.55em] py-[0.12em] mx-[0.15em] align-middle -translate-y-[0.1em] gap-[0.4em] rotate-[-4deg]">
              <svg width="0.4em" height="0.4em" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
              <span className="text-[0.35em] font-semibold uppercase">
                System Architect
              </span>
            </span>{" "}

            <span className="text-black">
              passionate about building
            </span>{" "}

            <span className="text-black/50">
              scalable and secure applications
            </span>{" "}

            <span className="text-black">
              that push the boundaries of what's possible on the web.
            </span>{" "}

            <span className="text-black">
              I approach
            </span>{" "}

            <span className="inline-flex items-center justify-center bg-[#D9FF43] text-black rounded-full px-[0.55em] py-[0.12em] mx-[0.15em] align-middle rotate-3">
              ⚙️
              <span className="text-[0.35em] font-semibold uppercase ml-1">
                Backend Engineer
              </span>
            </span>{" "}

            <span className="text-black/50">
              development with an engineering mindset
            </span>{" "}

            <span className="text-black">
              prioritizing clean architecture,
            </span>{" "}

            <span className="bg-[#dbfcad] text-black px-2 py-0.5 rounded-md font-bold">
              maintainability,
            </span>{" "}

            <span className="text-black">
              and performance.
            </span>{" "}

            <span className="text-black">
              Whether designing APIs
            </span>{" "}

            <span className="inline-flex items-center justify-center bg-[#D9FF43] text-black rounded-full px-[0.55em] py-[0.12em] mx-[0.15em] align-middle rotate-[-5deg]">
              🔗
              <span className="text-[0.35em] font-semibold uppercase ml-1">
                API Designer
              </span>
            </span>{" "}

            <span className="text-black/50">
              optimizing database queries,
            </span>{" "}

            <span className="text-black">
              or crafting intuitive UI components.
            </span>{" "}

            <span className="text-black">
              I focus on
            </span>{" "}

            <span className="inline-flex items-center justify-center bg-[#D9FF43] text-black rounded-full px-[0.55em] py-[0.12em] mx-[0.15em] align-middle rotate-[4deg]">
              🚀
              <span className="text-[0.35em] font-semibold uppercase ml-1">
                Performance First
              </span>
            </span>{" "}

            <span className="text-black/50">
              delivering solutions
            </span>{" "}

            <span className="text-black">
              that are both
            </span>{" "}

            <span className="bg-[#dbfcad] text-black px-2 py-0.5 rounded-md font-bold">
              robust and user-centric.
            </span>

          </p>

          {/* RIGHT SIDE */}
          <div className="space-y-10">
            {specializations.map((spec, index) => (
              <motion.div
                key={spec.title}
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.7,
                  delay: index * 0.08,
                }}
                viewport={{ once: false, amount: 0.2 }}
                className="pt-2"
              >
                <span className="text-black/30 text-lg block mb-4">
                  {spec.icon}
                </span>

                <h3 className="font-['Clash_Display'] text-xl text-black font-semibold mb-3">
                  {spec.title}
                </h3>

                <p className="text-sm leading-relaxed text-black/60">
                  {spec.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

      </div>

      {/* ═══ Technologies Section Merged ═══ */}
      <div className="relative py-24 md:py-32 flex flex-col items-center justify-center w-full">
        {/* Header */}
        <div className="text-center z-10 mb-24 md:mb-32 px-4">
          <h2 className="font-['Clash_Display'] text-3xl md:text-5xl font-semibold text-black tracking-tight mb-4" style={{ marginBottom: '6vh', marginTop: '5vh' }}>
            Technologies I work with
          </h2>
          <p className="text-black/60 text-[15px] md:text-[17px] font-light max-w-2xl mx-auto">
            Discover the tools, frameworks, and platforms I connect with securely to build robust solutions.
          </p>
        </div>

        {/* Marquee Container */}
        <div className="relative w-full flex overflow-x-hidden group">
          {/* Fading Edges */}
          <div className="absolute top-0 bottom-0 left-0 w-24 md:w-64 bg-linear-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute top-0 bottom-0 right-0 w-24 md:w-64 bg-linear-to-l from-white to-transparent z-10 pointer-events-none" />

          <div
            className="flex w-max gap-8 md:gap-2 animate-marquee hover:[animation-play-state:paused] will-change-transform"
            style={{ animationDuration: '45s' }}
          >
            {marqueeItems.map((tech, index) => (
              <div key={`${tech.name}-${index}`} className="shrink-0 py-6">
                <motion.div
                  whileHover={{
                    scale: 1.15,
                    zIndex: 50,
                    boxShadow: "0 4px 30px 4px rgba(124, 58, 237, 0.15)", // Subtle Purple glow for light mode
                    borderColor: "rgba(124, 58, 237, 0.3)",
                  }}
                  className="w-16 h-16 md:w-24 md:h-24 rounded-2xl bg-[#fafafa] border border-black/6 flex flex-col items-center justify-center gap-1.5 transition-colors duration-300 relative group/icon cursor-pointer shadow-sm hover:bg-white"
                >
                  <img
                    src={tech.logo}
                    alt={tech.name}
                    className={`w-7 h-7 md:w-9 md:h-9 object-contain opacity-70 group-hover/icon:opacity-100 group-hover/icon:-translate-y-1.5 transition-all duration-300 ${(tech.name === 'GitHub' || tech.name === 'Three.js') ? 'invert contrast-125' : ''}`}
                    loading="lazy"
                    decoding="async"
                  />
                  <span className="text-[9px] md:text-[11px] text-black/50 font-medium tracking-wide group-hover/icon:text-black opacity-0 group-hover/icon:opacity-100 absolute bottom-2.5 transition-all duration-300">
                    {tech.name}
                  </span>
                </motion.div>
              </div>
            ))}
          </div>
        </div>

        {/* Subtext Aesthetic */}
        <div className="mt-24 md:mt-32 text-center z-10 relative" style={{ marginTop: '5vh', marginBottom: '-12vh' }}>
          <h3 className="font-['Clash_Display'] text-5xl md:text-8xl font-bold text-black/4 tracking-tighter select-none pointer-events-none">
            LIMITLESS
          </h3>
          <p className="text-black/50 text-xs md:text-sm absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-full font-medium">
            Build scalable architectures<br />out of the box
          </p>
        </div>

      </div>
    </section>
  );
};

export default About;
