import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { roomService } from '../../services/roomService';
import RoomCard from '../../components/room/RoomCard';
import EmptyState from '../../components/common/EmptyState';
import { Heart } from 'lucide-react';

export default function Favorites() {
  const { user } = useAuth();
  const [favoriteRooms, setFavoriteRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchFavorites = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const allRooms = await roomService.getAllRooms();
      const favIds = JSON.parse(localStorage.getItem(`favorites_${user.id}`)) || [];
      const filtered = allRooms.filter(r => favIds.includes(r.id));
      setFavoriteRooms(filtered);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, [user]);

  const handleFavoriteToggle = () => {
    // Refresh the list after toggling favorite state on a card
    fetchFavorites();
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
        <h2 className="text-xl font-extrabold text-gray-800">Your Favorite Accommodations</h2>
        <p className="text-xs text-gray-400">Keep track of the rooms you are interested in renting</p>
      </div>

      {favoriteRooms.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {favoriteRooms.map((room) => (
            <RoomCard
              key={room.id}
              room={room}
              onFavoriteToggle={handleFavoriteToggle}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          title="No Favorites Saved"
          description="Click the heart icon on any accommodation card while browsing to save it to your wishlist."
          icon={Heart}
          actionText="Browse Accommodations"
          actionLink="/rooms"
        />
      )}
    </div>
  );
}
