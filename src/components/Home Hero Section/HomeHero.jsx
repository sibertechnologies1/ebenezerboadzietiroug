import React, { useState } from 'react';
import { 
  FaFacebook, 
  FaInstagram, 
  FaLinkedinIn, 
  FaTiktok, 
  FaArrowRight, 
  FaRocket,
  FaReact,
  // FaSparkles,
  FaFigma,
  FaCheck, 
  FaChartLine, 
  FaPalette, 
  FaLaptopCode 
} from "react-icons/fa6";
import { HiSparkles } from "react-icons/hi2";
import hero1 from './hero1.png';
import useInViewAnimate from '../../hooks/useInViewAnimate';
export default function Homehero1() {
  const [isHovered, setIsHovered] = useState(false);

  // Smooth scroll helper with safety check
  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section 
      id="home" 
      className="relative min-h-[90vh] flex items-center justify-center bg-[#090D16] text-white py-16 lg:py-24 px-4 sm:px-6 lg:px-12 overflow-hidden selection:bg-blue-500 selection:text-white"
    >
      {/* Dynamic Animated Background Mesh Grids */}
      <div className="absolute inset-0 z-0 opacity-20 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />

      {/* Atmospheric Ambient Glows */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] bg-blue-600/15 rounded-full blur-[120px] pointer-events-none animate-pulse duration-10000" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] bg-indigo-600/15 rounded-full blur-[120px] pointer-events-none" />

      {/* Main hero1 Container */}
      <div className="max-w-7xl mx-auto w-full flex flex-col-reverse lg:flex-row items-center justify-between gap-12 lg:gap-16 relative z-10">
        
        {}
        <div className="flex flex-col flex-1 text-center lg:text-left">
          
          {/* Availability Status Badge */}
          <div className="inline-flex items-center justify-center lg:justify-start gap-2 mb-6">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
            <span className="text-xs sm:text-sm font-semibold tracking-wider text-emerald-400 uppercase bg-emerald-950/60 border border-emerald-800/50 px-3.5 py-1 rounded-full backdrop-blur-md">
              Available for Freelance & Full-time Roles
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight text-white leading-[1.1] mb-6">
            Designing Interfaces. <br className="hidden sm:inline" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400">
              Scaling Digital Growth.
            </span>
          </h1>

          {/* Core Subtitle / Bio */}
          <p className="text-base sm:text-lg lg:text-xl text-slate-300 leading-relaxed max-w-2xl mx-auto lg:mx-0 mb-8 font-normal">
            Hi, I’m <span className="text-white font-semibold underline decoration-blue-500 decoration-2 underline-offset-4">Ebenezer Boadzie</span>. I bridge the gap between high-converting <strong className="text-white font-medium">UI/UX Design</strong> and data-driven <strong className="text-white font-medium">Digital Marketing</strong> to craft seamless digital experiences that measure success in real business revenue.
          </p>

          {/* Primary Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-10">
            <button
              onClick={() => scrollToSection('contact')}
              className="w-full sm:w-auto group relative inline-flex items-center justify-center gap-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold text-base py-4 px-8 rounded-2xl transition-all duration-300 shadow-lg shadow-blue-600/25 hover:shadow-blue-500/40 hover:-translate-y-0.5 active:translate-y-0"
            >
              <span>Let's Talk Projects</span>
              <FaArrowRight className="text-sm transition-transform duration-300 group-hover:translate-x-1" />
            </button>

            <button
              onClick={() => scrollToSection('portfolio')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-slate-900/80 hover:bg-slate-800 border border-slate-700/80 hover:border-slate-600 text-slate-200 font-semibold text-base py-4 px-8 rounded-2xl transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 backdrop-blur-md"
            >
              <span>View Case Studies</span>
            </button>
          </div>

          {/* Social Links & Trust Indicators */}
          <div className="pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
            <span className="text-xs font-semibold uppercase tracking-widest text-slate-400">
              Find Me On:
            </span>
            <div className="flex items-center gap-2.5">
              {[
                { icon: FaLinkedinIn, href: "http://www.linkedin.com/in/ebenezerboadzietiroug", label: "LinkedIn" },
                { icon: FaInstagram, href: "https://www.instagram.com/tirougdimafa/", label: "Instagram" },
                { icon: FaFacebook, href: "https://www.facebook.com/ebenezer.tirougdimafa", label: "Facebook" },
                { icon: FaTiktok, href: "https://www.tiktok.com/@gratdimafa?_r=1&_t=ZS-97IBL1GaP4u", label: "TikTok" },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="p-3 rounded-xl bg-slate-900/90 hover:bg-blue-600 text-slate-300 hover:text-white border border-slate-800 hover:border-blue-500 transition-all duration-300 shadow-sm hover:shadow-blue-500/20 hover:-translate-y-1"
                >
                  <Icon className="text-base" />
                </a>
              ))}
            </div>
          </div>

        </div>

        {}
        <div className="flex-1 w-full max-w-md lg:max-w-lg flex justify-center items-center relative">
          
          {/* Main Card Shell */}
          <div 
            className="relative w-full aspect-[4/5] max-w-[380px] sm:max-w-[420px] rounded-3xl p-3 bg-gradient-to-b from-slate-700/40 via-slate-800/20 to-slate-900/60 border border-slate-700/60 backdrop-blur-xl shadow-2xl transition-all duration-500 hover:border-slate-500/80"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Background Glow inside Card */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-600/10 via-transparent to-purple-600/10 pointer-events-none" />

            {/* Inner Profile Image Frame */}
            <div className="relative w-full h-full rounded-2xl overflow-hidden bg-slate-950 border border-slate-800">
              <img
                src={hero1}
                alt="Ebenezer Boadzie - UI/UX & Digital Marketer"
                className={`w-full h-full object-cover object-center transition-transform duration-700 ease-out ${isHovered ? 'scale-105' : 'scale-100'}`}
                loading="eager"
              />

              {/* Gradient Overlay on Image Bottom for Visual Balance */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#090D16] via-transparent to-transparent opacity-80" />
            </div>

            {/* FLOATING METRIC 1: Projects Completed (Top Left) */}
            <div className="absolute -top-4 -left-4 sm:-left-6 bg-slate-900/90 border border-slate-700/80 p-3 sm:p-3.5 rounded-2xl shadow-xl backdrop-blur-md flex items-center gap-3 animate-bounce-slow">
              <div className="p-2.5 bg-blue-500/20 text-blue-400 rounded-xl border border-blue-500/30">
                <FaRocket className="text-lg sm:text-xl" />
              </div>
              <div>
                <p className="text-xs text-slate-400 font-medium">Delivered</p>
                <p className="text-sm sm:text-base font-bold text-white">20+ Projects</p>
              </div>
            </div>

            {/* FLOATING METRIC 2: Conversion Boost (Bottom Right) */}
            <div className="absolute -bottom-4 -right-4 sm:-right-6 bg-slate-900/90 border border-slate-700/80 p-3 sm:p-3.5 rounded-2xl shadow-xl backdrop-blur-md flex items-center gap-3">
              <div className="p-2.5 bg-emerald-500/20 text-emerald-400 rounded-xl border border-emerald-500/30">
                <FaChartLine className="text-lg sm:text-xl" />
              </div>
              <div>
                <p className="text-xs text-slate-400 font-medium">Avg. ROI Boost</p>
                <p className="text-sm sm:text-base font-bold text-emerald-400">+140% Growth</p>
              </div>
            </div>

            {/* FLOATING TECH BADGES (Right Side Floating Stack) */}
            <div className="hidden sm:flex absolute right-4 top-1/3 translate-x-12 flex-col gap-2 pointer-events-none">
              <div className="flex items-center gap-2 bg-slate-900/90 border border-slate-700/80 px-3 py-1.5 rounded-full text-xs font-semibold text-slate-200 shadow-md backdrop-blur-md">
                <FaFigma className="text-pink-400" /> UI/UX Design
              </div>
              <div className="flex items-center gap-2 bg-slate-900/90 border border-slate-700/80 px-3 py-1.5 rounded-full text-xs font-semibold text-slate-200 shadow-md backdrop-blur-md">
                <FaReact className="text-cyan-400" /> React Web Dev
              </div>
              <div className="flex items-center gap-2 bg-slate-900/90 border border-slate-700/80 px-3 py-1.5 rounded-full text-xs font-semibold text-slate-200 shadow-md backdrop-blur-md">
                <HiSparkles className="text-amber-400" /> Growth Strategy
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}