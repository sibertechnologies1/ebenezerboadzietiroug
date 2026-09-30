import React, { useState, useEffect } from 'react';
import { BiLinkExternal, BiImage } from 'react-icons/bi';
import useInViewAnimate from '../../hooks/useInViewAnimate';

const FOLDER_ID = '19L6jP7xCl6uF5EsGsPzK9I4Y3e_iJXwC';
const API_KEY = import.meta.env.VITE_GOOGLE_DRIVE_API_KEY;

function PortfolioGrid({ content, projects = [], isHomePage = false }) {
  const [ref, visible] = useInViewAnimate({ threshold: 0.15 });
  const [activeFilter, setActiveFilter] = useState('All');
  const [driveFlyers, setDriveFlyers] = useState([]);
  const [loadingDrive, setLoadingDrive] = useState(true);

  useEffect(() => {
    const fetchDriveFlyers = async () => {
      if (!API_KEY) {
        setLoadingDrive(false);
        return;
      }

      try {
        setLoadingDrive(true);
        const q = `'${FOLDER_ID}' in parents and mimeType contains 'image/' and trashed = false`;
        const fields = 'files(id, name, createdTime)';
        const orderBy = 'createdTime desc';
        const pageSize = isHomePage ? '&pageSize=4' : '';

        const url = `https://www.googleapis.com/drive/v3/files?q=${encodeURIComponent(
          q
        )}&orderBy=${encodeURIComponent(
          orderBy
        )}&fields=${encodeURIComponent(
          fields
        )}${pageSize}&key=${API_KEY}`;

        const response = await fetch(url);
        if (!response.ok) throw new Error('Failed to fetch flyers');

        const data = await response.json();

        const formattedFlyers = (data.files || []).map((file) => ({
          id: file.id,
          title: file.name.replace(/\.[^/.]+$/, ''),
          category: 'Graphic Design',
          image_url: `https://drive.google.com/thumbnail?id=${file.id}&sz=w500`,
          isDriveItem: true
        }));

        setDriveFlyers(formattedFlyers);
      } catch (err) {
        console.error('Google Drive Fetch Error:', err);
      } finally {
        setLoadingDrive(false);
      }
    };

    fetchDriveFlyers();
  }, [isHomePage]);

  const tagline = content?.tagline || 'Recent Projects';
  const title = content?.title || 'Work That Moves Brands Forward';
  const description = content?.description || 'Explore a selection of my recent web development projects and graphic design works.';

  const allCombinedItems = [...projects, ...driveFlyers];
  const categories = ['All', ...new Set(allCombinedItems.map((p) => p.category || 'General'))];

  const filteredItems = activeFilter === 'All'
    ? allCombinedItems
    : allCombinedItems.filter((p) => p.category === activeFilter);

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

        {/* Category Filter Buttons */}
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

        {/* Portfolio Cards Grid */}
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-1000 delay-200 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {filteredItems.length === 0 && !loadingDrive ? (
            <div className="col-span-full text-center py-12 text-slate-400 text-sm">
              No portfolio items found.
            </div>
          ) : (
            filteredItems.map(({ id, image_url, title, description, category, live_url, github_url, isDriveItem }) => {
              const href = live_url || github_url || '#';
              const isExternal = Boolean(href && href !== '#');

              // Full Flyer Cards: Fits full image without cropping top or bottom
              if (isDriveItem) {
                return (
                  <div
                    key={id}
                    className="bg-slate-900/40 border border-slate-800/80 rounded-xl overflow-hidden shadow-lg backdrop-blur-sm flex flex-col justify-center items-center p-3 relative"
                  >
                    {category && (
                      <span className="absolute top-5 left-5 z-10 text-[10px] font-semibold uppercase tracking-wider bg-slate-950/90 border border-slate-800 text-blue-400 px-2.5 py-0.5 rounded-md backdrop-blur-md">
                        {category}
                      </span>
                    )}
                    
                    <div className="w-full h-auto min-h-[380px] max-h-[550px] flex items-center justify-center bg-slate-950/50 rounded-lg overflow-hidden">
                      <img
                        src={image_url}
                        alt={title}
                        loading="lazy"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-contain max-h-[520px] rounded-md"
                      />
                    </div>
                  </div>
                );
              }

              // Web Development Cards
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
                      src={image_url}
                      alt={title}
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
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