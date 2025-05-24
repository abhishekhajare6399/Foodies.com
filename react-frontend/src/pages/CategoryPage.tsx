import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

import RestaurantCard from '../components/home/RestaurantCard';
import { restaurants } from '../data/restaurants';
import { Restaurant } from '../types';

const CategoryPage: React.FC = () => {
  // Categories for filtering
  const categories = ['All', 'Italian', 'American', 'Japanese', 'Mexican', 'Indian', 'Asian', 'Healthy', 'Breakfast'];
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  // Price ranges
  const priceRanges = ['Any', '$', '$$', '$$$', '$$$$'];
  const [selectedPrice, setSelectedPrice] = useState('Any');
  
  // Sort options
  const sortOptions = ['Recommended', 'Rating', 'Delivery Time', 'Distance'];
  const [sortBy, setSortBy] = useState('Recommended');
  
  // Filtered restaurants
  const [filteredRestaurants, setFilteredRestaurants] = useState<Restaurant[]>(restaurants);
  
  useEffect(() => {
    let filtered = [...restaurants];
    
    // Apply category filter
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(restaurant => 
        restaurant.category === selectedCategory
      );
    }
    
    // Apply sorting
    if (sortBy === 'Rating') {
      filtered.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'Delivery Time') {
      // For demo, we'll sort by prep time (assuming lower is faster)
      filtered.sort((a, b) => {
        const aTime = parseInt(a.prepTime.split('-')[0]);
        const bTime = parseInt(b.prepTime.split('-')[0]);
        return aTime - bTime;
      });
    }
    
    setFilteredRestaurants(filtered);
  }, [selectedCategory, selectedPrice, sortBy]);
  
  return (
    <div className="container py-8">
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filters Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
            <h2 className="text-lg font-semibold mb-4">Filters</h2>
                          Found <span className="font-medium">{filteredRestaurants.length}</span> restaurants
            {/* Categories */}
            <div className="mb-6">
              <h3 className="font-medium mb-2">Categories</h3>
              <div className="space-y-2">
                {categories.map(category => (
                  <label key={category} className="flex items-center">
                    <input
                      type="radio"
                      name="category"
                      checked={selectedCategory === category}
                      onChange={() => setSelectedCategory(category)}
                      className="h-4 w-4 text-primary-500 focus:ring-primary-500"
                    />
                    <span className="ml-2">{category}</span>
                  </label>
                ))}
              </div>
            </div>
            
            {/* Price Range */}
            <div className="mb-6">
              <h3 className="font-medium mb-2">Price Range</h3>
              <div className="flex flex-wrap gap-2">
                {priceRanges.map(price => (
                  <button
                    key={price}
                    onClick={() => setSelectedPrice(price)}
                    className={`px-3 py-1 text-sm rounded-full transition-colors ${
                      selectedPrice === price
                        ? 'bg-primary-500 text-white'
                        : 'bg-white border border-neutral-200 hover:border-primary-500'
                    }`}
                  >
                    {price}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Other filters */}
            <div>
              <h3 className="font-medium mb-2">Other Filters</h3>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="h-4 w-4 text-primary-500 focus:ring-primary-500 rounded"
                  />
                  <span className="ml-2">Free Delivery</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="h-4 w-4 text-primary-500 focus:ring-primary-500 rounded"
                  />
                  <span className="ml-2">Open Now</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="h-4 w-4 text-primary-500 focus:ring-primary-500 rounded"
                  />
                  <span className="ml-2">Offers & Deals</span>
                </label>
              </div>
            </div>
          </div>
        </div>
        
        {/* Restaurants Grid */}
        <div className="lg:col-span-3">
          {/* Sort options */}
          <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <p className="text-neutral-600">
            </p>
            
            <div className="flex items-center space-x-2">
              <span className="text-sm text-neutral-500">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border-none bg-neutral-100 rounded-lg py-2 px-3 text-sm focus:ring-1 focus:ring-primary-500"
              >
                {sortOptions.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>
          </div>
          
          {filteredRestaurants.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium mb-2">No restaurants found</h3>
              <p className="text-neutral-500">Try changing your filters</p>
              <button 
                onClick={() => setSelectedCategory('All')}
                className="mt-4 btn btn-outline"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRestaurants.map((restaurant) => (
                <RestaurantCard key={restaurant.id} restaurant={restaurant} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;