import React, { useState } from 'react';
import { BiLinkExternal, BiFolder, BiImage } from 'react-icons/bi';
import useInViewAnimate from '../../hooks/useInViewAnimate';

function PortfolioGrid({ content }) {
  const [ref, visible] = useInViewAnimate({ threshold: 0.15 });
  const [activeFilter, setActiveFilter] = useState('All');

  const tagline = content?.tagline || 'Recent Projects';
  const title = content?.title || 'Work That Moves Brands Forward';
  const description = content?.description || 'Explore a selection of my recent web development and marketing design projects...';
  const projects = content?.projects || [];

  // Extract categories dynamically from projects list
  const categories = ['All', ...new Set(projects.map((p) => p.category || 'Other'))];

  const filteredProjects = activeFilter === 'All'
    ? projects
    : projects.filter((p) => p.category === activeFilter);

  return (
    <section 
      ref={ref} 
      className="py-20 px-4 sm:px-6 lg:px-12 bg-[#0a0f1d] text-white relative overflow-hidden border-t border-slate-800/80"
      aria-labelledby="portfolio-heading"
    >
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10 space-y-12">
        
        {/* Header */}
        <div className={`text-center space-y-4 max-w-2xl mx-auto transition-all duration-1000 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="inline-block text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-blue-400 bg-blue-500/10 border border-blue-500/20 px-4 py-1.5 rounded-full">
            {tagline}
          </span>
          <h2 id="portfolio-heading" className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            {title}
          </h2>
          <p className="text-slate-300 leading-relaxed text-base sm:text-lg font-normal">
            {description}
          </p>
        </div>

        {/* Filter Buttons */}
        <div className={`flex flex-wrap justify-center gap-3 transition-all duration-1000 delay-100 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`text-xs sm:text-sm font-semibold px-5 py-2.5 rounded-xl border transition-all duration-200 ${
                activeFilter === cat
                  ? 'bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-600/20'
                  : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className={`grid grid-cols-1 md:grid-cols-2 gap-8 transition-all duration-1000 delay-200 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {filteredProjects.map(({ id, image, title, description, label, href, isExternal }, index) => (
            <a
              key={id || index}
              href={href || '#'}
              target={isExternal ? '_blank' : '_self'}
              rel={isExternal ? 'noopener noreferrer' : ''}
              className="group bg-slate-900/40 border border-slate-800/80 hover:border-blue-500/30 rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1.5 shadow-xl hover:shadow-blue-500/5 backdrop-blur-sm flex flex-col justify-between"
            >
              <div className="relative overflow-hidden bg-slate-950 aspect-[16/10]">
                <img
                  src={image}
                  alt={title}
                  loading="lazy"
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/600x400/1e293b/ffffff?text=Preview+Unavailable';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1d] via-transparent to-transparent opacity-80" />
                
                {label && (
                  <span className="absolute top-4 left-4 text-[11px] font-semibold uppercase tracking-wider bg-slate-950/80 border border-slate-800 text-blue-400 px-3 py-1 rounded-lg backdrop-blur-md">
                    {label}
                  </span>
                )}
              </div>

              <div className="p-6 sm:p-8 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-blue-400 transition-colors duration-200">
                    {title}
                  </h3>
                  <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-normal">
                    {description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs sm:text-sm font-semibold text-blue-400 group-hover:text-blue-300 transition-colors">
                  <span className="flex items-center gap-1.5">
                    {href?.includes('drive.google.com') ? (
                      <>
                        <BiFolder className="text-base" />
                        View Folder
                      </>
                    ) : (
                      <>
                        <BiImage className="text-base" />
                        Explore Project
                      </>
                    )}
                  </span>
                  <BiLinkExternal className="text-base transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </div>
            </a>
          ))}
        </div>

      </div>
    </section>
  );
}

export default PortfolioGrid;