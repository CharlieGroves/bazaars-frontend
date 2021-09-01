import React from "react";
import { firestore } from "../firebase";
import {
	useDocumentData,
} from "react-firebase-hooks/firestore";

export default function Seller({
	match: {
		params: { seller },
	},
}) {
	const sellerRef = firestore.collection("users").doc(seller);
	const [shopData] = useDocumentData(sellerRef);
	shopData && console.log(shopData);
	return <div>{<div>Seller {shopData && shopData.username}</div>}</div>;
}
