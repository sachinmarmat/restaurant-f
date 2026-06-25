import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { RestaurantProvider } from './context/RestaurantContext';
import { CartProvider } from './context/CartContext';
import { ToastProvider } from './context/ToastContext';
import { AuthProvider } from './context/AuthContext';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ToastProvider>
      <AuthProvider>
        <RestaurantProvider>
          <CartProvider>
            <App />
          </CartProvider>
        </RestaurantProvider>
      </AuthProvider>
    </ToastProvider>
  </React.StrictMode>
);
