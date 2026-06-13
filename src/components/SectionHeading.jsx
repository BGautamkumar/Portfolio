import { motion } from "framer-motion";

/**
 * SectionHeading — Consistent cinematic section header.
 * Number, label, divider line, and heading.
 */
const SectionHeading = ({ number, label, title, className = "", theme = "dark" }) => {
  const isLight = theme === "light";
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      viewport={{ once: false, amount: 0.2 }}
      className={`mb-16 md:mb-24 ${className}`}
    >
      {/* Number + Label row */}
      <div className="flex items-center gap-4 mb-6">
        {number && (
          <span className={`font-mono text-[11px] tracking-[0.2em] font-medium ${isLight ? 'text-black/40' : 'text-white/20'}`}>
            {number}
          </span>
        )}
        <div className={`w-8 h-px ${isLight ? 'bg-black/10' : 'bg-white/10'}`} />
        {label && (
          <span className={`text-[11px] font-semibold tracking-[0.25em] uppercase ${isLight ? 'text-black/50' : 'text-white/30'}`}>
            {label}
          </span>
        )}
      </div>

      {/* Main heading */}
      {title && (
        <h2 className={`font-['Clash_Display'] text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.1] ${isLight ? 'text-black' : 'text-white'}`}>
          {title}
        </h2>
      )}
    </motion.div>
  );
};

export default SectionHeading;
