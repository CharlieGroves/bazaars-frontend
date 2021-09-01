import React from "react";
import { firestore } from "../firebase";
import { useCollectionData, useDocumentData } from "react-firebase-hooks/firestore";

export default function Shop({
	match: {
		params: { seller, shop },
	},
}) {
	const sellerRef = firestore.collection("users").doc(seller).collection(shop);
	const [shopData] = useCollectionData(sellerRef);
	shopData && console.log(shopData);
	return (
		<div>
			<div>Seller {seller}</div>
			<div>Shop {shop}</div>
		</div>
	);
}
