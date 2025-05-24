import React, { useState } from 'react';
import { X, Edit2, Camera, Check } from 'lucide-react';

import { useAuth } from '../../contexts/AuthContext';
import { useModal } from '../../contexts/ModalContext';
import { User } from '../../types';

const ProfileModal: React.FC = () => {
  const { user, updateProfile } = useAuth();
  const { closeModal } = useModal();
  
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<User | null>(user);
  const [isLoading, setIsLoading] = useState(false);
  
  if (!user || !formData) {
    return null;
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
  
  const handleSave = (e: React.FormEvent) => {
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
  
  return (
    <div className="max-w-md w-full">
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="text-xl font-semibold">My Profile</h2>
        <button onClick={closeModal} className="text-neutral-500 hover:text-neutral-700">
          <X size={20} />
        </button>
      </div>
      
      <div className="p-6">
        {/* Profile Avatar */}
        <div className="flex flex-col items-center mb-6">
          <div className="relative">
            <div className="w-24 h-24 rounded-full overflow-hidden bg-neutral-200">
              {user.avatar ? (
                <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-neutral-400">
                  {user.name.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
            {isEditing && (
              <div className="absolute bottom-0 right-0 bg-primary-500 rounded-full p-2 text-white cursor-pointer hover:bg-primary-600">
                <Camera size={18} />
              </div>
            )}
          </div>
          <h3 className="mt-2 font-medium text-lg">{user.name}</h3>
          <p className="text-sm text-neutral-500">{user.email}</p>
        </div>
        
        {!isEditing ? (
          <>
            <div className="space-y-4 mb-6">
              <div className="border-b pb-2">
                <p className="text-sm text-neutral-500">Phone Number</p>
                <p className="font-medium">{user.phone || 'Not provided'}</p>
              </div>
              <div className="border-b pb-2">
                <p className="text-sm text-neutral-500">Address</p>
                <p className="font-medium">{user.address || 'Not provided'}</p>
              </div>
            </div>
            <button
              onClick={() => setIsEditing(true)}
              className="btn btn-outline w-full flex items-center justify-center"
            >
              <Edit2 size={16} className="mr-2" />
              Edit Profile
            </button>
          </>
        ) : (
          <form onSubmit={handleSave} className="space-y-4">
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
              />
            </div>
            
            <div>
              <label htmlFor="address" className="block text-sm font-medium text-neutral-700 mb-1">
                Address
              </label>
              <input
                id="address"
                name="address"
                type="text"
                value={formData.address || ''}
                onChange={handleChange}
                className="input"
              />
            </div>
            
            <div className="flex space-x-3">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="btn btn-outline flex-1"
              >
                Cancel
              </button>
              <button
                type="submit"
                className={`btn btn-primary flex-1 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                disabled={isLoading}
              >
                {isLoading ? 'Saving...' : (
                  <>
                    <Check size={16} className="mr-2" />
                    Save
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ProfileModal;