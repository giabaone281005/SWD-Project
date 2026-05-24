import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { userService } from '../../services/userService';
import { roomService } from '../../services/roomService';
import { bookingService } from '../../services/bookingService';
import StatsCard from '../../components/common/StatsCard';
import {
  Users,
  Home,
  Calendar,
  ShieldAlert,
  CheckCircle,
  XCircle,
  AlertTriangle,
  ToggleLeft,
  ToggleRight,
  TrendingUp,
  CreditCard
} from 'lucide-react';
import { mockRevenue } from '../../utils/mockData';

export default function AdminDashboard() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('users'); // users, rooms, reports, analytics
  const [usersList, setUsersList] = useState([]);
  const [roomsList, setRoomsList] = useState([]);
  const [bookingsList, setBookingsList] = useState([]);
  const [reportsList, setReportsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [alertMsg, setAlertMsg] = useState('');

  const fetchAdminData = async () => {
    try {
      const uData = await userService.getAllUsers();
      setUsersList(uData);

      const rData = await roomService.getAllRooms();
      setRoomsList(rData);

      const bData = await bookingService.getAllBookings();
      setBookingsList(bData);

      const repData = await userService.getAllReports();
      setReportsList(repData);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminData();
  }, []);

  const handleToggleUserStatus = async (userId, currentStatus) => {
    const nextStatus = currentStatus === 'Suspended' ? 'Active' : 'Suspended';
    try {
      await userService.updateUserStatus(userId, nextStatus);
      setAlertMsg(`User account status updated to ${nextStatus}.`);
      setTimeout(() => setAlertMsg(''), 2000);
      fetchAdminData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleRoomAction = async (roomId, action) => {
    try {
      if (action === 'Approve') {
        await roomService.updateRoom(roomId, { status: 'Available' });
        setAlertMsg('Room listing published successfully.');
      } else {
        await roomService.deleteRoom(roomId);
        setAlertMsg('Room listing removed successfully.');
      }
      setTimeout(() => setAlertMsg(''), 2000);
      fetchAdminData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleResolveReport = async (reportId) => {
    try {
      await userService.resolveReport(reportId);
      setAlertMsg('Report marked as Resolved.');
      setTimeout(() => setAlertMsg(''), 2000);
      fetchAdminData();
    } catch (err) {
      console.error(err);
    }
  };

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

  const activeReportsCount = reportsList.filter(r => r.status === 'Pending').length;

  return (
    <div className="space-y-8 w-full">
      {/* Overview Analytics Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-4 gap-6">
        <StatsCard
          title="Global Users"
          value={usersList.length}
          icon={Users}
          color="blue"
        />
        <StatsCard
          title="Total Rooms"
          value={roomsList.length}
          icon={Home}
          color="blue"
        />
        <StatsCard
          title="Total Bookings"
          value={bookingsList.length}
          icon={Calendar}
          color="green"
        />
        <StatsCard
          title="Active Reports"
          value={activeReportsCount}
          icon={ShieldAlert}
          color="red"
        />
      </section>

      {/* Admin Operations Section */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        {/* Tab Headers */}
        <div className="bg-gray-50 border-b border-gray-100 flex flex-wrap gap-2 px-6 pt-3">
          <button
            onClick={() => setActiveTab('users')}
            className={`px-4 py-3 text-xs font-bold transition-colors border-b-2 ${
              activeTab === 'users' ? 'border-primary-600 text-primary-650' : 'border-transparent text-gray-400 hover:text-gray-655'
            }`}
          >
            Manage Users
          </button>
          <button
            onClick={() => setActiveTab('rooms')}
            className={`px-4 py-3 text-xs font-bold transition-colors border-b-2 ${
              activeTab === 'rooms' ? 'border-primary-600 text-primary-650' : 'border-transparent text-gray-400 hover:text-gray-655'
            }`}
          >
            Manage Rooms
          </button>
          <button
            onClick={() => setActiveTab('reports')}
            className={`px-4 py-3 text-xs font-bold transition-colors border-b-2 ${
              activeTab === 'reports' ? 'border-primary-600 text-primary-650' : 'border-transparent text-gray-400 hover:text-gray-655'
            }`}
          >
            Safety Reports
          </button>
          <button
            onClick={() => setActiveTab('analytics')}
            className={`px-4 py-3 text-xs font-bold transition-colors border-b-2 ${
              activeTab === 'analytics' ? 'border-primary-600 text-primary-650' : 'border-transparent text-gray-400 hover:text-gray-655'
            }`}
          >
            Platform Payments
          </button>
        </div>

        {alertMsg && (
          <div className="mx-6 mt-6 bg-emerald-50 text-emerald-700 text-xs font-bold p-3 rounded-xl border border-emerald-100">
            {alertMsg}
          </div>
        )}

        {/* Tab Contents */}
        <div className="p-6">
          {activeTab === 'users' && (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-gray-100 text-xs font-bold text-gray-400 uppercase tracking-wider pb-3">
                    <th className="pb-3">User Profile</th>
                    <th className="pb-3">Role</th>
                    <th className="pb-3">Contact</th>
                    <th className="pb-3 text-center">Status</th>
                    <th className="pb-3 text-center">Operation</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50 text-xs md:text-sm">
                  {usersList.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-55/30 transition-colors">
                      <td className="py-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={item.avatar}
                            alt={item.name}
                            className="h-10 w-10 rounded-full object-cover border border-primary-50"
                          />
                          <div>
                            <p className="font-bold text-gray-800">{item.name}</p>
                            <span className="text-[10px] text-gray-400 font-semibold">{item.id}</span>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 capitalize font-semibold text-gray-600">{item.role}</td>
                      <td className="py-4 text-gray-500 font-semibold">
                        <p>{item.email}</p>
                        <p className="text-[11px]">{item.phone}</p>
                      </td>
                      <td className="py-4 text-center">
                        <span
                          className={`inline-flex px-2 py-0.5 rounded text-[10px] font-bold ${
                            item.status === 'Suspended' ? 'bg-rose-50 text-rose-700' : 'bg-emerald-50 text-emerald-700'
                          }`}
                        >
                          {item.status || 'Active'}
                        </span>
                      </td>
                      <td className="py-4 text-center">
                        <button
                          onClick={() => handleToggleUserStatus(item.id, item.status)}
                          className="p-1 text-gray-500 hover:text-primary-600 focus:outline-none"
                          title={item.status === 'Suspended' ? 'Activate User' : 'Suspend User'}
                        >
                          {item.status === 'Suspended' ? (
                            <ToggleLeft className="h-6 w-6 text-gray-400 hover:text-emerald-500" />
                          ) : (
                            <ToggleRight className="h-6 w-6 text-primary-500 hover:text-rose-500" />
                          )}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'rooms' && (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-gray-100 text-xs font-bold text-gray-400 uppercase tracking-wider pb-3">
                    <th className="pb-3">Room Info</th>
                    <th className="pb-3">Landlord</th>
                    <th className="pb-3">Monthly Rent</th>
                    <th className="pb-3">Status</th>
                    <th className="pb-3 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50 text-xs md:text-sm">
                  {roomsList.map((room) => (
                    <tr key={room.id} className="hover:bg-gray-55/30 transition-colors">
                      <td className="py-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={room.images[0]}
                            alt={room.title}
                            className="h-10 w-10 rounded-xl object-cover shrink-0"
                          />
                          <div>
                            <p className="font-bold text-gray-800 line-clamp-1 max-w-[200px]">{room.title}</p>
                            <span className="text-[10px] text-gray-400 font-semibold">{room.address}</span>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 text-gray-500 font-semibold">{room.landlordName}</td>
                      <td className="py-4 font-bold text-primary-600">{formatPrice(room.price)}</td>
                      <td className="py-4">
                        <span
                          className={`inline-flex px-2 py-0.5 rounded text-[10px] font-bold ${
                            room.status === 'Available' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                          }`}
                        >
                          {room.status}
                        </span>
                      </td>
                      <td className="py-4 text-center">
                        <div className="flex items-center justify-center gap-2">
                          {room.status === 'Pending' && (
                            <button
                              onClick={() => handleRoomAction(room.id, 'Approve')}
                              className="px-2 py-1 bg-emerald-50 text-emerald-700 rounded text-xs font-bold hover:bg-emerald-100"
                            >
                              Approve
                            </button>
                          )}
                          <button
                            onClick={() => handleRoomAction(room.id, 'Delete')}
                            className="px-2 py-1 bg-rose-50 text-rose-700 rounded text-xs font-bold hover:bg-rose-100"
                          >
                            Remove
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'reports' && (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-gray-100 text-xs font-bold text-gray-400 uppercase tracking-wider pb-3">
                    <th className="pb-3">Flagged Accommodation</th>
                    <th className="pb-3">Reporter</th>
                    <th className="pb-3">Infraction Reason</th>
                    <th className="pb-3 text-center">Status</th>
                    <th className="pb-3 text-center">Moderation</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50 text-xs md:text-sm">
                  {reportsList.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-55/30 transition-colors">
                      <td className="py-4 font-bold text-gray-800">{item.roomTitle}</td>
                      <td className="py-4 text-gray-500 font-semibold">{item.reporterName}</td>
                      <td className="py-4 text-gray-400 max-w-xs line-clamp-2 italic">"{item.reason}"</td>
                      <td className="py-4 text-center">
                        <span
                          className={`inline-flex px-2 py-0.5 rounded text-[10px] font-bold ${
                            item.status === 'Resolved' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                          }`}
                        >
                          {item.status}
                        </span>
                      </td>
                      <td className="py-4 text-center">
                        {item.status === 'Pending' && (
                          <button
                            onClick={() => handleResolveReport(item.id)}
                            className="px-2.5 py-1 bg-emerald-600 text-white rounded-lg text-xs font-bold hover:bg-emerald-700 shadow-sm"
                          >
                            Resolve
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'analytics' && (
            <div className="space-y-6">
              {/* Payment transactions log mock */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Subscription statistics */}
                <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 space-y-4">
                  <h4 className="font-extrabold text-gray-800 text-sm flex items-center gap-2">
                    <TrendingUp className="h-4.5 w-4.5 text-primary-500" />
                    Listing Commission Statistics
                  </h4>
                  <ul className="space-y-3.5 text-xs text-gray-600 font-semibold">
                    <li className="flex justify-between">
                      <span>Landlord Service Subscriptions</span>
                      <span className="font-extrabold text-gray-800">12 Active Plans</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Vetted Verification Fee Commission</span>
                      <span className="font-extrabold text-gray-800">1,500,000 VND / inspect</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Total Generated Commission Revenue</span>
                      <span className="font-extrabold text-primary-650">14,200,000 VND</span>
                    </li>
                  </ul>
                </div>

                {/* Billing invoice logs */}
                <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 space-y-4">
                  <h4 className="font-extrabold text-gray-800 text-sm flex items-center gap-2">
                    <CreditCard className="h-4.5 w-4.5 text-primary-500" />
                    Recent Commission Payments
                  </h4>
                  <ul className="space-y-3.5 text-xs text-gray-500 font-semibold">
                    <li className="flex justify-between">
                      <span>Inv #1024 - Le Thi B (Premium Listing)</span>
                      <span className="text-emerald-600 font-bold">500,000 VND</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Inv #1023 - Tran Van C (Address vetting)</span>
                      <span className="text-emerald-600 font-bold">200,000 VND</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Inv #1022 - Nguyen Van D (Verification)</span>
                      <span className="text-emerald-600 font-bold">200,000 VND</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
