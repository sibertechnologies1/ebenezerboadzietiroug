import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

const skills = [
  { name: 'UI/UX Designer', percent: 92 },
  { name: 'Web Development (Front-end)', percent: 88 },
  { name: 'Digital Marketing', percent: 85 },
]

function AboutCore() {
  const [animate, setAnimate] = useState(false)
  const skillsRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimate(true)
          observer.disconnect()
        }
      },
      { threshold: 0.3 }
    )

    if (skillsRef.current) observer.observe(skillsRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section aria-labelledby='aboutcore-heading' className='grid lg:grid-cols-2 grid-cols-1 justify-center items-center bg-white py-8 px-4 md:px-12 gap-6'>
      <div className='flex flex-col flex-1'>
        <p className='text-sm uppercase tracking-[0.25em] text-blue-500 font-semibold mb-2'>MY CORE EXPERTISE</p>
        <h1 id='aboutcore-heading' className='text-[#161f4a] font-extrabold text-3xl sm:text-4xl md:text-5xl leading-tight'>Let's work
          <br /> together</h1>

        <p className='text-[#161f4a] text-base sm:text-lg my-4 max-w-2xl'>
          I am a passionate digital creator dedicated to turning your vision into impact. Whether it's designing a frictionless user experience, scaling your brand's digital reach, or building a high-performance web presence, my multidisciplinary approach bridges creativity and measurable business growth.
        </p>

        <Link
          to='/contact'
          aria-label='Contact Ebenezer to start a project'
          className='inline-block text-[#161f4a] bg-white hover:text-white border-4 border-[#161f4a] hover:bg-[#0d1b3a] hover:border-white py-2 px-6 rounded-full transition-colors duration-300 w-full sm:w-64 text-center font-bold text-lg'
        >
          Hire Me
        </Link>
      </div>

      <div ref={skillsRef} className='flex flex-col justify-center gap-8 w-full' aria-hidden={false}>
        {skills.map((skill) => (
          <div key={skill.name}>
            <h3 className='text-[#161f4a] font-bold text-lg mb-2'>{skill.name}</h3>
            <div className='relative pt-8'>
              <span
                className='absolute -top-1 -translate-x-1/2 border-2 border-[#161f4a] rounded-lg px-3 py-1 text-sm font-bold text-[#161f4a] bg-white whitespace-nowrap transition-all duration-1000 motion-reduce:transition-none'
                style={{ left: animate ? `${Math.min(skill.percent, 95)}%` : '0%' }}
                aria-hidden='true'
              >
                {skill.percent}%
              </span>

              <div
                role='progressbar'
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={animate ? skill.percent : 0}
                aria-label={`${skill.name} proficiency`}
                className='w-full h-3 bg-white border-2 border-[#161f4a] rounded-full overflow-hidden'
              >
                <div
                  className='h-full bg-[#161f4a] rounded-full transition-all duration-1000 motion-reduce:transition-none'
                  style={{ width: animate ? `${skill.percent}%` : '0%' }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default AboutCore