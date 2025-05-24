export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  address?: string;
}

export interface Location {
  id: string;
  name: string;
  address: string;
}

export interface Restaurant {
  id: string;
  name: string;
  image: string;
  description: string;
  rating: number;
  category: string;
  prepTime: string;
  discount?: string;
  address: string;
  contact: string;
  isOpen: boolean;
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  image: string;
  price: number;
  category: string;
  restaurantId: string;
}

export interface CartItem extends MenuItem {
  quantity: number;
}

export interface Order {
  id: string;
  userId: string;
  restaurantId: string;
  restaurantName: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'accepted' | 'preparing' | 'ready' | 'delivered' | 'cancelled';
  date: Date;
  address: string;
  contact: string;
}

export type ModalType = 'login' | 'signup' | 'contact' | 'profile' | 'food' | 'success';

export interface ModalData {
  foodItem?: MenuItem;
  restaurantId?: string;
  email?: string;
  fullName?: string;
}
