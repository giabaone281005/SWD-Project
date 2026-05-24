import React, { useState } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Layouts
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Sidebar from '../components/layout/Sidebar';
import DashboardHeader from '../components/layout/DashboardHeader';

// Public Pages
import Home from '../pages/Home/Home';
import ExploreRooms from '../pages/Room/ExploreRooms';
import RoomDetail from '../pages/Room/RoomDetail';
import About from '../pages/Home/About';
import Contact from '../pages/Home/Contact';
import FAQ from '../pages/Home/FAQ';
import Terms from '../pages/Home/Terms';
import PrivacyPolicy from '../pages/Home/PrivacyPolicy';

// Auth Pages
import Login from '../pages/Auth/Login';
import Register from '../pages/Auth/Register';
import ForgotPassword from '../pages/Auth/ForgotPassword';
import ResetPassword from '../pages/Auth/ResetPassword';

// User / Tenant Pages
import UserDashboard from '../pages/Dashboard/UserDashboard';
import Profile from '../pages/Profile/Profile';
import Favorites from '../pages/Profile/Favorites';
import BookingHistory from '../pages/Dashboard/BookingHistory';
import Notifications from '../pages/Dashboard/Notifications';
import Messages from '../pages/Dashboard/Messages';

// Landlord Pages
import LandlordDashboard from '../pages/Dashboard/LandlordDashboard';
import MyListings from '../pages/Dashboard/MyListings';
import CreateRoomPost from '../pages/Dashboard/CreateRoomPost';
import EditRoomPost from '../pages/Dashboard/EditRoomPost';

// Admin Pages
import AdminDashboard from '../pages/Admin/AdminDashboard';

// Public Layout Wrapper
function PublicLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50/50">
      <Navbar />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
}

// Dashboard Layout Wrapper
function DashboardLayout({ children, title }) {
  const { user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50/50">
      {/* Top sticky Navbar style for branding */}
      <Navbar />
      
      <div className="flex flex-1">
        {/* Responsive Dashboard Sidebar */}
        <div className={`${sidebarOpen ? 'block' : 'hidden'} md:block shrink-0`}>
          <Sidebar />
        </div>
        
        {/* Dashboard Content Panel */}
        <div className="flex-1 flex flex-col min-w-0">
          <DashboardHeader title={title} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
          <main className="p-6 md:p-8 flex-1 max-w-7xl w-full mx-auto">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}

export default function AppRoutes() {
  const { user } = useAuth();
  const location = useLocation();

  // Dynamic dashboard title helper based on route path
  const getDashboardTitle = () => {
    const path = location.pathname;
    if (path === '/dashboard') return 'Tenant Dashboard';
    if (path === '/profile') return 'My Profile Details';
    if (path === '/favorites') return 'Wishlist Room Collections';
    if (path === '/booking-history') return 'Inspections Application History';
    if (path === '/notifications') return 'Personal Notifications';
    if (path === '/messages') return 'Instant Messaging Inbox';
    if (path === '/landlord') return 'Landlord Dashboard Overview';
    if (path === '/landlord/listings') return 'Landlord Listing Properties';
    if (path === '/landlord/create-room') return 'Publish Property Listing';
    if (path.includes('/landlord/edit-room')) return 'Edit Property Details';
    if (path.includes('/admin')) return 'Administrator Moderation Control';
    return 'Dashboard';
  };

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
      <Route path="/rooms" element={<PublicLayout><ExploreRooms /></PublicLayout>} />
      <Route path="/room/:id" element={<PublicLayout><RoomDetail /></PublicLayout>} />
      <Route path="/about" element={<PublicLayout><About /></PublicLayout>} />
      <Route path="/contact" element={<PublicLayout><Contact /></PublicLayout>} />
      <Route path="/faq" element={<PublicLayout><FAQ /></PublicLayout>} />
      <Route path="/terms" element={<PublicLayout><Terms /></PublicLayout>} />
      <Route path="/privacy" element={<PublicLayout><PrivacyPolicy /></PublicLayout>} />

      {/* Auth Routes */}
      <Route path="/login" element={<PublicLayout><Login /></PublicLayout>} />
      <Route path="/register" element={<PublicLayout><Register /></PublicLayout>} />
      <Route path="/forgot-password" element={<PublicLayout><ForgotPassword /></PublicLayout>} />
      <Route path="/reset-password" element={<PublicLayout><ResetPassword /></PublicLayout>} />

      {/* Tenant Routes */}
      <Route path="/dashboard" element={<DashboardLayout title={getDashboardTitle()}><UserDashboard /></DashboardLayout>} />
      <Route path="/profile" element={<DashboardLayout title={getDashboardTitle()}><Profile /></DashboardLayout>} />
      <Route path="/favorites" element={<DashboardLayout title={getDashboardTitle()}><Favorites /></DashboardLayout>} />
      <Route path="/booking-history" element={<DashboardLayout title={getDashboardTitle()}><BookingHistory /></DashboardLayout>} />
      <Route path="/notifications" element={<DashboardLayout title={getDashboardTitle()}><Notifications /></DashboardLayout>} />
      <Route path="/messages" element={<DashboardLayout title={getDashboardTitle()}><Messages /></DashboardLayout>} />

      {/* Landlord Routes */}
      <Route path="/landlord" element={<DashboardLayout title={getDashboardTitle()}><LandlordDashboard /></DashboardLayout>} />
      <Route path="/landlord/listings" element={<DashboardLayout title={getDashboardTitle()}><MyListings /></DashboardLayout>} />
      <Route path="/landlord/create-room" element={<DashboardLayout title={getDashboardTitle()}><CreateRoomPost /></DashboardLayout>} />
      <Route path="/landlord/edit-room/:id" element={<DashboardLayout title={getDashboardTitle()}><EditRoomPost /></DashboardLayout>} />

      {/* Admin Routes */}
      <Route path="/admin" element={<DashboardLayout title={getDashboardTitle()}><AdminDashboard /></DashboardLayout>} />
      <Route path="/admin/users" element={<DashboardLayout title="Manage Platform Users"><AdminDashboard /></DashboardLayout>} />
      <Route path="/admin/rooms" element={<DashboardLayout title="Manage Platform Rooms"><AdminDashboard /></DashboardLayout>} />
      <Route path="/admin/reports" element={<DashboardLayout title="Flagged Reports & Moderation"><AdminDashboard /></DashboardLayout>} />
      <Route path="/admin/categories" element={<DashboardLayout title="Room Categories Overview"><AdminDashboard /></DashboardLayout>} />
      <Route path="/admin/payments" element={<DashboardLayout title="Payment Subscriptions Transactions"><AdminDashboard /></DashboardLayout>} />
      <Route path="/admin/analytics" element={<DashboardLayout title="Global Platform Metrics"><AdminDashboard /></DashboardLayout>} />

      {/* Fallback to Home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
