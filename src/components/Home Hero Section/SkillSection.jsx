import React from 'react';
import useInViewAnimate from '../../hooks/useInViewAnimate';
import { BiLaptop, BiSearch, BiShareAlt, BiCheckCircle } from "react-icons/bi";

const services = [
  {
    icon: BiLaptop,
    title: 'UI/UX Development',
    badge: 'Design & Code',
    description: 'Creating high-performing, conversion-focused user interfaces built for modern web applications.',
    items: [
      'Responsive Web Design',
      'User Research & Wireframing',
      'Interactive Prototyping',
      'Frontend UI Implementation',
    ],
  },
  {
    icon: BiSearch,
    title: 'Search Engine Optimization',
    badge: 'Organic Growth',
    description: 'Improving your web visibility and search rankings to capture qualified high-intent leads.',
    items: [
      'Technical SEO Audit',
      'Keyword Strategy & Research',
      'On-Page & Off-Page Optimization',
      'Local SEO & Analytics',
    ],
  },
  {
    icon: BiShareAlt,
    title: 'Social Media Marketing',
    badge: 'Brand Strategy',
    description: 'Executing targeted social campaigns to scale reach, boost engagement, and convert followers.',
    items: [
      'Campaign Strategy & Planning',
      'Visual Assets & Content Creation',
      'Audience Targeting & Growth',
      'Performance & ROI Tracking',
    ],
  },
];

function SkillSection() {
  const [sectionRef, sectionVisible] = useInViewAnimate({ threshold: 0.15 });

  return (
    <section 
      ref={sectionRef} 
      id="about" 
      className="scroll-mt-24 bg-[#0a0f1d] text-white py-20 px-4 sm:px-6 lg:px-12 relative overflow-hidden border-t border-slate-800/80"
    >
      {/* Background glow effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header Block */}
        <div className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-700 ${sectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <span className="inline-block text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-blue-400 bg-blue-500/10 border border-blue-500/20 px-4 py-1.5 rounded-full mb-4">
            What I Offer
          </span>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Services Built To Scale <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-cyan-300">
              Your Digital Presence
            </span>
          </h2>

          <p className="text-base sm:text-lg text-slate-300 mt-4 leading-relaxed font-normal">
            I bridge the gap between intuitive user experience design and performance marketing strategies to help businesses attract, engage, and retain their target audience.
          </p>
        </div>

        {/* Services Grid */}
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 transition-all duration-1000 delay-200 ${sectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {services.map(({ icon: Icon, title, badge, description, items }) => (
            <div
              key={title}
              className="group relative bg-slate-900/60 border border-slate-800 hover:border-blue-500/50 rounded-2xl p-8 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 shadow-xl hover:shadow-2xl hover:shadow-blue-500/10 backdrop-blur-sm"
            >
              {/* Gradient Accent Bar on Hover */}
              <div className="absolute top-0 left-8 right-8 h-[2px] bg-gradient-to-r from-blue-500 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-t-2xl" />

              <div>
                {/* Header Info */}
                <div className="flex items-center justify-between mb-6">
                  <div className="w-14 h-14 rounded-xl bg-blue-600/10 border border-blue-500/20 flex items-center justify-center text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                    <Icon className="text-2xl" />
                  </div>
                  <span className="text-[11px] font-semibold text-slate-400 bg-slate-800/80 border border-slate-700 px-3 py-1 rounded-full uppercase tracking-wider">
                    {badge}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-300 transition-colors duration-200">
                  {title}
                </h3>

                <p className="text-sm text-slate-400 mb-6 leading-relaxed">
                  {description}
                </p>

                {/* Divider Line */}
                <div className="w-full h-[1px] bg-slate-800 mb-6" />

                {/* Deliverables List */}
                <ul className="space-y-3">
                  {items.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-slate-300">
                      <BiCheckCircle className="text-blue-400 text-lg flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default SkillSection;