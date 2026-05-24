import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { roomService } from '../../services/roomService';
import RoomCard from '../../components/room/RoomCard';
import LoadingSkeleton from '../../components/common/LoadingSkeleton';
import EmptyState from '../../components/common/EmptyState';
import { Search, MapPin, Grid, Map as MapIcon, SlidersHorizontal, Check } from 'lucide-react';

export default function ExploreRooms() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [rooms, setRooms] = useState([]);
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showMap, setShowMap] = useState(false);

  // Filters State
  const [searchQuery, setSearchQuery] = useState(searchParams.get('location') || '');
  const [roomType, setRoomType] = useState(searchParams.get('roomType') || '');
  const [priceRange, setPriceRange] = useState(searchParams.get('price') || '');
  const [selectedAmenities, setSelectedAmenities] = useState([]);

  const amenitiesList = ['Air Conditioning', 'Free Wi-Fi', 'Washing Machine', 'Security 24/7', 'Elevator', 'Swimming Pool', 'Gym', 'Mezzanine'];

  useEffect(() => {
    const fetchRooms = async () => {
      setLoading(true);
      try {
        const data = await roomService.getAllRooms();
        setRooms(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchRooms();
  }, []);

  // Update filters from search query parameters
  useEffect(() => {
    setSearchQuery(searchParams.get('location') || '');
    setRoomType(searchParams.get('roomType') || '');
    setPriceRange(searchParams.get('price') || '');
  }, [searchParams]);

  useEffect(() => {
    let result = [...rooms];

    // Filter by Search Query (Address/Title)
    if (searchQuery) {
      result = result.filter(r =>
        r.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by Room Type
    if (roomType) {
      result = result.filter(r => r.type === roomType);
    }

    // Filter by Price Range
    if (priceRange) {
      const price = parseInt(priceRange);
      result = result.filter(r => r.price <= price);
    }

    // Filter by Amenities
    if (selectedAmenities.length > 0) {
      result = result.filter(r =>
        selectedAmenities.every(amenity => r.amenities.includes(amenity))
      );
    }

    setFilteredRooms(result);
  }, [rooms, searchQuery, roomType, priceRange, selectedAmenities]);

  const handleAmenityChange = (amenity) => {
    setSelectedAmenities(prev =>
      prev.includes(amenity)
        ? prev.filter(item => item !== amenity)
        : [...prev, amenity]
    );
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setRoomType('');
    setPriceRange('');
    setSelectedAmenities([]);
    setSearchParams({});
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header and Map Toggle */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-gray-800">Explore Available Accommodations</h2>
          <p className="text-sm text-gray-400">Showing {filteredRooms.length} rooms matching your search preferences</p>
        </div>

        <button
          onClick={() => setShowMap(!showMap)}
          className="flex items-center gap-2 bg-white hover:bg-gray-50 border border-gray-200 text-gray-700 font-bold px-4 py-2.5 rounded-xl shadow-sm transition-all focus:outline-none"
        >
          {showMap ? (
            <>
              <Grid className="h-4 w-4 text-primary-500" />
              <span>Show Grid Only</span>
            </>
          ) : (
            <>
              <MapIcon className="h-4 w-4 text-primary-500" />
              <span>Show Split Map</span>
            </>
          )}
        </button>
      </div>

      {/* Main split content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filter Sidebar */}
        <aside className="lg:col-span-1 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-6 h-fit">
          <div className="flex justify-between items-center border-b border-gray-50 pb-4">
            <h3 className="font-extrabold text-gray-800 flex items-center gap-2">
              <SlidersHorizontal className="h-4 w-4 text-primary-500" />
              Filters
            </h3>
            <button
              onClick={handleClearFilters}
              className="text-xs font-bold text-red-500 hover:text-red-600"
            >
              Clear All
            </button>
          </div>

          {/* Search Query */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-700">Location / Keyword</label>
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-gray-50 border border-transparent focus:bg-white focus:border-primary-400 text-sm pl-9 pr-4 py-2 rounded-xl focus:outline-none"
              />
            </div>
          </div>

          {/* Room Type */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-700">Property Type</label>
            <select
              value={roomType}
              onChange={(e) => setRoomType(e.target.value)}
              className="w-full bg-gray-50 border border-transparent focus:bg-white focus:border-primary-400 text-sm px-3 py-2 rounded-xl focus:outline-none font-semibold text-gray-700"
            >
              <option value="">All Types</option>
              <option value="Studio">Studio</option>
              <option value="Apartment">Apartment</option>
              <option value="Boarding House">Boarding House</option>
            </select>
          </div>

          {/* Max Price */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-700">Price Cap</label>
            <select
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
              className="w-full bg-gray-50 border border-transparent focus:bg-white focus:border-primary-400 text-sm px-3 py-2 rounded-xl focus:outline-none font-semibold text-gray-700"
            >
              <option value="">Any Price</option>
              <option value="3000000">Under 3M VND</option>
              <option value="5000000">Under 5M VND</option>
              <option value="10000000">Under 10M VND</option>
            </select>
          </div>

          {/* Amenities checklist */}
          <div className="space-y-3">
            <label className="text-xs font-bold text-gray-700 block">Amenities</label>
            <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
              {amenitiesList.map(amenity => {
                const checked = selectedAmenities.includes(amenity);
                return (
                  <button
                    key={amenity}
                    onClick={() => handleAmenityChange(amenity)}
                    className="flex items-center gap-2.5 text-left text-sm font-semibold text-gray-650 hover:text-primary-600 w-full focus:outline-none"
                  >
                    <span className={`h-4.5 w-4.5 rounded-md border flex items-center justify-center transition-colors ${
                      checked ? 'bg-primary-600 border-primary-600 text-white' : 'border-gray-200 bg-white'
                    }`}>
                      {checked && <Check className="h-3 w-3 stroke-[3]" />}
                    </span>
                    <span>{amenity}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </aside>

        {/* Content Area */}
        <main className={`grid gap-6 ${showMap ? 'lg:col-span-3 grid-cols-1 lg:grid-cols-2' : 'lg:col-span-3 grid-cols-1 md:grid-cols-2 xl:grid-cols-3'}`}>
          {loading ? (
            <div className="col-span-full py-12">
              <LoadingSkeleton type="card" count={3} />
            </div>
          ) : filteredRooms.length > 0 ? (
            <>
              {/* List grid */}
              <div className={`grid gap-6 grid-cols-1 ${showMap ? 'sm:grid-cols-1 md:grid-cols-2' : 'sm:grid-cols-2 lg:grid-cols-3'}`}>
                {filteredRooms.map((room) => (
                  <RoomCard key={room.id} room={room} />
                ))}
              </div>

              {/* Map Split Screen Panel */}
              {showMap && (
                <div className="bg-gray-100 border border-gray-200 rounded-3xl overflow-hidden min-h-[500px] relative hidden lg:flex flex-col items-center justify-center p-6 text-center space-y-4">
                  <div className="absolute inset-0 bg-sky-100 opacity-60 pointer-events-none" style={{
                    backgroundImage: 'radial-gradient(#2552eb 0.5px, transparent 0.5px), radial-gradient(#2552eb 0.5px, #f0f9ff 0.5px)',
                    backgroundSize: '20px 20px',
                    backgroundPosition: '0 0, 10px 10px'
                  }} />
                  
                  {/* Mock map coordinates pins */}
                  {filteredRooms.slice(0, 4).map((room, idx) => (
                    <div
                      key={room.id}
                      className="absolute bg-white px-2 py-1 rounded-lg shadow-md border border-primary-300 font-bold text-xs text-primary-700 flex items-center gap-1 z-10 transition-transform hover:scale-105"
                      style={{
                        top: `${25 + idx * 18}%`,
                        left: `${20 + idx * 15}%`
                      }}
                    >
                      <MapPin className="h-3 w-3 text-red-500 fill-red-500" />
                      {(room.price / 1000000).toFixed(1)}M
                    </div>
                  ))}

                  <div className="bg-white/80 backdrop-blur-md px-6 py-8 rounded-2xl shadow-xl max-w-xs relative z-10 space-y-3">
                    <MapIcon className="h-10 w-10 text-primary-500 mx-auto" />
                    <h4 className="font-extrabold text-gray-800 text-sm">Interactive Map Viewer</h4>
                    <p className="text-xs text-gray-400 leading-relaxed">Pins indicate monthly rates in HCMC. Search bounds sync with filters.</p>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="col-span-full py-8">
              <EmptyState
                title="No Accommodation Matches"
                description="We couldn't find any rooms fitting those specific filter selections. Try clearing your filters or widening your price limit."
                actionText="Clear All Filters"
                actionLink="#"
              />
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
