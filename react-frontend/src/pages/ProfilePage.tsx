import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Edit2, Save, X, MapPin, Phone, Mail, LogOut } from 'lucide-react';
import { motion } from 'framer-motion';

import { useAuth } from '../contexts/AuthContext';
import { User } from '../types';

const ProfilePage: React.FC = () => {
  const { user, isAuthenticated, updateProfile, logout } = useAuth();
  const navigate = useNavigate();
  
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<User | null>(user);
  const [isLoading, setIsLoading] = useState(false);
  
  if (!isAuthenticated || !user || !formData) {
    return (
      <div className="container py-20 text-center">
        <h2 className="text-2xl font-semibold mb-4">Please login to view your profile</h2>
        <Link to="/" className="btn btn-primary">
          Go to Home
        </Link>
      </div>
    );
  }
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => {
      if (!prev) return null;
      return {
        ...prev,
        [name]: value
      };
    });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData) return;
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      updateProfile(formData);
      setIsEditing(false);
      setIsLoading(false);
    }, 1000);
  };
  
  const handleLogout = () => {
    logout();
    navigate('/');
  };
  
  return (
    <div className="container py-8">
      <Link to="/" className="inline-flex items-center text-neutral-600 mb-6 hover:text-primary-500">
        <ArrowLeft size={16} className="mr-1" />
        Back to Home
      </Link>
      
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {/* Profile Header */}
          <div className="relative h-40 bg-gradient-to-r from-primary-500 to-secondary-400">
            <div className="absolute -bottom-16 left-8">
              <div className="w-32 h-32 rounded-full border-4 border-white overflow-hidden bg-white">
                {user.avatar ? (
                  <img 
                    src={user.avatar} 
                    alt={user.name} 
                    className="w-full h-full object-cover" 
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-neutral-100 text-neutral-500 text-4xl font-bold">
                    {user.name.charAt(0)}
                  </div>
                )}
              </div>
            </div>
            
            <div className="absolute top-4 right-4 flex space-x-2">
              {!isEditing ? (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsEditing(true)}
                  className="btn bg-white/90 hover:bg-white text-neutral-700 shadow-sm"
                >
                  <Edit2 size={16} className="mr-1" />
                  Edit Profile
                </motion.button>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsEditing(false)}
                  className="btn bg-white/90 hover:bg-white text-neutral-700 shadow-sm"
                >
                  <X size={16} className="mr-1" />
                  Cancel
                </motion.button>
              )}
            </div>
          </div>
          
          {/* Profile Content */}
          <div className="pt-20 p-6">
            <h1 className="text-2xl font-bold mb-1">{user.name}</h1>
            <p className="text-neutral-500 mb-6">{user.email}</p>
            
            {!isEditing ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  {user.phone && (
                    <div className="flex items-start">
                      <Phone size={18} className="text-primary-500 mt-0.5 mr-2 flex-shrink-0" />
                      <div>
                        <p className="text-sm text-neutral-500">Phone</p>
                        <p className="font-medium">{user.phone}</p>
                      </div>
                    </div>
                  )}
                  
                  {user.address && (
                    <div className="flex items-start">
                      <MapPin size={18} className="text-primary-500 mt-0.5 mr-2 flex-shrink-0" />
                      <div>
                        <p className="text-sm text-neutral-500">Address</p>
                        <p className="font-medium">{user.address}</p>
                      </div>
                    </div>
                  )}
                </div>
                
                <div>
                  <div className="flex items-start">
                    <Mail size={18} className="text-primary-500 mt-0.5 mr-2 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-neutral-500">Email</p>
                      <p className="font-medium">{user.email}</p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-neutral-700 mb-1">
                      Full Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      className="input"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-neutral-700 mb-1">
                      Phone Number
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone || ''}
                      onChange={handleChange}
                      className="input"
                      placeholder="Enter your phone number"
                    />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-1">
                      Email Address
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="input"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="address" className="block text-sm font-medium text-neutral-700 mb-1">
                      Delivery Address
                    </label>
                    <input
                      id="address"
                      name="address"
                      type="text"
                      value={formData.address || ''}
                      onChange={handleChange}
                      className="input"
                      placeholder="Enter your address"
                    />
                  </div>
                </div>
                
                <div className="md:col-span-2 mt-2">
                  <button
                    type="submit"
                    className={`btn btn-primary w-full md:w-auto ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                    disabled={isLoading}
                  >
                    <Save size={16} className="mr-2" />
                    {isLoading ? 'Saving...' : 'Save Profile'}
                  </button>
                </div>
              </form>
            )}
            
            {/* Order History Link */}
            <div className="mt-8 pt-6 border-t">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Recent Orders</h2>
                <Link to="/orders" className="text-primary-500 hover:underline">
                  View All
                </Link>
              </div>
              
              <div className="mt-4">
                <Link 
                  to="/orders"
                  className="block border rounded-lg p-4 hover:border-primary-500 hover:shadow-sm transition-all"
                >
                  <p className="font-medium">You have placed orders recently</p>
                  <p className="text-sm text-neutral-500">Check your order history for details</p>
                </Link>
              </div>
            </div>
            
            {/* Logout Button */}
            <div className="mt-8 pt-6 border-t">
              <button
                onClick={handleLogout}
                className="btn btn-outline text-danger border-danger hover:bg-danger/5"
              >
                <LogOut size={16} className="mr-2" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;