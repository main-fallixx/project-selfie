import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const CartContext = createContext(null);
const CART_KEY = 'selfiepetti_quote_cart';
const QUOTES_KEY = 'selfiepetti_quote_requests';

function readStorage(key, fallback) {
  try {
    const value = window.localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => readStorage(CART_KEY, []));

  useEffect(() => {
    window.localStorage.setItem(CART_KEY, JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product) => {
    setCartItems((current) => {
      if (current.find((item) => item.id === product.id)) return current;
      return [...current, product];
    });
  };

  const removeFromCart = (productId) => {
    setCartItems((current) => current.filter((item) => item.id !== productId));
  };

  const clearCart = () => setCartItems([]);

  const saveQuoteRequest = (payload) => {
    const existing = readStorage(QUOTES_KEY, []);
    const quote = {
      id: `quote-${Date.now()}`,
      createdAt: new Date().toISOString(),
      products: cartItems,
      ...payload
    };
    window.localStorage.setItem(QUOTES_KEY, JSON.stringify([quote, ...existing]));
    clearCart();
    return quote;
  };

  const value = useMemo(() => ({
    cartItems,
    cartCount: cartItems.length,
    addToCart,
    removeFromCart,
    clearCart,
    saveQuoteRequest
  }), [cartItems]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used inside CartProvider');
  return context;
}

export function getStoredQuotes() {
  if (typeof window === 'undefined') return [];
  return readStorage(QUOTES_KEY, []);
}
