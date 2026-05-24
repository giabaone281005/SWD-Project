import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { bookingService } from '../../services/bookingService';
import StatsCard from '../../components/common/StatsCard';
import { Heart, Calendar, Clock, Bell, User, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function UserDashboard() {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [favoritesCount, setFavoritesCount] = useState(0);

  useEffect(() => {
    const fetchDashboardData = async () => {
      if (!user) return;
      try {
        const allBookings = await bookingService.getAllBookings();
        const tenantBookings = allBookings.filter(b => b.tenantId === user.id);
        setBookings(tenantBookings);

        const favs = JSON.parse(localStorage.getItem(`favorites_${user.id}`)) || [];
        setFavoritesCount(favs.length);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, [user]);

  const pendingBookings = bookings.filter(b => b.status === 'Pending').length;
  const approvedBookings = bookings.filter(b => b.status === 'Approved').length;

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20 w-full">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8 w-full">
      {/* Analytics stats */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <StatsCard
          title="Favorites"
          value={favoritesCount}
          icon={Heart}
          color="red"
        />
        <StatsCard
          title="Pending Applications"
          value={pendingBookings}
          icon={Clock}
          color="amber"
        />
        <StatsCard
          title="Approved Inspections"
          value={approvedBookings}
          icon={Calendar}
          color="green"
        />
      </section>

      {/* Main split */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left column: recent bookings list */}
        <div className="lg:col-span-2 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-4">
          <div className="flex justify-between items-center border-b border-gray-50 pb-4">
            <h3 className="font-extrabold text-gray-800 text-base">Recent Viewing Applications</h3>
            <Link to="/booking-history" className="text-xs font-bold text-primary-600 hover:text-primary-750">
              View All
            </Link>
          </div>

          <div className="space-y-4">
            {bookings.length > 0 ? (
              bookings.slice(0, 3).map((booking) => (
                <div
                  key={booking.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100 hover:border-gray-200 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={booking.roomImage}
                      alt={booking.roomTitle}
                      className="h-12 w-12 rounded-xl object-cover"
                    />
                    <div>
                      <h4 className="font-bold text-gray-850 text-sm line-clamp-1">{booking.roomTitle}</h4>
                      <p className="text-xs text-gray-400">
                        Date: {booking.preferredDate} • Time: {booking.preferredTime}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`text-xs font-bold px-3 py-1 rounded-full ${
                      booking.status === 'Approved'
                        ? 'bg-emerald-50 text-emerald-700'
                        : booking.status === 'Rejected'
                        ? 'bg-rose-50 text-rose-700'
                        : 'bg-amber-50 text-amber-700'
                    }`}
                  >
                    {booking.status}
                  </span>
                </div>
              ))
            ) : (
              <div className="text-center py-10 text-xs text-gray-400 font-semibold">
                You haven't submitted any viewing requests yet.
              </div>
            )}
          </div>
        </div>

        {/* Right column: User profile summary info */}
        <div className="lg:col-span-1 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col items-center text-center space-y-4 h-fit">
          <img
            src={user.avatar}
            alt={user.name}
            className="h-20 w-20 rounded-full object-cover border-2 border-primary-100"
          />
          <div className="space-y-1">
            <h3 className="font-extrabold text-gray-850 text-base">{user.name}</h3>
            <span className="text-xs text-gray-400 font-bold capitalize bg-gray-50 px-2.5 py-0.5 rounded-full">
              {user.role} Account
            </span>
          </div>

          <hr className="w-full border-gray-50" />

          <ul className="w-full space-y-3.5 text-xs text-gray-500 font-semibold text-left">
            <li className="flex gap-2.5 items-center">
              <User className="h-4 w-4 text-gray-400" />
              <span className="truncate">{user.email}</span>
            </li>
            <li className="flex gap-2.5 items-center">
              <Phone className="h-4 w-4 text-gray-400" />
              <span>{user.phone}</span>
            </li>
            <li className="flex gap-2.5 items-center">
              <MapPin className="h-4 w-4 text-gray-400" />
              <span className="truncate">{user.location}</span>
            </li>
          </ul>

          <Link
            to="/profile"
            className="w-full py-2.5 bg-primary-50 text-primary-600 hover:bg-primary-100 transition-colors font-bold text-xs rounded-xl text-center"
          >
            Edit Profile Details
          </Link>
        </div>
      </div>
    </div>
  );
}
