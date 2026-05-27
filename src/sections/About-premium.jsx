import React, { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { skills } from "../constants";

const SkillTag = ({ skill, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, z: -50 }}
      whileInView={{ opacity: 1, scale: 1, z: 0 }}
      transition={{ 
        duration: 0.5,
        delay: index * 0.05,
        ease: [0.16, 1, 0.3, 1]
      }}
      viewport={{ once: true }}
      className="w-16 h-16 backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl flex items-center justify-center hover:border-white/30 hover:bg-white/20 hover:shadow-[0_0_30px_rgba(139,92,246,0.3)] transition-all duration-300 group"
      title={skill.name}
      whileHover={{ 
        scale: 1.1, 
        rotateY: 10,
        z: 20
      }}
      style={{ transformStyle: "preserve-3d" }}
    >
      <img 
        src={skill.logo} 
        alt={skill.name}
        className="w-8 h-8 object-contain transition-all duration-300"
      />
    </motion.div>
  );
};

const EngineeringCapability = ({ capability, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, z: -50 }}
      whileInView={{ opacity: 1, y: 0, z: 0 }}
      transition={{ 
        duration: 0.8,
        delay: index * 0.15,
        ease: [0.16, 1, 0.3, 1]
      }}
      viewport={{ once: true, margin: "-100px" }}
      className="group relative"
      whileHover={{ 
        scale: 1.02, 
        rotateY: 5,
        z: 20
      }}
      style={{ transformStyle: "preserve-3d" }}
    >
      {/* Subtle gradient border */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/20 to-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Main card */}
      <div className="relative backdrop-blur-lg bg-white/10 rounded-2xl border border-white/20 p-8 transition-all duration-300 group-hover:bg-white/15 group-hover:border-white/30 group-hover:shadow-[0_0_30px_rgba(139,92,246,0.3)]">
        
        {/* Subtle glow effect on hover */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Content */}
        <div className="relative z-10">
          <h3 className="text-xl font-light text-white/90 tracking-wide group-hover:text-white transition-colors duration-300">
            {capability}
          </h3>
          
          {/* Subtle underline that expands on hover */}
          <div className="mt-3 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent group-hover:from-purple-400/50 group-hover:via-cyan-400 group-hover:to-purple-400/50 transition-all duration-500 group-hover:w-full w-0" />
        </div>
      </div>
    </motion.div>
  );
};

const About = () => {
  const sectionRef = useRef(null);
  const [activeTab, setActiveTab] = useState('skills');

  const engineeringCapabilities = [
    "System Architecture & Design",
    "Performance Optimization", 
    "Scalable Infrastructure",
    "Full-Stack Development",
    "Cloud Native Solutions",
    "API Design & Integration"
  ];

  return (
    <section id="about" ref={sectionRef} className="min-h-screen relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Minimal section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="pt-20 pb-16 text-center"
        >
          <h2 className="text-headline mb-4 relative">
            <span className="relative">
              <span className="absolute inset-0 bg-gradient-to-r from-purple-600/30 to-cyan-600/30 blur-xl" />
              <span className="relative bg-gradient-to-r from-purple-300 via-cyan-300 to-blue-300 bg-clip-text text-transparent">
                About Me
              </span>
            </span>
          </h2>
          <div className="w-70 h-1 bg-gradient-to-r from-transparent via-neutral-600 to-transparent mx-auto mb-8" />
          <p className="text-lg text-neutral-300 max-w-5xl mx-auto mb-8 leading-relaxed">
            I'm a systems-focused full-stack developer passionate about building scalable and secure applications. My work spans real-time messaging systems, backend services with Spring Boot and Kafka, and modern React-based interfaces.
          </p>
          <p className="text-lg text-neutral-300 max-w-5xl mx-auto mb-8 leading-relaxed">
            I approach development with an engineering mindset — prioritizing clean architecture, maintainability, and performance. Whether designing APIs, optimizing database queries, or crafting intuitive UI components, I focus on delivering solutions that are both robust and user-centric.
          </p>
          <p className="text-lg text-neutral-300 max-w-5xl mx-auto mb-12 leading-relaxed">
            I'm particularly interested in distributed systems, real-time communication, and production-ready software design.
          </p>
        </motion.div>

        {/* Tabbed Interface */}
        <div className="pb-32">
          {/* Tab Headers */}
          <div className="flex justify-center mb-16">
            <div className="relative inline-flex items-center">
              {/* Glowing background effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 via-blue-600/20 to-cyan-600/20 rounded-full blur-3xl scale-150" />
              
              {/* Main container */}
              <div className="relative bg-gradient-to-br from-slate-900/90 via-slate-800/80 to-slate-900/90 border border-white/40 rounded-full p-1 backdrop-blur-2xl shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent rounded-full" />
                
                <button
                  onClick={() => setActiveTab('skills')}
                  className={`relative px-12 py-5 rounded-full font-bold text-lg transition-all duration-700 transform-gpu mr-6 border-2 ${
                    activeTab === 'skills'
                      ? 'border-white bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 text-white shadow-2xl scale-110'
                      : 'border-white/60 text-neutral-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span className="relative z-20 tracking-wide">Skills</span>
                  {activeTab === 'skills' && (
                    <>
                      <motion.div
                        layoutId="activeTab"
                        className="absolute inset-0 bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 rounded-full shadow-2xl -m-2"
                        initial={false}
                        transition={{ type: "spring", bounce: 0.3, duration: 0.8 }}
                      />
                      {/* Animated glow effect */}
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute inset-0 bg-gradient-to-r from-purple-600/30 via-blue-600/30 to-cyan-600/30 rounded-full blur-xl -m-2"
                      />
                    </>
                  )}
                </button>
                
                <button
                  onClick={() => setActiveTab('engineering')}
                  className={`relative px-12 py-5 rounded-full font-bold text-lg transition-all duration-700 transform-gpu ml-6 border-2 ${
                    activeTab === 'engineering'
                      ? 'border-white bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 text-white shadow-2xl scale-110'
                      : 'border-white/60 text-neutral-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span className="relative z-20 tracking-wide">Engineering Excellence</span>
                  {activeTab === 'engineering' && (
                    <>
                      <motion.div
                        layoutId="activeTab"
                        className="absolute inset-0 bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 rounded-full shadow-2xl -m-2"
                        initial={false}
                        transition={{ type: "spring", bounce: 0.3, duration: 0.8 }}
                      />
                      {/* Animated glow effect */}
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute inset-0 bg-gradient-to-r from-purple-600/30 via-blue-600/30 to-cyan-600/30 rounded-full blur-xl -m-2"
                      />
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Tab Content */}
          <AnimatePresence mode="wait">
            {activeTab === 'skills' && (
              <motion.div
                key="skills"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className="max-w-6xl mx-auto"
              >
                <div className="flex flex-wrap gap-3 justify-center max-w-6xl mx-auto">
                  {skills.map((skill, index) => (
                    <SkillTag
                      key={skill.name}
                      skill={skill}
                      index={index}
                    />
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'engineering' && (
              <motion.div
                key="engineering"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="max-w-4xl mx-auto"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {engineeringCapabilities.map((capability, index) => (
                    <EngineeringCapability
                      key={capability}
                      capability={capability}
                      index={index}
                    />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Subtle footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          viewport={{ once: true }}
          className="pb-16 text-center"
        >
          <p className="text-sm font-light text-neutral-500 tracking-widest uppercase">
            Building with precision and purpose
          </p>
        </motion.div>
      </div>
    </section>
  );
};
export default About;
