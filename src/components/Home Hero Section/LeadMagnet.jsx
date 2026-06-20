import React, { useState } from 'react'
import ui from "./ui.png"

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xaqzrkpp'

function LeadMagnet() {
  const [formData, setFormData] = useState({ fullname: '', email: '' })
  const [status, setStatus] = useState('idle') // idle | sending | success | error

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: new FormData(e.target),
      })

      if (response.ok) {
        setStatus('success')
      } else {
        setStatus('error')
      }
    } catch (error) {
      setStatus('error')
    }
  }

  return (
    <div id='contact' className='scroll-mt-24 bg-white text-[#161f4a] py-20 px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center'>
      <div className='bg-[#161f4a] rounded-2xl p-6 sm:p-10 lg:p-16'>
        <img src={ui} alt="UI/UX Design" loading='lazy' className='w-full h-auto rounded-lg shadow-lg' />
      </div>

      <div className='flex flex-col items-center'>
        <span className='inline-block bg-blue-500 text-white text-xs sm:text-sm font-bold uppercase tracking-wider px-4 py-1.5 rounded-full mb-4'>
          Limited-Time Offer
        </span>
        <h2 className='text-2xl sm:text-3xl lg:text-4xl font-extrabold mb-6 text-[#161f4a] text-center'>
          Get 20% Off Your First Project
        </h2>
        <p className='text-lg text-[#161f4a]/70 mb-6 text-center max-w-xl leading-relaxed'>
          Drop your details below to claim an exclusive 20% discount on your first
          project with me — intuitive UI/UX, strategic SEO, and tailored marketing
          visuals, at a special introductory rate.
        </p>

        {status === 'success' ? (
          <p className='text-lg font-bold text-[#161f4a] text-center'>
            You're in! I'll personally follow up with your 20% discount code shortly.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className='w-full max-w-md'>
            <label htmlFor='fullname' className='sr-only'>Full name</label>
            <input
              id='fullname'
              name='fullname'
              type='text'
              required
              autoComplete='name'
              value={formData.fullname}
              onChange={handleChange}
              placeholder='Enter your fullname'
              className='w-full px-4 py-2 rounded-full border-[0.2rem] border-[#161f4a] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
            />

            <label htmlFor='email' className='sr-only'>Email</label>
            <input
              id='email'
              name='email'
              type='email'
              required
              autoComplete='email'
              value={formData.email}
              onChange={handleChange}
              placeholder='Enter your email'
              className='w-full px-4 py-2 my-6 rounded-full border-[0.2rem] border-[#161f4a] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
            />

            <button
              type='submit'
              disabled={status === 'sending'}
              className='bg-[#161f4a] text-white py-3 px-6 rounded-full w-full font-bold hover:bg-[#0d1530] transition-colors duration-300 disabled:opacity-60 disabled:cursor-not-allowed'
            >
              {status === 'sending' ? 'Sending...' : 'Claim My 20% Discount'}
            </button>

            {status === 'error' && (
              <p className='text-red-600 text-sm mt-3 text-center'>
                Something went wrong sending that — please try again.
              </p>
            )}
          </form>
        )}
      </div>
    </div>
  )
}

export default LeadMagnet