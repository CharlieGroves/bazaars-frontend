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
		console.log(item, shoppingCart)
		setShoppingCart(shoppingCart.push(item.itemName));
		console.log(shoppingCart);
		axios
			.post(
				process.env.REACT_APP_BACKEND_IP +
					"post/shoppingCart/" +
					currentUser.uid,
				shoppingCart
			)
			.then(() => getShoppingCart());
	}

	function removeFromCart(item) {
		const index = shoppingCart.indexOf(item);
		setShoppingCart(shoppingCart.splice(index, 1));
	}

	const value = {
		shoppingCart,
		setShoppingCart,
		addToCart,
		removeFromCart,
		getShoppingCart,
	};

	return (
		<ShoppingCartContext.Provider value={value}>
			{children}
		</ShoppingCartContext.Provider>
	);
}
