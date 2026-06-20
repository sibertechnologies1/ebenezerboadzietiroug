import React from 'react'
import { BiLaptop, BiSearch, BiCode } from "react-icons/bi";

const services = [
  {
    icon: BiLaptop,
    title: 'UI/UX Development',
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
    items: [
      'Technical SEO Audit',
      'Keyword Strategy & Research',
      'On-Page SEO Audit',
      'Off-Page SEO Audit',
      'Local SEO',
    ],
  },
  {
    icon: BiCode,
    title: 'Social Media Marketing',
    items: [
      'Campaign Strategy & Plan',
      'Flyer Design',
      'Audience Targeting & Growth',
      'Analytics & Performance Tracking',
    ],
  },
]

function SkillSection() {
  return (
    <div id='about' className='scroll-mt-24 bg-white px-4 sm:px-6 lg:px-8 flex flex-col gap-8 py-12'>
      <div className='items-center flex flex-col'>
        <p className='text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-blue-500'>What I Do</p>
        <h2 className='text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#161f4a] text-center mt-3'>
          Services Build To Grow Your Brand
        </h2>
        <p className='text-base sm:text-lg lg:text-xl text-[#161f4a]/80 text-center mt-4 max-w-2xl mx-auto leading-relaxed'>
          I combine intuitive user experience design with powerful digital marketing strategies to help businesses attract, engage and convert their ideal audience.
        </p>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
        {services.map(({ icon: Icon, title, items }) => (
          <div
            key={title}
            className='bg-[#161f4a] text-white flex flex-col items-center p-8 rounded-2xl shadow-lg h-full transition-transform duration-300 hover:-translate-y-1 hover:shadow-2xl motion-reduce:transition-none motion-reduce:hover:translate-y-0'
          >
            <div className='inline-flex items-center justify-center w-16 h-16 rounded-xl bg-white/10 mb-5'>
              <Icon className='text-3xl text-blue-300' />
            </div>
            <h3 className='text-xl font-bold mb-3 text-center'>{title}</h3>
            <ul className='w-full text-left space-y-2'>
              {items.map((item) => (
                <li key={item} className='text-base text-white/85 leading-relaxed'>
                  • {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SkillSection