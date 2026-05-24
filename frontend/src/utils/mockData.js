// Centralized Mock Data for Room Rental Platform

export const mockUsers = [
  {
    id: 'u1',
    name: 'Nguyen Van A',
    email: 'tenant@example.com',
    role: 'tenant',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
    phone: '0987654321',
    location: 'District 1, Ho Chi Minh City',
    bio: 'Looking for a quiet studio apartment near the university.',
  },
  {
    id: 'u2',
    name: 'Le Thi B',
    email: 'landlord@example.com',
    role: 'landlord',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
    phone: '0912345678',
    location: 'Binh Thanh District, Ho Chi Minh City',
    bio: 'Experienced landlord offering clean and secured boarding houses.',
  },
  {
    id: 'u3',
    name: 'Admin System',
    email: 'admin@example.com',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=150&q=80',
    phone: '0900000000',
    location: 'Platform Headquarters',
    bio: 'System Administrator.',
  }
];

export const mockRooms = [
  {
    id: 'r1',
    title: 'Modern Cozy Studio Near University',
    price: 4500000, // VND per month
    type: 'Studio',
    area: 28, // sqm
    address: '142 Dien Bien Phu, Ward 15, Binh Thanh District, HCMC',
    coordinates: { lat: 10.7972, lng: 106.7022 },
    images: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80',
    ],
    rating: 4.8,
    reviewsCount: 15,
    description: 'Fully furnished studio apartment featuring modern kitchen, air conditioner, washing machine, and high-speed Wi-Fi. Ideal for students and office workers. Located in a secure building with 24/7 security cameras and smart key access.',
    amenities: ['Air Conditioning', 'Free Wi-Fi', 'Washing Machine', 'Security 24/7', 'Parking Slot', 'Balcony', 'Fully Furnished'],
    landlordId: 'u2',
    landlordName: 'Le Thi B',
    landlordAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
    status: 'Available',
    featured: true,
    views: 342,
  },
  {
    id: 'r2',
    title: 'Luxury 2-Bedroom Apartment with Pool View',
    price: 9000000,
    type: 'Apartment',
    area: 65,
    address: 'Vinhomes Central Park, Ward 22, Binh Thanh District, HCMC',
    coordinates: { lat: 10.7950, lng: 106.7218 },
    images: [
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=800&q=80',
    ],
    rating: 4.9,
    reviewsCount: 32,
    description: 'High-end 2-bedroom apartment with a panoramic view of Saigon River and the city swimming pool. Premium wooden flooring, central AC, private bathtub, and full access to building utilities (gym, swimming pool, park).',
    amenities: ['Air Conditioning', 'Free Wi-Fi', 'Washing Machine', 'Security 24/7', 'Elevator', 'Swimming Pool', 'Gym', 'Bathtub'],
    landlordId: 'u2',
    landlordName: 'Le Thi B',
    landlordAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
    status: 'Available',
    featured: true,
    views: 520,
  },
  {
    id: 'r3',
    title: 'Budget Boarding House Room for Students',
    price: 2200000,
    type: 'Boarding House',
    area: 18,
    address: '25/12 Hoang Hoa Tham, Ward 6, Binh Thanh District, HCMC',
    coordinates: { lat: 10.8038, lng: 106.6908 },
    images: [
      'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1598928636135-d146006ff4be?auto=format&fit=crop&w=800&q=80',
    ],
    rating: 4.2,
    reviewsCount: 8,
    description: 'Affordable and clean boarding house room. Includes a mezzanine (gác lửng), private bathroom, cooking stove corner, and separate submeter for electricity. The building is quiet, clean, and has motor parking on the ground floor.',
    amenities: ['Free Wi-Fi', 'Private Bathroom', 'Mezzanine', 'Motor Parking'],
    landlordId: 'u2',
    landlordName: 'Le Thi B',
    landlordAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
    status: 'Available',
    featured: false,
    views: 180,
  },
  {
    id: 'r4',
    title: 'Spacious Studio Apartment near District 1',
    price: 5500000,
    type: 'Studio',
    area: 32,
    address: '45 Nguyen Phi Khanh, Tan Dinh Ward, District 1, HCMC',
    coordinates: { lat: 10.7915, lng: 106.6912 },
    images: [
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1536376072261-38c75010e6c9?auto=format&fit=crop&w=800&q=80',
    ],
    rating: 4.6,
    reviewsCount: 20,
    description: 'Fully furnished, high-ceiling studio in the heart of District 1. Perfect location, walking distance to local markets, cafes, and supermarkets. Includes monthly room cleaning service.',
    amenities: ['Air Conditioning', 'Free Wi-Fi', 'Washing Machine', 'Security 24/7', 'Kitchen Corner', 'Room Cleaning'],
    landlordId: 'u2',
    landlordName: 'Le Thi B',
    landlordAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
    status: 'Available',
    featured: true,
    views: 410,
  },
  {
    id: 'r5',
    title: 'Cozy Room in Shared House',
    price: 3000000,
    type: 'Boarding House',
    area: 20,
    address: '89 Le Van Sy, Ward 13, Phu Nhuan District, HCMC',
    coordinates: { lat: 10.7942, lng: 106.6738 },
    images: [
      'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=800&q=80',
    ],
    rating: 4.4,
    reviewsCount: 11,
    description: 'Quiet room on the 2nd floor of a shared townhouse. Shared kitchen, dining room, and large terrace. Excellent community of roommates. Quiet location inside an alley.',
    amenities: ['Air Conditioning', 'Free Wi-Fi', 'Shared Kitchen', 'Shared Terrace', 'Washing Machine'],
    landlordId: 'u2',
    landlordName: 'Le Thi B',
    landlordAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
    status: 'Available',
    featured: false,
    views: 224,
  },
  {
    id: 'r6',
    title: 'Premium Penthouse Studio Room',
    price: 12000000,
    type: 'Apartment',
    area: 80,
    address: 'Thao Dien Green, Thao Dien Ward, District 2, HCMC',
    coordinates: { lat: 10.8039, lng: 106.7328 },
    images: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80',
    ],
    rating: 5.0,
    reviewsCount: 6,
    description: 'Spectacular penthouse room with a large private terrace and floor-to-ceiling glass windows. Brand new imported smart home equipment, dishwasher, and private security system. Rent includes parking and water.',
    amenities: ['Air Conditioning', 'Free Wi-Fi', 'Washing Machine', 'Private Terrace', 'Smart Home', 'Security 24/7', 'Dishwasher', 'Elevator'],
    landlordId: 'u2',
    landlordName: 'Le Thi B',
    landlordAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
    status: 'Occupied',
    featured: false,
    views: 290,
  }
];

export const mockBookings = [
  {
    id: 'b1',
    roomId: 'r1',
    roomTitle: 'Modern Cozy Studio Near University',
    roomPrice: 4500000,
    roomImage: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=150&q=80',
    tenantId: 'u1',
    tenantName: 'Nguyen Van A',
    tenantPhone: '0987654321',
    tenantEmail: 'tenant@example.com',
    preferredDate: '2026-06-01',
    preferredTime: '10:00 AM',
    message: 'Hello, I would like to schedule a viewing for this Saturday. I am very interested!',
    status: 'Pending',
    createdAt: '2026-05-23T14:30:00Z',
  },
  {
    id: 'b2',
    roomId: 'r3',
    roomTitle: 'Budget Boarding House Room for Students',
    roomPrice: 2200000,
    roomImage: 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=150&q=80',
    tenantId: 'u1',
    tenantName: 'Nguyen Van A',
    tenantPhone: '0987654321',
    tenantEmail: 'tenant@example.com',
    preferredDate: '2026-05-28',
    preferredTime: '03:00 PM',
    message: 'Hi, I want to see if the mezzanine is sturdy. Can we meet this afternoon?',
    status: 'Approved',
    createdAt: '2026-05-22T09:15:00Z',
  },
  {
    id: 'b3',
    roomId: 'r2',
    roomTitle: 'Luxury 2-Bedroom Apartment with Pool View',
    roomPrice: 9000000,
    roomImage: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=150&q=80',
    tenantId: 'u1',
    tenantName: 'Nguyen Van A',
    tenantPhone: '0987654321',
    tenantEmail: 'tenant@example.com',
    preferredDate: '2026-05-20',
    preferredTime: '11:00 AM',
    message: 'I want to rent this starting next week.',
    status: 'Rejected',
    createdAt: '2026-05-18T16:00:00Z',
  }
];

export const mockNotifications = [
  {
    id: 'n1',
    userId: 'u1', // Tenant
    title: 'Booking Request Approved',
    description: 'Your viewing request for "Budget Boarding House Room for Students" was approved by Le Thi B.',
    type: 'success',
    read: false,
    createdAt: '2026-05-23T10:00:00Z',
  },
  {
    id: 'n2',
    userId: 'u2', // Landlord
    title: 'New Booking Request',
    description: 'Nguyen Van A submitted a viewing request for "Modern Cozy Studio Near University".',
    type: 'info',
    read: false,
    createdAt: '2026-05-24T08:30:00Z',
  },
  {
    id: 'n3',
    userId: 'u1', // Tenant
    title: 'New Message Recieved',
    description: 'You have a new message from Le Thi B regarding your rental agreement.',
    type: 'message',
    read: true,
    createdAt: '2026-05-23T15:20:00Z',
  },
  {
    id: 'n4',
    userId: 'u3', // Admin
    title: 'New Room Pending Approval',
    description: 'Landlord Le Thi B added a new room "Premium Penthouse Studio Room" that needs moderation.',
    type: 'warning',
    read: false,
    createdAt: '2026-05-24T09:00:00Z',
  }
];

export const mockMessages = {
  'u1_u2': [
    { id: 'm1', senderId: 'u1', text: 'Hi Le Thi B, is the Modern Cozy Studio still available?', timestamp: '2026-05-23T14:30:00Z' },
    { id: 'm2', senderId: 'u2', text: 'Yes, it is! Would you like to schedule a viewing this week?', timestamp: '2026-05-23T14:35:00Z' },
    { id: 'm3', senderId: 'u1', text: 'Yes, please. I submitted a booking request for this Saturday at 10 AM. Does that work?', timestamp: '2026-05-23T14:38:00Z' },
    { id: 'm4', senderId: 'u2', text: 'Let me check my calendar. Saturday at 10 AM works for me. See you there!', timestamp: '2026-05-23T14:45:00Z' },
  ]
};

export const mockCategories = [
  { id: 'c1', name: 'Studio', count: 18, image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=300&q=80' },
  { id: 'c2', name: 'Apartment', count: 12, image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=300&q=80' },
  { id: 'c3', name: 'Boarding House', count: 45, image: 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=300&q=80' },
];

export const mockReports = [
  {
    id: 'rep1',
    roomId: 'r3',
    roomTitle: 'Budget Boarding House Room for Students',
    reporterName: 'Tran Van D',
    reason: 'Inaccurate address. The place is actually in District 12, not Binh Thanh.',
    status: 'Pending',
    createdAt: '2026-05-22T08:00:00Z',
  },
  {
    id: 'rep2',
    roomId: 'r5',
    roomTitle: 'Cozy Room in Shared House',
    reporterName: 'Pham Minh E',
    reason: 'Scam post, landlord asks for money deposit before viewing.',
    status: 'Resolved',
    createdAt: '2026-05-21T11:30:00Z',
  }
];

export const mockRevenue = {
  totalRevenue: 28500000, // VND
  monthlyData: [
    { month: 'Jan', revenue: 15000000 },
    { month: 'Feb', revenue: 18000000 },
    { month: 'Mar', revenue: 22000000 },
    { month: 'Apr', revenue: 25000000 },
    { month: 'May', revenue: 28500000 },
  ],
  roomRevenues: [
    { roomTitle: 'Modern Cozy Studio Near University', revenue: 13500000 },
    { roomTitle: 'Luxury 2-Bedroom Apartment with Pool View', revenue: 18000000 },
    { roomTitle: 'Budget Boarding House Room for Students', revenue: 4400000 },
  ]
};
