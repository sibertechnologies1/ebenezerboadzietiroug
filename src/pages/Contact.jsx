import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import ContactForm from '../components/Contact/ContactForm';

function Contact() {
  return (
    <div className="bg-[#0a0f1d] min-h-screen text-white flex flex-col justify-between">
      <Navbar />
      <main className="flex-1">
        <ContactForm />
      </main>
      <Footer />
    </div>
  );
}

export default Contact;