import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load cart from localStorage on initial render
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        if (Array.isArray(parsedCart)) {
          setCartItems(parsedCart.map(item => ({
            ...item,
            price: Number(item.price),
            quantity: Number(item.quantity)
          })));
        }
      } catch (error) {
        console.error("Failed to parse cart data:", error);
        localStorage.removeItem('cart');
      }
    }
    setIsInitialized(true);
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem('cart', JSON.stringify(cartItems));
      console.log("Saved cart:", cartItems); // Debug log
    }
  }, [cartItems, isInitialized]);

  const addToCart = (product, quantity = 1) => {
    const numQuantity = Number(quantity);
    const numPrice = Number(product.price);
    
    if (isNaN(numQuantity) || isNaN(numPrice)) {
      console.error("Invalid quantity or price");
      return;
    }

    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id 
            ? { 
                ...item, 
                quantity: item.quantity + numQuantity,
                price: numPrice
              }
            : item
        );
      }
      
      return [...prevItems, { 
        id: product.id,
        name: product.name,
        price: numPrice,
        image_url: product.image_url || product.imageUrl,
        quantity: numQuantity
      }];
    });
  };

  const removeFromCart = (productId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    const numQuantity = Number(quantity);
    if (isNaN(numQuantity)) return;
    
    if (numQuantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === productId 
          ? { ...item, quantity: numQuantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const cartTotal = cartItems.reduce(
    (total, item) => total + (item.price * item.quantity),
    0
  );

  const cartCount = cartItems.reduce(
    (count, item) => count + item.quantity,
    0
  );

  return (
    <CartContext.Provider value={{
      cartItems,
      cartTotal,
      cartCount,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);