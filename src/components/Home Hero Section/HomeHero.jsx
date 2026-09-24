// HomeHero.jsx
import React, { useState } from 'react';
import { FaLinkedinIn, FaInstagram, FaFacebook, FaTiktok, FaArrowRight, FaRocket, FaReact, FaFigma, FaChartLine } from "react-icons/fa6";
import { HiSparkles } from "react-icons/hi2";

export default function Homehero1({ data }) {
  const [isHovered, setIsHovered] = useState(false);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  if (!data) return null;

  return (
    <section id="home" className="relative min-h-[90vh] flex items-center justify-center bg-[#090D16] text-white py-16 lg:py-24 px-4 sm:px-6 lg:px-12 overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-20 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />

      <div className="max-w-7xl mx-auto w-full flex flex-col-reverse lg:flex-row items-center justify-between gap-12 lg:gap-16 relative z-10">
        <div className="flex flex-col flex-1 text-center lg:text-left">
          <div className="inline-flex items-center justify-center lg:justify-start gap-2 mb-6">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
            <span className="text-xs sm:text-sm font-semibold tracking-wider text-emerald-400 uppercase bg-emerald-950/60 border border-emerald-800/50 px-3.5 py-1 rounded-full backdrop-blur-md">
              {data.availability_text}
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight text-white leading-[1.1] mb-6">
            {data.headline_line1} <br className="hidden sm:inline" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400">
              {data.headline_line2}
            </span>
          </h1>

          <p className="text-base sm:text-lg lg:text-xl text-slate-300 leading-relaxed max-w-2xl mx-auto lg:mx-0 mb-8 font-normal">
            {data.bio}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-10">
            <button
              onClick={() => scrollToSection('contact')}
              className="w-full sm:w-auto group relative inline-flex items-center justify-center gap-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold text-base py-4 px-8 rounded-2xl transition-all duration-300 shadow-lg shadow-blue-600/25"
            >
              <span>Let's Talk Projects</span>
              <FaArrowRight className="text-sm transition-transform duration-300 group-hover:translate-x-1" />
            </button>

            <button
              onClick={() => scrollToSection('portfolio')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-slate-900/80 hover:bg-slate-800 border border-slate-700/80 text-slate-200 font-semibold text-base py-4 px-8 rounded-2xl transition-all duration-300"
            >
              <span>View Case Studies</span>
            </button>
          </div>
        </div>

        <div className="flex-1 w-full max-w-md lg:max-w-lg flex justify-center items-center relative">
          <div 
            className="relative w-full aspect-[4/5] max-w-[380px] sm:max-w-[420px] rounded-3xl p-3 bg-gradient-to-b from-slate-700/40 via-slate-800/20 to-slate-900/60 border border-slate-700/60 backdrop-blur-xl shadow-2xl"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div className="relative w-full h-full rounded-2xl overflow-hidden bg-slate-950 border border-slate-800">
              <img
                src={data.image_url}
                alt="Profile"
                className={`w-full h-full object-cover transition-transform duration-700 ${isHovered ? 'scale-105' : 'scale-100'}`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#090D16] via-transparent to-transparent opacity-80" />
            </div>

            <div className="absolute -top-4 -left-4 sm:-left-6 bg-slate-900/90 border border-slate-700/80 p-3 rounded-2xl flex items-center gap-3">
              <div className="p-2.5 bg-blue-500/20 text-blue-400 rounded-xl border border-blue-500/30">
                <FaRocket className="text-lg" />
              </div>
              <div>
                <p className="text-xs text-slate-400 font-medium">Delivered</p>
                <p className="text-sm font-bold text-white">{data.projects_count}</p>
              </div>
            </div>

            <div className="absolute -bottom-4 -right-4 sm:-right-6 bg-slate-900/90 border border-slate-700/80 p-3 rounded-2xl flex items-center gap-3">
              <div className="p-2.5 bg-emerald-500/20 text-emerald-400 rounded-xl border border-emerald-500/30">
                <FaChartLine className="text-lg" />
              </div>
              <div>
                <p className="text-xs text-slate-400 font-medium">Avg. ROI Boost</p>
                <p className="text-sm font-bold text-emerald-400">{data.growth_rate}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}