import React from 'react'
import { Link } from 'react-router-dom'

function PortfolioHero() {
  return (
    <section className='bg-[#161f4a] text-white py-20 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-6xl mx-auto flex flex-col items-center text-center gap-6'>
        <p className='uppercase tracking-[0.3em] text-blue-300 font-semibold text-sm sm:text-base'>Portfolio</p>
        <h1 className='text-4xl sm:text-5xl lg:text-6xl font-extrabold'>Featured digital work</h1>
        <p className='max-w-2xl text-base sm:text-lg text-[#dbe2ff]/85'>Selected projects showcasing responsive UI, marketing pages, and brand experiences designed to help businesses attract, engage, and convert visitors.</p>
        <div className='flex flex-wrap justify-center items-center gap-3 text-sm font-bold uppercase tracking-[0.2em] text-[#dbe2ff]'>
          <Link to='/' className='hover:text-white transition'>Home</Link>
          <span className='text-[#dbe2ff]/50'>/</span>
          <span className='text-white'>Portfolio</span>
        </div>
      </div>
    </section>
  )
}

export default PortfolioHero
