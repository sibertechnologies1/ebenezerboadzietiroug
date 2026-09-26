import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useInViewAnimate from '../../hooks/useInViewAnimate';
import { BiLinkExternal } from "react-icons/bi";
import { FaArrowRight } from "react-icons/fa6";
import { supabase } from '../../supabaseClient';

const PortfolioSection = () => {
  const [ref, visible] = useInViewAnimate({ threshold: 0.15 });
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLatestProjects = async () => {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(6);

      if (!error && data) {
        setProjects(data);
      }
      setLoading(false);
    };

    fetchLatestProjects();
  }, []);

  return (
    <section 
      id="portfolio" 
      ref={ref} 
      className="scroll-mt-24 bg-[#0a0f1d] text-white py-16 px-4 sm:px-6 lg:px-12 relative overflow-hidden border-t border-slate-800/80"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className={`text-center max-w-2xl mx-auto mb-12 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <span className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-blue-400 bg-blue-500/10 border border-blue-500/20 px-3.5 py-1 rounded-full mb-3">
            Featured Work
          </span>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight">
            Selected Projects & <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-cyan-300">
              Case Studies
            </span>
          </h2>

          <p className="text-sm sm:text-base text-slate-300 mt-3 leading-relaxed font-normal">
            A selection of recent projects combining UI/UX development with growth strategies.
          </p>
        </div>

        {/* Portfolio Cards Grid */}
        {loading ? (
          <div className="text-center py-12 text-slate-400 text-sm">
            Loading recent projects...
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center py-12 text-slate-400 text-sm">
            No projects found. Add projects via the Admin Console.
          </div>
        ) : (
          <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto transition-all duration-1000 delay-200 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {projects.map(({ id, image_url, title, category, description, live_url, github_url }) => {
              const targetUrl = live_url || github_url || '#';
              const isExternal = Boolean(targetUrl && targetUrl !== '#');

              return (
                <div
                  key={id}
                  className="group bg-slate-900/60 border border-slate-800 hover:border-blue-500/50 rounded-xl overflow-hidden flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 shadow-lg hover:shadow-xl hover:shadow-blue-500/10 backdrop-blur-sm"
                >
                  {/* Image Thumbnail Container (object-contain with padding fits the entire mockup) */}
                  <div className="relative overflow-hidden aspect-[16/10] bg-slate-950 p-3 sm:p-4 flex items-center justify-center border-b border-slate-800/60">
                    <img
                      src={image_url || 'https://via.placeholder.com/600x400/1e293b/ffffff?text=Preview+Unavailable'}
                      alt={`${title} preview`}
                      loading="lazy"
                      className="w-full h-full object-contain transition-transform duration-500 ease-out group-hover:scale-105"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/600x400/1e293b/ffffff?text=Preview+Unavailable';
                      }}
                    />
                    
                    {/* Overlay Badge */}
                    {category && (
                      <div className="absolute top-3 left-3 z-10">
                        <span className="text-[10px] font-semibold uppercase tracking-wider text-white bg-slate-900/90 border border-slate-700/80 backdrop-blur-md px-2.5 py-0.5 rounded-md">
                          {category}
                        </span>
                      </div>
                    )}

                    {/* Hover Action Layer */}
                    <div className="absolute inset-0 bg-slate-950/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2 backdrop-blur-[2px]">
                      <a
                        href={targetUrl}
                        target={isExternal ? '_blank' : '_self'}
                        rel={isExternal ? 'noopener noreferrer' : ''}
                        className="inline-flex items-center gap-1.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs py-2 px-4 rounded-lg transition-all duration-200 shadow-md shadow-blue-600/30"
                      >
                        View Project
                        <BiLinkExternal className="text-base" />
                      </a>
                    </div>
                  </div>

                  {/* Card Body Content */}
                  <div className="p-5 flex flex-col flex-grow justify-between space-y-3">
                    <div>
                      <h3 className="text-lg font-bold text-white mb-2 group-hover:text-blue-300 transition-colors duration-200 flex items-center justify-between">
                        <span className="truncate">{title}</span>
                        <FaArrowRight className="text-xs text-slate-500 group-hover:text-blue-400 group-hover:translate-x-1 transition-all duration-200 shrink-0 ml-2" />
                      </h3>

                      <p className="text-slate-300 text-xs leading-relaxed font-normal line-clamp-2">
                        {description}
                      </p>
                    </div>

                    {/* Link Badges */}
                    <div className="flex items-center gap-3 pt-3 border-t border-slate-800/80 text-[11px] font-semibold text-blue-400">
                      {live_url && (
                        <a href={live_url} target="_blank" rel="noopener noreferrer" className="hover:underline">
                          Live Demo &rarr;
                        </a>
                      )}
                      {github_url && (
                        <a href={github_url} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white hover:underline">
                          GitHub
                        </a>
                      )}
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        )}

        {/* Redirect Button */}
        <div className={`mt-12 text-center transition-all duration-700 delay-300 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <Link
            to="/portfolio"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-sm px-6 py-3 rounded-xl shadow-lg shadow-blue-600/25 transition-all duration-300 hover:scale-[1.02]"
          >
            <span>View All Projects</span>
            <FaArrowRight className="text-xs" />
          </Link>
        </div>

      </div>
    </section>
  );
};

export default PortfolioSection;