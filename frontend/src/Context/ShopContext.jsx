import { createContext, useState, useEffect } from "react";
import Menu from "../assets/Menu.js";

export const ShopContext = createContext(null);

function ShopContextProvider(props) {
  const url = "http://localhost:4000";
  const [token, setTokenState] = useState("");
  const [loadingToken, setLoadingToken] = useState(true); // NEW

  useEffect(() => {
    const savedToken = localStorage.getItem("cravez_token");
    if (savedToken) {
      setTokenState(savedToken);
    }
    setLoadingToken(false); // Done checking localStorage
  }, []);

  const ContextValue = {
    Menu,
    url,
    token,
    setToken: (newToken) => {
      localStorage.setItem("cravez_token", newToken); // Keep storage in sync
      setTokenState(newToken);
    },
    loadingToken, // expose this to handle conditional rendering
  };

  return (
    <ShopContext.Provider value={ContextValue}>
      {props.children}
    </ShopContext.Provider>
  );
}

export default ShopContextProvider;
