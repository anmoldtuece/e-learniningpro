import React, { useState } from 'react';
import Header from '../Header/Header';

function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState('');

  const handleMsg = async (e) => {
    e.preventDefault();
    if (!name || !email || !msg) {
      alert('All fields are required!');
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      alert('Enter a valid email!');
    } else {
      const res = await fetch('/api/admin/contact-us', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message: msg }),
      });
      const { message } = await res.json();
      alert(message);
      setName('');
      setEmail('');
      setMsg('');
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-20">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-gray-200 p-8">
          <h2 className="text-2xl font-semibold text-gray-900 text-center mb-6">
            Contact Us
          </h2>
          <form onSubmit={handleMsg} className="space-y-5">
            <input
              type="text"
              placeholder="Name"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="email"
              placeholder="Email Address"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <textarea
              placeholder="Message"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 min-h-[140px] resize-y"
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
            />
            <button
              type="submit"
              className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 shadow-md transition"
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
