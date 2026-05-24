import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Lock, ArrowLeft, CheckCircle2 } from 'lucide-react';

export default function ResetPassword() {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match.');
      return;
    }
    setSubmitted(true);
  };

  return (
    <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center px-4 py-12 bg-gray-50">
      <div className="w-full max-w-md bg-white p-8 rounded-3xl border border-gray-100 shadow-xl space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-extrabold text-gray-800">Reset Password</h2>
          <p className="text-xs text-gray-400 font-semibold">Enter your new secure password below</p>
        </div>

        {submitted ? (
          <div className="text-center py-6 space-y-4">
            <CheckCircle2 className="h-14 w-14 text-emerald-500 mx-auto" />
            <h3 className="font-extrabold text-gray-800">Password Updated</h3>
            <p className="text-sm text-gray-400 max-w-xs mx-auto">
              Your password has been successfully updated. You can now sign in with your new password.
            </p>
            <div className="pt-4">
              <Link
                to="/login"
                className="text-sm font-bold text-primary-600 hover:text-primary-700 flex items-center justify-center gap-1.5"
              >
                Sign In Now
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-700 flex items-center gap-1.5">
                <Lock className="h-3.5 w-3.5 text-primary-500" />
                New Password
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

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-700 flex items-center gap-1.5">
                <Lock className="h-3.5 w-3.5 text-primary-500" />
                Confirm New Password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-gray-50 border border-transparent focus:bg-white focus:border-primary-400 text-sm px-3.5 py-2.5 rounded-xl focus:outline-none text-gray-700"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-primary-600 hover:bg-primary-700 text-white font-bold h-11 rounded-xl shadow-md flex items-center justify-center gap-2 transition-all"
            >
              Reset Password
            </button>

            <div className="text-center pt-2">
              <Link
                to="/login"
                className="text-xs font-bold text-gray-450 hover:text-primary-600 flex items-center justify-center gap-1.5"
              >
                <ArrowLeft className="h-3.5 w-3.5" /> Back to Sign In
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
