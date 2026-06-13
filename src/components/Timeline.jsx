const TimelineEntry = ({ experience }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-y-8 md:gap-y-0 pt-12 pb-20 md:pt-16 md:pb-28 border-t border-black/8 group">
      {/* Left Column: Date & Company */}
      <div className="md:col-span-4 pr-4">
        <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-black/40 block mb-2 transition-colors duration-500 group-hover:text-black/60">
          {experience.date}
        </span>
        <h4 className="font-['Clash_Display'] text-lg md:text-xl font-medium text-black transition-colors duration-500">
          {experience.company}
        </h4>
      </div>

      {/* Center Column: Dot */}
      <div className="hidden md:flex justify-center items-start pt-3 md:col-span-1">
        <div className="w-1.5 h-1.5 rounded-full bg-black/20 transition-all duration-300 group-hover:bg-black" />
      </div>

      {/* Right Column: Title & Description */}
      <div className="md:col-span-7">
        <h3 className="font-['Clash_Display'] text-xl md:text-2xl font-medium text-black mb-5 tracking-tight">
          {experience.title}
        </h3>

        <div className="space-y-3.5">
          {experience.contents.map((content, idx) => (
            <div
              key={idx}
              className="flex items-start gap-3"
            >
              {/* Minimal bullet */}
              <span className="text-black/30 text-[13px] md:text-sm mt-0.5 leading-relaxed shrink-0">
                •
              </span>
              <p className="text-[13px] md:text-sm text-black/60 leading-relaxed max-w-2xl">
                {content}
              </p>
            </div>
          ))}
        </div>

        {/* Explicit massive gap spacer to guarantee distance before the next entry */}
        <div className="h-16 md:h-32 " style={{ marginTop: '-10vh' }}></div>
      </div>
    </div>
  );
};

export const Timeline = ({ data }) => {
  return (
    <div className="relative w-full">
      {data.map((experience, index) => (
        <TimelineEntry key={index} experience={experience} />
      ))}
    </div>
  );
};

export default Timeline;