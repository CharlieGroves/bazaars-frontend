import React from "react";
import { firestore } from "../firebase";
import {
	useCollectionData,
	useDocumentData,
} from "react-firebase-hooks/firestore";
import { useAuth } from "../context/AuthenticationContext";

export default function Shop({
	match: {
		params: { seller, shop },
	},
}) {
	const sellerRef = firestore
		.collection("users")
		.doc(seller)
		.collection(shop);
	const [shopData] = useCollectionData(sellerRef);
	const { currentUser } = useAuth();
	let uid = "no user";
	currentUser && (uid = currentUser.uid);
	shopData && console.log(shopData);
	return (
		<div>
			{uid != seller ? (
				<div>
					<div>Seller {seller}</div>
					<div>Shop {shop}</div>
				</div>
			) : (
				<div>hello seller</div>
			)}
		</div>
	);
}
