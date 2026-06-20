import React from 'react'
import PL1 from "./PL1.png"
import PL2 from "./PL2.png"

const projects = [
  { image: PL1, title: 'Mansur Enterprises', label: 'E-COMMERCE WEBSITE', href: '#' },
  { image: PL2, title: 'Flyers', label: 'View Flyers', href: '#' },
]

const PortfolioSection = () => {
  return (
    <div id='portfolio' className='scroll-mt-24 bg-[#161f4a] text-white py-20 px-4 sm:px-6 lg:px-8'>
      <p className='text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-blue-300 text-center mb-3'>
        My Portfolio
      </p>
      <h2 className='text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-12 text-center'>
        SHOWCASING RECENT WORK
      </h2>

      <div className='grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-5xl mx-auto'>
        {projects.map(({ image, title, label, href }) => (
          <a
            key={title}
            href={href}
            className='group bg-white text-[#161f4a] flex flex-col rounded-2xl shadow-lg overflow-hidden transition-transform duration-300 hover:-translate-y-1 hover:shadow-2xl motion-reduce:transition-none motion-reduce:hover:translate-y-0'
          >
            <div className='relative overflow-hidden'>
              <img
                src={image}
                alt={`${title} project preview`}
                loading='lazy'
                className='w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105'
              />
              <div className='absolute inset-0 bg-[#161f4a]/0 group-hover:bg-[#161f4a]/50 transition-colors duration-300 flex items-center justify-center'>
                <span className='text-white font-bold text-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                  View Project →
                </span>
              </div>
            </div>
            <div className='flex flex-col items-center text-center p-6'>
              <h3 className='text-2xl font-bold mb-2'>{title}</h3>
              <p className='text-lg text-[#161f4a]/70'>{label}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  )
}

export default PortfolioSection