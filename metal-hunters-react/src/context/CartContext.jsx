import { createContext, useContext, useEffect, useMemo, useState } from "react";

const CartContext = createContext(null);
const CART_KEY = "mh_cart";

function readCart() {
  try {
    const raw = localStorage.getItem(CART_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }) {
  const [cart, setCart] = useState(readCart);

  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product, qty, size, color) => {
    let nextCount = 0;
    setCart(prev => {
      const idx = prev.findIndex(i => i.id === product.id && i.size === size && i.color === color);
      let next;
      if (idx >= 0) {
        next = prev.map((item, i) => i === idx ? { ...item, qty: item.qty + qty } : item);
      } else {
        next = [...prev, {
          id: product.id,
          nome: product.name,
          prezzo: product.price,
          immagine: `${product.type}-${product.fit}`,
          size, color, qty,
        }];
      }
      nextCount = next.reduce((s, i) => s + i.qty, 0);
      return next;
    });
    return nextCount;
  };

  const removeFromCart = (index) => {
    setCart(prev => prev.filter((_, i) => i !== index));
  };

  const value = useMemo(() => {
    const count = cart.reduce((s, i) => s + i.qty, 0);
    const total = cart.reduce((s, i) => s + i.qty * i.prezzo, 0);
    return { cart, addToCart, removeFromCart, count, total };
  }, [cart]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
