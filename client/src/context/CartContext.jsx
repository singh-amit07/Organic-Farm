import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
 
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });

  
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  
  const addToCart = (product, amount = 1) => {
  setCart((prev) => {
    const exists = prev.find((p) => p._id === product._id);

    if (exists) {
      return prev.map((p) =>
        p._id === product._id
          ? { ...p, amount }
          : p
      );
    }

    return [
      ...prev,
      {
        ...product,
        amount,
        unit: product.unit || "kg",
      },
    ];
  });
};


 
  const updateQty = (id, qty) => {
    setCart((prev) =>
      prev.map((p) =>
        p._id === id
          ? { ...p, quantity: Math.max(1, qty) }
          : p
      )
    );
  };


  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((p) => p._id !== id));
  };

  
  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        updateQty,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
