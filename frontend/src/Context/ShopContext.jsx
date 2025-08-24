import { createContext, useState, useEffect } from "react";
import Menu from "../assets/Menu.js";

export const ShopContext = createContext(null);

function ShopContextProvider(props) {
  const url = "http://localhost:4000";
  const [token, setTokenState] = useState("");
  const [loadingToken, setLoadingToken] = useState(true);

  // 🛒 Cart state
  const [cart, setCart] = useState([]);

  // --- Load token from localStorage on mount ---
  useEffect(() => {
    const savedToken = localStorage.getItem("cravez_token");
    if (savedToken) {
      setTokenState(savedToken);
    }
    setLoadingToken(false);
  }, []);

  // --- Add to cart function ---
  const addToCart = (food) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === food.id);
      if (existing) {
        return prevCart.map((item) =>
          item.id === food.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevCart, { ...food, quantity: 1 }];
      }
    });
  };

  // --- Remove completely from cart ---
  const removeFromCart = (foodId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== foodId));
  };

  // --- Increase quantity ---
  const increaseQty = (foodId) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === foodId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  // --- Decrease quantity (but not below 1) ---
  const decreaseQty = (foodId) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === foodId
          ? { ...item, quantity: Math.max(1, item.quantity - 1) }
          : item
      )
    );
  };

  const ContextValue = {
    Menu,
    url,
    token,
    setToken: (newToken) => {
      localStorage.setItem("cravez_token", newToken);
      setTokenState(newToken);
    },
    loadingToken,

    // 🛒 Cart exposed here
    cart,
    addToCart,
    removeFromCart,
    increaseQty,
    decreaseQty,
  };

  return (
    <ShopContext.Provider value={ContextValue}>
      {props.children}
    </ShopContext.Provider>
  );
}

export default ShopContextProvider;
