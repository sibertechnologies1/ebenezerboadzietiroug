import React, { useState } from 'react'
import useInViewAnimate from '../../hooks/useInViewAnimate'

function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState(null)

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const validate = () => {
    if (!form.name.trim()) return false
    if (!/\S+@\S+\.\S+/.test(form.email)) return false
    if (!form.message.trim()) return false
    return true
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validate()) {
      setStatus({ type: 'error', message: 'Please fill in your name, a valid email and a message.' })
      return
    }

    // Fallback via mailto to keep this client-only and work without a backend
    const subject = encodeURIComponent(form.subject || 'New message from portfolio')
    const body = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`)
    window.location.href = `mailto:eboadzietiroug@gmail.com?subject=${subject}&body=${body}`
    setStatus({ type: 'success', message: 'Opening your email client...' })
  }

  const [ref, visible] = useInViewAnimate({ threshold: 0.2 })

  return (
    <form ref={ref} onSubmit={handleSubmit} className={`w-full max-w-2xl mx-auto bg-white p-6 rounded-2xl shadow-md ${visible ? 'animate-fade-up' : 'opacity-0'}`}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <label className="flex flex-col">
          <span className="text-sm font-semibold text-[#161f4a]">Name</span>
          <input name="name" value={form.name} onChange={handleChange} className="mt-1 p-3 rounded-lg border" placeholder="Your name" />
        </label>

        <label className="flex flex-col">
          <span className="text-sm font-semibold text-[#161f4a]">Email</span>
          <input name="email" value={form.email} onChange={handleChange} className="mt-1 p-3 rounded-lg border" placeholder="you@example.com" />
        </label>
      </div>

      <label className="flex flex-col mt-4">
        <span className="text-sm font-semibold text-[#161f4a]">Subject</span>
        <input name="subject" value={form.subject} onChange={handleChange} className="mt-1 p-3 rounded-lg border" placeholder="Project or reason" />
      </label>

      <label className="flex flex-col mt-4">
        <span className="text-sm font-semibold text-[#161f4a]">Message</span>
        <textarea name="message" value={form.message} onChange={handleChange} rows={6} className="mt-1 p-3 rounded-lg border resize-y" placeholder="Tell me about your project"></textarea>
      </label>

      <div className="mt-4 flex items-center justify-between gap-4">
        <button type="submit" className="bg-[#161f4a] text-white font-bold py-2 px-6 rounded-full hover:opacity-95 transition">Send Message</button>
        {status && (
          <p className={`text-sm ${status.type === 'error' ? 'text-red-600' : 'text-green-600'}`}>{status.message}</p>
        )}
      </div>
    </form>
  )
}

export default ContactForm
