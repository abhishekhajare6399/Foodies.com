import React, { useState } from 'react';
import { X, Minus, Plus, ShoppingBag } from 'lucide-react';

import { useModal } from '../../contexts/ModalContext';
import { useCart } from '../../contexts/CartContext';
import { MenuItem } from '../../types';

const FoodItemModal: React.FC = () => {
  const { closeModal, modalData } = useModal();
  const { addItem } = useCart();
  
  const [quantity, setQuantity] = useState(1);
  
  const foodItem = modalData?.foodItem as MenuItem;
  const restaurantId = modalData?.restaurantId as string;
  
  if (!foodItem) return null;
  
  const incrementQuantity = () => setQuantity(prev => prev + 1);
  const decrementQuantity = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));
  
  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem(foodItem, restaurantId);
    }
    closeModal();
  };
  
  return (
    <div className="max-w-lg w-full">
      <button
        onClick={closeModal}
        className="absolute right-2 top-2 z-10 p-2 bg-white rounded-full shadow-md text-neutral-500 hover:text-neutral-700"
      >
        <X size={20} />
      </button>
      
      <div className="w-full h-60 overflow-hidden">
        <img
          src={foodItem.image}
          alt={foodItem.name}
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold mb-1">{foodItem.name}</h2>
            <p className="text-neutral-500 text-sm mb-4">{foodItem.category}</p>
          </div>
          <div className="text-xl font-bold text-primary-500">
            ${foodItem.price.toFixed(2)}
          </div>
        </div>
        
        <p className="text-neutral-600 mb-6">
          {foodItem.description}
        </p>
        
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center border rounded-lg overflow-hidden">
            <button
              onClick={decrementQuantity}
              className="px-3 py-2 text-neutral-600 hover:bg-neutral-100"
              disabled={quantity <= 1}
            >
              <Minus size={18} />
            </button>
            <div className="w-10 text-center font-medium">
              {quantity}
            </div>
            <button
              onClick={incrementQuantity}
              className="px-3 py-2 text-neutral-600 hover:bg-neutral-100"
            >
              <Plus size={18} />
            </button>
          </div>
          
          <div className="text-lg font-bold">
            Total: ${(foodItem.price * quantity).toFixed(2)}
          </div>
        </div>
        
        <button
          onClick={handleAddToCart}
          className="btn btn-primary w-full flex items-center justify-center"
        >
          <ShoppingBag size={18} className="mr-2" />
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default FoodItemModal;