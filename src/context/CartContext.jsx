import { createContext, useContext, useState } from 'react';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cart, setCart] = useState({});

  const updateQty = (dish, delta) => {
    setCart((prev) => {
      const id = dish._id;
      const current = prev[id]?.qty || 0;
      const next = Math.max(0, current + delta);
      if (next === 0) {
        const { [id]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [id]: { dish, qty: next } };
    });
  };

  const removeItem = (id) => {
    setCart((prev) => {
      const { [id]: _, ...rest } = prev;
      return rest;
    });
  };

  const clearCart = () => setCart({});

  const items = Object.values(cart);
  const totalItems = items.reduce((s, i) => s + i.qty, 0);
  const subtotal = items.reduce((s, i) => s + i.dish.price * i.qty, 0);
  const service = subtotal * 0.1;
  const total = subtotal + service;

  return (
    <CartContext.Provider value={{ cart, updateQty, removeItem, clearCart, items, totalItems, subtotal, service, total }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
