import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { roomService } from '../../services/roomService';
import { Home, ArrowLeft, Plus, CheckCircle, Check } from 'lucide-react';

export default function CreateRoomPost() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  // Form Fields
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [area, setArea] = useState('');
  const [address, setAddress] = useState('');
  const [type, setType] = useState('Studio');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [selectedAmenities, setSelectedAmenities] = useState([]);

  const amenitiesList = ['Air Conditioning', 'Free Wi-Fi', 'Washing Machine', 'Security 24/7', 'Elevator', 'Swimming Pool', 'Gym', 'Mezzanine', 'Fully Furnished', 'Private Bathroom', 'Kitchen Corner', 'Motor Parking'];

  const handleAmenityChange = (amenity) => {
    setSelectedAmenities(prev =>
      prev.includes(amenity)
        ? prev.filter(item => item !== amenity)
        : [...prev, amenity]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !price || !area || !address) {
      alert('Please fill in all required fields.');
      return;
    }

    setSubmitting(true);
    try {
      // Setup default mock image if empty
      const finalImage = imageUrl.trim() || 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80';

      await roomService.createRoom({
        title,
        price: parseInt(price),
        area: parseInt(area),
        address,
        type,
        description,
        images: [finalImage],
        amenities: selectedAmenities,
      }, user);

      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        navigate('/landlord/listings');
      }, 1500);
    } catch (err) {
      console.error(err);
      alert('Error creating listing.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 py-4">
      {/* Back link */}
      <Link
        to="/landlord/listings"
        className="text-xs font-bold text-gray-500 hover:text-primary-600 flex items-center gap-1.5 focus:outline-none"
      >
        <ArrowLeft className="h-4 w-4" /> Back to Listings
      </Link>

      <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
        <div>
          <h2 className="text-xl font-extrabold text-gray-800">Create New Room Listing</h2>
          <p className="text-xs text-gray-400">Post details of your property to receive viewing applications</p>
        </div>

        {success && (
          <div className="bg-emerald-50 text-emerald-700 text-xs font-bold p-3.5 rounded-xl border border-emerald-100 flex items-center gap-2">
            <CheckCircle className="h-4.5 w-4.5 text-emerald-500" />
            Room listing created successfully in simulated database! Redirecting...
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Title */}
            <div className="space-y-1 sm:col-span-2">
              <label className="text-xs font-bold text-gray-700">Listing Title *</label>
              <input
                type="text"
                placeholder="e.g. Modern Studio Room near HUTECH University"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-gray-50 border border-transparent focus:bg-white focus:border-primary-400 text-sm px-3.5 py-2.5 rounded-xl focus:outline-none text-gray-700 font-semibold"
                required
              />
            </div>

            {/* Type */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-700">Property Type *</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full bg-gray-50 border border-transparent focus:bg-white focus:border-primary-400 text-sm px-3 py-2.5 rounded-xl focus:outline-none font-semibold text-gray-700"
              >
                <option value="Studio">Studio</option>
                <option value="Apartment">Apartment</option>
                <option value="Boarding House">Boarding House</option>
              </select>
            </div>

            {/* Area */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-700">Area (m²) *</label>
              <input
                type="number"
                placeholder="e.g. 25"
                value={area}
                onChange={(e) => setArea(e.target.value)}
                className="w-full bg-gray-50 border border-transparent focus:bg-white focus:border-primary-400 text-sm px-3.5 py-2.5 rounded-xl focus:outline-none text-gray-700 font-semibold"
                required
              />
            </div>

            {/* Rent */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-700">Monthly Rent (VND) *</label>
              <input
                type="number"
                placeholder="e.g. 3500000"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full bg-gray-50 border border-transparent focus:bg-white focus:border-primary-400 text-sm px-3.5 py-2.5 rounded-xl focus:outline-none text-gray-700 font-semibold"
                required
              />
            </div>

            {/* Photo Link */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-700">Cover Photo Link (URL)</label>
              <input
                type="url"
                placeholder="https://images.unsplash.com/... or leave empty for default mock image"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="w-full bg-gray-50 border border-transparent focus:bg-white focus:border-primary-400 text-sm px-3.5 py-2.5 rounded-xl focus:outline-none text-gray-700 font-semibold"
              />
            </div>

            {/* Address */}
            <div className="space-y-1 sm:col-span-2">
              <label className="text-xs font-bold text-gray-700">Physical Address *</label>
              <input
                type="text"
                placeholder="e.g. 142 Dien Bien Phu, Ward 15, Binh Thanh, HCMC"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full bg-gray-50 border border-transparent focus:bg-white focus:border-primary-400 text-sm px-3.5 py-2.5 rounded-xl focus:outline-none text-gray-700 font-semibold"
                required
              />
            </div>
          </div>

          {/* Description */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-700">Property Description</label>
            <textarea
              rows="5"
              placeholder="Tell room hunters about details like security deposits, electric rates, room keys, and curfew..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-gray-50 border border-transparent focus:bg-white focus:border-primary-400 text-sm p-3.5 rounded-xl focus:outline-none text-gray-700"
            />
          </div>

          {/* Amenities grid */}
          <div className="space-y-3">
            <label className="text-xs font-bold text-gray-700 block">Select Amenities Available</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {amenitiesList.map(amenity => {
                const checked = selectedAmenities.includes(amenity);
                return (
                  <button
                    type="button"
                    key={amenity}
                    onClick={() => handleAmenityChange(amenity)}
                    className="flex items-center gap-2.5 text-left text-xs font-semibold text-gray-705 focus:outline-none bg-gray-50/50 hover:bg-gray-50 px-3.5 py-2 rounded-xl border border-gray-100"
                  >
                    <span className={`h-4 w-4 rounded-md border flex items-center justify-center shrink-0 transition-colors ${
                      checked ? 'bg-primary-600 border-primary-600 text-white' : 'border-gray-250 bg-white'
                    }`}>
                      {checked && <Check className="h-2.5 w-2.5 stroke-[3]" />}
                    </span>
                    <span>{amenity}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex gap-4 pt-4 border-t border-gray-50">
            <button
              type="submit"
              disabled={submitting}
              className="bg-primary-600 hover:bg-primary-700 text-white font-bold h-11 px-6 rounded-xl shadow-md transition-all flex items-center gap-1.5"
            >
              <Plus className="h-4 w-4" />
              {submitting ? 'Creating Listing...' : 'Publish Listing'}
            </button>
            <Link
              to="/landlord/listings"
              className="bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-700 font-bold h-11 px-6 rounded-xl flex items-center justify-center transition-all"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
