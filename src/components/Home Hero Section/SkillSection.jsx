// SkillSection.jsx
import React from 'react';
import useInViewAnimate from '../../hooks/useInViewAnimate';
import { BiLaptop, BiSearch, BiShareAlt, BiCheckCircle } from "react-icons/bi";

const iconMap = {
  BiLaptop: BiLaptop,
  BiSearch: BiSearch,
  BiShareAlt: BiShareAlt,
};

function SkillSection({ servicesData }) {
  const [sectionRef, sectionVisible] = useInViewAnimate({ threshold: 0.15 });

  if (!servicesData) return null;

  return (
    <section ref={sectionRef} id="about" className="bg-[#0a0f1d] text-white py-20 px-4 sm:px-6 lg:px-12 relative border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 transition-all duration-1000 ${sectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {servicesData.map((service) => {
            const Icon = iconMap[service.icon] || BiLaptop;
            return (
              <div key={service.id} className="bg-slate-900/60 border border-slate-800 rounded-2xl p-8 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-14 h-14 rounded-xl bg-blue-600/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                      <Icon className="text-2xl" />
                    </div>
                    <span className="text-[11px] font-semibold text-slate-400 bg-slate-800/80 border border-slate-700 px-3 py-1 rounded-full uppercase">
                      {service.badge}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
                  <p className="text-sm text-slate-400 mb-6">{service.description}</p>
                  <ul className="space-y-3">
                    {service.items.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-sm text-slate-300">
                        <BiCheckCircle className="text-blue-400 text-lg flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default SkillSection;