import React from "react";

export default function CheckoutItem(props) {
	const { item } = props;
	return (
		<div className="checkout-item-container">
			<img
				className="checkout-image"
				alt={item.itemName}
				src={item.itemImageURL}
			/>
			<div className="checkout-data-container">
				<div>{item.itemName}</div>
				<div>£{item.itemPrice}</div>
			</div>
		</div>
	);
}
