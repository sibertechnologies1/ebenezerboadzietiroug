import React from 'react'
import Navbar from '../components/Navbar/Navbar'
import Footer from '../components/Footer/Footer'
import ContactForm from '../components/Contact/ContactForm'

function Contact() {
  return (
    <div>
      <Navbar />
      <main className="bg-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <section>
            <p className="text-sm uppercase tracking-[0.2em] text-blue-500 font-semibold">Get in touch</p>
            <h1 className="mt-3 text-3xl sm:text-4xl font-extrabold text-[#161f4a]">Let's build something together</h1>
            <p className="mt-4 text-[#161f4a]/80 leading-relaxed">If you have a project, idea, or just want to say hello, send a message — I typically respond within 24 hours.</p>

            <div className="mt-8 space-y-4">
              <div>
                <h4 className="text-sm font-semibold text-[#161f4a]">Email</h4>
                <a href="mailto:eboadzietiroug@gmail.com" className="text-blue-600 hover:underline">eboadzietiroug@gmail.com</a>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-[#161f4a]">Phone</h4>
                <a href="tel:+233502156703" className="text-blue-600 hover:underline">+233 50 215 6703</a>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-[#161f4a]">Location</h4>
                <p className="text-[#161f4a]/80">Kumasi, Ghana</p>
              </div>
            </div>
          </section>

          <section>
            <ContactForm />
          </section>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default Contact
