import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

import HeroSection from '../components/home/HeroSection';
import SearchAndFilter from '../components/home/SearchAndFilter';
import RestaurantCard from '../components/home/RestaurantCard';
import { restaurants } from '../data/restaurants';
import { Restaurant } from '../types';

const HomePage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filteredRestaurants, setFilteredRestaurants] = useState<Restaurant[]>(restaurants);
  const [visibleCount, setVisibleCount] = useState(4);
  
  // Categories for filtering
  const categories = ['All', 'Italian', 'American', 'Japanese', 'Mexican', 'Indian', 'Asian', 'Healthy', 'Breakfast'];
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  // Ratings filter
  const [minRating, setMinRating] = useState(0);
  
  // Open only filter
  const [openOnly, setOpenOnly] = useState(false);
  
  useEffect(() => {
    let filtered = [...restaurants];
    
    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(restaurant => 
        restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        restaurant.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Apply category filter
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(restaurant => 
        restaurant.category === selectedCategory
      );
    }
    
    // Apply rating filter
    if (minRating > 0) {
      filtered = filtered.filter(restaurant => restaurant.rating >= minRating);
    }
    
    // Apply open only filter
    if (openOnly) {
      filtered = filtered.filter(restaurant => restaurant.isOpen);
    }
    
    setFilteredRestaurants(filtered);
  }, [searchQuery, selectedCategory, minRating, openOnly]);
  
  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };
  
  const handleFilterToggle = () => {
    setShowFilters(!showFilters);
  };
  
  const loadMore = () => {
    setVisibleCount(prev => Math.min(prev + 4, filteredRestaurants.length));
  };
  
  const resetFilters = () => {
    setSelectedCategory('All');
    setMinRating(0);
    setOpenOnly(false);
    setSearchQuery('');
  };
  
  return (
    <div>
      <HeroSection />
      
      <SearchAndFilter 
        onSearch={handleSearch} 
        onFilterToggle={handleFilterToggle} 
      />
      
      {/* Advanced Filters */}
      {showFilters && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="container mb-6 overflow-hidden"
        >
          <div className="bg-neutral-50 rounded-lg p-4 shadow-sm">
            <div className="flex flex-wrap items-center justify-between mb-4">
              <h3 className="font-medium">Advanced Filters</h3>
              <button 
                onClick={resetFilters}
                className="text-sm text-primary-500 hover:underline"
              >
                Reset Filters
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <p className="text-sm font-medium mb-2">Categories</p>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="input w-full"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <p className="text-sm font-medium mb-2">Minimum Rating</p>
                <div className="flex items-center">
                  <input
                    type="range"
                    min="0"
                    max="5"
                    step="0.5"
                    value={minRating}
                    onChange={(e) => setMinRating(parseFloat(e.target.value))}
                    className="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <span className="ml-2 min-w-[30px] text-center">{minRating ? minRating.toFixed(1) : 'All'}</span>
                </div>
              </div>
              
              <div>
                <p className="text-sm font-medium mb-2">Restaurant Status</p>
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    checked={openOnly}
                    onChange={() => setOpenOnly(!openOnly)}
                    className="rounded text-primary-500 focus:ring-primary-500 h-4 w-4"
                  />
                  <span className="ml-2 text-sm">Open restaurants only</span>
                </label>
              </div>
            </div>
            
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setShowFilters(false)}
                className="btn btn-primary"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </motion.div>
      )}
      
      {/* Restaurants Section */}
      <section id="restaurants-section" className="container py-8">
        <h2 className="text-2xl font-bold mb-6">Restaurants Near You</h2>
        
        {filteredRestaurants.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-xl font-medium mb-2">No restaurants found</h3>
            <p className="text-neutral-500">Try changing your search or filters</p>
            <button 
              onClick={resetFilters}
              className="mt-4 btn btn-outline"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredRestaurants.slice(0, visibleCount).map((restaurant) => (
                <RestaurantCard key={restaurant.id} restaurant={restaurant} />
              ))}
            </div>
            
            {visibleCount < filteredRestaurants.length && (
              <div className="mt-8 text-center">
                <button
                  onClick={loadMore}
                  className="btn btn-outline"
                >
                  Load More
                </button>
              </div>
            )}
          </>
        )}
      </section>
    </div>
  );
};

export default HomePage;