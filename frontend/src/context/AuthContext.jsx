import React, { createContext, useContext, useState, useEffect } from 'react';
import { mockUsers } from '../utils/mockData';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    setLoading(true);
    // Standard mock authentication
    const matchedUser = mockUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
    
    if (matchedUser) {
      setUser(matchedUser);
      localStorage.setItem('user', JSON.stringify(matchedUser));
      setLoading(false);
      return { success: true, user: matchedUser };
    } else {
      // Create a temporary mock user if not found to allow testing any email
      let role = 'tenant';
      if (email.includes('landlord')) role = 'landlord';
      if (email.includes('admin')) role = 'admin';

      const newUser = {
        id: 'mock_' + Date.now(),
        name: email.split('@')[0].toUpperCase(),
        email: email,
        role: role,
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
        phone: '0901234567',
        location: 'Ho Chi Minh City',
        bio: 'Mock user account.'
      };
      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
      setLoading(false);
      return { success: true, user: newUser };
    }
  };

  const register = (name, email, role, phone) => {
    setLoading(true);
    const newUser = {
      id: 'mock_' + Date.now(),
      name,
      email,
      role,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
      phone: phone || '0900000000',
      location: 'Ho Chi Minh City',
      bio: `New ${role} registered account.`
    };
    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
    setLoading(false);
    return { success: true, user: newUser };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const updateProfile = (updatedData) => {
    const updatedUser = { ...user, ...updatedData };
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
    return updatedUser;
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    updateProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
