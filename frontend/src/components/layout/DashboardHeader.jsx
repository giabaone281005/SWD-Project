import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Bell, Search, Menu, X, User } from 'lucide-react';
import { mockNotifications } from '../../utils/mockData';
import { Link } from 'react-router-dom';

export default function DashboardHeader({ title, toggleSidebar }) {
  const { user } = useAuth();
  const [showNotifications, setShowNotifications] = useState(false);

  // Filter mock notifications for the current logged in user
  const userNotifications = user
    ? mockNotifications.filter(n => n.userId === user.id)
    : [];

  const unreadCount = userNotifications.filter(n => !n.read).length;

  return (
    <header className="bg-white border-b border-gray-100 h-16 flex items-center justify-between px-6 sticky top-0 z-40">
      {/* Mobile Toggle & Page Title */}
      <div className="flex items-center gap-3">
        {toggleSidebar && (
          <button
            onClick={toggleSidebar}
            className="md:hidden p-2 rounded-xl hover:bg-gray-50 focus:outline-none"
          >
            <Menu className="h-5 w-5 text-gray-500" />
          </button>
        )}
        <h1 className="text-xl font-bold text-gray-800">{title || 'Dashboard'}</h1>
      </div>

      {/* Action Icons */}
      <div className="flex items-center gap-4">
        {/* Search Input Mock */}
        <div className="hidden sm:flex items-center relative">
          <Search className="h-4 w-4 text-gray-400 absolute left-3 pointer-events-none" />
          <input
            type="text"
            placeholder="Search bookings, payments..."
            className="pl-9 pr-4 py-1.5 w-60 rounded-xl bg-gray-50 border border-transparent focus:bg-white focus:border-primary-350 text-sm focus:outline-none transition-all duration-200"
          />
        </div>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 rounded-full hover:bg-gray-50 border border-gray-100 relative transition-colors focus:outline-none"
          >
            <Bell className="h-5 w-5 text-gray-600" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 h-4 w-4 rounded-full bg-red-500 text-white flex items-center justify-center text-[10px] font-extrabold border border-white">
                {unreadCount}
              </span>
            )}
          </button>

          {showNotifications && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => setShowNotifications(false)}
              />
              <div className="absolute right-0 mt-2 w-80 rounded-2xl bg-white border border-gray-100 shadow-xl py-2 z-20 animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="px-4 py-2 border-b border-gray-50 flex justify-between items-center">
                  <h3 className="font-bold text-gray-800 text-sm">Notifications</h3>
                  <span className="text-xs font-semibold text-primary-600 bg-primary-50 px-2 py-0.5 rounded-full">
                    {unreadCount} New
                  </span>
                </div>
                <div className="max-h-64 overflow-y-auto">
                  {userNotifications.length > 0 ? (
                    userNotifications.map(notification => (
                      <div
                        key={notification.id}
                        className={`px-4 py-3 hover:bg-gray-55 transition-colors border-b border-gray-50 last:border-b-0 ${
                          !notification.read ? 'bg-primary-50/30' : ''
                        }`}
                      >
                        <p className="text-xs font-bold text-gray-800 mb-0.5">{notification.title}</p>
                        <p className="text-xs text-gray-500 leading-snug">{notification.description}</p>
                        <span className="text-[10px] text-gray-400 mt-1 block">
                          {new Date(notification.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    ))
                  ) : (
                    <div className="px-4 py-6 text-center text-xs text-gray-450">
                      No notifications for you.
                    </div>
                  )}
                </div>
                <div className="px-4 py-2 text-center border-t border-gray-50">
                  <Link
                    to="/notifications"
                    className="text-xs font-bold text-primary-600 hover:text-primary-700"
                    onClick={() => setShowNotifications(false)}
                  >
                    View All Notifications
                  </Link>
                </div>
              </div>
            </>
          )}
        </div>

        {/* User Info Quick View */}
        <div className="flex items-center gap-2 pl-2 border-l border-gray-100">
          <img
            src={user.avatar}
            alt={user.name}
            className="h-8 w-8 rounded-full object-cover border border-primary-50"
          />
          <div className="hidden lg:block text-left">
            <p className="text-xs font-bold text-gray-800 leading-none">{user.name}</p>
            <span className="text-[10px] font-medium text-gray-450 capitalize">{user.role}</span>
          </div>
        </div>
      </div>
    </header>
  );
}
