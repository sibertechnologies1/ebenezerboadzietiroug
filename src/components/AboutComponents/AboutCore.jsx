import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { BiRightArrowAlt } from 'react-icons/bi';
import useInViewAnimate from '../../hooks/useInViewAnimate';

const skills = [
  { name: 'UI/UX Design & Architecture', percent: 92 },
  { name: 'Web Development (Front-end)', percent: 88 },
  { name: 'Digital Marketing & Strategy', percent: 85 },
];

function AboutCore() {
  const [animate, setAnimate] = useState(false);
  const skillsRef = useRef(null);
  const [ref, visible] = useInViewAnimate({ threshold: 0.2 });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimate(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (skillsRef.current) observer.observe(skillsRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={ref} 
      aria-labelledby="aboutcore-heading" 
      className="bg-[#0a0f1d] text-white py-20 px-4 sm:px-6 lg:px-12 relative overflow-hidden border-t border-slate-800/80"
    >
      {/* Background Glow Effect */}
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* Left Column: Heading & Intro */}
        <div className={`lg:col-span-6 flex flex-col justify-center space-y-6 transition-all duration-1000 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div>
            <span className="inline-block text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-blue-400 bg-blue-500/10 border border-blue-500/20 px-4 py-1.5 rounded-full mb-3">
              My Core Expertise
            </span>
            <h2 id="aboutcore-heading" className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Let's work together
            </h2>
          </div>

          <p className="text-slate-300 leading-relaxed text-base sm:text-lg font-normal">
            I am a passionate digital creator dedicated to turning your vision into impact. Whether it's designing a frictionless user experience, scaling your brand's digital reach, or building a high-performance web presence, my multidisciplinary approach bridges creativity and measurable business growth.
          </p>

          <div className="pt-2">
            <Link
              to="/contact"
              aria-label="Contact Ebenezer to start a project"
              className="group inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm py-3.5 px-8 rounded-xl transition-all duration-200 shadow-lg shadow-blue-600/20"
            >
              <span>Hire Me</span>
              <BiRightArrowAlt className="text-xl transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        {/* Right Column: Skill Progress Bars */}
        <div 
          ref={skillsRef} 
          className={`lg:col-span-6 flex flex-col justify-center gap-6 bg-slate-900/40 border border-slate-800/80 p-6 sm:p-8 rounded-2xl backdrop-blur-sm shadow-2xl transition-all duration-1000 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          {skills.map((skill) => (
            <div key={skill.name} className="space-y-3">
              <div className="flex justify-between items-center text-sm font-semibold">
                <span className="text-white tracking-wide">{skill.name}</span>
                <span className="text-blue-400 font-mono text-xs bg-blue-500/10 border border-blue-500/20 px-2.5 py-0.5 rounded-md">
                  {skill.percent}%
                </span>
              </div>

              {/* Progress Bar Track */}
              <div
                role="progressbar"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={animate ? skill.percent : 0}
                aria-label={`${skill.name} proficiency`}
                className="w-full h-3 bg-slate-800/80 rounded-full overflow-hidden p-0.5 border border-slate-700/50"
              >
                {/* Progress Bar Fill */}
                <div
                  className="h-full bg-gradient-to-r from-blue-600 to-blue-400 rounded-full transition-all duration-1000 ease-out motion-reduce:transition-none"
                  style={{ width: animate ? `${skill.percent}%` : '0%' }}
                />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default AboutCore;