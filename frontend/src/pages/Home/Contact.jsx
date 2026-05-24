import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';

export default function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-extrabold text-gray-800">Contact Us</h2>
        <p className="text-sm text-gray-450 max-w-md mx-auto">Get in touch with our team if you need listing approval help or platform support</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Info Column */}
        <div className="md:col-span-1 bg-gray-900 text-gray-300 p-8 rounded-3xl space-y-8 h-fit shadow-md">
          <h3 className="text-lg font-bold text-white">Contact Info</h3>
          
          <ul className="space-y-6 text-sm">
            <li className="flex gap-3">
              <MapPin className="h-5 w-5 text-primary-500 shrink-0" />
              <div>
                <h4 className="font-bold text-white">Our Address</h4>
                <p className="text-xs text-gray-400">142 Dien Bien Phu, Binh Thanh, HCMC</p>
              </div>
            </li>
            <li className="flex gap-3">
              <Phone className="h-5 w-5 text-primary-500 shrink-0" />
              <div>
                <h4 className="font-bold text-white">Call Us</h4>
                <p className="text-xs text-gray-400">+84 987 654 321</p>
              </div>
            </li>
            <li className="flex gap-3">
              <Mail className="h-5 w-5 text-primary-500 shrink-0" />
              <div>
                <h4 className="font-bold text-white">Email Support</h4>
                <p className="text-xs text-gray-400">support@roomfinder.com</p>
              </div>
            </li>
          </ul>
        </div>

        {/* Form Column */}
        <div className="md:col-span-2 bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
          {submitted ? (
            <div className="text-center py-12 space-y-4">
              <CheckCircle2 className="h-16 w-16 text-emerald-500 mx-auto" />
              <h3 className="text-xl font-extrabold text-gray-800">Message Received</h3>
              <p className="text-sm text-gray-400 max-w-md mx-auto">
                Thank you for contacting us. Our customer service representative will respond to your inquiry via email shortly.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setName('');
                  setEmail('');
                  setMessage('');
                }}
                className="bg-primary-600 hover:bg-primary-700 text-white font-bold px-6 py-2.5 rounded-xl shadow-md"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <h3 className="text-lg font-bold text-gray-800">Send a Message</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-700">Full Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John Doe"
                    className="w-full bg-gray-50 border border-transparent focus:bg-white focus:border-primary-400 text-sm px-3.5 py-2.5 rounded-xl focus:outline-none text-gray-700"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-700">Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full bg-gray-50 border border-transparent focus:bg-white focus:border-primary-400 text-sm px-3.5 py-2.5 rounded-xl focus:outline-none text-gray-700"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700">Your Message</label>
                <textarea
                  rows="5"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="How can we help you?"
                  className="w-full bg-gray-50 border border-transparent focus:bg-white focus:border-primary-400 text-sm p-3.5 rounded-xl focus:outline-none text-gray-700"
                  required
                />
              </div>

              <button
                type="submit"
                className="bg-primary-600 hover:bg-primary-700 text-white font-bold h-11 px-6 rounded-xl shadow-md flex items-center gap-2 transition-all"
              >
                <Send className="h-4 w-4" />
                Submit Message
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
