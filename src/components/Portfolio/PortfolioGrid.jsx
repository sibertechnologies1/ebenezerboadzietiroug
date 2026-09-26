import React, { useState } from 'react';
import { BiLinkExternal, BiImage } from 'react-icons/bi';
import useInViewAnimate from '../../hooks/useInViewAnimate';

function PortfolioGrid({ content, projects = [] }) {
  const [ref, visible] = useInViewAnimate({ threshold: 0.15 });
  const [activeFilter, setActiveFilter] = useState('All');

  const tagline = content?.tagline || 'Recent Projects';
  const title = content?.title || 'Work That Moves Brands Forward';
  const description = content?.description || 'Explore a selection of my recent web development projects added from the admin dashboard.';

  const categories = ['All', ...new Set(projects.map((p) => p.category || 'General'))];

  const filteredProjects = activeFilter === 'All'
    ? projects
    : projects.filter((p) => p.category === activeFilter);

  return (
    <section 
      ref={ref} 
      className="py-16 px-4 sm:px-6 lg:px-12 bg-[#0a0f1d] text-white relative overflow-hidden border-t border-slate-800/80"
      aria-labelledby="portfolio-heading"
    >
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10 space-y-10">
        
        <div className={`text-center space-y-3 max-w-2xl mx-auto transition-all duration-1000 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-blue-400 bg-blue-500/10 border border-blue-500/20 px-3.5 py-1 rounded-full">
            {tagline}
          </span>
          <h2 id="portfolio-heading" className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            {title}
          </h2>
          <p className="text-slate-300 leading-relaxed text-sm sm:text-base font-normal">
            {description}
          </p>
        </div>

        <div className={`flex flex-wrap justify-center gap-2 transition-all duration-1000 delay-100 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`text-xs font-semibold px-4 py-2 rounded-lg border transition-all duration-200 ${
                activeFilter === cat
                  ? 'bg-blue-600 border-blue-500 text-white shadow-md shadow-blue-600/20'
                  : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-1000 delay-200 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {filteredProjects.length === 0 ? (
            <div className="col-span-full text-center py-12 text-slate-400 text-sm">
              No projects found. Add projects from your admin dashboard.
            </div>
          ) : (
            filteredProjects.map(({ id, image_url, title, description, category, live_url, github_url }) => {
              const href = live_url || github_url || '#';
              const isExternal = Boolean(href && href !== '#');

              return (
                <a
                  key={id}
                  href={href}
                  target={isExternal ? '_blank' : '_self'}
                  rel={isExternal ? 'noopener noreferrer' : ''}
                  className="group bg-slate-900/40 border border-slate-800/80 hover:border-blue-500/40 rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-1 shadow-lg hover:shadow-blue-500/5 backdrop-blur-sm flex flex-col justify-between"
                >
                  <div className="relative overflow-hidden bg-slate-950 aspect-[16/10] p-3 sm:p-4 flex items-center justify-center border-b border-slate-800/60">
                    <img
                      src={image_url || 'https://via.placeholder.com/600x400/1e293b/ffffff?text=Preview+Unavailable'}
                      alt={title}
                      loading="lazy"
                      className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/600x400/1e293b/ffffff?text=Preview+Unavailable';
                      }}
                    />
                    
                    {category && (
                      <span className="absolute top-3 left-3 text-[10px] font-semibold uppercase tracking-wider bg-slate-950/90 border border-slate-800 text-blue-400 px-2.5 py-0.5 rounded-md backdrop-blur-md">
                        {category}
                      </span>
                    )}
                  </div>

                  <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                    <div className="space-y-1.5">
                      <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-blue-400 transition-colors duration-200 truncate">
                        {title}
                      </h3>
                      <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-normal line-clamp-2">
                        {description}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-semibold text-blue-400 group-hover:text-blue-300 transition-colors">
                      <span className="flex items-center gap-1.5">
                        <BiImage className="text-sm" />
                        {live_url ? 'Live Preview' : github_url ? 'Source Code' : 'View Project'}
                      </span>
                      <BiLinkExternal className="text-sm transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                  </div>
                </a>
              );
            })
          )}
        </div>

      </div>
    </section>
  );
}

export default PortfolioGrid;