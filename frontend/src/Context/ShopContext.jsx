import { createContext, useState, useEffect } from "react";
import axios from "axios";
import Menu from "../assets/Menu.js";

export const ShopContext = createContext(null);

function ShopContextProvider(props) {
  const url = "https://craverz.vercel.app";

  // 🔑 User token
  const [token, setTokenState] = useState("");
  const [loadingToken, setLoadingToken] = useState(true);

  // 🔑 Admin token
  const [adminToken, setAdminTokenState] = useState("");
  const [loadingAdminToken, setLoadingAdminToken] = useState(true);

  // 🛒 Cart state (restore from localStorage)
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cravez_cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // 🍔 Food state
  const [food, setFood] = useState([]);
  const [loadingFood, setLoadingFood] = useState(false);
  const [errorFood, setErrorFood] = useState(null);

  // --- Load user token from localStorage ---
  useEffect(() => {
    const savedToken = localStorage.getItem("cravez_token");
    if (savedToken) {
      setTokenState(savedToken);
    }
    setLoadingToken(false);
  }, []);

  // --- Load admin token from localStorage ---
  useEffect(() => {
    const savedAdminToken = localStorage.getItem("cravez_admin_token");
    if (savedAdminToken) {
      setAdminTokenState(savedAdminToken);
    }
    setLoadingAdminToken(false);
  }, []);

  // --- Sync cart with localStorage ---
  useEffect(() => {
    localStorage.setItem("cravez_cart", JSON.stringify(cart));
  }, [cart]);

  // --- Fetch food function ---
  const fetchFood = async () => {
    try {
      setLoadingFood(true);
      setErrorFood(null);

      const res = await axios.get(`${url}/api/food/list`);
      if (res.data.success) {
        setFood(res.data.data);
      } else {
        setErrorFood(res.data.message || "Something went wrong");
      }
    } catch (err) {
      setErrorFood(err.response?.data?.message || "Server error");
    } finally {
      setLoadingFood(false);
    }
  };

  // --- Fetch food on mount ---
  useEffect(() => {
    fetchFood();
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

  // --- Clear cart (use after successful checkout) ---
  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cravez_cart");
  };

  const ContextValue = {
    Menu,
    url,

    // User token
    token,
    setToken: (newToken) => {
      localStorage.setItem("cravez_token", newToken);
      setTokenState(newToken);
    },
    loadingToken,

    // Admin token
    adminToken,
    setAdminToken: (newToken) => {
      localStorage.setItem("cravez_admin_token", newToken);
      setAdminTokenState(newToken);
    },
    loadingAdminToken,

    // Food
    food,
    loadingFood,
    errorFood,
    fetchFood,

    // 🛒 Cart exposed here
    cart,
    addToCart,
    removeFromCart,
    increaseQty,
    decreaseQty,
    clearCart,
  };

  return (
    <ShopContext.Provider value={ContextValue}>
      {props.children}
    </ShopContext.Provider>
  );
}

export default ShopContextProvider;
