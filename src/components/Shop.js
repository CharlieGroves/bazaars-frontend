import React, { useState } from "react";
import { firestore } from "../firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";
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
	const [creatingNewItem, setCreatingNewItem] = useState(false);
	const [itemName, setItemName] = useState("");
	const { currentUser } = useAuth();
	let uid = "no user";

	function creatingNewItemStateChange() {
		setCreatingNewItem(!creatingNewItem);
	}

	const newItemHandler = async (e) => {
		e.preventDefault();
		console.log("new item handler function");
	};
	currentUser && (uid = currentUser.uid);
	return (
		<div>
			{uid !== seller ? (
				<div>
					<div>Seller {seller}</div>
					<div>Shop {shop}</div>
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
										value={itemName}
										onChange={(e) =>
											setItemName(e.target.value)
										}
										min="0"
										step="any"
									/>
								</label>
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
