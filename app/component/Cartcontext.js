"use client";
import React, { createContext, useContext, useState, useCallback, useEffect } from "react";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [hydrated, setHydrated] = useState(false);

  // ✅ Load from localStorage on first render
  useEffect(() => {
    try {
      const saved = localStorage.getItem("gaav_cart");
      if (saved) {
        setCartItems(JSON.parse(saved));
      }
    } catch (e) {
      console.log("Cart load error:", e);
    }
    setHydrated(true);
  }, []);

  // ✅ Save to localStorage whenever cartItems changes
  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem("gaav_cart", JSON.stringify(cartItems));
    } catch (e) {
      console.log("Cart save error:", e);
    }
  }, [cartItems, hydrated]);

  const addToCart = useCallback((product, variantIndex) => {
    const variant = product.variants[variantIndex];
    const itemId = `${product.id}-${variantIndex}`;

    setCartItems((prev) => {
      const existing = prev.find((item) => item.itemId === itemId);
      if (existing) {
        return prev.map((item) =>
          item.itemId === itemId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [
        ...prev,
        {
          itemId,
          productId: product.id,
          name: product.name,
          categoryLabel: product.categoryLabel,
          icon: product.icon,
          image: product.image,
          variantLabel: variant.label,
          price: variant.price,
          quantity: 1,
        },
      ];
    });
  }, []);

  const removeFromCart = useCallback((itemId) => {
    setCartItems((prev) => prev.filter((item) => item.itemId !== itemId));
  }, []);

  const updateQuantity = useCallback((itemId, delta) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.itemId === itemId
            ? { ...item, quantity: item.quantity + delta }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  }, []);

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, updateQuantity, cartCount, cartTotal }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}