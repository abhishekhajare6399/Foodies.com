import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, Clock, MapPin, Phone, ArrowLeft, Plus, ShoppingBag } from 'lucide-react';
import { motion } from 'framer-motion';

import { restaurants, menuItems } from '../data/restaurants';
import { Restaurant, MenuItem } from '../types';
import MenuItemCard from '../components/restaurant/MenuItemCard';
import { useCart } from '../contexts/CartContext';

const RestaurantPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [menu, setMenu] = useState<MenuItem[]>([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const { totalItems } = useCart();
  
  useEffect(() => {
    // In a real app, this would be an API call
    if (id) {
      const foundRestaurant = restaurants.find(r => r.id === id);
      setRestaurant(foundRestaurant || null);
      
      const restaurantMenu = menuItems[id] || [];
      setMenu(restaurantMenu);
      
      // Extract unique categories
      if (restaurantMenu.length > 0) {
        setCategories(['All', ...new Set(restaurantMenu.map(item => item.category))]);
      }
    }
  }, [id]);
  
  const [categories, setCategories] = useState<string[]>(['All']);
  
  const filteredMenu = activeCategory === 'All'
    ? menu
    : menu.filter(item => item.category === activeCategory);
  
  if (!restaurant) {
    return (
      <div className="container py-20 text-center">
        <h2 className="text-2xl font-semibold mb-4">Restaurant not found</h2>
        <Link to="/" className="btn btn-primary">
          Back to Home
        </Link>
      </div>
    );
  }
  
  return (
    <div>
      {/* Restaurant Header */}
      <div className="relative h-64 md:h-80">
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
          <div className="container pb-6 text-white">
            <Link to="/" className="inline-flex items-center text-white mb-4 hover:text-primary-300">
              <ArrowLeft size={16} className="mr-1" />
              Back to Restaurants
            </Link>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">{restaurant.name}</h1>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
              <div className="flex items-center">
                <Star size={16} fill="currentColor" className="text-warning mr-1" />
                <span>{restaurant.rating.toFixed(1)}</span>
              </div>
              <div className="flex items-center">
                <Clock size={16} className="mr-1" />
                <span>{restaurant.prepTime}</span>
              </div>
              <span className="flex items-center">
                <span className={`inline-block w-2 h-2 rounded-full mr-1 ${
                  restaurant.isOpen ? 'bg-success' : 'bg-neutral-400'
                }`}></span>
                {restaurant.isOpen ? 'Open Now' : 'Closed'}
              </span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Restaurant Info */}
      <div className="border-b">
        <div className="container py-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-y-4">
            <div className="flex flex-col sm:flex-row gap-6">
              <div className="flex items-start">
                <MapPin size={18} className="text-primary-500 mt-1 mr-1 flex-shrink-0" />
                <span>{restaurant.address}</span>
              </div>
              <div className="flex items-center">
                <Phone size={18} className="text-primary-500 mr-1 flex-shrink-0" />
                <span>{restaurant.contact}</span>
              </div>
            </div>
            {restaurant.discount && (
              <div className="badge badge-primary mr-1 flex-shrink-0">
                {restaurant.discount}
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Category Navigation */}
      <div className="border-b sticky top-0 bg-white z-10 shadow-sm">
        <div className="container py-2 overflow-x-auto">
          <div className="flex space-x-2 min-w-max">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full transition-colors ${
                  activeCategory === category
                    ? 'bg-primary-500 text-white'
                    : 'bg-neutral-100 hover:bg-neutral-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      {/* Menu Items */}
      <div className="container py-8">
        <h2 className="text-xl font-bold mb-6">
          {activeCategory === 'All' ? 'All Menu Items' : activeCategory}
        </h2>
        
        {filteredMenu.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-xl font-medium mb-2">No items found</h3>
            <p className="text-neutral-500">Try selecting a different category</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMenu.map(item => (
              <MenuItemCard
                key={item.id}
                item={item}
                restaurantId={restaurant.id}
              />
            ))}
          </div>
        )}
      </div>
      
      {/* Checkout Floating Button (visible when cart has items) */}
      {totalItems > 0 && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="fixed bottom-6 right-6"
        >
          <Link
            to="/checkout"
            className="btn btn-primary shadow-float flex items-center space-x-2 px-6"
          >
            <ShoppingBag size={20} />
            <span>Checkout ({totalItems})</span>
          </Link>
        </motion.div>
      )}
    </div>
  );
};

export default RestaurantPage;