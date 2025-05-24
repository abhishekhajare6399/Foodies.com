import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  MapPin, 
  User, 
  ShoppingBag, 
  Menu, 
  X, 
  ChevronDown, 
  LogOut,
  History,
  Heart,
  MessageCircle
} from 'lucide-react';

import { useAuth } from '../../contexts/AuthContext';
import { useModal } from '../../contexts/ModalContext';
import { useCart } from '../../contexts/CartContext';

interface NavbarProps {
  isScrolled: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ isScrolled }) => {
  const { isAuthenticated, user, logout } = useAuth();
  const isCustomerSession = sessionStorage.getItem('loggedInCustomer') === 'true';
  const isUserAuthenticated = isAuthenticated || isCustomerSession;

  const { openModal } = useModal();
  const { totalItems } = useCart();
  const navigate = useNavigate();
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLocationDropdownOpen, setIsLocationDropdownOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState('Select Location');
  
  const locations = [
    { id: '1', name: 'New York' },
    { id: '2', name: 'Los Angeles' },
    { id: '3', name: 'Chicago' },
    { id: '4', name: 'Houston' },
    { id: '5', name: 'Phoenix' },
  ];

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleLocationDropdown = () => setIsLocationDropdownOpen(!isLocationDropdownOpen);
  const toggleProfileDropdown = () => setIsProfileDropdownOpen(!isProfileDropdownOpen);
  
  const handleLocationSelect = (location: string) => {
    setSelectedLocation(location);
    setIsLocationDropdownOpen(false);
  };
  
  const handleUseMyLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        // In a real app, we would reverse geocode the coordinates
        setSelectedLocation('Current Location');
        setIsLocationDropdownOpen(false);
      });
    }
  };
  
  const handleLogout = () => {
    logout();
    setIsProfileDropdownOpen(false);
    navigate('/');
  };

  const [message, setMessage] = useState("");

  const fetchMessage = async () => {
    const res = await fetch("http://localhost:8080/api/hello");
    const text = await res.text();
    setMessage(text);
  };
  
  return (
    <nav className={`navbar-floating ${isScrolled ? 'navbar-solid' : 'navbar-transparent'}`}>
      <div className="container py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img src="/src/assets/logo.svg" alt="Foodies" className="w-8 h-8" />
            <span className="text-xl font-bold text-primary-500">Foodies</span>
            <h1>Hello Project</h1>
      <button onClick={fetchMessage}>Click Me</button>
      <p>{message}</p>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-neutral-800 hover:text-primary-500 transition-colors">
              Home
            </Link>
            <Link to="/categories" className="text-neutral-800 hover:text-primary-500 transition-colors">
              Categories
            </Link>
            <Link to="/about" className="text-neutral-800 hover:text-primary-500 transition-colors">
              About Us
            </Link>
            <button 
              onClick={() => openModal('contact')}
              className="text-neutral-800 hover:text-primary-500 transition-colors"
            >
              Contact Us
            </button>
          </div>

          {/* Right Side Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Location Selector */}
            <div className="relative">
              <button
                onClick={toggleLocationDropdown}
                className="flex items-center space-x-1 text-neutral-800 hover:text-primary-500"
              >
                <MapPin size={18} />
                <span>{selectedLocation}</span>
                <ChevronDown size={16} />
              </button>

              {isLocationDropdownOpen && (
                <div className="absolute right-0 mt-2 w-60 bg-white rounded-lg shadow-float z-50 py-2">
                  <div className="p-2 border-b">
                    <p className="text-sm font-medium text-neutral-500">Select Location</p>
                  </div>
                  {locations.map((location) => (
                    <button
                      key={location.id}
                      onClick={() => handleLocationSelect(location.name)}
                      className="w-full text-left px-4 py-2 text-sm hover:bg-neutral-50"
                    >
                      {location.name}
                    </button>
                  ))}
                  <button
                    onClick={handleUseMyLocation}
                    className="w-full text-left px-4 py-2 text-sm text-primary-500 hover:bg-neutral-50 border-t"
                  >
                    <div className="flex items-center">
                      <MapPin size={16} className="mr-2" />
                      Use My Live Location
                    </div>
                  </button>
                </div>
              )}
            </div>
            
            {/* Authentication/Profile */}
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={toggleProfileDropdown}
                  className="flex items-center space-x-2"
                >
                  <div className="w-8 h-8 rounded-full bg-neutral-200 overflow-hidden">
                    {user?.avatar ? (
                      <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                    ) : (
                      <User className="w-full h-full p-1" />
                    )}
                  </div>
                  <ChevronDown size={16} />
                </button>

                {isProfileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-float z-50 py-2">
                    <div className="px-4 py-2 border-b">
                      <p className="font-medium truncate">{user?.name}</p>
                      <p className="text-xs text-neutral-500 truncate">{user?.email}</p>
                    </div>
                    <Link
                      to="/profile"
                      className="flex items-center w-full text-left px-4 py-2 text-sm hover:bg-neutral-50"
                      onClick={() => setIsProfileDropdownOpen(false)}
                    >
                      <User size={16} className="mr-2" />
                      My Profile
                    </Link>
                    <Link
                      to="/orders"
                      className="flex items-center w-full text-left px-4 py-2 text-sm hover:bg-neutral-50"
                      onClick={() => setIsProfileDropdownOpen(false)}
                    >
                      <History size={16} className="mr-2" />
                      Orders
                    </Link>
                    <Link
                      to="/favorites"
                      className="flex items-center w-full text-left px-4 py-2 text-sm hover:bg-neutral-50"
                      onClick={() => setIsProfileDropdownOpen(false)}
                    >
                      <Heart size={16} className="mr-2" />
                      Favorites
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full text-left px-4 py-2 text-sm text-danger hover:bg-neutral-50 border-t"
                    >
                      <LogOut size={16} className="mr-2" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => openModal('login')}
                className="btn btn-primary"
              >
                Login
              </button>
            )}
            
            {/* Cart Button */}
            <Link to="/checkout" className="relative p-2">
              <ShoppingBag size={22} />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={toggleMenu}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="container py-4 space-y-4">
            <Link 
              to="/"
              className="block py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/categories"
              className="block py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Categories
            </Link>
            <Link 
              to="/about" 
              className="block py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              About Us
            </Link>
            <button 
              onClick={() => {
                openModal('contact');
                setIsMenuOpen(false);
              }}
              className="block py-2 w-full text-left"
            >
              Contact Us 
            </button>
            <div className="py-2">
              <button
                onClick={toggleLocationDropdown}
                className="flex items-center space-x-2"
              >
                <MapPin size={18} />
                <span>{selectedLocation}</span>
              </button>
              {isLocationDropdownOpen && (
                <div className="mt-2 bg-neutral-50 rounded-lg p-2">
                  {locations.map((location) => (
                    <button
                      key={location.id}
                      onClick={() => handleLocationSelect(location.name)}
                      className="w-full text-left py-1 px-2 text-sm hover:bg-neutral-100 rounded"
                    >
                      {location.name}
                    </button>
                  ))}
                  <button
                    onClick={handleUseMyLocation}
                    className="w-full text-left py-1 px-2 text-sm text-primary-500 hover:bg-neutral-100 rounded mt-1"
                  >
                    <div className="flex items-center">
                      <MapPin size={16} className="mr-2" />
                      Use My Live Location
                    </div>
                  </button>
                </div>
              )}
            </div>
            
            <div className="pt-2 border-t">
              {isAuthenticated ? (
                <div className="space-y-2">
                  <Link 
                    to="/profile" 
                    className="flex items-center space-x-2 py-1"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <User size={18} />
                    <span>My Profile</span>
                  </Link>
                  <Link 
                    to="/orders" 
                    className="flex items-center space-x-2 py-1"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <History size={18} />
                    <span>Orders</span>
                  </Link>
                  <Link 
                    to="/favorites" 
                    className="flex items-center space-x-2 py-1"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Heart size={18} />
                    <span>Favorites</span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-2 text-danger py-1"
                  >
                    <LogOut size={18} />
                    <span>Logout</span>
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    openModal('login');
                    setIsMenuOpen(false);
                  }}
                  className="btn btn-primary w-full"
                >
                  Login
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;