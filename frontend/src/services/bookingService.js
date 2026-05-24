import { mockBookings } from '../utils/mockData';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const bookingService = {
  getAllBookings: async () => {
    await delay(300);
    const stored = localStorage.getItem('bookings');
    if (!stored) {
      localStorage.setItem('bookings', JSON.stringify(mockBookings));
      return mockBookings;
    }
    return JSON.parse(stored);
  },

  createBooking: async (bookingData, user) => {
    await delay(400);
    const bookings = await bookingService.getAllBookings();
    const newBooking = {
      id: 'b_' + Date.now(),
      ...bookingData,
      tenantId: user.id,
      tenantName: user.name,
      tenantPhone: user.phone,
      tenantEmail: user.email,
      status: 'Pending',
      createdAt: new Date().toISOString(),
    };
    const updated = [newBooking, ...bookings];
    localStorage.setItem('bookings', JSON.stringify(updated));
    return newBooking;
  },

  updateBookingStatus: async (id, status) => {
    await delay(400);
    const bookings = await bookingService.getAllBookings();
    const index = bookings.findIndex(b => b.id === id);
    if (index === -1) throw new Error('Booking not found');

    bookings[index].status = status;
    localStorage.setItem('bookings', JSON.stringify(bookings));
    return bookings[index];
  }
};
