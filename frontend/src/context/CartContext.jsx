import { createContext, useContext, useState, useEffect } from 'react';
import api from '../api/api';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export function CartProvider({ children }) {
  const { user }                = useAuth();
  const [items,    setItems]    = useState([]);
  const [cartOpen, setCartOpen] = useState(false);

  // Fetch cart from MongoDB whenever user logs in / changes
  useEffect(() => {
    if (user) {
      api.get('/cart')
        .then(res => setItems(res.data.items))
        .catch(() => {});
    } else {
      setItems([]);
    }
  }, [user]);

  const addItem = async (item) => {
    if (!user) {
      alert('Please login to add items to cart.');
      return;
    }
    const res = await api.post('/cart/add', item);
    setItems(res.data.items);
  };

  const removeItem = async (mediaId) => {
    const res = await api.delete(`/cart/remove/${mediaId}`);
    setItems(res.data.items);
  };

  const clearCart = async () => {
    await api.delete('/cart/clear');
    setItems([]);
  };

  const subtotal   = items.reduce((s, i) => s + i.price, 0);
  const gst        = Math.round(subtotal * 0.18);
  const grandTotal = subtotal + gst;

  return (
    <CartContext.Provider value={{
      items, addItem, removeItem, clearCart,
      subtotal, gst, grandTotal,
      cartOpen, setCartOpen,
    }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
