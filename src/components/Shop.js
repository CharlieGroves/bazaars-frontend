import React, { useState } from "react";
import { firestore } from "../firebase";
import {
	useCollectionData,
	useDocumentData,
} from "react-firebase-hooks/firestore";
import { useAuth } from "../context/AuthenticationContext";
import { Link } from "react-router-dom";

export default function Shop({
	match: {
		params: { seller, shop },
	},
}) {
	const shopRef = firestore
		.collection("users")
		.doc(seller)
		.collection("shops")
		.doc(shop);
	const itemsRef = shopRef.collection("items");
	const [shopData] = useDocumentData(shopRef);
	const [itemsData] = useCollectionData(itemsRef);
	const [creatingNewItem, setCreatingNewItem] = useState(false);
	const [itemName, setItemName] = useState("");
	const [itemPrice, setItemPrice] = useState(0);
	const { currentUser } = useAuth();
	let uid = "no user";

	async function creatingNewItemStateChange() {
		setCreatingNewItem(!creatingNewItem);
	}

	const newItemHandler = async (e) => {
		e.preventDefault();
		await itemsRef.doc(itemName).set({
			itemName: itemName,
			itemPrice: itemPrice,
		});
		setItemName("");
		setItemPrice(0);
		console.log("new item handler function");
	};
	currentUser && (uid = currentUser.uid);
	return (
		<div>
			{uid !== seller ? (
				<div>
					<div>Seller {seller}</div>
					<div>Shop {shop}</div>
					<div>
						Items:
						<ul>
							{itemsData ? (
								itemsData.map((item, index) => (
									<div>
										<Link
											to={`/seller/${currentUser.uid}/${shop}/${item.name}`}
											key={index}
										>
											{item.itemName}:
											<br />
										</Link>
										£{item.itemPrice}
									</div>
								))
							) : (
								<div>No items in this shop</div>
							)}
						</ul>
					</div>
				</div>
			) : (
				<div>
					<div>hello seller</div>

					{creatingNewItem ? (
						<div>
							<form onSubmit={newItemHandler}>
								<label>
									Item Name: &nbsp;
									<input
										type="text"
										value={itemName}
										onChange={(e) =>
											setItemName(e.target.value)
										}
									/>
								</label>
								<br />
								<label>
									Item Price: &nbsp;
									<input
										type="int"
										value={itemPrice}
										onChange={(e) =>
											setItemPrice(e.target.value)
										}
										min="0"
										step="any"
									/>
								</label>
								<button type="submit">Create</button>
							</form>
							<button onClick={creatingNewItemStateChange}>
								Cancel
							</button>
						</div>
					) : (
						<button onClick={creatingNewItemStateChange}>
							Make a new item
						</button>
					)}
				</div>
			)}
		</div>
	);
}