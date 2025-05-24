import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Star, Printer, RotateCcw, XCircle } from 'lucide-react';
import { motion } from 'framer-motion';

import { useAuth } from '../contexts/AuthContext';
import { demoOrders } from '../data/restaurants';
import { Order } from '../types';

const OrdersPage: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [orders, setOrders] = useState(demoOrders);
  const [activeTab, setActiveTab] = useState<'all' | 'active' | 'completed'>('all');
  
  // Filter orders based on active tab
  const filteredOrders = orders.filter(order => {
    if (activeTab === 'all') return true;
    if (activeTab === 'active') return ['pending', 'accepted', 'preparing', 'ready'].includes(order.status);
    if (activeTab === 'completed') return ['delivered', 'cancelled'].includes(order.status);
    return true;
  });
  
  if (!isAuthenticated) {
    return (
      <div className="container py-20 text-center">
        <h2 className="text-2xl font-semibold mb-4">Please login to view your orders</h2>
        <Link to="/" className="btn btn-primary">
          Go to Home
        </Link>
      </div>
    );
  }
  
  const getStatusColor = (status: string) => {
    switch(status) {
      case 'pending': return 'bg-neutral-200';
      case 'accepted': return 'bg-blue-100 text-blue-800';
      case 'preparing': return 'bg-yellow-100 text-yellow-800';
      case 'ready': return 'bg-indigo-100 text-indigo-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-neutral-200';
    }
  };
  
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    }).format(date);
  };
  
  const handleReorder = (orderId: string) => {
    // In a real app, this would duplicate the order and place it
    alert(`Reordering order ${orderId}`);
  };
  
  const handlePrintBill = (orderId: string) => {
    // In a real app, this would print or download the bill
    window.print();
  };
  
  const handleCancelOrder = (orderId: string) => {
    // In a real app, this would call an API to cancel the order
    if (window.confirm('Are you sure you want to cancel this order?')) {
      setOrders(orders.map(order => 
        order.id === orderId 
          ? { ...order, status: 'cancelled' } 
          : order
      ));
    }
  };
  
  const handleAddRating = (orderId: string, rating: number) => {
    // In a real app, this would call an API to save the rating
    alert(`You rated order ${orderId} ${rating} stars!`);
  };
  
  return (
    <div className="container py-8">
      <Link to="/" className="inline-flex items-center text-neutral-600 mb-6 hover:text-primary-500">
        <ArrowLeft size={16} className="mr-1" />
        Back to Home
      </Link>
      
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">My Orders</h1>
        
        <div className="flex rounded-lg overflow-hidden border">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-4 py-2 text-sm font-medium ${
              activeTab === 'all' ? 'bg-primary-500 text-white' : 'bg-white'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setActiveTab('active')}
            className={`px-4 py-2 text-sm font-medium ${
              activeTab === 'active' ? 'bg-primary-500 text-white' : 'bg-white'
            }`}
          >
            Active
          </button>
          <button
            onClick={() => setActiveTab('completed')}
            className={`px-4 py-2 text-sm font-medium ${
              activeTab === 'completed' ? 'bg-primary-500 text-white' : 'bg-white'
            }`}
          >
            Completed
          </button>
        </div>
      </div>
      
      {filteredOrders.length === 0 ? (
        <div className="text-center py-12">
          <h3 className="text-xl font-medium mb-2">No orders found</h3>
          <p className="text-neutral-500 mb-6">You don't have any {activeTab !== 'all' ? activeTab : ''} orders yet.</p>
          <Link to="/" className="btn btn-primary">
            Browse Restaurants
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {filteredOrders.map(order => (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-sm overflow-hidden border"
            >
              {/* Order Header */}
              <div className="p-4 bg-neutral-50 border-b flex flex-col md:flex-row md:items-center justify-between gap-y-2">
                <div>
                  <div className="flex items-center">
                    <h3 className="font-medium mr-2">{order.restaurantName}</h3>
                    <span className={`px-2 py-0.5 text-xs rounded-full ${getStatusColor(order.status)}`}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </div>
                  <p className="text-sm text-neutral-500">
                    Order #{order.id} • {formatDate(new Date(order.date))}
                  </p>
                </div>
                
                <div className="flex items-center space-x-2">
                  {(order.status === 'delivered') && (
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map(star => (
                        <button
                          key={star}
                          onClick={() => handleAddRating(order.id, star)}
                          className="text-neutral-300 hover:text-warning"
                        >
                          <Star size={18} fill="currentColor" />
                        </button>
                      ))}
                    </div>
                  )}
                  
                  <button
                    onClick={() => handleReorder(order.id)}
                    className="text-sm text-primary-500 hover:text-primary-600 flex items-center"
                    title="Reorder"
                  >
                    <RotateCcw size={16} className="mr-1" />
                    Reorder
                  </button>
                  
                  <button
                    onClick={() => handlePrintBill(order.id)}
                    className="text-sm text-primary-500 hover:text-primary-600 flex items-center"
                    title="Print Bill"
                  >
                    <Printer size={16} className="mr-1" />
                    Bill
                  </button>
                  
                  {order.status === 'pending' && (
                    <button
                      onClick={() => handleCancelOrder(order.id)}
                      className="text-sm text-danger hover:text-red-700 flex items-center"
                      title="Cancel Order"
                    >
                      <XCircle size={16} className="mr-1" />
                      Cancel
                    </button>
                  )}
                </div>
              </div>
              
              {/* Order Items */}
              <div className="p-4">
                <div className="space-y-4">
                  {order.items.map(item => (
                    <div key={item.id} className="flex items-center">
                      <div className="w-12 h-12 rounded-md overflow-hidden flex-shrink-0">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="ml-3 flex-grow">
                        <h4 className="font-medium">{item.name}</h4>
                        <p className="text-sm text-neutral-500">${item.price.toFixed(2)} x {item.quantity}</p>
                      </div>
                      <div className="font-medium">
                        ${(item.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Order Total */}
                <div className="mt-4 pt-4 border-t flex justify-end">
                  <div className="text-right">
                    <p className="text-sm text-neutral-500">Total Amount</p>
                    <p className="text-lg font-bold text-primary-500">
                      ${order.total.toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrdersPage;