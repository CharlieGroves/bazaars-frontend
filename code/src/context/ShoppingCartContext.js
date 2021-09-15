import React, { useState } from "react";

const ShoppingCartContext = React.createContext();

export function useShoppingCart() {
	return useContext(ShoppingCartContext);
}

export default function ShoppingCartProvider({ children }) {
    const [shoppingCart, setShoppingCart] = useState([])

    const value = {shoppingCart, setShoppingCart}

    return (
        <ShoppingCartContext.Provider value={value}>
            {children}
        </ShoppingCartContext.Provider>
    )
}
