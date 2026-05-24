import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { mockNotifications } from '../../utils/mockData';
import EmptyState from '../../components/common/EmptyState';
import { Bell, CheckCheck, Trash2 } from 'lucide-react';

export default function Notifications() {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    if (!user) return;
    const stored = JSON.parse(localStorage.getItem(`notifications_${user.id}`));
    if (!stored) {
      // Filter from mock database
      const filtered = mockNotifications.filter(n => n.userId === user.id);
      localStorage.setItem(`notifications_${user.id}`, JSON.stringify(filtered));
      setNotifications(filtered);
    } else {
      setNotifications(stored);
    }
  }, [user]);

  const handleMarkAllRead = () => {
    const updated = notifications.map(n => ({ ...n, read: true }));
    setNotifications(updated);
    localStorage.setItem(`notifications_${user.id}`, JSON.stringify(updated));
  };

  const handleClearAll = () => {
    setNotifications([]);
    localStorage.setItem(`notifications_${user.id}`, JSON.stringify([]));
  };

  if (!user) return null;

  return (
    <div className="space-y-6 w-full">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-extrabold text-gray-800">Your Notifications</h2>
          <p className="text-xs text-gray-400">Keep updated with approvals, comments and messaging alerts</p>
        </div>

        {notifications.length > 0 && (
          <div className="flex items-center gap-3">
            <button
              onClick={handleMarkAllRead}
              className="flex items-center gap-1.5 text-xs font-bold text-primary-600 hover:text-primary-750 focus:outline-none"
            >
              <CheckCheck className="h-4 w-4" />
              Mark all read
            </button>
            <span className="text-gray-200">|</span>
            <button
              onClick={handleClearAll}
              className="flex items-center gap-1.5 text-xs font-bold text-red-500 hover:text-red-650 focus:outline-none"
            >
              <Trash2 className="h-4 w-4" />
              Clear all
            </button>
          </div>
        )}
      </div>

      {notifications.length > 0 ? (
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden divide-y divide-gray-50">
          {notifications.map((n) => (
            <div
              key={n.id}
              className={`p-5 flex gap-4 transition-colors ${
                !n.read ? 'bg-primary-50/20' : 'hover:bg-gray-50/50'
              }`}
            >
              <div className={`p-2.5 rounded-xl shrink-0 h-10 w-10 flex items-center justify-center ${
                n.type === 'success'
                  ? 'bg-emerald-50 text-emerald-600'
                  : n.type === 'warning'
                  ? 'bg-rose-50 text-rose-600'
                  : 'bg-blue-50 text-primary-600'
              }`}>
                <Bell className="h-5 w-5" />
              </div>
              <div className="space-y-1">
                <h4 className="font-bold text-gray-800 text-sm">{n.title}</h4>
                <p className="text-xs text-gray-500 leading-relaxed font-semibold">{n.description}</p>
                <span className="text-[10px] text-gray-400 block pt-1">
                  {new Date(n.createdAt).toLocaleString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <EmptyState
          title="Clear Inbox"
          description="You are all caught up! There are no new notification alerts right now."
          icon={Bell}
        />
      )}
    </div>
  );
}
