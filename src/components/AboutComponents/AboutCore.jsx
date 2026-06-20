import React, { useEffect, useRef, useState } from 'react'

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
    <div className=' grid lg:grid-cols-2 grid-cols-1 justify-center items-center bg-white py-8 px-4 md:px-12 gap-4'>
      <div className=' flex flex-col flex-1'>
        <h4 className=' text-[#161f4a]'>MY CORE EXPERTISE</h4>
        <h1 className=' text-[#161f4a] font-extrabold text-[4rem] leading-[60px]'>  Let's Work <br />
            Together</h1>

        <p className=' text-[#161f4a] text-[1.2rem] my-4'>
            I am a passionate digital creator dedicatd to turning your vision into impact. Whether it's designing a frictionless user experience, scaling your brand's digital reach or building a high-performance web presence, my multi-disciplined approach bridges the gap between creativity and measurable business growth.
        </p>
        <a href="/contact" className=' text-[#161f4a] bg-[#ffffff] hover:text-[#ffffff]  border-4 border-[#161f4a] hover:bg-[#0d1b3a] hover:border-white py-2 px-4 rounded-full  transition-colors duration-300 w-64 text-center font-bold text-[1.5rem]'>
          Hire Me
        </a>
      </div>

      <div ref={skillsRef} className='flex flex-col justify-center gap-10 w-full'>
        {skills.map((skill) => (
          <div key={skill.name}>
            <h3 className='text-[#161f4a] font-bold text-lg mb-2'>{skill.name}</h3>
            <div className='relative pt-8'>
              <span
                className='absolute -top-1 -translate-x-1/2 border-2 border-[#161f4a] rounded-lg px-3 py-1 text-sm font-bold text-[#161f4a] bg-white whitespace-nowrap transition-all duration-1000 ease-out'
                style={{ left: animate ? `${skill.percent}%` : '0%' }}
              >
                {skill.percent}%
              </span>
              <div className='w-full h-3 bg-white border-2 border-[#161f4a] rounded-full overflow-hidden'>
                <div
                  className='h-full bg-[#161f4a] rounded-full transition-all duration-1000 ease-out'
                  style={{ width: animate ? `${skill.percent}%` : '0%' }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AboutCore