import { createContext } from "react";
import Menu from "../assets/Menu.js";

export const ShopContext = createContext(null);

function ShopContextProvider(props){

    const ContextValue = {Menu}

    return(
        <ShopContext.Provider value={ContextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}
export default ShopContextProvider