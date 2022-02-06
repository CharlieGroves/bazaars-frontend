import React, { useEffect, useState } from "react";
import { useShoppingCart } from "../context/ShoppingCartContext";
import CheckoutItem from "./CheckoutItem";
import "../css/Checkout.css";
import Header from "./Header";
import PayPal from "./PayPal";

export default function Checkout() {
	const { shoppingCart, cartTotal, getShoppingCartTotal, getShoppingCart } =
		useShoppingCart();

	useEffect(() => {
		getShoppingCartTotal();
		getShoppingCart();
	}, []);

	return (
		<div>
			<Header
				shoppingCart={shoppingCart}
				cartTotal={cartTotal}
				getShoppingCartTotal={getShoppingCartTotal}
			/>
			<div className="checkout-items-list-container">
				<h1>Checkout</h1>
				{shoppingCart && shoppingCart.length !== 0 ? (
					shoppingCart.map((item, index) => (
						<CheckoutItem item={item} key={index} />
					))
				) : (
					<div>Empty</div>
				)}
				<div className="checkout-total-container">
					<div className="checkout-total">Total £{cartTotal}</div>
					<PayPal shoppingCart={shoppingCart} />
				</div>
			</div>
		</div>
	);
}
