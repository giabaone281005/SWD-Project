import { mockRooms } from '../utils/mockData';

// Simulated API latency
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const roomService = {
  getAllRooms: async () => {
    await delay(300);
    // Get from localStorage first to preserve dynamically added rooms
    const storedRooms = localStorage.getItem('rooms');
    if (!storedRooms) {
      localStorage.setItem('rooms', JSON.stringify(mockRooms));
      return mockRooms;
    }
    return JSON.parse(storedRooms);
  },

  getRoomById: async (id) => {
    await delay(300);
    const rooms = await roomService.getAllRooms();
    return rooms.find(r => r.id === id);
  },

  createRoom: async (roomData, landlord) => {
    await delay(500);
    const rooms = await roomService.getAllRooms();
    const newRoom = {
      id: 'r_' + Date.now(),
      ...roomData,
      rating: 5.0,
      reviewsCount: 0,
      views: 0,
      landlordId: landlord.id,
      landlordName: landlord.name,
      landlordAvatar: landlord.avatar,
      status: 'Available',
    };
    
    const updated = [newRoom, ...rooms];
    localStorage.setItem('rooms', JSON.stringify(updated));
    return newRoom;
  },

  updateRoom: async (id, roomData) => {
    await delay(500);
    const rooms = await roomService.getAllRooms();
    const index = rooms.findIndex(r => r.id === id);
    if (index === -1) throw new Error('Room not found');

    const updatedRoom = { ...rooms[index], ...roomData };
    rooms[index] = updatedRoom;
    localStorage.setItem('rooms', JSON.stringify(rooms));
    return updatedRoom;
  },

  deleteRoom: async (id) => {
    await delay(300);
    const rooms = await roomService.getAllRooms();
    const filtered = rooms.filter(r => r.id !== id);
    localStorage.setItem('rooms', JSON.stringify(filtered));
    return { success: true };
  }
};
