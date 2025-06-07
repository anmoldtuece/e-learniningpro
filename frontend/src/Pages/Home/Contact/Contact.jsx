import React, { useState } from 'react';
import Mail from '../../Images/Meet-the-team.svg';
import Header from '../Header/Header';

function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState('');

  const handlemsg = async (e) => {
    e.preventDefault();
    if (!name || !email || !msg) {
      alert('All fields are required!');
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      alert('Enter a valid email!');
    } else {
      const data = await fetch('/api/admin/contact-us', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, message: msg }),
      });

      const response = await data.json();
      alert(response.message);
      setName('');
      setEmail('');
      setMsg('');
    }
  };

  return (
    <>
      <Header />
      <div className="bg-slate-50 py-12 px-4">
        <h4 className="text-4xl font-bold text-slate-800 text-center mb-4 font-inter">Contact Us</h4>
        <hr className="w-20 h-1 bg-blue-600 mx-auto rounded-full mb-10" />
        <div className="flex flex-col md:flex-row justify-center items-center gap-10">
          <div className="w-full max-w-md md:max-w-lg">
            <img src={Mail} alt="Contact Illustration" className="w-full h-auto rounded-xl shadow-md" />
          </div>

          <form
            onSubmit={handlemsg}
            className="w-full max-w-md bg-white shadow-lg rounded-xl p-6 space-y-5"
          >
            <h4 className="text-xl font-semibold text-slate-900 text-center">Send Message</h4>

            <input
              type="text"
              placeholder="Name"
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-700"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              type="text"
              placeholder="Email Address"
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-700"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <textarea
              placeholder="Message"
              className="w-full px-4 py-3 min-h-[120px] border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-700 resize-y"
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
            />

            <button
              type="submit"
              className="w-full py-3 text-white font-semibold rounded-lg bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 shadow-md hover:shadow-xl transition duration-300"
            >
              Send A Message
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Contact;
