import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { User, Phone, MapPin, Mail, Shield, CheckCircle2, Award } from 'lucide-react';

export default function Profile() {
  const { user, updateProfile } = useAuth();
  const [name, setName] = useState(user?.name || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [location, setLocation] = useState(user?.location || '');
  const [bio, setBio] = useState(user?.bio || '');
  const [avatar, setAvatar] = useState(user?.avatar || '');
  const [success, setSuccess] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setSuccess(false);
    updateProfile({ name, phone, location, bio, avatar });
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  };

  const handleAvatarChange = (e) => {
    // Simple mock image selector
    const urls = [
      'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
      'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=150&q=80',
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80'
    ];
    // Random select
    const rand = urls[Math.floor(Math.random() * urls.length)];
    setAvatar(rand);
  };

  if (!user) return null;

  return (
    <div className="max-w-4xl mx-auto space-y-8 py-4">
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        {/* Banner */}
        <div className="h-32 bg-gradient-to-r from-primary-600 to-indigo-500 relative" />

        {/* Profile Card */}
        <div className="px-8 pb-8 relative flex flex-col md:flex-row gap-6 items-start md:-mt-10">
          <div className="relative group shrink-0 self-center md:self-start">
            <img
              src={avatar}
              alt={user.name}
              className="h-24 w-24 rounded-full object-cover border-4 border-white shadow-md"
            />
            <button
              onClick={handleAvatarChange}
              className="absolute bottom-0 right-0 p-1.5 rounded-full bg-white shadow border border-gray-155 text-gray-500 hover:text-primary-600 focus:outline-none"
              title="Select Random Mock Avatar"
            >
              <User className="h-4 w-4" />
            </button>
          </div>

          <div className="space-y-1.5 text-center md:text-left pt-2 flex-1">
            <h2 className="text-2xl font-extrabold text-gray-800 flex items-center justify-center md:justify-start gap-2">
              {user.name}
              <Award className="h-5 w-5 text-primary-500" />
            </h2>
            <p className="text-xs text-gray-400 font-bold capitalize bg-gray-50 px-2.5 py-0.5 rounded-full w-fit mx-auto md:mx-0">
              {user.role} Account
            </p>
            <p className="text-sm text-gray-500 font-medium max-w-lg leading-relaxed">{bio || 'No bio specified.'}</p>
          </div>
        </div>
      </div>

      {/* Edit Form */}
      <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
        <h3 className="text-lg font-extrabold text-gray-800">Edit Personal Information</h3>

        {success && (
          <div className="bg-emerald-50 text-emerald-700 text-xs font-bold p-3.5 rounded-xl border border-emerald-100 flex items-center gap-2">
            <CheckCircle2 className="h-4.5 w-4.5 text-emerald-500" />
            Profile updated successfully in simulated session.
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Name */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-700 flex items-center gap-1.5">
                <User className="h-3.5 w-3.5 text-primary-500" />
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-gray-50 border border-transparent focus:bg-white focus:border-primary-400 text-sm px-3.5 py-2.5 rounded-xl focus:outline-none text-gray-700 font-semibold"
                required
              />
            </div>

            {/* Email (Disabled) */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-700 flex items-center gap-1.5">
                <Mail className="h-3.5 w-3.5 text-gray-400" />
                Email Address (Cannot change)
              </label>
              <input
                type="email"
                value={user.email}
                disabled
                className="w-full bg-gray-50 border border-gray-200 text-sm px-3.5 py-2.5 rounded-xl text-gray-400 font-semibold cursor-not-allowed"
              />
            </div>

            {/* Phone */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-700 flex items-center gap-1.5">
                <Phone className="h-3.5 w-3.5 text-primary-500" />
                Phone Number
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-gray-50 border border-transparent focus:bg-white focus:border-primary-400 text-sm px-3.5 py-2.5 rounded-xl focus:outline-none text-gray-700 font-semibold"
                required
              />
            </div>

            {/* Location */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-700 flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5 text-primary-500" />
                Location / City
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full bg-gray-50 border border-transparent focus:bg-white focus:border-primary-400 text-sm px-3.5 py-2.5 rounded-xl focus:outline-none text-gray-700 font-semibold"
              />
            </div>
          </div>

          {/* Bio */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-700">Short Bio</label>
            <textarea
              rows="4"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full bg-gray-50 border border-transparent focus:bg-white focus:border-primary-400 text-sm p-3.5 rounded-xl focus:outline-none text-gray-700"
              placeholder="Tell us about yourself..."
            />
          </div>

          <button
            type="submit"
            className="bg-primary-600 hover:bg-primary-700 text-white font-bold h-11 px-6 rounded-xl shadow-md transition-all"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}
