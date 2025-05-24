import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, Clock, Heart } from 'lucide-react';

import { Restaurant } from '../../types';

interface RestaurantCardProps {
  restaurant: Restaurant;
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({ restaurant }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsFavorite(!isFavorite);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="card overflow-hidden h-full group"
    >
      <div className="relative overflow-hidden h-48">
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        
        {restaurant.discount && (
          <div className="absolute top-2 left-2 badge badge-primary">
            {restaurant.discount}
          </div>
        )}
        
        <button
          onClick={toggleFavorite}
          className={`absolute top-2 right-2 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
            isFavorite 
              ? 'bg-primary-500 text-white' 
              : 'bg-white/90 text-neutral-500 hover:text-primary-500'
          }`}
        >
          <Heart size={16} fill={isFavorite ? 'currentColor' : 'none'} />
        </button>
        
        {/* Overlay with View Menu button */}
        <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="text-center">
            <p className="text-white mb-3 px-4 text-sm md:text-base">{restaurant.description}</p>
            <Link
              to={`/restaurant/${restaurant.id}`}
              className="btn btn-primary"
            >
              View Menu
            </Link>
          </div>
        </div>
        
        {/* Status badge */}
        <div className={`absolute top-2 right-12 text-white text-xs px-2 py-1 rounded-full ${
          restaurant.isOpen ? 'bg-success' : 'bg-neutral-600'
        }`}>
          {restaurant.isOpen ? 'Open' : 'Closed'}
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="font-bold text-lg truncate font-display">{restaurant.name}</h3>
          <div className="flex items-center text-warning">
            <Star size={16} fill="currentColor" />
            <span className="ml-1 font-medium">{restaurant.rating.toFixed(1)}</span>
          </div>
        </div>
        
        <p className="text-neutral-500 mb-3">{restaurant.category}</p>
        
        <div className="flex items-center text-neutral-600 text-sm">
          <Clock size={14} className="mr-1" />
          <span>{restaurant.prepTime}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default RestaurantCard;