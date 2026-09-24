import React from 'react';
import { BiEnvelope, BiRightArrowAlt } from 'react-icons/bi';
import useInViewAnimate from '../../hooks/useInViewAnimate';

function PortfolioContact({ content }) {
  const [ref, visible] = useInViewAnimate({ threshold: 0.2 });

  const tagline = content?.tagline || 'Work Together';
  const title = content?.title || 'Ready to turn your next idea into a polished digital experience?';
  const description = content?.description || 'Whether you need a website refresh...';
  const ctaText = content?.ctaText || "Send a message and I'll reply with a project proposal or next steps.";
  const email = content?.email || 'eboadzietiroug@gmail.com';

  return (
    <section 
      ref={ref} 
      className="bg-[#0a0f1d] text-white py-20 px-4 sm:px-6 lg:px-12 relative overflow-hidden border-t border-slate-800/80"
      aria-label="Portfolio Call to Action"
    >
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[500px] h-[300px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className={`max-w-6xl mx-auto relative z-10 transition-all duration-1000 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="rounded-3xl border border-slate-800/80 bg-slate-900/40 p-8 sm:p-12 shadow-2xl backdrop-blur-md relative overflow-hidden">
          <div className="absolute top-0 right-0 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] items-center relative z-10">
            <div className="space-y-4">
              <span className="inline-block text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-blue-400 bg-blue-500/10 border border-blue-500/20 px-4 py-1.5 rounded-full">
                {tagline}
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
                {title}
              </h2>
              <p className="text-slate-300 leading-relaxed text-base sm:text-lg font-normal max-w-2xl">
                {description}
              </p>
            </div>

            <div className="rounded-2xl bg-slate-950/60 border border-slate-800/90 p-6 sm:p-8 backdrop-blur-md flex flex-col justify-between space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-blue-400">
                  <BiEnvelope className="text-xl" />
                  <span className="text-xs font-semibold uppercase tracking-[0.2em]">
                    Get In Touch
                  </span>
                </div>
                <p className="text-slate-300 text-sm leading-relaxed">
                  {ctaText}
                </p>
              </div>

              <a
                href={`mailto:${email}`}
                className="group inline-flex items-center justify-center gap-2 w-full rounded-xl bg-blue-600 hover:bg-blue-500 px-6 py-3.5 text-sm font-semibold text-white transition-all duration-200 shadow-lg shadow-blue-600/20"
              >
                <span>Email Me</span>
                <BiRightArrowAlt className="text-xl transition-transform duration-200 group-hover:translate-x-1" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PortfolioContact;