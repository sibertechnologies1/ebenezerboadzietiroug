import React, { useState } from 'react';
import { BiLinkExternal, BiImage, BiX } from 'react-icons/bi';
import useInViewAnimate from '../../hooks/useInViewAnimate';

function PortfolioGrid({ content, projects = [] }) {
  const [ref] = useInViewAnimate({ threshold: 0.1 });
  const [activeFilter, setActiveFilter] = useState('All');
  const [previewImage, setPreviewImage] = useState(null);

  const tagline = content?.tagline || 'Recent Projects';
  const title = content?.title || 'Work That Moves Brands Forward';
  const description = content?.description || 'Explore a selection of my recent web development projects and graphic design works.';

  const categories = ['All', ...new Set(projects.map((p) => p.category || 'General'))];

  const filteredItems = activeFilter === 'All'
    ? projects
    : projects.filter((p) => p.category === activeFilter);

  const handleCardClick = (e, item) => {
    const isGraphicDesign = item.category?.toLowerCase() === 'graphic design';
    const hasExternalLink = Boolean(item.live_url || item.github_url);

    if (isGraphicDesign || !hasExternalLink) {
      e.preventDefault();
      setPreviewImage(item.image_url);
    }
  };

  return (
    <section 
      ref={ref} 
      className="py-16 px-4 sm:px-6 lg:px-12 bg-[#0a0f1d] text-white relative overflow-hidden border-t border-slate-800/80"
      aria-labelledby="portfolio-heading"
    >
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10 space-y-10">
        
        <div className="text-center space-y-3 max-w-2xl mx-auto">
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

        {/* Category Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-2">
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

        {/* Portfolio Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.length === 0 ? (
            <div className="col-span-full text-center py-12 text-slate-400 text-sm">
              No portfolio items found.
            </div>
          ) : (
            filteredItems.map((item) => {
              const { id, image_url, title, description, category, live_url, github_url } = item;
              const href = live_url || github_url || '#';
              const isExternal = Boolean(href && href !== '#');
              const isGraphic = category?.toLowerCase() === 'graphic design';

              return (
                <a
                  key={id}
                  href={href}
                  target={isExternal && !isGraphic ? '_blank' : '_self'}
                  rel={isExternal && !isGraphic ? 'noopener noreferrer' : ''}
                  onClick={(e) => handleCardClick(e, item)}
                  className="group bg-slate-900/40 border border-slate-800/80 hover:border-blue-500/40 rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-1 shadow-lg hover:shadow-blue-500/5 backdrop-blur-sm flex flex-col justify-between cursor-pointer"
                >
                  {/* Image Container */}
                  <div className={`relative overflow-hidden bg-slate-950 ${isGraphic ? 'aspect-[4/5]' : 'aspect-[16/10] p-3 sm:p-4'} flex items-center justify-center`}>
                    <img
                      src={image_url}
                      alt={title || 'Flyer'}
                      loading="lazy"
                      className={`w-full h-full transition-transform duration-500 group-hover:scale-105 ${
                        isGraphic ? 'object-cover' : 'object-contain'
                      }`}
                    />
                    
                    {/* Badge only shows for non-graphic design items */}
                    {!isGraphic && category && (
                      <span className="absolute top-3 left-3 text-[10px] font-semibold uppercase tracking-wider bg-slate-950/90 border border-slate-800 text-blue-400 px-2.5 py-0.5 rounded-md backdrop-blur-md">
                        {category}
                      </span>
                    )}
                  </div>

                  {/* Text details only render for non-graphic design items */}
                  {!isGraphic && (
                    <div className="p-5 space-y-3 flex-1 flex flex-col justify-between border-t border-slate-800/60">
                      <div className="space-y-1.5">
                        <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-blue-400 transition-colors duration-200 truncate">
                          {title}
                        </h3>
                        {description && (
                          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-normal line-clamp-2">
                            {description}
                          </p>
                        )}
                      </div>

                      <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-semibold text-blue-400 group-hover:text-blue-300 transition-colors">
                        <span className="flex items-center gap-1.5">
                          <BiImage className="text-sm" />
                          {live_url ? 'Live Preview' : github_url ? 'Source Code' : 'View Project'}
                        </span>
                        <BiLinkExternal className="text-sm transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </div>
                    </div>
                  )}
                </a>
              );
            })
          )}
        </div>

      </div>

      {/* Full-Screen Image Lightbox Preview */}
      {previewImage && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
          onClick={() => setPreviewImage(null)}
        >
          <div className="relative max-w-5xl w-full max-h-[90vh] flex items-center justify-center">
            <button
              onClick={() => setPreviewImage(null)}
              className="absolute -top-12 right-0 text-white hover:text-blue-400 p-2 rounded-full transition"
              aria-label="Close Preview"
            >
              <BiX className="text-3xl" />
            </button>
            <img
              src={previewImage}
              alt="Full Preview"
              className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl border border-slate-800"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </section>
  );
}

export default PortfolioGrid;