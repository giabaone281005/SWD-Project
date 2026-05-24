import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { bookingService } from '../../services/bookingService';
import EmptyState from '../../components/common/EmptyState';
import { Calendar, User, Mail, Phone, Clock } from 'lucide-react';

export default function BookingHistory() {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      if (!user) return;
      try {
        const allBookings = await bookingService.getAllBookings();
        const tenantBookings = allBookings.filter(b => b.tenantId === user.id);
        setBookings(tenantBookings);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, [user]);

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
    <div className="space-y-6 w-full">
      <div>
        <h2 className="text-xl font-extrabold text-gray-800">Booking & Viewing History</h2>
        <p className="text-xs text-gray-400">Track status updates for your physical room inspection requests</p>
      </div>

      {bookings.length > 0 ? (
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100 text-xs font-bold text-gray-400 uppercase tracking-wider">
                  <th className="px-6 py-4">Accommodation Details</th>
                  <th className="px-6 py-4">Schedule Slots</th>
                  <th className="px-6 py-4">Tenant Inquiries</th>
                  <th className="px-6 py-4 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 text-sm">
                {bookings.map((booking) => (
                  <tr key={booking.id} className="hover:bg-gray-50/50 transition-colors">
                    {/* Room Details */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={booking.roomImage}
                          alt={booking.roomTitle}
                          className="h-12 w-12 rounded-xl object-cover shrink-0"
                        />
                        <div className="space-y-0.5">
                          <h4 className="font-bold text-gray-800 line-clamp-1 max-w-[200px]">{booking.roomTitle}</h4>
                          <span className="text-xs font-bold text-primary-600">
                            {formatPrice(booking.roomPrice)}/mo
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Schedule Slots */}
                    <td className="px-6 py-4">
                      <div className="space-y-1 text-gray-500 font-semibold">
                        <p className="flex items-center gap-1.5 text-xs">
                          <Calendar className="h-3.5 w-3.5 text-gray-400" />
                          {booking.preferredDate}
                        </p>
                        <p className="flex items-center gap-1.5 text-xs">
                          <Clock className="h-3.5 w-3.5 text-gray-400" />
                          {booking.preferredTime}
                        </p>
                      </div>
                    </td>

                    {/* Notes */}
                    <td className="px-6 py-4">
                      <p className="text-xs text-gray-400 italic max-w-xs line-clamp-2">
                        {booking.message || 'No additional note.'}
                      </p>
                    </td>

                    {/* Status */}
                    <td className="px-6 py-4 text-center">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${
                          booking.status === 'Approved'
                            ? 'bg-emerald-50 text-emerald-700'
                            : booking.status === 'Rejected'
                            ? 'bg-rose-50 text-rose-700'
                            : 'bg-amber-50 text-amber-700'
                        }`}
                      >
                        {booking.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <EmptyState
          title="No Bookings Recorded"
          description="You haven't scheduled any room viewing appointments. Discover verified listings to start booking."
          icon={Calendar}
          actionText="Explore Accommodations"
          actionLink="/rooms"
        />
      )}
    </div>
  );
}
