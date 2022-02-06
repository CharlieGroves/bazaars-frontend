import React from "react";
import SearchBar from "./SearchBar";
import ShoppingCart from "./ShoppingCart";
import "../css/Header.css";

export default function Header(props) {
	const { shoppingCart, addToCart, removeFromCart, cartTotal, getShoppingCartTotal } = props;
	return (
		<div className="header-container">
			<SearchBar />
			<ShoppingCart
				shoppingCart={shoppingCart}
				addToCart={addToCart}
				removeFromCart={removeFromCart}
				cartTotal={cartTotal}
				getShoppingCartTotal={getShoppingCartTotal}
			/>
		</div>
	);
}
