import React from 'react';
import { Link } from 'react-router-dom';
import { BiChevronRight } from 'react-icons/bi';
import heroFallback from './hero.png';
import useInViewAnimate from '../../hooks/useInViewAnimate';

function PortfolioHero({ content }) {
  const [ref, visible] = useInViewAnimate({ threshold: 0.2 });

  const tagline = content?.tagline || 'Portfolio';
  const title = content?.title || 'Featured Digital Work';
  const description = content?.description || 'Selected projects showcasing responsive UI...';
  const image = content?.image || heroFallback;

  return (
    <section 
      ref={ref} 
      className="bg-[#0a0f1d] text-white py-16 lg:py-24 px-4 sm:px-6 lg:px-12 relative overflow-hidden border-b border-slate-800/80"
      aria-label="Portfolio Introduction"
    >
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-96 h-96 bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch transition-all duration-1000 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          
          <div className="lg:col-span-5 flex">
            <div className="relative group rounded-2xl overflow-hidden border border-slate-800 bg-slate-900/60 p-3 shadow-2xl backdrop-blur-sm w-full flex flex-col">
              <div className="relative aspect-[4/5] lg:aspect-auto lg:h-full w-full overflow-hidden rounded-xl bg-slate-800">
                <img
                  src={image}
                  alt={title}
                  loading="lazy"
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1d]/80 via-transparent to-transparent opacity-60" />
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 flex flex-col justify-center space-y-5 text-center lg:text-left items-center lg:items-start">
            <div>
              <span className="inline-block text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-blue-400 bg-blue-500/10 border border-blue-500/20 px-4 py-1.5 rounded-full mb-3">
                {tagline}
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
                {title}
              </h1>
            </div>

            <p className="text-slate-300 leading-relaxed text-base sm:text-lg font-normal max-w-2xl">
              {description}
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}

export default PortfolioHero;