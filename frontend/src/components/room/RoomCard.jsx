import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Heart, MapPin, Maximize2, Star } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function RoomCard({ room, onFavoriteToggle }) {
  const { user } = useAuth();
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    // Check if the current room is favorited in localStorage
    const favorites = JSON.parse(localStorage.getItem(`favorites_${user?.id || 'guest'}`)) || [];
    setIsFavorite(favorites.includes(room.id));
  }, [room.id, user?.id]);

  const handleFavoriteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    const key = `favorites_${user?.id || 'guest'}`;
    const favorites = JSON.parse(localStorage.getItem(key)) || [];
    let updatedFavorites;

    if (favorites.includes(room.id)) {
      updatedFavorites = favorites.filter(id => id !== room.id);
      setIsFavorite(false);
    } else {
      updatedFavorites = [...favorites, room.id];
      setIsFavorite(true);
    }

    localStorage.setItem(key, JSON.stringify(updatedFavorites));
    if (onFavoriteToggle) {
      onFavoriteToggle(room.id, !isFavorite);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  return (
    <div className="group bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full relative">
      {/* Favorite Button */}
      <button
        onClick={handleFavoriteClick}
        className="absolute top-4 right-4 p-2.5 rounded-full bg-white/90 backdrop-blur-sm shadow-md hover:bg-white text-gray-500 hover:text-red-500 transition-all z-10 focus:outline-none"
      >
        <Heart
          className={`h-5 w-5 transition-transform active:scale-75 ${
            isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'
          }`}
        />
      </button>

      {/* Image Gallery Mock */}
      <Link to={`/room/${room.id}`} className="block relative aspect-[4/3] overflow-hidden bg-gray-100">
        <img
          src={room.images[0]}
          alt={room.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute bottom-3 left-3 bg-gray-900/70 backdrop-blur-sm text-white text-[11px] font-bold px-2.5 py-1 rounded-lg">
          {room.type}
        </div>
      </Link>

      {/* Room Details */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div className="space-y-2">
          {/* Rating */}
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-extrabold text-primary-600 bg-primary-50 px-2 py-0.5 rounded-md uppercase tracking-wider">
              {room.status}
            </span>
            <div className="flex items-center gap-1 text-amber-500 text-sm font-bold">
              <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
              <span>{room.rating}</span>
              <span className="text-gray-400 font-normal">({room.reviewsCount})</span>
            </div>
          </div>

          {/* Title */}
          <Link to={`/room/${room.id}`} className="block">
            <h4 className="font-bold text-gray-800 text-base line-clamp-1 group-hover:text-primary-600 transition-colors leading-tight">
              {room.title}
            </h4>
          </Link>

          {/* Location */}
          <div className="flex items-center gap-1.5 text-gray-500 text-xs line-clamp-1">
            <MapPin className="h-3.5 w-3.5 shrink-0 text-gray-400" />
            <span className="truncate">{room.address}</span>
          </div>

          {/* Area & Details */}
          <div className="flex items-center gap-3 pt-1 text-gray-600 text-xs font-semibold">
            <div className="flex items-center gap-1">
              <Maximize2 className="h-3.5 w-3.5 text-gray-400" />
              <span>{room.area} m²</span>
            </div>
            <span>•</span>
            <span>{room.amenities.slice(0, 2).join(', ')}</span>
          </div>
        </div>

        {/* Pricing / Booking Link */}
        <div className="flex items-center justify-between border-t border-gray-50 pt-4 mt-4">
          <div>
            <span className="text-[10px] text-gray-400 font-bold block uppercase tracking-wider">Monthly Rent</span>
            <span className="text-lg font-extrabold text-primary-600">
              {formatPrice(room.price).replace('₫', '')}
              <span className="text-xs font-semibold text-gray-400">/mo</span>
            </span>
          </div>
          <Link
            to={`/room/${room.id}`}
            className="text-xs font-bold text-white bg-primary-600 hover:bg-primary-700 px-4 py-2.5 rounded-xl transition-all duration-200"
          >
            Details
          </Link>
        </div>
      </div>
    </div>
  );
}
