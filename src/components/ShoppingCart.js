import React, { useState, useEffect } from "react";
import "../svg/shopping-cart.svg";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { useHistory } from "react-router-dom";
import "../css/ShoppingCart.css";

export default function ShoppingCart(props) {
	const { shoppingCart, cartTotal, getShoppingCartTotal } = props;
	const history = useHistory();

	useEffect(() => {
		getShoppingCartTotal()
	}, [shoppingCart]);

	return (
		<div>
			<Popup
				trigger={
					<img
						className="shopping-cart-svg"
						src="https://www.svgrepo.com/show/80543/shopping-cart-outline.svg"
					/>
				}
				position="left center"
			>
				<div className="shopping-cart-container">
					{shoppingCart && shoppingCart.length !== 0 ? (
						shoppingCart.map((item, index) => (
							<div
								style={{ cursor: "pointer" }}
								className="shopping-cart-item"
								onClick={() =>
									history.push(
										`/seller/${item.sellerId}/${item.shopName}/${item.itemName}`
									)
								}
								key={index}
							>
								£{item.itemPrice}&nbsp;{item.itemName}
							</div>
						))
					) : (
						<div>Empty</div>
					)}
				</div>
				Total £{cartTotal} 
				<button onClick={() => history.push('/checkout')}>Checkout</button>
			</Popup>
		</div>
	);
}
