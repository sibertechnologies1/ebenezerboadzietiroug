import React, { useEffect, useState } from 'react';
import { FaHandshake, FaClipboardList, FaCalendarDays } from 'react-icons/fa6';
import useInViewAnimate from '../../hooks/useInViewAnimate';

const iconList = [FaHandshake, FaClipboardList, FaCalendarDays];

function StatCard({ icon: Icon, value, suffix, label, animate }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!animate) return;
    const duration = 1200;
    const startTime = performance.now();

    const step = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const easeOutQuad = 1 - (1 - progress) * (1 - progress);
      setCount(Math.round(easeOutQuad * value));
      if (progress < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  }, [animate, value]);

  return (
    <div className="group bg-slate-900/40 border border-slate-800/80 hover:border-blue-500/30 rounded-2xl p-8 flex flex-col items-center text-center transition-all duration-300 backdrop-blur-sm shadow-xl hover:-translate-y-1">
      <div className="w-14 h-14 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-5 group-hover:scale-110 transition-transform duration-300">
        <Icon className="text-2xl" />
      </div>

      <span className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight font-mono">
        {count}
        <span className="text-blue-400">{suffix}</span>
      </span>

      <p className="mt-2 text-sm sm:text-base font-medium text-white tracking-wide uppercase">
        {label}
      </p>
    </div>
  );
}

function StatsSection({ content }) {
  const [animate, setAnimate] = useState(false);
  const [ref, visible] = useInViewAnimate({ threshold: 0.3 });

  const stats = content?.stats || [];

  useEffect(() => {
    if (visible) setAnimate(true);
  }, [visible]);

  return (
    <section ref={ref} className="bg-[#0a0f1d] py-16 px-4 sm:px-6 lg:px-12 relative overflow-hidden border-t border-slate-800/80" aria-label="Key Statistics">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[200px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className={`grid grid-cols-1 sm:grid-cols-3 gap-6 lg:gap-8 transition-all duration-1000 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {stats.map((stat, idx) => (
            <StatCard 
              key={stat.label} 
              icon={iconList[idx % iconList.length]} 
              value={Number(stat.value)} 
              suffix={stat.suffix} 
              label={stat.label} 
              animate={animate} 
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default StatsSection;