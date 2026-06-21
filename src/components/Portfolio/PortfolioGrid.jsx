import React from 'react'
import PL1 from '../Home Hero Section/PL1.png'
import PL2 from '../Home Hero Section/PL2.png'

const projects = [
  {
    image: PL1,
    title: 'Mansur Enterprises',
    description: 'Brand website with modern e-commerce layout, service highlights, and polished product presentation.',
    label: 'E-commerce Website',
    href: '#',
  },
  {
    image: PL2,
    title: 'Flyers & Campaign Assets',
    description: 'High-impact flyer designs for digital marketing, social media, and brand campaigns.',
    label: 'Marketing Design',
    href: '#',
  },
]

function PortfolioGrid() {
  return (
    <section className='py-20 px-4 sm:px-6 lg:px-8 bg-white'>
      <div className='max-w-6xl mx-auto'>
        <div className='mb-12 text-center'>
          <p className='text-xs sm:text-sm uppercase tracking-[0.3em] text-blue-500 font-semibold'>Recent projects</p>
          <h2 className='text-3xl sm:text-4xl font-extrabold text-[#161f4a] mt-4'>Work that moves brands forward</h2>
          <p className='max-w-2xl mx-auto mt-4 text-[#161f4a]/75 leading-relaxed'>Explore a selection of my recent design and digital marketing work, built to make online experiences feel clean, engaging, and memorable.</p>
        </div>

        <div className='grid gap-8 lg:grid-cols-2'>
          {projects.map(({ image, title, description, label, href }) => (
            <a
              key={title}
              href={href}
              className='group block overflow-hidden rounded-[2rem] border border-[#161f4a]/10 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl'
            >
              <div className='relative overflow-hidden'>
                <img
                  src={image}
                  alt={title}
                  className='w-full h-72 object-cover transition-transform duration-300 group-hover:scale-105'
                />
                <div className='absolute inset-0 bg-[#161f4a]/0 group-hover:bg-[#161f4a]/40 transition-colors duration-300' />
              </div>
              <div className='bg-white p-8'>
                <p className='text-sm uppercase tracking-[0.25em] text-[#161f4a]/60 mb-3'>{label}</p>
                <h3 className='text-2xl font-bold text-[#161f4a] mb-3'>{title}</h3>
                <p className='text-[#161f4a]/75 leading-relaxed'>{description}</p>
                <div className='mt-6 text-blue-500 font-bold transition-colors duration-300 group-hover:text-blue-700'>
                  View project →
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

export default PortfolioGrid
