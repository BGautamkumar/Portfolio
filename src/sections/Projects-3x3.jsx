import React from "react";
import { motion } from "framer-motion";
import ParticlesOverlay from "../components/ParticlesOverlay";
import { useState, useRef } from "react";
import { myProjects } from "../constants";

const ProjectCard3D = ({ project, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50, rotateX: 15, z: -100 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0, z: 0 }}
      transition={{ duration: 0.8, delay: index * 0.15, type: "spring" }}
      viewport={{ once: true }}
      whileHover={{ 
        scale: 1.08,
        rotateX: -8,
        rotateY: 8,
        z: 80,
        transition: { duration: 0.4, type: "spring" }
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative group cursor-pointer"
      style={{ 
        transformStyle: "preserve-3d",
        perspective: 1000
      }}
    >
      {/* 3D Card Container */}
      <div className="card-premium relative overflow-hidden" style={{ transformStyle: "preserve-3d" }}>
        
        {/* Animated Background Layer */}
        <motion.div
          animate={{
            background: isHovered
              ? "linear-gradient(135deg, rgba(0, 102, 255, 0.15), transparent)"
              : "linear-gradient(135deg, rgba(0, 102, 255, 0.05), transparent)"
          }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
        />
        
        {/* Floating Particles */}
        {isHovered && [...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-accent rounded-full"
            initial={{ opacity: 0 }}
            animate={{
              x: [0, Math.random() * 100 - 50],
              y: [0, -Math.random() * 50 - 20],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 2 + i * 0.3,
              ease: "easeOut"
            }}
            style={{
              top: `${20 + Math.random() * 60}%`,
              left: `${10 + Math.random() * 80}%`,
            }}
          />
        ))}

        {/* Project Image - Top Section */}
        {project.image && (
          <motion.div
            initial={{ opacity: 0, y: 20, rotateX: 15 }}
            animate={{ 
              opacity: isHovered ? 1 : 0.9,
              y: isHovered ? 0 : 10,
              rotateX: isHovered ? 0 : 10
            }}
            transition={{ duration: 0.4 }}
            className="relative h-48 overflow-hidden rounded-t-2xl mb-6"
            style={{ transformStyle: "preserve-3d" }}
          >
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          </motion.div>
        )}
        {/* Project Content - Below Image */}
        <div className="relative z-10 px-2">
          {/* 3D Header */}
          <motion.div 
            className="flex items-start justify-between mb-4"
            style={{ transformStyle: "preserve-3d" }}
          >
            <div className="flex-1">
              <motion.h3 
                className="text-title text-white mb-2 text-sm"
                whileHover={{ scale: 1.02, z: 10 }}
                transition={{ duration: 0.3 }}
              >
                <span className="relative">
                  <span className="absolute inset-0 bg-accent/20 blur-xl -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  {project.title}
                </span>
              </motion.h3>
              <motion.p 
                className="text-body leading-relaxed text-xs"
                animate={{ x: isHovered ? 5 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {project.description}
              </motion.p>
            </div>
            
            {/* 3D Arrow */}
            <motion.div
              animate={{ 
                rotate: isHovered ? 45 : 0,
                scale: isHovered ? 1.1 : 1,
                z: isHovered ? 20 : 0
              }}
              transition={{ duration: 0.3, type: "spring" }}
              className="w-8 h-8 bg-accent/10 border border-accent/30 rounded-lg flex items-center justify-center shrink-0"
              style={{ transformStyle: "preserve-3d" }}
            >
              <svg className="w-4 h-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </motion.div>
          </motion.div>

          {/* 3D Features List */}
          <motion.div 
            className="space-y-2 mb-4"
            style={{ transformStyle: "preserve-3d" }}
          >
            {project.subDescription.slice(0, 2).map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20, z: -50 }}
                whileInView={{ opacity: 1, x: 0, z: 0 }}
                transition={{ delay: 0.3 + idx * 0.1, duration: 0.3 }}
                viewport={{ once: true }}
                className="flex items-start gap-2"
                whileHover={{ x: 5, z: 10 }}
              >
                <motion.div
                  animate={{
                    scale: isHovered ? [1, 1.2, 1] : 1,
                    rotateZ: isHovered ? 360 : 0
                  }}
                  transition={{ 
                    scale: { duration: 0.5, repeat: isHovered ? Infinity : 0 },
                    rotateZ: { duration: 2, repeat: isHovered ? Infinity : 0, ease: "linear" }
                  }}
                  className="w-1.5 h-1.5 bg-accent rounded-full mt-1 shrink-0"
                />
                <p className="text-caption text-neutral-300 leading-relaxed text-xs">
                  {feature}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* 3D Tech Stack */}
          <motion.div 
            className="pt-3 border-t border-neutral/20"
            style={{ transformStyle: "preserve-3d" }}
          >
            <div className="flex flex-wrap gap-1.5">
              {project.tags.slice(0, 3).map((tag, tagIdx) => (
                <motion.span
                  key={tag.id}
                  initial={{ opacity: 0, scale: 0, rotateY: -180 }}
                  whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
                  transition={{ delay: 0.5 + tagIdx * 0.05 }}
                  viewport={{ once: true }}
                  whileHover={{ 
                    scale: 1.1, 
                    rotateY: 15,
                    z: 20,
                    transition: { duration: 0.2 }
                  }}
                  className="px-2 py-1 bg-slate/50 border border-neutral/30 rounded-full text-xs text-neutral-300 backdrop-blur-sm"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  {tag.name}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>

        {/* 3D Glow Effect */}
        <motion.div
          animate={{
            opacity: isHovered ? 1 : 0,
            scale: isHovered ? 1.1 : 0.9
          }}
          transition={{ duration: 0.4 }}
          className="absolute inset-0 bg-accent/5 rounded-2xl blur-xl -z-10"
        />
      </div>
    </motion.div>
  );
};

const Projects = () => {
  const sectionRef = useRef(null);

  return (
    <section id="projects" ref={sectionRef} className="relative overflow-hidden py-16 lg:py-20">
      {/* Particles Overlay */}
      <ParticlesOverlay />
      
      {/* 3D Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            rotate: 360,
            scale: [1, 1.1, 1],
          }}
          transition={{
            rotate: { duration: 30, repeat: Infinity, ease: "linear" },
            scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
          }}
          className="absolute top-32 left-20 w-80 h-80"
        >
          <div className="w-full h-full bg-gradient-to-br from-accent/3 to-transparent rounded-full blur-3xl" />
        </motion.div>
        
        <motion.div
          animate={{
            rotate: -360,
            y: [0, 30, 0],
          }}
          transition={{
            rotate: { duration: 35, repeat: Infinity, ease: "linear" },
            y: { duration: 6, repeat: Infinity, ease: "easeInOut" }
          }}
          className="absolute bottom-20 right-32 w-96 h-96"
        >
          <div className="w-full h-full bg-gradient-to-tr from-accent/2 to-transparent rounded-full blur-3xl" />
        </motion.div>
      </div>

      <div className="container-premium relative z-10">
        {/* Premium Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40, rotateX: 20 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 1.2, type: "spring" }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <motion.h2 
            className="text-headline mb-4 relative"
            style={{ transformStyle: "preserve-3d" }}
          >
            <span className="relative">
              <span className="absolute inset-0 bg-gradient-to-r from-purple-600/30 to-cyan-600/30 blur-xl" />
              <span className="relative bg-gradient-to-r from-purple-300 via-cyan-300 to-blue-300 bg-clip-text text-transparent">
                Featured Projects
              </span>
            </span>
          </motion.h2>
          <div className="w-70 h-1 bg-gradient-to-r from-transparent via-neutral-600 to-transparent mx-auto mb-8" />
          <motion.p 
            className="text-body max-w-3xl mx-auto text-lg leading-relaxed"
            whileInView={{ y: [20, 0], opacity: [0, 1] }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            World-class applications engineered with cutting-edge technologies, 
            showcasing advanced architecture and exceptional user experiences.
          </motion.p>
        </motion.div>

        {/* 3D Projects Grid - 3x3 Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {myProjects.map((project, index) => (
            <ProjectCard3D key={project.id} project={project} index={index} />
          ))}
        </div>

        {/* CTA Button with Animated Gradient Text */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, type: "spring" }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <motion.a
            href="#contact"
            className="relative inline-block group px-8 py-4 rounded-full font-medium backdrop-blur-lg bg-white/10 border border-white/20 text-white hover:bg-white/20 hover:border-white/30 hover:shadow-[0_0_30px_rgba(139,92,246,0.3)] transition-all duration-300"
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
            <span className="relative z-10">Let's Build Something Together</span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 opacity-0 group-hover:opacity-100 rounded-full"
              transition={{ duration: 0.3 }}
            />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
