import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  LayoutDashboard,
  User,
  Heart,
  Calendar,
  MessageSquare,
  Bell,
  Home,
  PlusCircle,
  BarChart3,
  Users,
  ShieldAlert,
  Grid,
  CreditCard,
  LogOut,
  ChevronLeft
} from 'lucide-react';

export default function Sidebar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  if (!user) return null;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  // Define navigation items based on user role
  const getNavItems = () => {
    switch (user.role) {
      case 'admin':
        return [
          { name: 'Overview', path: '/admin', icon: LayoutDashboard },
          { name: 'Manage Users', path: '/admin/users', icon: Users },
          { name: 'Manage Rooms', path: '/admin/rooms', icon: Home },
          { name: 'Reports & Safety', path: '/admin/reports', icon: ShieldAlert },
          { name: 'Categories', path: '/admin/categories', icon: Grid },
          { name: 'Payments', path: '/admin/payments', icon: CreditCard },
          { name: 'Platform Analytics', path: '/admin/analytics', icon: BarChart3 },
          { name: 'My Profile', path: '/profile', icon: User },
        ];
      case 'landlord':
        return [
          { name: 'Dashboard', path: '/landlord', icon: LayoutDashboard },
          { name: 'My Listings', path: '/landlord/listings', icon: Home },
          { name: 'Create Room Post', path: '/landlord/create-room', icon: PlusCircle },
          { name: 'Booking Requests', path: '/landlord/bookings', icon: Calendar },
          { name: 'Revenue Analytics', path: '/landlord/revenue', icon: BarChart3 },
          { name: 'Messages & Chat', path: '/messages', icon: MessageSquare },
          { name: 'Notifications', path: '/notifications', icon: Bell },
          { name: 'My Profile', path: '/profile', icon: User },
        ];
      case 'tenant':
      default:
        return [
          { name: 'My Dashboard', path: '/dashboard', icon: LayoutDashboard },
          { name: 'My Profile', path: '/profile', icon: User },
          { name: 'Favorite Rooms', path: '/favorites', icon: Heart },
          { name: 'Booking History', path: '/booking-history', icon: Calendar },
          { name: 'Messages & Chat', path: '/messages', icon: MessageSquare },
          { name: 'Notifications', path: '/notifications', icon: Bell },
        ];
    }
  };

  const menuItems = getNavItems();

  return (
    <aside className="w-64 bg-gray-900 text-gray-300 min-h-[calc(100vh-4rem)] border-r border-gray-800 flex flex-col justify-between py-6 shrink-0">
      <div className="space-y-6 px-4">
        {/* User Info Header */}
        <div className="flex items-center gap-3 pb-6 border-b border-gray-800">
          <img
            src={user.avatar}
            alt={user.name}
            className="h-10 w-10 rounded-full object-cover border border-gray-700"
          />
          <div>
            <h4 className="font-bold text-white text-sm truncate max-w-[140px]">{user.name}</h4>
            <span className="text-xs text-gray-500 capitalize">{user.role} Account</span>
          </div>
        </div>

        {/* Navigation links */}
        <nav className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                  active
                    ? 'bg-primary-600 text-white shadow-lg shadow-primary-600/10'
                    : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                }`}
              >
                <Icon className={`h-5 w-5 ${active ? 'text-white' : 'text-gray-400 group-hover:text-white'}`} />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Back to Home & Logout */}
      <div className="px-4 space-y-2">
        <Link
          to="/"
          className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium text-gray-400 hover:text-white hover:bg-gray-800/50 transition-colors"
        >
          <ChevronLeft className="h-5 w-5" />
          Back to Home
        </Link>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium text-red-400 hover:text-red-300 hover:bg-red-950/20 transition-colors"
        >
          <LogOut className="h-5 w-5" />
          Log Out
        </button>
      </div>
    </aside>
  );
}
