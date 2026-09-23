import React from 'react';
import { Link } from 'react-router-dom';
import { BiChevronRight } from 'react-icons/bi';
import hero from './hero.png'; // Adjust path if needed
import useInViewAnimate from '../../hooks/useInViewAnimate';

function PortfolioHero() {
  const [ref, visible] = useInViewAnimate({ threshold: 0.2 });

  return (
    <section 
      ref={ref} 
      className="bg-[#0a0f1d] text-white py-16 lg:py-24 px-4 sm:px-6 lg:px-12 relative overflow-hidden border-b border-slate-800/80"
      aria-label="Portfolio Introduction"
    >
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-96 h-96 bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center transition-all duration-1000 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          
          {/* Profile Thumbnail */}
          <div className="lg:col-span-4 flex justify-center">
            <div className="relative group rounded-2xl overflow-hidden border border-slate-800 bg-slate-900/60 p-2.5 shadow-2xl backdrop-blur-sm max-w-[280px] lg:max-w-none w-full">
              <div className="relative aspect-square sm:aspect-[4/5] overflow-hidden rounded-xl bg-slate-800">
                <img
                  src={hero}
                  alt="Tiroug Boadzie Ebenezer"
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1d]/70 via-transparent to-transparent opacity-60" />
              </div>
            </div>
          </div>

          {/* Text Content */}
          <div className="lg:col-span-8 flex flex-col items-center lg:items-start text-center lg:text-left space-y-5">
            <div>
              <span className="inline-block text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-blue-400 bg-blue-500/10 border border-blue-500/20 px-4 py-1.5 rounded-full mb-3">
                Portfolio
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
                Featured Digital Work
              </h1>
            </div>

            <p className="text-slate-300 leading-relaxed text-base sm:text-lg font-normal max-w-2xl">
              Selected projects showcasing responsive UI, high-converting marketing pages, and brand experiences designed to help businesses attract, engage, and convert visitors.
            </p>

            {/* Breadcrumbs */}
            <div className="pt-2 flex items-center gap-2 text-xs sm:text-sm font-semibold tracking-wider uppercase text-slate-400">
              <Link to="/" className="hover:text-blue-400 transition-colors duration-200">
                Home
              </Link>
              <BiChevronRight className="text-base text-slate-500" />
              <span className="text-white">Portfolio</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default PortfolioHero;