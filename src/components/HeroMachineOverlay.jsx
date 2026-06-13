import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { motion, useSpring } from "framer-motion";
import { gsap } from "gsap";

// ─── 8 VISIBLE NODES — mapped to the Jeddah circuit perimeter ───
// Spread horizontally (x: 10% → 92%) to create a wide, cinematic layout
const NODE_LAYOUT = [
  { id: "hub-strategy", label: "STRATEGY", x: 42, y: 15, labelPos: "bottom" },       // Corner 08 — apex, top
  { id: "hub-architecture", label: "ARCHITECTURE", x: 14, y: 28, labelPos: "right" }, // Corner 06 — upper left
  { id: "hub-quality", label: "QUALITY", x: 10, y: 48, labelPos: "right" },           // Corner 05 — left side
  { id: "hub-data", label: "DATA", x: 18, y: 73, labelPos: "right" },                // Corner 03 — bottom left
  { id: "hub-cloud", label: "CLOUD", x: 42, y: 86, labelPos: "top" },                // Corner 01 — bottom center (start/finish)
  { id: "hub-delivery", label: "DELIVERY", x: 86, y: 66, labelPos: "left" },         // Corner 12 — right lower
  { id: "hub-security", label: "SECURITY", x: 92, y: 32, labelPos: "left" },         // Corner 11 — far right
  { id: "hub-product", label: "PRODUCT", x: 62, y: 28, labelPos: "left" },           // Corner 10 — upper center-right
];

// ─── 6 INVISIBLE WAYPOINTS — shape the path without rendering UI ───
const WAYPOINTS = [
  { id: "wp-07", x: 28, y: 26 },       // Corner 07 — upper center-left curve
  { id: "wp-04", x: 25, y: 56 },       // Corner 04 — left mid transition
  { id: "wp-02", x: 36, y: 73 },       // Corner 02 — bottom center-left
  { id: "wp-14", x: 66, y: 78 },       // Corner 14 — bottom center-right
  { id: "wp-13", x: 70, y: 58 },       // Corner 13 — center-right return
  { id: "wp-hairpin", x: 94, y: 48 },  // Hairpin apex — far-right edge (11↔12 turn)
];

// ─── PATH ORDER — traces the Jeddah circuit shape (clockwise from top) ───
const PATH_SEQUENCE = [
  "hub-strategy",     // 08  top
  "wp-07",            // 07  upper-center-left
  "hub-architecture", // 06  upper-left
  "hub-quality",      // 05  left side
  "wp-04",            // 04  mid-left
  "hub-data",         // 03  bottom-left
  "wp-02",            // 02  bottom center-left
  "hub-cloud",        // 01  bottom center (start/finish)
  "wp-14",            // 14  bottom center-right
  "wp-13",            // 13  center-right
  "hub-delivery",     // 12  right-lower
  "wp-hairpin",       //     far-right hairpin apex
  "hub-security",     // 11  far-right
  "hub-product",      // 10  upper center-right
  "hero-red-dot",     //     final destination (center)
];

function buildSmoothPath(points, tension = 0.9) {
  if (!points || points.length < 2) return "";

  let d = `M ${points[0].x} ${points[0].y}`;

  for (let i = 0; i < points.length - 1; i += 1) {
    const p0 = points[i - 1] || points[i];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[i + 2] || p2;

    const c1x = p1.x + ((p2.x - p0.x) / 6) * tension;
    const c1y = p1.y + ((p2.y - p0.y) / 6) * tension;
    const c2x = p2.x - ((p3.x - p1.x) / 6) * tension;
    const c2y = p2.y - ((p3.y - p1.y) / 6) * tension;

    d += ` C ${c1x} ${c1y}, ${c2x} ${c2y}, ${p2.x} ${p2.y}`;
  }

  return d;
}

// -------------------------------------------------------------
// Ambient Dust Particle System
// -------------------------------------------------------------
const AmbientDust = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let animationFrameId = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", resize);
    resize();

    const particles = Array.from({ length: 400 }).map(() => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 1.5 + 0.1,
      speedX: (Math.random() - 0.5) * 0.15,
      speedY: (Math.random() - 0.5) * 0.15,
      opacity: Math.random() * 0.5 + 0.05,
    }));

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${p.opacity})`;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none opacity-55 mix-blend-screen z-0"
    />
  );
};

// -------------------------------------------------------------
// Node / Hub
// -------------------------------------------------------------
const EngineeringHub = ({ id, x, y, label, labelPos = "bottom" }) => {
  const labelClasses = {
    bottom: "top-full mt-3 left-1/2 -translate-x-1/2 text-center",
    top: "bottom-full mb-3 left-1/2 -translate-x-1/2 text-center",
    left: "right-full mr-3 top-1/2 -translate-y-1/2 text-right",
    right: "left-full ml-3 top-1/2 -translate-y-1/2 text-left",
  };

  return (
    <motion.div
      id={id}
      className="hub-container absolute flex items-center justify-center z-10"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        width: "42px",
        height: "42px",
        x: "-50%",
        y: "-50%",
      }}
      whileHover={{ scale: 1.08 }}
    >
      <div className="absolute inset-[-12px] rounded-full border border-white/5 bg-white/[0.02] backdrop-blur-[2px] opacity-0 transition-opacity duration-500 hub-glow" />
      <div className="absolute inset-0 rounded-full border border-white/10" />
      <div className="hub-inner-ring absolute inset-[4px] rounded-full border border-white/20 border-dashed opacity-50" />
      <div className="w-1.5 h-1.5 rounded-full bg-white/30 hub-core shadow-[0_0_8px_rgba(255,255,255,0)] transition-all duration-300" />

      <div className="absolute w-[2px] h-[7px] bg-white/20 top-[-4px] left-1/2 -translate-x-1/2" />
      <div className="absolute w-[2px] h-[7px] bg-white/20 bottom-[-4px] left-1/2 -translate-x-1/2" />
      <div className="absolute w-[7px] h-[2px] bg-white/20 left-[-4px] top-1/2 -translate-y-1/2" />
      <div className="absolute w-[7px] h-[2px] bg-white/20 right-[-4px] top-1/2 -translate-y-1/2" />

      <div className={`absolute w-40 ${labelClasses[labelPos]}`}>
        <span className="hub-label text-[10px] uppercase tracking-[0.24em] text-white/30 font-mono transition-colors duration-300">
          {label}
        </span>
      </div>
    </motion.div>
  );
};

// -------------------------------------------------------------
// Main Overlay Component
// -------------------------------------------------------------
const HeroMachineOverlay = () => {
  const containerRef = useRef(null);
  const svgRef = useRef(null);
  const pathRef = useRef(null);
  const ctxRef = useRef(null);
  const resizeFrameRef = useRef(0);

  const [dimensions, setDimensions] = useState({ w: 1000, h: 1000 });
  const [mainPath, setMainPath] = useState("");
  const [meshPaths, setMeshPaths] = useState([]);
  const [dotCoords, setDotCoords] = useState(null);

  const mouseX = useSpring(0, { stiffness: 40, damping: 20 });
  const mouseY = useSpring(0, { stiffness: 40, damping: 20 });

  const hubIds = useMemo(() => NODE_LAYOUT.map((n) => n.id), []);
  const trailOffsets = [0, 26, 52, 78, 104];

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      mouseX.set((e.clientX / innerWidth - 0.5) * 24);
      mouseY.set((e.clientY / innerHeight - 0.5) * 24);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  useLayoutEffect(() => {
    const measure = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();

      const getPos = (id) => {
        // Check if it's an invisible waypoint — compute from percentage
        const wp = WAYPOINTS.find((w) => w.id === id);
        if (wp) {
          return { x: rect.width * (wp.x / 100), y: rect.height * (wp.y / 100) };
        }

        // Otherwise, measure the DOM element
        const el = document.getElementById(id);
        if (!el) return null;
        const r = el.getBoundingClientRect();
        return {
          x: r.left - rect.left + r.width / 2,
          y: r.top - rect.top + r.height / 2,
        };
      };

      const positions = PATH_SEQUENCE.map(getPos);
      if (positions.some((p) => !p)) return;

      setDimensions({ w: rect.width, h: rect.height });

      const primary = buildSmoothPath(positions, 0.95);

      // Get visible node positions for mesh paths
      const strategy = getPos("hub-strategy");
      const product = getPos("hub-product");
      const architecture = getPos("hub-architecture");
      const cloud = getPos("hub-cloud");
      const data = getPos("hub-data");
      const security = getPos("hub-security");
      const quality = getPos("hub-quality");
      const delivery = getPos("hub-delivery");
      const dot = getPos("hero-red-dot");

      if (dot) setDotCoords(dot);

      // Complex mesh network — cross-connections between spread-out nodes
      const crossPaths = [
        // Long diagonals spanning the full width
        buildSmoothPath([strategy, data, delivery].filter(Boolean), 0.85),
        buildSmoothPath([architecture, cloud, security].filter(Boolean), 0.82),
        buildSmoothPath([quality, cloud, product].filter(Boolean), 0.75),
        buildSmoothPath([strategy, security, delivery].filter(Boolean), 0.78),

        // Medium connections
        buildSmoothPath([architecture, strategy, product].filter(Boolean), 0.6),
        buildSmoothPath([quality, architecture].filter(Boolean), 0.4),
        buildSmoothPath([data, cloud, delivery].filter(Boolean), 0.7),
        buildSmoothPath([product, delivery].filter(Boolean), 0.65),

        // Cross-hatching through the circuit interior
        buildSmoothPath([strategy, dot, delivery].filter(Boolean), 0.9),
        buildSmoothPath([quality, delivery].filter(Boolean), 0.8),
        buildSmoothPath([architecture, product].filter(Boolean), 0.5),
        buildSmoothPath([data, security].filter(Boolean), 0.85),
        buildSmoothPath([quality, security].filter(Boolean), 0.95),
        buildSmoothPath([architecture, delivery].filter(Boolean), 0.7),
      ].filter(Boolean);

      setMainPath(primary);
      setMeshPaths(crossPaths);
    };

    const schedule = () => {
      cancelAnimationFrame(resizeFrameRef.current);
      resizeFrameRef.current = requestAnimationFrame(measure);
    };

    schedule();
    window.addEventListener("resize", schedule);

    let ro = null;
    if ("ResizeObserver" in window && containerRef.current) {
      ro = new ResizeObserver(schedule);
      ro.observe(containerRef.current);
    }

    return () => {
      cancelAnimationFrame(resizeFrameRef.current);
      window.removeEventListener("resize", schedule);
      if (ro) ro.disconnect();
    };
  }, [hubIds]);

  useEffect(() => {
    if (!mainPath || !pathRef.current) return;

    if (ctxRef.current) {
      ctxRef.current.revert();
      ctxRef.current = null;
    }

    ctxRef.current = gsap.context(() => {
      const pathEl = pathRef.current;
      const totalLength = pathEl.getTotalLength();
      const orbEls = gsap.utils.toArray(".energy-orb-group");
      const activeDot = document.getElementById("hero-red-dot");
      const dotPoint = activeDot ? activeDot.getBoundingClientRect() : null;

      // ─── Animation constants (single source of truth) ───
      const TRAVEL_DURATION = 13.0;
      const TRAVEL_START = 0.3;
      const INTRO_DURATION = 0.3;
      const NODE_GLOW_RADIUS = 25;

      // ─── Precompute each VISIBLE node's exact path-length position ───
      const nodePositions = {};
      PATH_SEQUENCE.forEach((id) => {
        if (id.startsWith("wp-")) return; // Skip waypoints
        const el = document.getElementById(id);
        if (el) {
          const r = el.getBoundingClientRect();
          const cRect = containerRef.current.getBoundingClientRect();
          nodePositions[id] = {
            x: r.left - cRect.left + r.width / 2,
            y: r.top - cRect.top + r.height / 2,
          };
        }
      });

      // Sample the SVG path to find the closest point for each visible node
      const nodeLengths = {};
      const sampleSteps = Math.max(1000, Math.floor(totalLength));
      for (let i = 0; i <= sampleSteps; i++) {
        const l = (i / sampleSteps) * totalLength;
        const p = pathEl.getPointAtLength(l);
        PATH_SEQUENCE.forEach((id) => {
          if (id.startsWith("wp-")) return; // Skip waypoints
          if (!nodePositions[id]) return;
          const dist = Math.hypot(p.x - nodePositions[id].x, p.y - nodePositions[id].y);
          if (!nodeLengths[id] || dist < nodeLengths[id].minDist) {
            nodeLengths[id] = { minDist: dist, length: l };
          }
        });
      }

      // Normalized fractions [0..1]
      const nodeThresholds = {};
      PATH_SEQUENCE.forEach((id) => {
        if (nodeLengths[id]) {
          nodeThresholds[id] = nodeLengths[id].length / totalLength;
        }
      });

      // ─── Node pulse state tracking ───
      const nodeGlowed = {};
      const nodeTimelines = {};

      const glowNode = (id) => {
        if (nodeGlowed[id]) return;
        nodeGlowed[id] = true;

        const selector = `#${id}`;

        if (nodeTimelines[id]) {
          nodeTimelines[id].kill();
        }

        const pulseTl = gsap.timeline();
        pulseTl
          .to(`${selector} .hub-core`, {
            backgroundColor: "#ffffff",
            boxShadow: "0 0 18px rgba(255,255,255,0.95)",
            duration: 0.15,
            ease: "power2.out",
          }, 0)
          .to(`${selector} .hub-glow`, {
            opacity: 1,
            duration: 0.15,
            ease: "power2.out",
          }, 0)
          .to(`${selector} .hub-label`, {
            color: "#ffffff",
            duration: 0.15,
            ease: "power2.out",
          }, 0);

        nodeTimelines[id] = pulseTl;
      };

      const resetNodeStates = () => {
        Object.keys(nodeGlowed).forEach((id) => {
          nodeGlowed[id] = false;
        });
      };

      // ─── Single progress value that drives EVERYTHING ───
      const progress = { value: 0 };

      const clampLength = (val) => Math.max(0, Math.min(val, totalLength));

      const updateAll = () => {
        const currentLength = progress.value;

        // 1) Position the orb trail along the path
        orbEls.forEach((el, index) => {
          const trailLength = clampLength(currentLength - trailOffsets[index]);
          const p = pathEl.getPointAtLength(trailLength);
          if (!el || !p) return;

          gsap.set(el, {
            x: p.x,
            y: p.y,
            xPercent: -50,
            yPercent: -50,
            opacity: index === 0 ? 1 : 0.85 - index * 0.12,
            scale: 1 - index * 0.06,
          });
        });

        // 2) Reveal the line to match the orb position exactly
        gsap.set(pathEl, {
          strokeDashoffset: totalLength - currentLength,
        });

        // 3) Check if the orb has reached each VISIBLE node and trigger its glow
        PATH_SEQUENCE.forEach((id) => {
          if (id === "hero-red-dot") return;
          if (id.startsWith("wp-")) return; // Skip invisible waypoints
          if (!nodeThresholds[id]) return;

          const nodeLength = nodeThresholds[id] * totalLength;
          if (currentLength >= nodeLength - NODE_GLOW_RADIUS) {
            glowNode(id);
          }
        });
      };

      // ─── Red dot position for burst effects ───
      const dotPos = activeDot
        ? {
          x:
            dotPoint.left -
            containerRef.current.getBoundingClientRect().left +
            dotPoint.width / 2,
          y:
            dotPoint.top -
            containerRef.current.getBoundingClientRect().top +
            dotPoint.height / 2,
        }
        : { x: 0, y: 0 };

      gsap.set(".red-dot-ripple", {
        x: dotPos.x,
        y: dotPos.y,
        xPercent: -50,
        yPercent: -50,
        scale: 0.5,
        opacity: 0,
      });

      gsap.set(".red-dot-burst", {
        x: dotPos.x,
        y: dotPos.y,
        xPercent: -50,
        yPercent: -50,
        scale: 0,
        opacity: 0,
      });

      // ─── Initial state ───
      gsap.set(pathEl, {
        strokeDasharray: totalLength,
        strokeDashoffset: totalLength,
        opacity: 1,
      });

      gsap.set(".energy-orb-group", { opacity: 0, scale: 0 });

      // Continuous ambient rotation
      gsap.to(".hub-inner-ring", {
        rotation: 360,
        duration: 18,
        ease: "none",
        repeat: -1,
      });

      // ─── Master timeline ───
      const BURST_START = TRAVEL_START + TRAVEL_DURATION;
      const BURST_DURATION = 1.4;

      const tl = gsap.timeline({
        repeat: -1,
        repeatDelay: 1.15,
        defaults: { ease: "none" },
        onRepeat: () => {
          resetNodeStates();
          progress.value = 0;
          gsap.set(pathEl, { strokeDashoffset: totalLength, opacity: 1 });
          gsap.set(".energy-orb-group", { opacity: 0, scale: 0 });
        },
      });

      // Phase 1: Intro — first node glows, orbs fade in
      tl.to("#hub-strategy .hub-core", {
        backgroundColor: "#ffffff",
        boxShadow: "0 0 15px rgba(255,255,255,0.95)",
        duration: INTRO_DURATION,
        ease: "power2.out",
      }, 0)
        .to("#hub-strategy .hub-label", { color: "#ffffff", duration: INTRO_DURATION, ease: "power2.out" }, 0)
        .to("#hub-strategy .hub-glow", { opacity: 1, duration: INTRO_DURATION, ease: "power2.out" }, 0)
        .to(".energy-orb-group", {
          opacity: 1,
          scale: 1,
          duration: 0.35,
          stagger: 0.04,
          ease: "power2.out",
        }, 0.05);

      // Phase 2: THE SINGLE PROGRESS TWEEN — drives orb, line, and node glows
      tl.to(progress, {
        value: totalLength,
        duration: TRAVEL_DURATION,
        ease: "power1.inOut",
        onUpdate: updateAll,
      }, TRAVEL_START);

      // Phase 3: End burst — exactly when progress reaches the end
      tl.to("#hero-red-dot", {
        scale: 1.35,
        color: "#ffffff",
        textShadow: "0 0 24px #FF2D2D, 0 0 48px #FF2D2D",
        duration: 0.12,
        ease: "power2.out",
      }, BURST_START)
        .to(".red-dot-ripple", {
          scale: 3,
          opacity: 1,
          border: "2px solid rgba(255,45,45,0.82)",
          duration: 0.12,
          ease: "power2.out",
        }, BURST_START)
        .to(".red-dot-burst", {
          scale: 2,
          opacity: 1,
          boxShadow: "0 0 50px 18px rgba(255,45,45,0.28)",
          duration: 0.12,
          ease: "power2.out",
        }, BURST_START)
        // Burst fade-out
        .to("#hero-red-dot", {
          scale: 1,
          color: "#FF2D2D",
          textShadow: "none",
          duration: 1.2,
          ease: "power1.inOut",
        }, BURST_START + 0.12)
        .to(".red-dot-ripple", {
          scale: 5.5,
          opacity: 0,
          border: "1px solid rgba(255,45,45,0)",
          duration: 1.2,
          ease: "power1.inOut",
        }, BURST_START + 0.12)
        .to(".red-dot-burst", {
          scale: 4,
          opacity: 0,
          boxShadow: "0 0 0px 0px rgba(255,45,45,0)",
          duration: 1.0,
          ease: "power1.inOut",
        }, BURST_START + 0.12)
        // Fade out line and orbs
        .to(pathEl, { opacity: 0, duration: 0.9, ease: "power1.inOut" }, BURST_START + 0.05)
        .to(".energy-orb-group", { opacity: 0, scale: 0, duration: 0.5, ease: "power1.inOut" }, BURST_START + 0.05)
        // Fade out all nodes
        .to(".hub-core", {
          backgroundColor: "rgba(255,255,255,0.3)",
          boxShadow: "0 0 8px rgba(255,255,255,0)",
          duration: 1.0,
          ease: "power1.inOut",
        }, BURST_START + 0.12)
        .to(".hub-glow", {
          opacity: 0,
          duration: 1.0,
          ease: "power1.inOut",
        }, BURST_START + 0.12)
        .to(".hub-label", {
          color: "rgba(255,255,255,0.3)",
          duration: 1.0,
          ease: "power1.inOut",
        }, BURST_START + 0.12);

      // Initial position
      updateAll();
    }, containerRef);

    return () => {
      if (ctxRef.current) {
        ctxRef.current.revert();
        ctxRef.current = null;
      }
    };
  }, [mainPath]);

  return (
    <motion.div
      ref={containerRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden"
    >
      <AmbientDust />

      <motion.div
        className="absolute inset-0 w-full h-full"
        style={{ x: mouseX, y: mouseY }}
      >
        <svg
          ref={svgRef}
          className="absolute inset-0 w-full h-full pointer-events-none"
          width={dimensions.w}
          height={dimensions.h}
        >
          <defs>
            <filter id="glow-blur">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            <linearGradient id="streak-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="transparent" />
              <stop offset="55%" stopColor="#FF6A6A" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#ffffff" />
            </linearGradient>

            <style>{`
              @keyframes dataFlow {
                from { stroke-dashoffset: 200; }
                to { stroke-dashoffset: 0; }
              }
            `}</style>
          </defs>

          {/* Geometric Background Rings centered on the Red Dot */}
          {dotCoords && (
            <g opacity="0.4">
              <circle cx={dotCoords.x} cy={dotCoords.y} r="250" fill="none" stroke="rgba(255,255,255,0.015)" strokeWidth="1" strokeDasharray="2 8" />
              <circle cx={dotCoords.x} cy={dotCoords.y} r="450" fill="none" stroke="rgba(255,255,255,0.01)" strokeWidth="1" strokeDasharray="1 15" />
              <circle cx={dotCoords.x} cy={dotCoords.y} r="650" fill="none" stroke="rgba(255,255,255,0.01)" strokeWidth="1" />
            </g>
          )}

          {meshPaths.map((d, i) => {
            const isDashed = i % 3 === 0;
            const isAnimated = i % 4 === 0;
            return (
              <path
                key={`mesh-${i}`}
                d={d}
                fill="none"
                stroke={i % 2 === 0 ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.1)"}
                strokeWidth={isAnimated ? 1.2 : 1}
                strokeDasharray={isDashed || isAnimated ? "4 12" : "0"}
                style={isAnimated ? { animation: `dataFlow ${20 + i * 2}s linear infinite` } : {}}
                opacity={0.9}
              />
            );
          })}

          <path
            d={mainPath}
            fill="none"
            stroke="rgba(255,255,255,0.2)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          <path
            ref={pathRef}
            id="main-network-path"
            d={mainPath}
            fill="none"
            stroke="url(#streak-gradient)"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#glow-blur)"
          />
        </svg>

        {/* Only render the 8 VISIBLE nodes — waypoints have no DOM */}
        {NODE_LAYOUT.map((node) => (
          <EngineeringHub
            key={node.id}
            id={node.id}
            label={node.label}
            x={node.x}
            y={node.y}
            labelPos={node.labelPos}
          />
        ))}

        <div className="energy-orb-group absolute top-0 left-0 w-3 h-3 rounded-full bg-white shadow-[0_0_15px_3px_rgba(255,255,255,0.92),0_0_30px_rgba(255,45,45,0.6)] z-20 -ml-1.5 -mt-1.5" />
        <div className="energy-orb-group absolute top-0 left-0 w-2.5 h-2.5 rounded-full bg-white/70 blur-[1px] z-10 -ml-1.25 -mt-1.25" />
        <div className="energy-orb-group absolute top-0 left-0 w-2 h-2 rounded-full bg-white/55 blur-[2px] z-10 -ml-1 -mt-1" />
        <div className="energy-orb-group absolute top-0 left-0 w-1.5 h-1.5 rounded-full bg-[#FF2D2D]/50 blur-[3px] z-10 -ml-0.75 -mt-0.75" />
        <div className="energy-orb-group absolute top-0 left-0 w-1 h-1 rounded-full bg-[#FF2D2D]/30 blur-[4px] z-10 -ml-0.5 -mt-0.5" />
      </motion.div>

      <div className="red-dot-ripple absolute top-0 left-0 w-12 h-12 rounded-full pointer-events-none z-0" />
      <div className="red-dot-burst absolute top-0 left-0 w-24 h-24 rounded-full pointer-events-none z-0" />
    </motion.div>
  );
};

export default HeroMachineOverlay;