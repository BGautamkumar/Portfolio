import React, { useEffect } from "react";
import { myProjects } from "../constants";
const AllProjects = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="relative min-h-screen bg-[#050508] text-white pt-[260px] pb-24 font-sans" style={{ marginBottom: '10vh', marginTop: '15vh' }}>
      <div className="container-cinematic">

        {/* Header Section */}
        <div className="mb-20 lg:mb-24 flex flex-col lg:flex-row justify-between items-start w-full gap-10 mt-20">

          {/* Left Side */}
          <div className="flex flex-col flex-1 max-w-[600px]" style={{ marginBottom: '8vh' }}>
            <span className="text-[12px] font-medium tracking-[0.2em] uppercase text-[#7a7a85] mb-6">
              PORTFOLIO
            </span>
            <h1 className="font-['Clash_Display'] text-[50px] md:text-[64px] lg:text-[60px] font-bold text-white uppercase leading-[0.9] tracking-tight mb-8" >
              DISCOVER<br />MY PROJECTS
            </h1>

          </div>

          {/* Right Side */}
          <div className="flex flex-col flex-1 max-w-[480px] lg:mt-[50px]">
            <p className="text-[15px] lg:text-[17px] text-[#90909A] leading-[1.8] font-light mb-8">
              Those that hit the mark, those that rained, those that sold, those that convinced, those that may inspire you.
            </p>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {myProjects.map((project) => (
            <div
              key={project.id}
              className="bg-[#111115] rounded-2xl overflow-hidden group transition-colors flex flex-col"
            >
              {/* Image Container */}
              <div className="relative w-full aspect-[16/10] overflow-hidden">
                {project.image && (
                  <img
                    src={project.image}
                    alt={project.title}
                    className="block w-full h-full object-cover transition-transform duration-800 group-hover:scale-105"
                  />
                )}
              </div>

              {/* Text Container */}
              <div className="px-8 sm:px-12 lg:px-16 py-10 lg:py-12 flex flex-col grow">
                <div className="relative mb-6 min-h-[48px]">
                  <h3 className="px-14 text-center text-[24px] font-normal text-white transition-colors leading-tight">
                    {project.title}
                  </h3>

                  {/* Arrow Button */}
                  <a
                    href={project.href || project.github || "#"}
                    target="_blank"
                    rel="noreferrer"
                    className="absolute right-0 top-0 shrink-0 w-10 h-10 rounded-2xl border border-white/10 flex items-center justify-center transition-all duration-300 group-hover:bg-white group-hover:border-white group-hover:text-black z-10"
                  >
                    <svg className="w-[18px] h-[18px] text-white/80 group-hover:text-black transition-colors" fill="none" stroke="currentColor" strokeWidth={1} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                    </svg>
                  </a>
                </div>

                <div className="px-4 sm:px-8 flex flex-col grow">
                  <p className="text-[15px] text-[#90909A] font-medium leading-[1.8] mb-6 ">
                    {project.description}
                  </p>

                  {/* Project Bullet Points */}
                  {project.subDescription && project.subDescription.length > 0 && (
                    <div className="mb-8 bg-white/[0.02] border border-white/[0.04] rounded-2xl p-6 sm:p-8 flex-grow">
                      <ul className="pl-0 space-y-3 text-[14.5px] text-[#8a8a95] font-light leading-[1.8]">
                        {project.subDescription.map((bullet, idx) => (
                          <li key={idx}>
                            {bullet}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Project Tags */}
                  {project.tags && project.tags.length > 0 && (
                    <div className="mt-auto pt-6 border-t border-white/5 flex flex-wrap gap-6 justify-center">
                      {project.tags.map((tag) => (
                        <div
                          key={tag.id}
                          className="flex items-center gap-1.5 px-4 py-2 text-[11px] font-medium text-[#8a8a95] uppercase tracking-wider hover:bg-white/[0.08] hover:border-white/[0.15] hover:text-white transition-all duration-300"
                        >
                          {tag.path && (
                            <img
                              src={tag.path}
                              alt={tag.name}
                              className="w-4 h-4 object-contain"
                              onError={(e) => {
                                e.target.style.display = 'none';
                              }}
                            />
                          )}
                          {tag.name && <span>{tag.name}</span>}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </main>
  );
};

export default AllProjects;
