import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem('aura_cart');
      return saved ? JSON.parse(saved) : [
        {
          id: 'sig-1',
          name: 'Kyoto Drip Cold Brew',
          price: 7.5,
          quantity: 1,
          image: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?w=500&auto=format&fit=crop&q=80',
          milk: 'None (Black)',
          roast: 'Yirgacheffe Reserve'
        }
      ];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('aura_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.error(e);
    }
  }, [cartItems]);

  const addToCart = (product, options = {}) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id && item.milk === options.milk);
      if (existing) {
        return prev.map(item => 
          item.id === product.id && item.milk === options.milk
            ? { ...item, quantity: item.quantity + (options.quantity || 1) }
            : item
        );
      }
      return [...prev, {
        ...product,
        quantity: options.quantity || 1,
        milk: options.milk || 'Whole Milk',
        temperature: options.temperature || 'Hot',
        roast: options.roast || 'Signature Roast'
      }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id, milk) => {
    setCartItems(prev => prev.filter(item => !(item.id === id && item.milk === milk)));
  };

  const updateQuantity = (id, milk, delta) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id && item.milk === milk) {
        const newQty = item.quantity + delta;
        return newQty > 0 ? { ...item, quantity: newQty } : null;
      }
      return item;
    }).filter(Boolean));
  };

  const clearCart = () => setCartItems([]);

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <CartContext.Provider value={{
      cartItems,
      isCartOpen,
      setIsCartOpen,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      subtotal,
      totalItems
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
};
