import React from 'react';
import PL1 from "./PL1.png";
import PL2 from "./PL2.png";
import useInViewAnimate from '../../hooks/useInViewAnimate';
import { BiLinkExternal } from "react-icons/bi";
import { FaArrowRight } from "react-icons/fa6";

const projects = [
  {
    image: PL1,
    title: 'Mansur Enterprises',
    category: 'E-Commerce Platform',
    description: 'A fully responsive e-commerce platform featuring dynamic product catalogs, optimized checkout flows, and fast loading speeds.',
    tags: ['React', 'Tailwind CSS', 'UI/UX Design', 'Conversion Optimization'],
    liveUrl: '#',
  },
  {
    image: PL2,
    title: 'Brand Marketing & Flyers',
    category: 'Digital Design & Marketing',
    description: 'A curated collection of promotional flyers, social media creatives, and marketing collateral designed to boost brand engagement.',
    tags: ['Graphic Design', 'Social Media', 'Brand Strategy', 'Flyer Design'],
    liveUrl: '#',
  },
];

const PortfolioSection = () => {
  const [ref, visible] = useInViewAnimate({ threshold: 0.15 });

  return (
    <section 
      id="portfolio" 
      ref={ref} 
      className="scroll-mt-24 bg-[#0a0f1d] text-white py-20 px-4 sm:px-6 lg:px-12 relative overflow-hidden border-t border-slate-800/80"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <span className="inline-block text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-blue-400 bg-blue-500/10 border border-blue-500/20 px-4 py-1.5 rounded-full mb-4">
            Featured Work
          </span>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Selected Projects & <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-cyan-300">
              Case Studies
            </span>
          </h2>

          <p className="text-base sm:text-lg text-slate-300 mt-4 leading-relaxed font-normal">
            Here is a selection of recent projects where I combined UI/UX development with growth strategies to deliver measurable results.
          </p>
        </div>

        {/* Portfolio Cards Grid */}
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-6xl mx-auto transition-all duration-1000 delay-200 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {projects.map(({ image, title, category, description, tags, liveUrl }) => (
            <div
              key={title}
              className="group bg-slate-900/60 border border-slate-800 hover:border-blue-500/50 rounded-2xl overflow-hidden flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 shadow-xl hover:shadow-2xl hover:shadow-blue-500/10 backdrop-blur-sm"
            >
              {/* Image Thumbnail Container */}
              <div className="relative overflow-hidden aspect-video bg-slate-800/80">
                <img
                  src={image}
                  alt={`${title} preview`}
                  loading="lazy"
                  className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                />
                
                {/* Overlay Badge */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="text-xs font-semibold uppercase tracking-wider text-white bg-slate-900/80 border border-slate-700/80 backdrop-blur-md px-3 py-1 rounded-full">
                    {category}
                  </span>
                </div>

                {/* Hover Action Layer */}
                <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3 backdrop-blur-[2px]">
                  <a
                    href={liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm py-2.5 px-5 rounded-xl transition-all duration-200 shadow-lg shadow-blue-600/30"
                  >
                    View Details
                    <BiLinkExternal className="text-lg" />
                  </a>
                </div>
              </div>

              {/* Card Body Content */}
              <div className="p-8 flex flex-col flex-grow justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-blue-300 transition-colors duration-200 flex items-center justify-between">
                    <span>{title}</span>
                    <FaArrowRight className="text-sm text-slate-500 group-hover:text-blue-400 group-hover:translate-x-1 transition-all duration-200" />
                  </h3>

                  <p className="text-slate-300 text-sm leading-relaxed mb-6 font-normal">
                    {description}
                  </p>
                </div>

                {/* Tech / Service Tags */}
                <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-800/80">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-medium text-slate-400 bg-slate-800/50 border border-slate-700/50 px-2.5 py-1 rounded-md"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default PortfolioSection;