import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Mail, Lock, LogIn, Sparkles, UserCheck } from 'lucide-react';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const res = login(email, password);
    setLoading(false);

    if (res.success) {
      // Redirect based on role
      if (res.user.role === 'admin') {
        navigate('/admin');
      } else if (res.user.role === 'landlord') {
        navigate('/landlord');
      } else {
        navigate('/dashboard');
      }
    } else {
      setError('Invalid credentials.');
    }
  };

  const handleQuickLogin = (quickEmail) => {
    setEmail(quickEmail);
    setPassword('password123');
    // Trigger login
    const res = login(quickEmail, 'password123');
    if (res.success) {
      if (res.user.role === 'admin') navigate('/admin');
      else if (res.user.role === 'landlord') navigate('/landlord');
      else navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center px-4 py-12 bg-gray-50">
      <div className="w-full max-w-md bg-white p-8 rounded-3xl border border-gray-100 shadow-xl space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="h-12 w-12 rounded-2xl bg-gradient-to-tr from-primary-600 to-indigo-500 flex items-center justify-center text-white font-bold text-2xl mx-auto shadow-md shadow-primary-500/20">
            R
          </div>
          <h2 className="text-2xl font-extrabold text-gray-800">Welcome Back</h2>
          <p className="text-xs text-gray-400 font-semibold">Sign in to find rooms or manage your listings</p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-650 text-xs font-bold p-3.5 rounded-xl border border-red-100">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-gray-700 flex items-center gap-1.5">
              <Mail className="h-3.5 w-3.5 text-primary-500" />
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              className="w-full bg-gray-50 border border-transparent focus:bg-white focus:border-primary-400 text-sm px-3.5 py-2.5 rounded-xl focus:outline-none text-gray-700 font-semibold"
              required
            />
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between items-center">
              <label className="text-xs font-bold text-gray-700 flex items-center gap-1.5">
                <Lock className="h-3.5 w-3.5 text-primary-500" />
                Password
              </label>
              <Link to="/forgot-password" className="text-xs font-bold text-primary-600 hover:text-primary-700">
                Forgot?
              </Link>
            </div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-gray-50 border border-transparent focus:bg-white focus:border-primary-400 text-sm px-3.5 py-2.5 rounded-xl focus:outline-none text-gray-700"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary-600 hover:bg-primary-700 text-white font-bold h-11 rounded-xl shadow-md flex items-center justify-center gap-2 transition-all mt-6"
          >
            <LogIn className="h-4.5 w-4.5" />
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        {/* Quick Testing logins */}
        <div className="border-t border-gray-100 pt-5 space-y-3">
          <p className="text-[10px] text-gray-400 font-extrabold uppercase tracking-wider text-center flex items-center justify-center gap-1">
            <Sparkles className="h-3 w-3 text-amber-500 fill-amber-500" />
            Quick Testing Accounts
          </p>
          <div className="grid grid-cols-3 gap-2.5">
            <button
              onClick={() => handleQuickLogin('tenant@example.com')}
              className="flex flex-col items-center gap-1 py-2 px-1 bg-primary-50/50 hover:bg-primary-50 border border-primary-100/50 hover:border-primary-200 rounded-xl text-[10px] font-bold text-primary-700 transition-colors"
            >
              <UserCheck className="h-3.5 w-3.5" />
              Tenant
            </button>
            <button
              onClick={() => handleQuickLogin('landlord@example.com')}
              className="flex flex-col items-center gap-1 py-2 px-1 bg-emerald-50/50 hover:bg-emerald-50 border border-emerald-100/50 hover:border-emerald-250 rounded-xl text-[10px] font-bold text-emerald-700 transition-colors"
            >
              <UserCheck className="h-3.5 w-3.5" />
              Landlord
            </button>
            <button
              onClick={() => handleQuickLogin('admin@example.com')}
              className="flex flex-col items-center gap-1 py-2 px-1 bg-purple-50/50 hover:bg-purple-50 border border-purple-100/50 hover:border-purple-250 rounded-xl text-[10px] font-bold text-purple-700 transition-colors"
            >
              <UserCheck className="h-3.5 w-3.5" />
              Admin
            </button>
          </div>
        </div>

        {/* Link to register */}
        <p className="text-xs text-center text-gray-450 font-medium pt-2">
          New to RoomFinder?{' '}
          <Link to="/register" className="font-bold text-primary-600 hover:text-primary-700">
            Create an Account
          </Link>
        </p>
      </div>
    </div>
  );
}
