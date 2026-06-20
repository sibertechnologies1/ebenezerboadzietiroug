import React, { useState, useEffect } from 'react';
import HheroImg from './HheroImg.png';
import { FaFacebook, FaInstagram, FaLinkedin, FaTiktok } from "react-icons/fa6"

function HomeHero() {
  // 1. Animation States
  const fullText = "Hi, I am Ebenezer";
  const [currentText, setCurrentText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [startContentAnimation, setStartContentAnimation] = useState(false);

  // Typewriter orchestration logic
  useEffect(() => {
    if (currentIndex < fullText.length) {
      const timeout = setTimeout(() => {
        setCurrentText((prev) => prev + fullText[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, 100);

      return () => clearTimeout(timeout);
    } else {
      const delay = setTimeout(() => setStartContentAnimation(true), 200);
      return () => clearTimeout(delay);
    }
  }, [currentIndex]);

  const scrollToSection = (id) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <div id='home' className='scroll-mt-24 flex lg:flex-row flex-col items-center justify-between py-10 lg:py-20 px-4 sm:px-6 lg:px-8 gap-10 bg-[#161f4a]'>

      {/* Text Block */}
      <div className='flex flex-col gap-4 flex-1 text-center lg:text-left'>
        <h1
          className='text-3xl sm:text-4xl lg:text-5xl font-bold text-white min-h-[40px] sm:min-h-[50px]'
          aria-label={fullText}
        >
          <span aria-hidden="true">
            {currentText}
            {currentIndex < fullText.length && (
              <span className="animate-pulse duration-700 ml-1 font-extralight text-blue-400">|</span>
            )}
          </span>
        </h1>

        {/* Ascending Bio */}
        <p className={`text-lg sm:text-xl text-white/90 leading-relaxed transition-all duration-1000 transform
          ${startContentAnimation ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6 pointer-events-none'}`}
        >
          I am a UI/UX developer and digital marketer focused on improving digital experiences with user-friendly design and effective marketing strategies.
        </p>

        {/* --- BUTTONS SECTION WITH SWIPE ANIMATION --- */}
        <div className={`flex justify-center lg:justify-start gap-4 mt-6 transition-all duration-1000 delay-300 transform
          ${startContentAnimation ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6 pointer-events-none'}`}
        >
          {/* Button 1: Swipe to White background */}
          <button
            onClick={() => scrollToSection('contact')}
            className='group relative overflow-hidden bg-transparent text-white font-bold py-2.5 px-6 rounded-full border border-white transition-colors duration-300 hover:text-[#161f4a]'
          >
            {/* The Swipe Layer */}
            <span className='absolute inset-0 w-full h-full bg-white transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out -z-10' />
            <span className='relative z-10'>Contact Me</span>
          </button>

          {/* Button 2: Swipe to Light Ice Blue background */}
          <button
            onClick={() => scrollToSection('portfolio')}
            className='group relative overflow-hidden bg-transparent text-white font-bold py-2.5 px-6 rounded-full border border-white transition-colors duration-300 hover:text-[#161f4a]'
          >
            {/* The Swipe Layer */}
            <span className='absolute inset-0 w-full h-full bg-blue-100 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out -z-10' />
            <span className='relative z-10'>View Projects</span>
          </button>
        </div>

        <ul className={`flex justify-center lg:justify-start gap-4 mt-6 text-2xl text-white transition-all duration-1000 delay-500 transform
          ${startContentAnimation ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6 pointer-events-none'}`}
        >
          <li>
            <a href="https://www.facebook.com/ebenezer.tirougdimafa" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <FaFacebook />
            </a>
          </li>
          <li>
            <a href="https://www.instagram.com/tirougdimafa/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <FaInstagram />
            </a>
          </li>
          <li>
            <a href="http://www.linkedin.com/in/ebenezerboadzietiroug" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <FaLinkedin />
            </a>
          </li>
          <li>
            <a href="https://www.tiktok.com/@gratdimafa?_r=1&_t=ZS-97IBL1GaP4u" target="_blank" rel="noopener noreferrer" aria-label="TikTok">
              <FaTiktok />
            </a>
          </li>
        </ul>
      </div>

      {/* Image Block */}
      <div className='flex-1 w-full flex justify-center items-center'>
        <img
          src={HheroImg}
          alt="Ebenezer Profile"
          loading="eager"
          fetchpriority="high"
          className="w-full max-w-md h-auto mb-[-2.4rem] lg:mb-[-5rem] object-cover rounded-2xl"
        />
      </div>

    </div>
  );
}

export default HomeHero;