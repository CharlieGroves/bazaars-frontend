import React, { useState } from "react";
import PayPal from "./PayPal";
import { firestore } from "../firebase";
import { useDocumentData } from "react-firebase-hooks/firestore";

export default function Item({
	match: {
		params: { seller, shop, item },
	},
}) {
	let description;
	let value;
	const itemRef = firestore.collection("items").doc(item)
	const [checkout, setCheckout] = useState(false);
	const [itemData] = useDocumentData(itemRef);
	itemData && console.log(itemData);
	itemData && (description = itemData.itemName);
	itemData && (value = itemData.itemPrice);
	
	return (
		<div>
			{checkout ? (
				<PayPal value={value} description={description} />
			) : (
				<button
					onClick={() => {
						setCheckout(true);
					}}
				>
					Checkout
				</button>
			)}
		</div>
	);
}
