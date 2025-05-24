import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateProfile: (user: User) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check for saved user in localStorage on mount
    const savedUser = localStorage.getItem('foodiesUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // Mock login for demo purposes
      // In a real app, this would call an API endpoint
      const mockUser: User = {
        id: '123',
        name: 'John Doe',
        email: email,
        phone: '+1 (555) 123-4567',
        avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
        address: '123 Main St, Anytown, USA',
      };
      
      setUser(mockUser);
      setIsAuthenticated(true);
      localStorage.setItem('foodiesUser', JSON.stringify(mockUser));
      return true;
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    }
  };

  const signup = async (name: string, email: string, password: string): Promise<boolean> => {
    try {
      // Mock signup for demo purposes
      const mockUser: User = {
        id: '123',
        name: name,
        email: email,
        avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
      };
      
      setUser(mockUser);
      setIsAuthenticated(true);
      localStorage.setItem('foodiesUser', JSON.stringify(mockUser));
      return true;
    } catch (error) {
      console.error('Signup failed:', error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('foodiesUser');
  };

  const updateProfile = (updatedUser: User) => {
    setUser(updatedUser);
    localStorage.setItem('foodiesUser', JSON.stringify(updatedUser));
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, signup, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};