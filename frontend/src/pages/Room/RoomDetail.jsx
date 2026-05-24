import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { roomService } from '../../services/roomService';
import { bookingService } from '../../services/bookingService';
import { useAuth } from '../../context/AuthContext';
import LoadingSkeleton from '../../components/common/LoadingSkeleton';
import Modal from '../../components/common/Modal';
import {
  MapPin,
  Maximize2,
  Calendar,
  Clock,
  MessageSquare,
  Phone,
  User,
  Star,
  ShieldCheck,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

export default function RoomDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activePhoto, setActivePhoto] = useState(0);

  // Booking Form State
  const [preferredDate, setPreferredDate] = useState('');
  const [preferredTime, setPreferredTime] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalContent, setModalContent] = useState('');

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const data = await roomService.getRoomById(id);
        if (data) {
          setRoom(data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchRoom();
  }, [id]);

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      // Prompt sign in
      setModalTitle('Authentication Required');
      setModalContent(
        <div className="space-y-4">
          <p className="text-gray-600">You must be logged in as a Tenant to send a booking or viewing request.</p>
          <div className="flex gap-3 justify-end pt-2">
            <button
              onClick={() => setModalOpen(false)}
              className="px-4 py-2 border border-gray-250 rounded-xl font-bold text-gray-700 hover:bg-gray-50 text-sm"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                setModalOpen(false);
                navigate('/login');
              }}
              className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-bold text-sm shadow-md shadow-primary-500/10"
            >
              Log In Now
            </button>
          </div>
        </div>
      );
      setModalOpen(true);
      return;
    }

    if (user.role !== 'tenant') {
      setModalTitle('Operation Forbidden');
      setModalContent(
        <div className="space-y-3 text-center py-2">
          <AlertCircle className="h-10 w-10 text-red-500 mx-auto" />
          <p className="text-gray-600 font-medium">Only Tenant accounts can submit viewing applications.</p>
          <button
            onClick={() => setModalOpen(false)}
            className="mt-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-xl font-bold text-sm"
          >
            Dismiss
          </button>
        </div>
      );
      setModalOpen(true);
      return;
    }

    if (!preferredDate || !preferredTime) {
      alert('Please fill in both Date and Time fields.');
      return;
    }

    setSubmitting(true);
    try {
      await bookingService.createBooking({
        roomId: room.id,
        roomTitle: room.title,
        roomPrice: room.price,
        roomImage: room.images[0],
        preferredDate,
        preferredTime,
        message,
      }, user);

      setModalTitle('Booking Request Sent!');
      setModalContent(
        <div className="space-y-4 text-center py-4">
          <CheckCircle2 className="h-14 w-14 text-emerald-500 mx-auto" />
          <h4 className="font-extrabold text-gray-800 text-lg">Application Submitted</h4>
          <p className="text-sm text-gray-400 max-w-sm mx-auto">
            Your request has been forwarded to <strong>{room.landlordName}</strong>. You will receive an alert once they approve or reject the time slots.
          </p>
          <button
            onClick={() => {
              setModalOpen(false);
              navigate('/booking-history');
            }}
            className="px-6 py-2.5 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-bold text-sm shadow-md"
          >
            Track Application Status
          </button>
        </div>
      );
      setModalOpen(true);
      // Reset form
      setPreferredDate('');
      setPreferredTime('');
      setMessage('');
    } catch (err) {
      console.error(err);
      alert('Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <LoadingSkeleton type="detail" />
      </div>
    );
  }

  if (!room) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h3 className="text-xl font-bold text-gray-800">Accommodation not found</h3>
        <button onClick={() => navigate('/rooms')} className="mt-4 text-primary-600 font-semibold">
          Back to Explore
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Back navigation */}
      <button
        onClick={() => navigate(-1)}
        className="text-sm font-bold text-gray-500 hover:text-primary-600 flex items-center gap-1.5 focus:outline-none"
      >
        &larr; Back to Listings
      </button>

      {/* Photo Gallery Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Active Large Image */}
        <div className="md:col-span-2 aspect-[4/3] rounded-3xl overflow-hidden bg-gray-50 border border-gray-150">
          <img
            src={room.images[activePhoto]}
            alt={room.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Side Thumbnails */}
        <div className="grid grid-cols-3 md:grid-cols-1 gap-4">
          {room.images.map((img, idx) => (
            <div
              key={idx}
              onClick={() => setActivePhoto(idx)}
              className={`aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer border-2 transition-all ${
                activePhoto === idx ? 'border-primary-500 shadow-md' : 'border-transparent hover:border-gray-300'
              }`}
            >
              <img src={img} alt="room-thumbnail" className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      </section>

      {/* Split Details Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Side: General Info */}
        <main className="lg:col-span-2 space-y-8">
          <div className="space-y-3">
            {/* Badges / Rating */}
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-xs font-bold text-primary-600 bg-primary-50 px-3 py-1 rounded-full uppercase tracking-wider">
                {room.type}
              </span>
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full uppercase tracking-wider">
                {room.status}
              </span>
              <div className="flex items-center gap-1 text-amber-500 font-bold text-sm">
                <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
                <span>{room.rating}</span>
                <span className="text-gray-400 font-normal">({room.reviewsCount} reviews)</span>
              </div>
            </div>

            {/* Title */}
            <h2 className="text-3xl font-extrabold text-gray-800 leading-tight">{room.title}</h2>

            {/* Address */}
            <div className="flex items-center gap-1.5 text-gray-500 text-sm">
              <MapPin className="h-4.5 w-4.5 text-gray-450 shrink-0" />
              <span>{room.address}</span>
            </div>

            {/* Area */}
            <div className="flex items-center gap-1.5 text-gray-500 text-sm font-semibold">
              <Maximize2 className="h-4.5 w-4.5 text-gray-450 shrink-0" />
              <span>Total Area: {room.area} m²</span>
            </div>
          </div>

          <hr className="border-gray-100" />

          {/* Description */}
          <div className="space-y-3">
            <h3 className="text-xl font-extrabold text-gray-800">Room Overview</h3>
            <p className="text-sm text-gray-650 leading-relaxed font-medium">{room.description}</p>
          </div>

          <hr className="border-gray-100" />

          {/* Amenities Grid */}
          <div className="space-y-4">
            <h3 className="text-xl font-extrabold text-gray-800">Building Amenities</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {room.amenities.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2.5 bg-gray-50 px-4 py-3 rounded-2xl border border-gray-100/50">
                  <CheckCircle2 className="h-4.5 w-4.5 text-emerald-500 shrink-0" />
                  <span className="text-xs font-semibold text-gray-700">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <hr className="border-gray-100" />

          {/* Safety Verification Badge */}
          <div className="flex gap-4 bg-sky-50/50 border border-sky-100 p-5 rounded-3xl items-start">
            <ShieldCheck className="h-10 w-10 text-primary-600 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h4 className="font-extrabold text-gray-800 text-sm">RoomFinder Certified Listing</h4>
              <p className="text-xs text-gray-500 leading-relaxed">
                This accommodation is physically verified by our moderation team. The address coordinates, amenities checklist and prices match physical property records.
              </p>
            </div>
          </div>
        </main>

        {/* Right Side: Landlord / Booking Sidebar */}
        <aside className="lg:col-span-1 space-y-6">
          {/* Monthly rent block */}
          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-2">
            <span className="text-xs text-gray-400 font-bold block uppercase tracking-wider">Price per Month</span>
            <span className="text-3xl font-extrabold text-primary-600 tracking-tight">
              {formatPrice(room.price)}
            </span>
          </div>

          {/* Landlord Info */}
          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-4">
            <h4 className="font-extrabold text-gray-800 text-sm">Listed by Landlord</h4>
            <div className="flex items-center gap-3">
              <img
                src={room.landlordAvatar}
                alt={room.landlordName}
                className="h-12 w-12 rounded-full object-cover border border-primary-50"
              />
              <div>
                <h5 className="font-bold text-gray-800 text-sm">{room.landlordName}</h5>
                <span className="text-xs text-gray-400">Response time: &lt; 2 hours</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <a
                href={`tel:${room.phone || '090000000'}`}
                className="flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-bold text-gray-700 bg-gray-50 border border-gray-150 hover:bg-gray-100 transition-colors"
              >
                <Phone className="h-3.5 w-3.5" />
                Call Now
              </a>
              <button
                onClick={() => navigate('/messages')}
                className="flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-bold text-primary-600 bg-primary-50 border border-primary-100 hover:bg-primary-100 transition-colors"
              >
                <MessageSquare className="h-3.5 w-3.5" />
                Send Message
              </button>
            </div>
          </div>

          {/* Booking Viewing slots form */}
          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-4">
            <h4 className="font-extrabold text-gray-800 text-sm">Book a Room Viewing</h4>
            <form onSubmit={handleBookingSubmit} className="space-y-4">
              {/* Date */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-750 flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5 text-primary-500" />
                  Preferred Date
                </label>
                <input
                  type="date"
                  value={preferredDate}
                  onChange={(e) => setPreferredDate(e.target.value)}
                  className="w-full bg-gray-50 border border-transparent focus:bg-white focus:border-primary-400 text-sm px-3 py-2 rounded-xl focus:outline-none font-semibold text-gray-700"
                  required
                />
              </div>

              {/* Time */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-750 flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5 text-primary-500" />
                  Preferred Time
                </label>
                <select
                  value={preferredTime}
                  onChange={(e) => setPreferredTime(e.target.value)}
                  className="w-full bg-gray-50 border border-transparent focus:bg-white focus:border-primary-400 text-sm px-3 py-2 rounded-xl focus:outline-none font-semibold text-gray-700"
                  required
                >
                  <option value="">Select Time Slot</option>
                  <option value="09:00 AM">09:00 AM</option>
                  <option value="10:00 AM">10:00 AM</option>
                  <option value="11:00 AM">11:00 AM</option>
                  <option value="02:00 PM">02:00 PM</option>
                  <option value="03:00 PM">03:00 PM</option>
                  <option value="04:00 PM">04:00 PM</option>
                </select>
              </div>

              {/* Message */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-750 flex items-center gap-1.5">
                  <MessageSquare className="h-3.5 w-3.5 text-primary-500" />
                  Note for Landlord
                </label>
                <textarea
                  rows="3"
                  placeholder="Tell the landlord about yourself or request details..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-gray-50 border border-transparent focus:bg-white focus:border-primary-400 text-sm p-3 rounded-xl focus:outline-none text-gray-700 placeholder-gray-405 font-medium"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-primary-600 hover:bg-primary-700 text-white font-bold h-11 rounded-xl shadow-md flex items-center justify-center gap-2 transition-all"
              >
                {submitting ? 'Submitting...' : 'Apply for Viewing'}
              </button>
            </form>
          </div>
        </aside>
      </div>

      {/* Modal */}
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={modalTitle}>
        {modalContent}
      </Modal>
    </div>
  );
}
