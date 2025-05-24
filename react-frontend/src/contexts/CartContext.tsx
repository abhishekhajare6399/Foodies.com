import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { CartItem, MenuItem, Restaurant } from '../types';

interface CartContextType {
  items: CartItem[];
  restaurant: Restaurant | null;
  addItem: (item: MenuItem, restaurantId: string) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider = ({ children }: CartProviderProps) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('foodiesCart');
    const savedRestaurant = localStorage.getItem('foodiesRestaurant');
    
    if (savedCart) {
      setItems(JSON.parse(savedCart));
    }
    
    if (savedRestaurant) {
      setRestaurant(JSON.parse(savedRestaurant));
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('foodiesCart', JSON.stringify(items));
    if (restaurant) {
      localStorage.setItem('foodiesRestaurant', JSON.stringify(restaurant));
    }
  }, [items, restaurant]);

  const addItem = (item: MenuItem, restaurantId: string) => {
    // If adding from a different restaurant, clear the cart first
    if (restaurant && restaurant.id !== restaurantId) {
      if (!window.confirm('Adding items from a different restaurant will clear your current cart. Continue?')) {
        return;
      }
      setItems([]);
    }

    // If no restaurant is set, fetch and set it
    if (!restaurant || restaurant.id !== restaurantId) {
      // In a real app, you'd fetch the restaurant data from an API
      const mockRestaurant: Restaurant = {
        id: restaurantId,
        name: 'Restaurant ' + restaurantId,
        image: 'https://images.pexels.com/photos/260922/pexels-photo-260922.jpeg',
        description: 'A delicious restaurant with amazing food.',
        rating: 4.5,
        category: 'Various',
        prepTime: '30-45 min',
        discount: '10% off',
        address: '123 Food St, Foodville',
        contact: '123-456-7890',
        isOpen: true
      };
      setRestaurant(mockRestaurant);
    }

    setItems(prevItems => {
      // Check if item already exists in cart
      const existingItemIndex = prevItems.findIndex(i => i.id === item.id);
      
      if (existingItemIndex >= 0) {
        // Update quantity if item exists
        const newItems = [...prevItems];
        newItems[existingItemIndex].quantity += 1;
        return newItems;
      } else {
        // Add new item with quantity 1
        return [...prevItems, { ...item, quantity: 1 }];
      }
    });
  };

  const removeItem = (itemId: string) => {
    setItems(prevItems => prevItems.filter(item => item.id !== itemId));
    
    // If removing the last item, clear the restaurant as well
    if (items.length === 1 && items[0].id === itemId) {
      setRestaurant(null);
      localStorage.removeItem('foodiesRestaurant');
    }
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(itemId);
      return;
    }

    setItems(prevItems => 
      prevItems.map(item => 
        item.id === itemId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
    setRestaurant(null);
    localStorage.removeItem('foodiesCart');
    localStorage.removeItem('foodiesRestaurant');
  };

  const totalItems = items.reduce((total, item) => total + item.quantity, 0);
  
  const subtotal = items.reduce((total, item) => total + (item.price * item.quantity), 0);

  return (
    <CartContext.Provider value={{
      items,
      restaurant,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      totalItems,
      subtotal
    }}>
      {children}
    </CartContext.Provider>
  );
};