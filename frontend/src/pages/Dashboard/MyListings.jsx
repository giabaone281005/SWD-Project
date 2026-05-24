import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { roomService } from '../../services/roomService';
import EmptyState from '../../components/common/EmptyState';
import { Home, Plus, Edit, Trash2, CheckCircle2 } from 'lucide-react';

export default function MyListings() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState('');

  const fetchListings = async () => {
    if (!user) return;
    try {
      const data = await roomService.getAllRooms();
      const landlordRooms = data.filter(r => r.landlordId === user.id);
      setRooms(landlordRooms);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchListings();
  }, [user]);

  const handleDelete = async (roomId) => {
    if (!window.confirm('Are you sure you want to delete this room listing permanently?')) return;
    
    try {
      await roomService.deleteRoom(roomId);
      setSuccess('Listing deleted successfully.');
      setTimeout(() => setSuccess(''), 2000);
      fetchListings();
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

  return (
    <div className="space-y-6 w-full">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-extrabold text-gray-800">My Listings</h2>
          <p className="text-xs text-gray-400">Manage and update your published boarding rooms and studios</p>
        </div>

        <Link
          to="/landlord/create-room"
          className="flex items-center gap-1.5 bg-primary-600 hover:bg-primary-700 text-white font-bold px-4 py-2.5 rounded-xl shadow-md text-xs transition-all"
        >
          <Plus className="h-4 w-4" />
          Create Room Post
        </Link>
      </div>

      {success && (
        <div className="bg-emerald-50 text-emerald-700 text-xs font-bold p-3.5 rounded-xl border border-emerald-100 flex items-center gap-2">
          <CheckCircle2 className="h-4.5 w-4.5 text-emerald-500" />
          {success}
        </div>
      )}

      {rooms.length > 0 ? (
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100 text-xs font-bold text-gray-400 uppercase tracking-wider">
                  <th className="px-6 py-4">Room Details</th>
                  <th className="px-6 py-4">Location</th>
                  <th className="px-6 py-4">Rent Price</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 text-sm">
                {rooms.map((room) => (
                  <tr key={room.id} className="hover:bg-gray-50/50 transition-colors">
                    {/* Room Info */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={room.images[0]}
                          alt={room.title}
                          className="h-12 w-12 rounded-xl object-cover shrink-0"
                        />
                        <div>
                          <h4 className="font-bold text-gray-800 line-clamp-1 max-w-[200px]">{room.title}</h4>
                          <span className="text-xs text-gray-400 font-bold capitalize">
                            {room.type} • {room.area} m²
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Location */}
                    <td className="px-6 py-4">
                      <p className="text-xs text-gray-500 truncate max-w-[180px] font-semibold" title={room.address}>
                        {room.address}
                      </p>
                    </td>

                    {/* Rent */}
                    <td className="px-6 py-4 font-extrabold text-primary-600">
                      {formatPrice(room.price).replace('₫', '')} <span className="text-[10px] text-gray-400">/mo</span>
                    </td>

                    {/* Status */}
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${
                          room.status === 'Available'
                            ? 'bg-emerald-50 text-emerald-700'
                            : 'bg-gray-100 text-gray-500'
                        }`}
                      >
                        {room.status}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4 text-center">
                      <div className="flex items-center gap-3 justify-center">
                        <Link
                          to={`/landlord/edit-room/${room.id}`}
                          className="p-1.5 bg-gray-50 hover:bg-primary-50 text-gray-500 hover:text-primary-600 rounded-lg transition-colors"
                          title="Edit Post"
                        >
                          <Edit className="h-4 w-4" />
                        </Link>
                        <button
                          onClick={() => handleDelete(room.id)}
                          className="p-1.5 bg-gray-50 hover:bg-rose-50 text-gray-500 hover:text-rose-600 rounded-lg transition-colors focus:outline-none"
                          title="Delete Listing"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <EmptyState
          title="No Published Rooms"
          description="You haven't listed any boarding rooms on the platform yet. Set up a post to start receiving booking requests."
          icon={Home}
          actionText="Create Room Post"
          actionLink="/landlord/create-room"
        />
      )}
    </div>
  );
}
