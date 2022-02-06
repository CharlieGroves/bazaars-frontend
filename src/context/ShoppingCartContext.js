import axios from "axios";
import React, { useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthenticationContext";

const ShoppingCartContext = React.createContext();

export function useShoppingCart() {
	return useContext(ShoppingCartContext);
}

export function ShoppingCartProvider({ children }) {
	const [shoppingCart, setShoppingCart] = useState([]);
	const { currentUser } = useAuth();
	const [cartTotal, setCartTotal] = useState(0);

	async function getShoppingCart() {
		axios
			.get(
				process.env.REACT_APP_BACKEND_IP +
					"get/shoppingCart/" +
					currentUser.uid
			)
			.then((data) => {
				console.log(data.data);
				return setShoppingCart(data.data);
			});
	}

	async function addToCart(item) {
		setShoppingCart([...shoppingCart, item]);
		axios
			.post(
				process.env.REACT_APP_BACKEND_IP +
					"post/shoppingCart/" +
					currentUser.uid,
				shoppingCart
			)
	}

	function removeFromCart(item) {
		const index = shoppingCart.indexOf(item);
		setShoppingCart(shoppingCart.splice(index, 1));
	}

	function getShoppingCartTotal() {
		let total = 0;
		for (let i = 0; i < shoppingCart.length; i++) {
			total += shoppingCart[i].itemPrice;
		}
		setCartTotal(Math.round(total * 100) / 100)
	}

	const value = {
		shoppingCart,
		setShoppingCart,
		addToCart,
		removeFromCart,
		getShoppingCart,
		cartTotal,
		getShoppingCartTotal
	};

	return (
		<ShoppingCartContext.Provider value={value}>
			{children}
		</ShoppingCartContext.Provider>
	);
}
