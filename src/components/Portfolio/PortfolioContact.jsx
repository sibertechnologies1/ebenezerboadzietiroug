import React from 'react'
import useInViewAnimate from '../../hooks/useInViewAnimate'

function PortfolioContact() {
  const [ref, visible] = useInViewAnimate({ threshold: 0.2 })

  return (
    <section ref={ref} className='bg-[#161f4a] text-white py-20 px-4 sm:px-6 lg:px-8'>
      <div className={`max-w-6xl mx-auto rounded-[2rem] border border-white/10 bg-white/5 p-10 sm:p-12 shadow-2xl ${visible ? 'animate-fade-up' : 'opacity-0'}`}>
        <div className='grid gap-8 lg:grid-cols-[1.2fr_0.8fr] items-center'>
          <div>
            <p className='text-sm uppercase tracking-[0.3em] text-blue-300 font-semibold'>Work together</p>
            <h2 className='mt-4 text-3xl sm:text-4xl font-extrabold'>Ready to turn your next idea into a polished digital experience?</h2>
            <p className='mt-4 max-w-2xl text-[#dbe2ff]/85 leading-relaxed'>Whether you need a website refresh, marketing campaign, or UX design system, I help brands connect with customers through better digital design.</p>
          </div>

          <div className='rounded-3xl bg-[#0f1a3c]/90 p-8 border border-white/10'>
            <p className='text-sm uppercase tracking-[0.3em] text-blue-200 font-semibold'>Contact me</p>
            <p className='mt-4 text-base text-[#dbe2ff]/80'>Send a message and I’ll reply with a free project proposal or next steps.</p>
            <a
              href='mailto:eboadzietiroug@gmail.com'
              className='mt-8 inline-flex w-full items-center justify-center rounded-full bg-blue-500 px-6 py-3 text-sm font-bold uppercase tracking-[0.2em] text-white transition hover:bg-blue-400 motion-safe:hover:scale-[1.02]'
            >
              Email me
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default PortfolioContact
