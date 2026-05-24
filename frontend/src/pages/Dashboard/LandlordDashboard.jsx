import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { bookingService } from '../../services/bookingService';
import { roomService } from '../../services/roomService';
import StatsCard from '../../components/common/StatsCard';
import { Home, Calendar, CreditCard, Check, X, AlertCircle } from 'lucide-react';
import { mockRevenue } from '../../utils/mockData';

export default function LandlordDashboard() {
  const { user } = useAuth();
  const [roomsCount, setRoomsCount] = useState(0);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionSuccess, setActionSuccess] = useState(false);

  const fetchDashboardData = async () => {
    if (!user) return;
    try {
      const rooms = await roomService.getAllRooms();
      const landlordRooms = rooms.filter(r => r.landlordId === user.id);
      setRoomsCount(landlordRooms.length);

      const allBookings = await bookingService.getAllBookings();
      // Filter bookings for rooms owned by this landlord
      const landlordRoomIds = landlordRooms.map(r => r.id);
      const landlordBookings = allBookings.filter(b => landlordRoomIds.includes(b.roomId));
      setBookings(landlordBookings);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, [user]);

  const handleBookingAction = async (bookingId, action) => {
    try {
      await bookingService.updateBookingStatus(bookingId, action);
      setActionSuccess(true);
      setTimeout(() => setActionSuccess(false), 2000);
      fetchDashboardData(); // Refresh
    } catch (err) {
      console.error(err);
    }
  };

  const pendingRequests = bookings.filter(b => b.status === 'Pending');
  const activeBookingsCount = bookings.filter(b => b.status === 'Approved').length;

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20 w-full">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8 w-full">
      {/* Stats Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <StatsCard
          title="Active Listings"
          value={roomsCount}
          icon={Home}
          color="blue"
        />
        <StatsCard
          title="Inspection Requests"
          value={bookings.length}
          icon={Calendar}
          color="amber"
        />
        <StatsCard
          title="Est. Monthly Income"
          value={formatPrice(mockRevenue.totalRevenue).replace('₫', '') + ' VND'}
          icon={CreditCard}
          color="green"
        />
      </section>

      {/* Main split */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Booking requests to review */}
        <div className="lg:col-span-2 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-6">
          <div className="border-b border-gray-50 pb-4">
            <h3 className="font-extrabold text-gray-800 text-base">Pending Inspection Applications</h3>
            <p className="text-xs text-gray-400">Approve or reject slot requests from room hunters</p>
          </div>

          {actionSuccess && (
            <div className="bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-bold p-3 rounded-xl">
              Booking status updated successfully in simulated session.
            </div>
          )}

          <div className="space-y-4">
            {pendingRequests.length > 0 ? (
              pendingRequests.map((booking) => (
                <div
                  key={booking.id}
                  className="p-5 bg-gray-50 rounded-2xl border border-gray-100/50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:border-gray-200 transition-colors"
                >
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-extrabold text-primary-650 bg-primary-50 px-2 py-0.5 rounded uppercase">
                        {booking.id}
                      </span>
                      <h4 className="font-extrabold text-gray-800 text-sm">{booking.roomTitle}</h4>
                    </div>

                    <div className="text-xs text-gray-500 font-semibold space-y-1">
                      <p>
                        Tenant: <strong className="text-gray-700">{booking.tenantName}</strong> ({booking.tenantPhone})
                      </p>
                      <p>
                        Schedule Slot: <strong className="text-primary-600">{booking.preferredDate}</strong> at <strong className="text-primary-600">{booking.preferredTime}</strong>
                      </p>
                      {booking.message && (
                        <p className="text-gray-450 italic text-[11px]">Note: "{booking.message}"</p>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-2 w-full sm:w-auto shrink-0 justify-end">
                    <button
                      onClick={() => handleBookingAction(booking.id, 'Rejected')}
                      className="p-2 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-xl transition-colors focus:outline-none"
                      title="Reject Slot"
                    >
                      <X className="h-4.5 w-4.5" />
                    </button>
                    <button
                      onClick={() => handleBookingAction(booking.id, 'Approved')}
                      className="p-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl shadow-md transition-all flex items-center gap-1 text-xs font-bold focus:outline-none"
                    >
                      <Check className="h-4 w-4" />
                      Approve
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12 text-xs text-gray-400 font-semibold">
                No pending viewing requests at this time.
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Revenue chart simple placeholder */}
        <div className="lg:col-span-1 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-6 h-fit">
          <div className="border-b border-gray-50 pb-4">
            <h3 className="font-extrabold text-gray-800 text-sm">Monthly Revenue Distribution</h3>
          </div>

          <div className="space-y-4">
            {/* Simple visual bar chart mock using CSS */}
            <div className="h-40 flex items-end justify-between px-2 pt-4">
              {mockRevenue.monthlyData.map((data, idx) => (
                <div key={idx} className="flex flex-col items-center gap-1.5 w-8">
                  {/* Visual Bar */}
                  <div
                    className="w-full bg-gradient-to-t from-primary-500 to-indigo-400 rounded-t-lg transition-all"
                    style={{ height: `${(data.revenue / 30000000) * 120}px` }}
                  />
                  <span className="text-[10px] font-bold text-gray-400">{data.month}</span>
                </div>
              ))}
            </div>

            <hr className="border-gray-50" />

            <div className="space-y-3">
              <h4 className="text-xs font-bold text-gray-450 uppercase tracking-wider">Breakdown by Room</h4>
              {mockRevenue.roomRevenues.map((rr, idx) => (
                <div key={idx} className="flex justify-between items-center text-xs">
                  <span className="font-bold text-gray-700 truncate max-w-[160px]" title={rr.roomTitle}>
                    {rr.roomTitle}
                  </span>
                  <span className="font-extrabold text-primary-600 shrink-0">
                    {formatPrice(rr.revenue).replace('₫', '')}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
