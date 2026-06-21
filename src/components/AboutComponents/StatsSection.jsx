import React, { useEffect, useState } from 'react'
import { FaHandshake, FaClipboardList, FaCalendarDays } from 'react-icons/fa6'
import useInViewAnimate from '../../hooks/useInViewAnimate'

const stats = [
  { icon: FaHandshake, value: 20, suffix: '', label: 'Clients', circle: false },
  { icon: FaClipboardList, value: 20, suffix: '', label: 'Projects', circle: false },
  { icon: FaCalendarDays, value: 5, suffix: '+', label: 'Years of Experience', circle: true },
]

function StatCard({ icon: Icon, value, suffix, label, circle, animate }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!animate) return

    const duration = 1200
    const startTime = performance.now()

    const step = (now) => {
      const progress = Math.min((now - startTime) / duration, 1)
      setCount(Math.round(progress * value))
      if (progress < 1) requestAnimationFrame(step)
    }

    requestAnimationFrame(step)
  }, [animate, value])

  return (
    <div className='flex flex-col items-center text-center text-white'>
      <div className={circle ? 'w-16 h-16 rounded-full border-2 border-white flex items-center justify-center mb-4' : 'mb-4'}>
        <Icon className='text-4xl' />
      </div>
      <span className='text-6xl font-extrabold'>{count}{suffix}</span>
      <p className='mt-2 text-lg'>{label}</p>
    </div>
  )
}

function StatsSection() {
  const [animate, setAnimate] = useState(false)
  const [ref, visible] = useInViewAnimate({ threshold: 0.3 })

  useEffect(() => {
    if (visible) setAnimate(true)
  }, [visible])

  return (
    <div ref={ref} className='bg-[#161f4a] py-16 px-4 sm:px-6 lg:px-8'>
      <div className={`grid grid-cols-1 sm:grid-cols-3 gap-10 max-w-5xl mx-auto ${visible ? 'animate-fade-up' : 'opacity-0'}`}>
        {stats.map((stat) => (
          <StatCard key={stat.label} {...stat} animate={animate} />
        ))}
      </div>
    </div>
  )
}

export default StatsSection