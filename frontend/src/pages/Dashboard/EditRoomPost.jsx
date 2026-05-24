import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { roomService } from '../../services/roomService';
import { ArrowLeft, Save, CheckCircle, Check } from 'lucide-react';

export default function EditRoomPost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  // Form Fields State
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [area, setArea] = useState('');
  const [address, setAddress] = useState('');
  const [type, setType] = useState('Studio');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [selectedAmenities, setSelectedAmenities] = useState([]);

  const amenitiesList = ['Air Conditioning', 'Free Wi-Fi', 'Washing Machine', 'Security 24/7', 'Elevator', 'Swimming Pool', 'Gym', 'Mezzanine', 'Fully Furnished', 'Private Bathroom', 'Kitchen Corner', 'Motor Parking'];

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const room = await roomService.getRoomById(id);
        if (room) {
          setTitle(room.title);
          setPrice(room.price);
          setArea(room.area);
          setAddress(room.address);
          setType(room.type);
          setDescription(room.description);
          setImageUrl(room.images[0]);
          setSelectedAmenities(room.amenities || []);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchRoom();
  }, [id]);

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
      await roomService.updateRoom(id, {
        title,
        price: parseInt(price),
        area: parseInt(area),
        address,
        type,
        description,
        images: [imageUrl],
        amenities: selectedAmenities,
      });

      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        navigate('/landlord/listings');
      }, 1500);
    } catch (err) {
      console.error(err);
      alert('Error updating listing.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20 w-full">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary-600"></div>
      </div>
    );
  }

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
          <h2 className="text-xl font-extrabold text-gray-800">Edit Room Listing</h2>
          <p className="text-xs text-gray-400">Modify details of your published room accommodation</p>
        </div>

        {success && (
          <div className="bg-emerald-50 text-emerald-700 text-xs font-bold p-3.5 rounded-xl border border-emerald-100 flex items-center gap-2">
            <CheckCircle className="h-4.5 w-4.5 text-emerald-500" />
            Room listing updated successfully in mock database! Redirecting...
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Title */}
            <div className="space-y-1 sm:col-span-2">
              <label className="text-xs font-bold text-gray-700">Listing Title *</label>
              <input
                type="text"
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
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-gray-50 border border-transparent focus:bg-white focus:border-primary-400 text-sm p-3.5 rounded-xl focus:outline-none text-gray-700"
            />
          </div>

          {/* Amenities checklist */}
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
              <Save className="h-4 w-4" />
              {submitting ? 'Saving Changes...' : 'Save Changes'}
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
