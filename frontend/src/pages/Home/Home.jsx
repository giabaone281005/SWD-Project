import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { roomService } from '../../services/roomService';
import SearchBar from '../../components/common/SearchBar';
import RoomCard from '../../components/room/RoomCard';
import { mockCategories } from '../../utils/mockData';
import { Shield, CheckCircle, Smartphone, HelpCircle } from 'lucide-react';

export default function Home() {
  const navigate = useNavigate();
  const [featuredRooms, setFeaturedRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const data = await roomService.getAllRooms();
        // Get featured or first 3 rooms
        const featured = data.filter(r => r.featured).slice(0, 3);
        setFeaturedRooms(featured.length ? featured : data.slice(0, 3));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchRooms();
  }, []);

  const handleSearch = (searchFilters) => {
    // Navigate to Explore page with search query params
    const params = new URLSearchParams();
    if (searchFilters.location) params.append('location', searchFilters.location);
    if (searchFilters.roomType) params.append('roomType', searchFilters.roomType);
    if (searchFilters.priceRange) params.append('price', searchFilters.priceRange);
    
    navigate(`/rooms?${params.toString()}`);
  };

  return (
    <div className="space-y-20 pb-20">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-950 via-primary-900 to-indigo-950 text-white py-24 px-4 overflow-hidden rounded-b-[40px] shadow-xl">
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary-100 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto text-center relative z-10 space-y-8">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-primary-850/50 text-primary-300 border border-primary-800">
            ✨ Your Gateway to Perfect Boarding Rooms
          </span>
          <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight max-w-4xl mx-auto leading-tight">
            Find and Rent Rooms <span className="bg-gradient-to-r from-primary-400 to-indigo-350 bg-clip-text text-transparent">Directly and Securely</span>
          </h2>
          <p className="text-gray-300 text-base md:text-lg max-w-2xl mx-auto font-medium leading-relaxed">
            Discover a comprehensive catalog of verified boarding houses, cozy studio apartments, and shared rooms near universities and business centers.
          </p>

          <div className="pt-6">
            <SearchBar onSearch={handleSearch} />
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2">
          <h3 className="text-3xl font-extrabold text-gray-800">Browse by Category</h3>
          <p className="text-gray-400 text-sm max-w-md mx-auto">Explore room layouts matching your specific living standard and style.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {mockCategories.map((cat) => (
            <div
              key={cat.id}
              onClick={() => navigate(`/rooms?roomType=${cat.name}`)}
              className="group cursor-pointer bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 relative aspect-[16/10]"
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 via-gray-950/20 to-transparent flex flex-col justify-end p-6" >
                <h4 className="text-xl font-bold text-white mb-0.5">{cat.name}</h4>
                <p className="text-xs text-gray-300 font-semibold">{cat.count}+ Available listings</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Rooms Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 border-b border-gray-100 pb-4">
          <div className="space-y-1">
            <h3 className="text-3xl font-extrabold text-gray-800">Featured Accommodations</h3>
            <p className="text-gray-400 text-sm">Highly rated and secure rooms recommended by our community.</p>
          </div>
          <button
            onClick={() => navigate('/rooms')}
            className="text-sm font-bold text-primary-600 hover:text-primary-700 transition-colors"
          >
            View All Rooms &rarr;
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary-600"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredRooms.map((room) => (
              <RoomCard key={room.id} room={room} />
            ))}
          </div>
        )}
      </section>

      {/* Features Banner Section */}
      <section className="bg-primary-50 py-16 px-4 rounded-[40px] max-w-7xl mx-auto border border-primary-100/50">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="flex flex-col items-center space-y-3">
            <div className="p-4 bg-white rounded-2xl text-primary-600 shadow-sm border border-primary-100/50">
              <Shield className="h-6 w-6" />
            </div>
            <h4 className="text-lg font-bold text-gray-800">Verified Address</h4>
            <p className="text-sm text-gray-400 max-w-xs">All room coordinates, addresses and pictures are physically verified by our moderation team.</p>
          </div>

          <div className="flex flex-col items-center space-y-3">
            <div className="p-4 bg-white rounded-2xl text-primary-600 shadow-sm border border-primary-100/50">
              <CheckCircle className="h-6 w-6" />
            </div>
            <h4 className="text-lg font-bold text-gray-800">No Hidden Fees</h4>
            <p className="text-sm text-gray-400 max-w-xs">Landlord listing fees, deposit policies, and utilities charges are detailed explicitly before you apply.</p>
          </div>

          <div className="flex flex-col items-center space-y-3">
            <div className="p-4 bg-white rounded-2xl text-primary-600 shadow-sm border border-primary-100/50">
              <Smartphone className="h-6 w-6" />
            </div>
            <h4 className="text-lg font-bold text-gray-800">Direct Chat</h4>
            <p className="text-sm text-gray-400 max-w-xs">Communicate in real-time with landlords, request physical inspections, or negotiate lease clauses instantly.</p>
          </div>
        </div>
      </section>

      {/* FAQ Banner Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-6">
        <HelpCircle className="h-12 w-12 text-primary-500 mx-auto" />
        <h3 className="text-3xl font-extrabold text-gray-800">Have Questions?</h3>
        <p className="text-gray-450 text-sm max-w-lg mx-auto">Learn about the booking process, security deposits, listing rules and landlord terms in our Help Center.</p>
        <button
          onClick={() => navigate('/faq')}
          className="bg-white hover:bg-gray-50 text-gray-700 font-bold border border-gray-200 px-6 py-3 rounded-2xl shadow-sm transition-all"
        >
          Read FAQs
        </button>
      </section>
    </div>
  );
}
