import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Trash2, Plus, Minus } from 'lucide-react';
import { motion } from 'framer-motion';

import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { useModal } from '../contexts/ModalContext';

const CheckoutPage: React.FC = () => {
  const { items, restaurant, updateQuantity, removeItem, subtotal, clearCart } = useCart();
  const { isAuthenticated, user } = useAuth();
  const { openModal } = useModal();
  const navigate = useNavigate();
  
  const [deliveryAddress, setDeliveryAddress] = useState(user?.address || '');
  const [contactNumber, setContactNumber] = useState(user?.phone || '');
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [orderNotes, setOrderNotes] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const deliveryFee = 2.99;
  const tax = subtotal * 0.08; // 8% tax
  const totalAmount = subtotal + deliveryFee + tax;
  
  if (items.length === 0 || !restaurant) {
    return (
      <div className="container py-20 text-center">
        <h2 className="text-2xl font-semibold mb-4">Your cart is empty</h2>
        <p className="text-neutral-600 mb-8">Add some delicious items from our restaurants!</p>
        <Link to="/" className="btn btn-primary">
          Browse Restaurants
        </Link>
      </div>
    );
  }
  
  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      openModal('login');
      return;
    }
    
    if (!deliveryAddress || !contactNumber) {
      alert('Please fill in your delivery address and contact number');
      return;
    }
    
    setIsLoading(true);
    
    // Simulate order placement
    setTimeout(() => {
      clearCart();
      navigate('/orders');
      setIsLoading(false);
    }, 2000);
  };
  
  return (
    <div className="container py-8">
      <Link to="/" className="inline-flex items-center text-neutral-600 mb-6 hover:text-primary-500">
        <ArrowLeft size={16} className="mr-1" />
        Continue Shopping
      </Link>
      
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Order Summary */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6">
            <div className="p-4 border-b bg-neutral-50">
              <h2 className="font-semibold text-xl">Order Summary</h2>
              <p className="text-neutral-500">
                {restaurant.name}
              </p>
            </div>
            
            <div className="divide-y">
              {items.map(item => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0, height: 0 }}
                  className="p-4 flex items-center"
                >
                  <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  
                  <div className="ml-4 flex-grow">
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-sm text-neutral-500">${item.price.toFixed(2)}</p>
                  </div>
                  
                  <div className="flex items-center mr-4">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-8 h-8 flex items-center justify-center rounded-full border border-neutral-200 hover:border-primary-500"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="mx-2 w-6 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-8 h-8 flex items-center justify-center rounded-full border border-neutral-200 hover:border-primary-500"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                  
                  <div className="font-medium w-20 text-right">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                  
                  <button
                    onClick={() => removeItem(item.id)}
                    className="ml-2 text-neutral-400 hover:text-danger"
                    aria-label="Remove item"
                  >
                    <Trash2 size={18} />
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
          
          {/* Delivery Information */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-4 border-b bg-neutral-50">
              <h2 className="font-semibold text-xl">Delivery Information</h2>
            </div>
            
            <form onSubmit={handlePlaceOrder} className="p-6 space-y-4">
              <div>
                <label htmlFor="address" className="block text-sm font-medium text-neutral-700 mb-1">
                  Delivery Address
                </label>
                <textarea
                  id="address"
                  value={deliveryAddress}
                  onChange={(e) => setDeliveryAddress(e.target.value)}
                  rows={2}
                  className="input"
                  placeholder="Enter your full address"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="contact" className="block text-sm font-medium text-neutral-700 mb-1">
                  Contact Number
                </label>
                <input
                  id="contact"
                  type="tel"
                  value={contactNumber}
                  onChange={(e) => setContactNumber(e.target.value)}
                  className="input"
                  placeholder="Enter your phone number"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  Payment Method
                </label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="payment"
                      value="cash"
                      checked={paymentMethod === 'cash'}
                      onChange={() => setPaymentMethod('cash')}
                      className="h-4 w-4 text-primary-500 focus:ring-primary-500"
                    />
                    <span className="ml-2">Cash on Delivery</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="payment"
                      value="card"
                      checked={paymentMethod === 'card'}
                      onChange={() => setPaymentMethod('card')}
                      className="h-4 w-4 text-primary-500 focus:ring-primary-500"
                    />
                    <span className="ml-2">Credit/Debit Card</span>
                  </label>
                </div>
              </div>
              
              <div>
                <label htmlFor="notes" className="block text-sm font-medium text-neutral-700 mb-1">
                  Order Notes (Optional)
                </label>
                <textarea
                  id="notes"
                  value={orderNotes}
                  onChange={(e) => setOrderNotes(e.target.value)}
                  rows={2}
                  className="input"
                  placeholder="Any special instructions for delivery"
                />
              </div>
            </form>
          </div>
        </div>
        
        {/* Order Total */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm overflow-hidden sticky top-24">
            <div className="p-4 border-b bg-neutral-50">
              <h2 className="font-semibold text-xl">Order Total</h2>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="flex justify-between">
                <span className="text-neutral-600">Subtotal</span>
                <span className="font-medium">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-600">Delivery Fee</span>
                <span className="font-medium">${deliveryFee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-600">Tax</span>
                <span className="font-medium">${tax.toFixed(2)}</span>
              </div>
              
              <div className="border-t pt-4">
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span className="text-primary-500">${totalAmount.toFixed(2)}</span>
                </div>
              </div>
              
              <button
                onClick={handlePlaceOrder}
                className={`btn btn-primary w-full ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                disabled={isLoading}
              >
                {isLoading ? 'Placing Order...' : 'Place Order'}
              </button>
              
              <p className="text-xs text-neutral-500 text-center mt-2">
                By placing your order, you agree to our Terms of Service and Privacy Policy
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;