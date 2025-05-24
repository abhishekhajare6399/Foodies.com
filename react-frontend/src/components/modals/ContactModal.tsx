import React, { useState } from 'react';
import { X, Upload } from 'lucide-react';
import { useModal } from '../../contexts/ModalContext';

const ContactModal: React.FC = () => {
  const { closeModal } = useModal();
  
  const [restaurant, setRestaurant] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const restaurants = [
    'Pizza Hut', 
    'McDonalds', 
    'KFC', 
    'Subway',
    'Dominos Pizza',
    'Burger King'
  ];
  
  const locations = [
    'New York',
    'Los Angeles',
    'Chicago',
    'Houston',
    'Phoenix'
  ];
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      closeModal();
      alert('Your contact form has been submitted. We will respond shortly.');
    }, 1500);
  };
  
  return (
    <div>
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="text-xl font-semibold">Contact Us</h2>
        <button onClick={closeModal} className="text-neutral-500 hover:text-neutral-700">
          <X size={20} />
        </button>
      </div>
      
      <div className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="restaurant" className="block text-sm font-medium text-neutral-700 mb-1">
              Select Restaurant
            </label>
            <select
              id="restaurant"
              value={restaurant}
              onChange={(e) => setRestaurant(e.target.value)}
              className="input"
              required
            >
              <option value="">Select a restaurant</option>
              {restaurants.map((rest, index) => (
                <option key={index} value={rest}>
                  {rest}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label htmlFor="location" className="block text-sm font-medium text-neutral-700 mb-1">
              Location
            </label>
            <select
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="input"
              required
            >
              <option value="">Select a location</option>
              {locations.map((loc, index) => (
                <option key={index} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-neutral-700 mb-1">
              Problem Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className="input"
              placeholder="Please describe your issue in detail..."
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">
              Upload Image (Optional)
            </label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-neutral-300 border-dashed rounded-md">
              <div className="space-y-1 text-center">
                <Upload className="mx-auto h-12 w-12 text-neutral-400" />
                <div className="flex text-sm text-neutral-600">
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer rounded-md font-medium text-primary-600 hover:text-primary-500"
                  >
                    <span>Upload a file</span>
                    <input
                      id="file-upload"
                      name="file-upload"
                      type="file"
                      className="sr-only"
                      onChange={handleFileChange}
                      accept="image/*"
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-neutral-500">PNG, JPG, GIF up to 10MB</p>
                {file && (
                  <p className="text-xs text-green-500 font-medium">
                    {file.name} ({(file.size / 1024).toFixed(1)} KB)
                  </p>
                )}
              </div>
            </div>
          </div>
          
          <button
            type="submit"
            className={`btn btn-primary w-full ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
            disabled={isLoading}
          >
            {isLoading ? 'Submitting...' : 'Submit'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactModal;