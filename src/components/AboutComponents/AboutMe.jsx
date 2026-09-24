import React from 'react';
import AboutMeImgFallback from './AboutMeImg.png';
import { Link } from 'react-router-dom';
import useInViewAnimate from '../../hooks/useInViewAnimate';
import { BiUser, BiPhone, BiEnvelope, BiLogoLinkedin, BiArrowBack, BiMedal } from 'react-icons/bi';
import { FaGraduationCap } from 'react-icons/fa';

const iconMap = {
  Name: BiUser,
  Phone: BiPhone,
  Email: BiEnvelope,
  LinkedIn: BiLogoLinkedin,
};

function AboutMe({ content }) {
  const [ref, visible] = useInViewAnimate({ threshold: 0.15 });

  const title = content?.title || "Hi, I'm Ebenezer";
  const tagline = content?.tagline || 'About Me';
  const bio1 = content?.bioParagraph1 || 'A multidisciplinary digital professional focused on driving business growth...';
  const bio2 = content?.bioParagraph2 || 'I focus on crafting digital experiences...';
  const image = content?.image || AboutMeImgFallback;
  const contactDetails = content?.contactDetails || [];
  const educationHistory = content?.educationHistory || [];

  return (
    <section 
      ref={ref}
      id="about-me"
      className="py-20 px-4 sm:px-6 lg:px-12 bg-[#0a0f1d] text-white relative overflow-hidden border-t border-slate-800/80"
      aria-labelledby="aboutme-heading"
    >


      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-96 h-96 bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10 space-y-12">
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

          <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div>
                <span className="inline-block text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-blue-400 bg-blue-500/10 border border-blue-500/20 px-4 py-1.5 rounded-full mb-3">
                  {tagline}
                </span>
                <h2 id="aboutme-heading" className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                  {title}
                </h2>
              </div>

              <p className="text-slate-300 leading-relaxed text-base sm:text-lg font-normal">{bio1}</p>
              {bio2 && <p className="text-slate-300 leading-relaxed text-base sm:text-lg font-normal">{bio2}</p>}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-800/80">
              {contactDetails.map(({ label, value, href }) => {
                const IconComponent = iconMap[label] || BiUser;
                return (
                  <div key={label} className="bg-slate-900/50 border border-slate-800/80 rounded-xl p-3.5 flex items-start gap-3 backdrop-blur-sm">
                    <div className="w-9 h-9 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 flex-shrink-0 mt-0.5">
                      <IconComponent className="text-lg" />
                    </div>
                    <div className="min-w-0">
                      <span className="block text-xs font-medium uppercase tracking-wider text-slate-400 mb-0.5">{label}</span>
                      {href ? (
                        <a href={href} target={href.startsWith('http') ? '_blank' : '_self'} rel="noopener noreferrer" className="text-sm font-medium text-white hover:text-blue-400 transition-colors block truncate">
                          {value}
                        </a>
                      ) : (
                        <p className="text-sm font-medium text-white truncate">{value}</p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800/80 space-y-6">
          <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-400">Education & Credentials</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {educationHistory.map((item, index) => (
              <div key={index} className="bg-slate-900/40 border border-slate-800/80 rounded-xl p-4 flex items-start justify-between gap-3 backdrop-blur-sm">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 flex-shrink-0 mt-0.5">
                    {item.type === 'certificate' ? <BiMedal className="text-lg" /> : <FaGraduationCap className="text-lg" />}
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">{item.degree}</h4>
                    <p className="text-xs text-slate-400 mt-1 leading-snug">{item.institution}</p>
                  </div>
                </div>
                <span className="text-[11px] font-semibold text-slate-400 bg-slate-800/80 border border-slate-700/50 px-2.5 py-1 rounded-md whitespace-nowrap flex-shrink-0">
                  {item.period}
                </span>
              </div>
            ))}
          </div>

          <div className="pt-4">
            <Link to="/contact" className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm py-3 px-8 rounded-xl transition-all duration-200 shadow-lg shadow-blue-600/20">
              <span>Let's Talk</span>
              <BiArrowBack className="text-base rotate-180" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutMe;