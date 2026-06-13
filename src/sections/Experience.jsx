
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Timeline } from "../components/Timeline";
import { experiences } from "../constants";
import SplineRobot from "../components/SplineRobot";

gsap.registerPlugin(ScrollTrigger);

const Experience = () => {


  return (
    <section
      id="experience"
      className="section-spacing pt-[100px]! relative bg-white"
    >
      <div className="container-cinematic relative overflow-visible">
        {/* TOP AREA: 2 Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start pt-2 mb-6 lg:mb-10 relative overflow-visible">

          {/* LEFT: Heading & Description */}
          <div className="relative z-20">
            {/* Journey Label */}
            <div className="flex items-center gap-4 mb-6">
              <span className="font-mono text-[11px] tracking-[0.2em] text-black/40 font-medium">
                03
              </span>
              <div className="w-8 h-px bg-black/10" />
              <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-black/50">
                JOURNEY
              </span>
            </div>

            <h2 className="font-['Clash_Display'] text-4xl md:text-5xl lg:text-[73px] font-semibold text-black tracking-tight leading-[1.05]">
              Professional
              <br />
              Experience
            </h2>

            <p className="mt-6 text-black/60 text-sm md:text-[15px] leading-relaxed max-w-[450px]">
              Building scalable backend systems, immersive interfaces,
              and premium digital experiences with precision engineering.
            </p>
          </div>

          {/* RIGHT: Robot */}
          <div className="relative flex justify-center lg:justify-end h-[350px] lg:h-[450px] overflow-visible">
            {/* ambient glow */}
            <div className="absolute w-[450px] h-[450px] rounded-full bg-[#5B3DF5]/15 blur-[120px] pointer-events-none" />
            {/* robot wrapper */}
            <div className="w-full h-full scale-[0.9] lg:scale-[1.0] flex items-center justify-center -translate-y-10 lg:-translate-y-[70px] lg:translate-x-5">
              <SplineRobot />
            </div>
          </div>

        </div>

        {/* BOTTOM AREA: Timeline */}
        <div className="relative z-20 w-full" style={{ marginTop: '-9vh' }}>
          <Timeline data={experiences} />
        </div>
      </div>

      {/* Halftone Dithered Gradient Fade to Black */}
      <div className="absolute bottom-0 left-0 w-full h-16 md:h-20 pointer-events-none z-10">
        {/* The dots */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'radial-gradient(#000000 1px, transparent 1px)',
            backgroundSize: '4px 4px',
            WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 90%)',
            maskImage: 'linear-gradient(to bottom, transparent 0%, black 90%)',
          }}
        />
        {/* The seamless solid black fade */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 40%, #000000 100%)'
          }}
        />
      </div>
    </section>
  );
};

export default Experience;