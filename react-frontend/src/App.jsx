import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

// Layouts
import MainLayout from './layouts/MainLayout';

// Pages
import HomePage from './pages/HomePage';
import CategoryPage from './pages/CategoryPage';
import AboutPage from './pages/AboutPage';
import RestaurantPage from './pages/RestaurantPage';
import CheckoutPage from './pages/CheckoutPage';
import OrdersPage from './pages/OrdersPage';
import ProfilePage from './pages/ProfilePage';


// Contexts
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import { ModalProvider } from './contexts/ModalContext';


// function App() {
//   const [message, setMessage] = useState("");

//   const fetchMessage = async () => {
//     const res = await fetch("http://localhost:8080/api/hello");
//     const text = await res.text();
//     setMessage(text);
//   };

  function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <ModalProvider>
          <Routes>
            <Route path="/" element={<MainLayout />}>
              <Route index element={<HomePage />} />
              <Route path="categories" element={<CategoryPage />} />
              <Route path="about" element={<AboutPage />} />
              <Route path="restaurant/:id" element={<RestaurantPage />} />
              <Route path="checkout" element={<CheckoutPage />} />
              <Route path="orders" element={<OrdersPage />} />
              <Route path="profile" element={<ProfilePage />} />
            </Route>
          </Routes>
        </ModalProvider>
      </CartProvider>
    </AuthProvider>
  );
}


export default App;
