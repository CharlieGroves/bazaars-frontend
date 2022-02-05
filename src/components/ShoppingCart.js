import React from "react";
import "../svg/shopping-cart.svg";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { useHistory } from "react-router-dom";
import axios from "axios";

export default function ShoppingCart(props) {
	const { shoppingCart } = props;
	const history = useHistory();
	console.log(shoppingCart);
	
	let cart = shoppingCart;

	for(let x = 0; x<=cart.length-1; x++) {
		axios
			.get(process.env.REACT_APP_BACKEND_IP + "get/single-item/" + cart[x])
			.then((response) => {
				cart[x][1] = response
			})
			.catch((error) => {});
		console.log(cart)
		console.log(cart[x][1])
	}


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
				{shoppingCart && shoppingCart.length !== 0 ? (
					shoppingCart.map((item, index) => (
						<div
							style={{ cursor: "pointer" }}
							onClick={() =>
								history.push(
									`/seller/${item.sellerId}/${item.shopName}/${item.itemName}`
								)
							}
							key={index}
						>
							{item}&nbsp;£{item.itemPrice}
						</div>
					))
				) : (
					<div>Empty</div>
				)}
			</Popup>
		</div>
	);
}
