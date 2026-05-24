import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { User, Mail, Phone, Lock, UserPlus, Shield } from 'lucide-react';

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('tenant');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const res = register(name, email, role, phone);
    setLoading(false);

    if (res.success) {
      if (res.user.role === 'landlord') {
        navigate('/landlord');
      } else {
        navigate('/dashboard');
      }
    } else {
      setError('Registration failed.');
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
          <h2 className="text-2xl font-extrabold text-gray-800">Create Account</h2>
          <p className="text-xs text-gray-400 font-semibold">Join RoomFinder to start searching or listing rooms</p>
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
              <User className="h-3.5 w-3.5 text-primary-500" />
              Full Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. John Doe"
              className="w-full bg-gray-50 border border-transparent focus:bg-white focus:border-primary-400 text-sm px-3.5 py-2.5 rounded-xl focus:outline-none text-gray-700 font-semibold"
              required
            />
          </div>

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
            <label className="text-xs font-bold text-gray-700 flex items-center gap-1.5">
              <Phone className="h-3.5 w-3.5 text-primary-500" />
              Phone Number
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="0987654321"
              className="w-full bg-gray-50 border border-transparent focus:bg-white focus:border-primary-400 text-sm px-3.5 py-2.5 rounded-xl focus:outline-none text-gray-700 font-semibold"
              required
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-gray-700 flex items-center gap-1.5">
              <Lock className="h-3.5 w-3.5 text-primary-500" />
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-gray-50 border border-transparent focus:bg-white focus:border-primary-400 text-sm px-3.5 py-2.5 rounded-xl focus:outline-none text-gray-700"
              required
            />
          </div>

          {/* Role selector */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-gray-700 flex items-center gap-1.5">
              <Shield className="h-3.5 w-3.5 text-primary-500" />
              Register As
            </label>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setRole('tenant')}
                className={`py-3.5 text-xs font-bold rounded-xl border text-center transition-all ${
                  role === 'tenant'
                    ? 'bg-primary-50 border-primary-500 text-primary-700 shadow-sm shadow-primary-500/5'
                    : 'bg-white border-gray-200 text-gray-500 hover:bg-gray-50'
                }`}
              >
                Tenant (Room Hunter)
              </button>
              <button
                type="button"
                onClick={() => setRole('landlord')}
                className={`py-3.5 text-xs font-bold rounded-xl border text-center transition-all ${
                  role === 'landlord'
                    ? 'bg-emerald-50 border-emerald-500 text-emerald-700 shadow-sm shadow-emerald-500/5'
                    : 'bg-white border-gray-200 text-gray-500 hover:bg-gray-50'
                }`}
              >
                Landlord (Owner)
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary-600 hover:bg-primary-700 text-white font-bold h-11 rounded-xl shadow-md flex items-center justify-center gap-2 transition-all mt-6"
          >
            <UserPlus className="h-4.5 w-4.5" />
            {loading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>

        {/* Link to login */}
        <p className="text-xs text-center text-gray-450 font-medium pt-2">
          Already have an account?{' '}
          <Link to="/login" className="font-bold text-primary-600 hover:text-primary-700">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
