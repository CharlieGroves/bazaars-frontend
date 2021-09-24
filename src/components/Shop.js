import React, { useState } from "react";
import { firestore } from "../firebase";
import {
	useCollectionData,
	useDocumentData,
} from "react-firebase-hooks/firestore";
import { useAuth } from "../context/AuthenticationContext";
import { Link } from "react-router-dom";
import Compress from "browser-image-compression";

import app from "../firebase";
import "../css/Shop.css";
import "../css/Loader.css";
import "../css/Form.css";
import "../css/Buttons.css";

export default function Shop({
	match: {
		params: { seller, shop },
	},
}) {
	const idRef = firestore.collection("urls").doc(seller);

	const shopRef = firestore
		.collection("users")
		.doc(seller)
		.collection("shops")
		.doc(shop);
	const itemsRef = shopRef.collection("items");
	const [itemsData] = useCollectionData(itemsRef);
	const [idData] = useDocumentData(idRef);
	const [creatingNewItem, setCreatingNewItem] = useState(false);
	const [itemName, setItemName] = useState("");
	const [itemPrice, setItemPrice] = useState();
	const [itemImageURL, setItemImageURL] = useState(null);
	const [imageUploadLoading, setImageUploadLoading] = useState(false);
	const [imageValue, setImageValue] = useState();
	const { currentUser } = useAuth();

	// Compression config
	const options = {
		// As the key specify the maximum size
		// Leave blank for infinity
		maxSizeMB: 1.5,
		// Use webworker for faster compression with
		// the help of threads
		useWebWorker: true,
	};

	let uid = "no user";
	let shopId = "";

	idData && console.log(idData);
	idData && (shopId = idData.uid);

	async function creatingNewItemStateChange() {
		setCreatingNewItem(!creatingNewItem);
	}

	const newItemHandler = async (e) => {
		e.preventDefault();
		setItemPrice(parseInt(itemPrice, 10));
		await itemsRef.doc(itemName).set({
			itemName: itemName,
			itemPrice: itemPrice,
			itemImageURL: itemImageURL,
		});
		setItemName("");
		setItemPrice("");
		setImageValue("");
		console.log("new item handler function");
	};

	const onFileChange = async (e) => {
		const file = e.target.files[0];
		setImageUploadLoading(true);
		// Initialize compression
		// First argument is the file object from the input
		// Second argument is the options object with the
		// config
		Compress(file, options)
			.then(async (compressedBlob) => {

				// Get the modified date of the file from the compressedBlob
				// so the file still shows correct metadata
				compressedBlob.lastModifiedDate = new Date();

				// Convert the blob to file
				const convertedBlobFile = new File(
					[compressedBlob],
					file.name,
					{ type: file.type, lastModified: Date.now() }
				);

				// upload file to cloud storage
				const storageRef = app.storage().ref();
				const fileRef = storageRef.child(file.name);
				await fileRef
					.put(convertedBlobFile)
					.then(async () => {
						setItemImageURL(await fileRef.getDownloadURL());
						console.log(e.target.value);
					})
					.finally(() => {
						setImageUploadLoading(false);
					});
				console.log(itemImageURL);
			})
			.catch((e) => {
				// Show the user a toast message or notification that something went wrong while compressing file
			});
	};

	currentUser && (uid = currentUser.uid);
	return (
		<div>
			{uid !== shopId ? (
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
										required
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
										required
										type="int"
										value={itemPrice}
										onChange={(e) =>
											setItemPrice(e.target.value)
										}
										min="0"
										step="any"
									/>
								</label>
								<br />
								<label>
									Image: &nbsp;
									<input
										required
										type="file"
										value={imageValue}
										onChange={onFileChange}
									/>
								</label>
								<br />
								{imageUploadLoading ? (
									<div className="loader" />
								) : (
									<button type="submit">Create</button>
								)}
								<button onClick={creatingNewItemStateChange}>
									Cancel
								</button>
							</form>
						</div>
					) : (
						<button
							className="shop-button make-new-item-button"
							onClick={creatingNewItemStateChange}
						>
							Make a new item
						</button>
					)}
				</div>
			)}
			<div className="item-container">
				{itemsData ? (
					itemsData.map((item, index) => (
						<div className="item" key={index}>
							<Link
								to={`/seller/${seller}/${shop}/${item.itemName}`}
								className="item-link"
							>
								{item.itemName}:
								<br />
							</Link>
							<div className="item-price">£{item.itemPrice}</div>
							<img
								alt={item.name}
								height="300px"
								src={item.itemImageURL}
							/>
						</div>
					))
				) : (
					<div>No items in this shop</div>
				)}
			</div>
		</div>
	);
}
