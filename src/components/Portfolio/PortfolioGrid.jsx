import React from 'react'
import useInViewAnimate from '../../hooks/useInViewAnimate'

// Helper function to extract Google Drive file ID and build a direct viewable image link
const getDriveImageUrl = (url) => {
  if (!url) return '';
  // Match standard file sharing URL format: /file/d/FILE_ID/
  const fileMatch = url.match(/\/file\/d\/([a-zA-Z0-9-_]+)/);
  if (fileMatch && fileMatch[1]) {
    return `https://drive.google.com/uc?export=view&id=${fileMatch[1]}`;
  }
  // Match query parameter format: ?id=FILE_ID
  const idMatch = url.match(/[?&]id=([a-zA-Z0-9-_]+)/);
  if (idMatch && idMatch[1]) {
    return `https://drive.google.com/uc?export=view&id=${idMatch[1]}`;
  }
  return url; // Fallback to original URL if it's a local import or direct URL
};

const projects = [
  {
    // Replace with your Google Drive image link for Mansur Enterprises
    image: 'https://drive.google.com/file/d/YOUR_FILE_ID_1/view?usp=sharing',
    title: 'Mansur Enterprises',
    description: 'Brand website with modern e-commerce layout, service highlights, and polished product presentation.',
    label: 'E-commerce Website',
    href: 'https://mansurenterprise-oxr3.vercel.app/',
  },
  {
    // Replace with your Google Drive image link for Marketing Assets
    image: 'https://drive.google.com/file/d/YOUR_FILE_ID_2/view?usp=sharing',
    title: 'Flyers & Campaign Assets',
    description: 'High-impact flyer designs for digital marketing, social media, and brand campaigns.',
    label: 'Marketing Design',
    href: '#',
  },
]

function PortfolioGrid() {
  const [ref, visible] = useInViewAnimate({ threshold: 0.2 })

  return (
    <section ref={ref} className='py-20 px-4 sm:px-6 lg:px-8 bg-white'>
      <div className='max-w-6xl mx-auto'>
        <div className={`mb-12 text-center ${visible ? 'animate-fade-up' : 'opacity-0'}`}>
          <p className='text-xs sm:text-sm uppercase tracking-[0.3em] text-blue-500 font-semibold'>Recent projects</p>
          <h2 className='text-3xl sm:text-4xl font-extrabold text-[#161f4a] mt-4'>Work that moves brands forward</h2>
          <p className='max-w-2xl mx-auto mt-4 text-[#161f4a]/75 leading-relaxed'>
            Explore a selection of my recent design and digital marketing work, built to make online experiences feel clean, engaging, and memorable.
          </p>
        </div>

        <div className={`grid gap-8 lg:grid-cols-2 ${visible ? 'animate-fade-up delay-100' : 'opacity-0'}`}>
          {projects.map(({ image, title, description, label, href }) => (
            <a
              key={title}
              href={href}
              target={href !== '#' ? '_blank' : '_self'}
              rel='noopener noreferrer'
              className='group block overflow-hidden rounded-[2rem] border border-[#161f4a]/10 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl'
            >
              <div className='relative overflow-hidden bg-gray-100'>
                <img
                  src={getDriveImageUrl(image)}
                  alt={title}
                  className='w-full h-72 object-cover transition-transform duration-300 group-hover:scale-105'
                  loading='lazy'
                  onError={(e) => {
                    // Gray placeholder fallback if the Drive link permissions are not set to public
                    e.target.src = 'https://via.placeholder.com/600x400?text=Image+Loading+Failed';
                  }}
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