import React from "react";
import SearchBar from "./SearchBar";
import ShoppingCart from "./ShoppingCart";
import "../css/Header.css";

export default function Header(props) {
	const { shoppingCart, addToCart, removeFromCart } = props;
	return (
		<div className="header-container">
			<SearchBar />
			<ShoppingCart
				shoppingCart={shoppingCart}
				addToCart={addToCart}
				removeFromCart={removeFromCart}
			/>
		</div>
	);
}
