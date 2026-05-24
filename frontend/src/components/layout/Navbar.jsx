import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Menu, X, User, LogOut, LayoutDashboard, Heart, Calendar, MessageSquare, Bell } from 'lucide-react';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setDropdownOpen(false);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Explore Rooms', path: '/rooms' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact', path: '/contact' },
    { name: 'FAQ', path: '/faq' },
  ];

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <span className="h-10 w-10 rounded-xl bg-gradient-to-tr from-primary-600 to-indigo-500 flex items-center justify-center text-white font-bold text-xl shadow-md shadow-primary-500/20">
                R
              </span>
              <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-gray-900 to-primary-700 bg-clip-text text-transparent">
                RoomFinder
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors duration-200 ${
                  isActive(link.path)
                    ? 'text-primary-600'
                    : 'text-gray-600 hover:text-primary-500'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* User Auth Buttons / Profile Dropdown */}
          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 focus:outline-none p-1.5 rounded-full hover:bg-gray-50 border border-gray-100 transition-colors"
                >
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="h-8 w-8 rounded-full object-cover border border-primary-100"
                  />
                  <span className="text-sm font-semibold text-gray-700 pr-1 max-w-[120px] truncate">
                    {user.name}
                  </span>
                </button>

                {dropdownOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-10"
                      onClick={() => setDropdownOpen(false)}
                    />
                    <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-white border border-gray-100 shadow-xl py-2 z-20 animate-in fade-in slide-in-from-top-2 duration-200">
                      <div className="px-4 py-2 border-b border-gray-50">
                        <p className="text-xs text-gray-400 uppercase font-bold tracking-wider">Logged in as</p>
                        <p className="text-sm font-bold text-gray-800 truncate">{user.name}</p>
                        <span className="inline-flex items-center px-2 py-0.5 mt-1 rounded-full text-xs font-semibold bg-primary-50 text-primary-700 capitalize">
                          {user.role}
                        </span>
                      </div>

                      {/* Role-based dashboard redirect */}
                      <Link
                        to={
                          user.role === 'admin'
                            ? '/admin'
                            : user.role === 'landlord'
                            ? '/landlord'
                            : '/dashboard'
                        }
                        className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                        onClick={() => setDropdownOpen(false)}
                      >
                        <LayoutDashboard className="h-4 w-4 text-gray-400" />
                        Dashboard
                      </Link>

                      <Link
                        to="/profile"
                        className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                        onClick={() => setDropdownOpen(false)}
                      >
                        <User className="h-4 w-4 text-gray-400" />
                        My Profile
                      </Link>

                      {user.role === 'tenant' && (
                        <>
                          <Link
                            to="/favorites"
                            className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                            onClick={() => setDropdownOpen(false)}
                          >
                            <Heart className="h-4 w-4 text-gray-400" />
                            Favorites
                          </Link>
                          <Link
                            to="/booking-history"
                            className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                            onClick={() => setDropdownOpen(false)}
                          >
                            <Calendar className="h-4 w-4 text-gray-400" />
                            My Bookings
                          </Link>
                        </>
                      )}

                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors border-t border-gray-50 mt-1"
                      >
                        <LogOut className="h-4 w-4" />
                        Log Out
                      </button>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  to="/login"
                  className="text-sm font-semibold text-gray-700 hover:text-primary-600 px-3 py-2 transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="text-sm font-bold text-white bg-primary-600 hover:bg-primary-700 px-4 py-2.5 rounded-xl shadow-md shadow-primary-500/10 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-xl text-gray-500 hover:text-gray-600 hover:bg-gray-100 focus:outline-none transition-colors"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-b border-gray-100 bg-white/95 backdrop-blur-md transition-all duration-300">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`block px-3 py-2 rounded-xl text-base font-semibold ${
                  isActive(link.path)
                    ? 'bg-primary-50 text-primary-600'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-primary-500'
                }`}
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="pt-4 pb-4 border-t border-gray-100 px-4">
            {user ? (
              <div className="space-y-2">
                <div className="flex items-center gap-3 px-3 py-2">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="h-10 w-10 rounded-full object-cover"
                  />
                  <div>
                    <div className="text-base font-bold text-gray-800">{user.name}</div>
                    <div className="text-xs text-gray-500 capitalize">{user.role}</div>
                  </div>
                </div>

                <Link
                  to={
                    user.role === 'admin'
                      ? '/admin'
                      : user.role === 'landlord'
                      ? '/landlord'
                      : '/dashboard'
                  }
                  className="flex items-center gap-3 px-3 py-2 rounded-xl text-base font-semibold text-gray-600 hover:bg-gray-50"
                  onClick={() => setIsOpen(false)}
                >
                  <LayoutDashboard className="h-5 w-5 text-gray-400" />
                  Dashboard
                </Link>

                <Link
                  to="/profile"
                  className="flex items-center gap-3 px-3 py-2 rounded-xl text-base font-semibold text-gray-600 hover:bg-gray-50"
                  onClick={() => setIsOpen(false)}
                >
                  <User className="h-5 w-5 text-gray-400" />
                  Profile
                </Link>

                {user.role === 'tenant' && (
                  <>
                    <Link
                      to="/favorites"
                      className="flex items-center gap-3 px-3 py-2 rounded-xl text-base font-semibold text-gray-600 hover:bg-gray-50"
                      onClick={() => setIsOpen(false)}
                    >
                      <Heart className="h-5 w-5 text-gray-400" />
                      Favorites
                    </Link>
                    <Link
                      to="/booking-history"
                      className="flex items-center gap-3 px-3 py-2 rounded-xl text-base font-semibold text-gray-600 hover:bg-gray-50"
                      onClick={() => setIsOpen(false)}
                    >
                      <Calendar className="h-5 w-5 text-gray-400" />
                      Bookings
                    </Link>
                  </>
                )}

                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-base font-semibold text-red-600 hover:bg-red-50 text-left"
                >
                  <LogOut className="h-5 w-5" />
                  Log Out
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                <Link
                  to="/login"
                  className="flex items-center justify-center text-base font-semibold text-gray-700 hover:bg-gray-50 py-2.5 rounded-xl border border-gray-200"
                  onClick={() => setIsOpen(false)}
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="flex items-center justify-center text-base font-bold text-white bg-primary-600 hover:bg-primary-700 py-2.5 rounded-xl shadow-md shadow-primary-500/10"
                  onClick={() => setIsOpen(false)}
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
