"use client";
import { motion } from "framer-motion";
import React from "react";

const ExperienceCard = ({ experience, index, isLast }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50, z: -50 }}
      whileInView={{ opacity: 1, x: 0, z: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      className={`relative ${!isLast ? 'mb-16' : ''}`}
      whileHover={{ 
        scale: 1.02, 
        rotateY: 5,
        z: 20
      }}
      style={{ transformStyle: "preserve-3d" }}
    >
      {/* Timeline Line */}
      {!isLast && (
        <div className="absolute left-6 top-16 w-0.5 h-full bg-gradient-to-b from-purple-500/20 to-transparent" />
      )}

      <div className="flex gap-8">
        {/* Timeline Dot */}
        <div className="relative shrink-0">
          <motion.div
            whileHover={{ scale: 1.2 }}
            className="w-12 h-12 backdrop-blur-lg bg-white/10 border border-white/20 rounded-full flex items-center justify-center border-4 border-white/10 hover:shadow-[0_0_30px_rgba(139,92,246,0.3)]"
          >
            <div className="w-3 h-3 bg-gradient-to-r from-purple-400 to-cyan-400 rounded-full" />
          </motion.div>
        </div>

        {/* Experience Content */}
        <div className="flex-1 min-w-0">
          {/* Date Badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-block mb-4"
          >
            <span className="px-3 py-1 backdrop-blur-lg bg-white/10 border border-white/20 rounded-full text-purple-300 text-sm font-medium">
              {experience.date}
            </span>
          </motion.div>

          {/* Title and Company */}
          <h3 className="text-title text-white mb-2">
            {experience.title}
          </h3>
          <p className="text-body text-cyan-300 mb-6">
            {experience.job}
          </p>

          {/* Achievements */}
          <div className="space-y-3">
            {experience.contents.map((content, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + idx * 0.1 }}
                className="flex items-start gap-3"
              >
                <div className="w-1.5 h-1.5 bg-gradient-to-r from-purple-400 to-cyan-400 rounded-full mt-2 shrink-0" />
                <p className="text-caption text-neutral-300 leading-relaxed">
                  {content}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export const Timeline = ({ data }) => {
  return (
    <section id="experience" className="relative overflow-hidden py-12 lg:py-16">
      <div className="container-premium">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-headline mb-4 relative">
            <span className="relative">
              <span className="absolute inset-0 bg-gradient-to-r from-purple-600/30 to-cyan-600/30 blur-xl" />
              <span className="relative bg-gradient-to-r from-purple-300 via-cyan-300 to-blue-300 bg-clip-text text-transparent">
                Professional Experience
              </span>
            </span>
          </h2>
          <div className="w-70 h-1 bg-gradient-to-r from-transparent via-neutral-600 to-transparent mx-auto mb-8" />
          <p className="text-body max-w-2xl mx-auto">
            My journey through different roles and industries, building expertise 
            in software development and system architecture.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="max-w-4xl mx-auto">
          {data.map((experience, index) => (
            <ExperienceCard
              key={index}
              experience={experience}
              index={index}
              isLast={index === data.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};