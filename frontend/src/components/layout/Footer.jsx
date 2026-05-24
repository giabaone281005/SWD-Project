 import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, ArrowRight } from 'lucide-react';

const FacebookIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M15 3h-3a3 3 0 00-3 3v3H6v4h3v8h4v-8h3.3l.7-4H13V6a1 1 0 011-1h1z" />
  </svg>
);

const TwitterIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M23 4.8c-.8.4-1.6.6-2.5.8.9-.6 1.6-1.4 1.9-2.4-.9.6-1.9 1-3 1.2C18.6 3 17.3 2.5 16 2.5c-2 0-3.6 1.6-3.6 3.6 0 .3 0 .7.1 1C8.5 7 5.2 5.2 3 2.6c-.4.7-.6 1.6-.6 2.5 0 1.6.8 3 2 3.8-.7 0-1.4-.2-2-.5v.1c0 1.9 1.3 3.5 3 3.9-.3.1-.7.1-1 .1-.2 0-.4 0-.6-.1.4 1.2 1.6 2.1 3 2.1-1.1.8-2.5 1.3-4 1.3H8c2 1.3 4.3 2 6.8 2 8.1 0 12.6-6.7 12.6-12.6v-.6c.9-.6 1.6-1.4 2.2-2.3-.8.4-1.7.6-2.6.7z" />
  </svg>
);

const InstagramIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
    <rect x="3" y="3" width="18" height="18" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.5" y2="6.5" />
  </svg>
);

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 border-t border-gray-800">
      {/* Top Banner Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-b border-gray-800">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h3 className="text-2xl font-bold text-white mb-2">Find your perfect living space today</h3>
            <p className="text-gray-400">Discover premium and budget-friendly boarding houses, apartments, and studios.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 md:justify-end">
            <Link
              to="/rooms"
              className="inline-flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-700 text-white font-bold px-6 py-3 rounded-xl transition-all duration-200 shadow-lg shadow-primary-500/20"
            >
              Start Searching <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center bg-gray-800 hover:bg-gray-700 text-white font-bold px-6 py-3 rounded-xl transition-all duration-200"
            >
              Contact Support
            </Link>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Column */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <span className="h-10 w-10 rounded-xl bg-gradient-to-tr from-primary-600 to-indigo-500 flex items-center justify-center text-white font-bold text-xl shadow-md shadow-primary-500/20">
                R
              </span>
              <span className="font-extrabold text-xl tracking-tight text-white">
                RoomFinder
              </span>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed">
              We make room renting simple, secure, and transparent. Connecting tenants directly with trusted landlords.
            </p>
            <div className="flex gap-4">
              <a href="#" className="h-9 w-9 rounded-lg bg-gray-850 hover:bg-primary-600 flex items-center justify-center transition-colors text-gray-450 hover:text-white">
                <FacebookIcon className="h-5 w-5" />
              </a>
              <a href="#" className="h-9 w-9 rounded-lg bg-gray-850 hover:bg-primary-600 flex items-center justify-center transition-colors text-gray-450 hover:text-white">
                <TwitterIcon className="h-5 w-5" />
              </a>
              <a href="#" className="h-9 w-9 rounded-lg bg-gray-850 hover:bg-primary-600 flex items-center justify-center transition-colors text-gray-450 hover:text-white">
                <InstagramIcon className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/rooms" className="hover:text-primary-400 transition-colors">Browse Rooms</Link></li>
              <li><Link to="/about" className="hover:text-primary-400 transition-colors">About Us</Link></li>
              <li><Link to="/faq" className="hover:text-primary-400 transition-colors">Help & FAQ</Link></li>
              <li><Link to="/contact" className="hover:text-primary-400 transition-colors">Contact Support</Link></li>
            </ul>
          </div>

          {/* Policies */}
          <div>
            <h4 className="text-white font-bold mb-4">Policies</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/terms" className="hover:text-primary-400 transition-colors">Terms of Service</Link></li>
              <li><Link to="/privacy" className="hover:text-primary-400 transition-colors">Privacy Policy</Link></li>
              <li><Link to="/faq" className="hover:text-primary-400 transition-colors">Cancellation Policy</Link></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="text-white font-bold mb-4">Contact Info</h4>
            <ul className="space-y-3.5 text-sm">
              <li className="flex gap-2">
                <MapPin className="h-5 w-5 text-primary-500 shrink-0" />
                <span>142 Dien Bien Phu, Binh Thanh, Ho Chi Minh City</span>
              </li>
              <li className="flex gap-2">
                <Phone className="h-5 w-5 text-primary-500 shrink-0" />
                <span>+84 987 654 321</span>
              </li>
              <li className="flex gap-2">
                <Mail className="h-5 w-5 text-primary-500 shrink-0" />
                <span>support@roomfinder.com</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="bg-gray-950 py-6 border-t border-gray-800/50 text-xs text-center text-gray-500">
        <p>&copy; {new Date().getFullYear()} RoomFinder Platform. All rights reserved.</p>
      </div>
    </footer>
  );
}
