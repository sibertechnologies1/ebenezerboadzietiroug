import React, { useState } from 'react'
import useInViewAnimate from '../../hooks/useInViewAnimate'

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xaqzrkpp'

const inputBase =
  'mt-1 w-full bg-transparent border-b-2 border-white/20 focus:border-[#161f4a] outline-none text-white placeholder-white/30 py-2 text-sm transition duration-300'

function Field({ label, children }) {
  return (
    <label className="flex flex-col gap-1">
      <span className="text-xs font-semibold uppercase tracking-widest text-[#161f4a]">
        {label}
      </span>
      {children}
    </label>
  )
}

function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState(null) // null | { type: 'success'|'error', message: string }
  const [loading, setLoading] = useState(false)

  const [ref, visible] = useInViewAnimate({ threshold: 0.2 })

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const validate = () => {
    if (!form.name.trim()) return 'Please enter your name.'
    if (!/\S+@\S+\.\S+/.test(form.email)) return 'Please enter a valid email address.'
    if (!form.message.trim()) return 'Please enter a message.'
    return null
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const error = validate()
    if (error) {
      setStatus({ type: 'error', message: error })
      return
    }

    setLoading(true)
    setStatus(null)

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: new FormData(e.target),
      })

      if (response.ok) {
        setStatus({ type: 'success', message: "Message sent — I'll be in touch soon." })
        setForm({ name: '', email: '', subject: '', message: '' })
      } else {
        throw new Error('Formspree error')
      }
    } catch {
      // Formspree failed — fall back to mailto
      const subject = encodeURIComponent(form.subject || 'New message from portfolio')
      const body = encodeURIComponent(
        `Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`
      )
      window.location.href = `mailto:eboadzietiroug@gmail.com?subject=${subject}&body=${body}`
      setStatus({ type: 'success', message: 'Opening your email client...' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${visible ? 'animate-fade-up' : 'opacity-0'}`}
    >
      <form
        onSubmit={handleSubmit}
        noValidate
        className="w-full max-w-2xl mx-auto"
      >
        {/* Card */}
        <div className="bg-white/5 border border-white/10 rounded-2xl px-8 py-10 backdrop-blur-sm">

          {/* Header */}
          <div className="mb-8">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#161f4a] mb-1">
              Get in touch
            </p>
            <h2 className="text-white font-extrabold text-2xl sm:text-3xl">
              Let's work together
            </h2>
          </div>

          {/* Fields */}
          <div className="flex flex-col gap-7">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-7">
              <Field label="Name">
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className={inputBase}
                  placeholder=" Full name" className = "border border-[#161f4a] rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </Field>
              <Field label="Email">
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  className={inputBase}
                  placeholder="papdad@email.com" className = "border border-[#161f4a] rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </Field>
            </div>

            <Field label="Subject">
              <input
                name="subject"
                value={form.subject}
                onChange={handleChange}
                className={inputBase}
                placeholder="What's this about?" className = "border border-[#161f4a] rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </Field>

            <Field label="Message">
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                rows={5}
                className={`${inputBase} resize-none`}
                placeholder="Tell me about your project..." className = "border border-[#161f4a] rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </Field>
          </div>

          {/* Footer row */}
          <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <button
              type="submit"
              disabled={loading}
              className="bg-[#161f4a] text-[#ffffff] font-bold py-3 px-8 rounded-full hover:bg-[#161f4a]-300 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Sending...' : 'Send Message'}
            </button>

            {status && (
              <p
                className={`text-sm font-medium ${
                  status.type === 'error' ? 'text-red-400' : 'text-green-400'
                }`}
              >
                {status.type === 'error' ? '✗ ' : '✓ '}
                {status.message}
              </p>
            )}
          </div>
        </div>
      </form>
    </div>
  )
}

export default ContactForm