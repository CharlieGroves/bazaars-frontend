import React from "react";
import "../svg/shopping-cart.svg";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { useHistory } from "react-router-dom";

export default function ShoppingCart(props) {
	const { shoppingCart } = props;
	const history = useHistory();

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
							{item.itemName}&nbsp;£{item.itemPrice}
						</div>
					))
				) : (
					<div>Empty</div>
				)}
			</Popup>
		</div>
	);
}
