import React, { useState } from 'react';
import { Search, MapPin, DollarSign, Home } from 'lucide-react';

export default function SearchBar({ onSearch, initialValues = {} }) {
  const [location, setLocation] = useState(initialValues.location || '');
  const [priceRange, setPriceRange] = useState(initialValues.priceRange || '');
  const [roomType, setRoomType] = useState(initialValues.roomType || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch({ location, priceRange, roomType });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-4 rounded-3xl border border-gray-100 shadow-xl max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-4 items-center"
    >
      {/* Location */}
      <div className="flex items-center gap-3 px-3 py-2 border-b md:border-b-0 md:border-r border-gray-100">
        <MapPin className="h-5 w-5 text-primary-500 shrink-0" />
        <div className="w-full">
          <label className="text-[10px] text-gray-400 font-bold block uppercase tracking-wider">Location</label>
          <input
            type="text"
            placeholder="e.g. Binh Thanh, District 1"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full bg-transparent text-sm font-semibold text-gray-800 focus:outline-none placeholder-gray-400"
          />
        </div>
      </div>

      {/* Room Type */}
      <div className="flex items-center gap-3 px-3 py-2 border-b md:border-b-0 md:border-r border-gray-100">
        <Home className="h-5 w-5 text-primary-500 shrink-0" />
        <div className="w-full">
          <label className="text-[10px] text-gray-400 font-bold block uppercase tracking-wider">Room Type</label>
          <select
            value={roomType}
            onChange={(e) => setRoomType(e.target.value)}
            className="w-full bg-transparent text-sm font-semibold text-gray-800 focus:outline-none placeholder-gray-400"
          >
            <option value="">All Types</option>
            <option value="Studio">Studio</option>
            <option value="Apartment">Apartment</option>
            <option value="Boarding House">Boarding House</option>
          </select>
        </div>
      </div>

      {/* Price Range */}
      <div className="flex items-center gap-3 px-3 py-2 border-b md:border-b-0 border-gray-100">
        <DollarSign className="h-5 w-5 text-primary-500 shrink-0" />
        <div className="w-full">
          <label className="text-[10px] text-gray-400 font-bold block uppercase tracking-wider">Max Price</label>
          <select
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value)}
            className="w-full bg-transparent text-sm font-semibold text-gray-800 focus:outline-none"
          >
            <option value="">Any Price</option>
            <option value="3000000">Under 3M VND</option>
            <option value="5000000">Under 5M VND</option>
            <option value="10000000">Under 10M VND</option>
          </select>
        </div>
      </div>

      {/* Search Button */}
      <button
        type="submit"
        className="w-full bg-primary-600 hover:bg-primary-700 text-white font-bold h-12 rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-primary-500/20 hover:-translate-y-0.5 transition-all duration-200"
      >
        <Search className="h-5 w-5" />
        Search Rooms
      </button>
    </form>
  );
}
