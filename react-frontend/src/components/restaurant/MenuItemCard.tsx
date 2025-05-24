import React from 'react';
import { useModal } from '../../contexts/ModalContext';
import { MenuItem } from '../../types';

interface MenuItemCardProps {
  item: MenuItem;
  restaurantId: string;
}

const MenuItemCard: React.FC<MenuItemCardProps> = ({ item, restaurantId }) => {
  const { openModal } = useModal();
  
  const handleClick = () => {
    openModal('food', { foodItem: item, restaurantId });
  };
  
  return (
    <div 
      className="card cursor-pointer hover:shadow-lg transition-shadow duration-300"
      onClick={handleClick}
    >
      <div className="relative h-40 overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 right-2 badge badge-primary">
          {item.category}
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="font-medium">{item.name}</h3>
          <span className="font-bold text-primary-500">${item.price.toFixed(2)}</span>
        </div>
        <p className="text-neutral-500 text-sm mt-1 line-clamp-2">{item.description}</p>
      </div>
    </div>
  );
};

export default MenuItemCard;