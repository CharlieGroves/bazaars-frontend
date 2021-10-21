import React, { useEffect, useState } from "react";
import { firestore } from "../firebase";
import {
	useDocumentData,
} from "react-firebase-hooks/firestore";
import { useAuth } from "../context/AuthenticationContext";
import { Link } from "react-router-dom";
import axios from "axios";

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

	const [itemsData, setItemsData] = useState()
	const [idData] = useDocumentData(idRef);
	const [creatingNewItem, setCreatingNewItem] = useState(false);
	const [itemName, setItemName] = useState("");
	const [itemPrice, setItemPrice] = useState();
	const [itemImageURL, setItemImageURL] = useState(null);
	const [imageUploadLoading, setImageUploadLoading] = useState(false);
	const [imageValue, setImageValue] = useState();
	const [tags, setTags] = useState([]);
	const [error, setError] = useState("")
	const { currentUser } = useAuth();
	let uid = "no user";
	let shopId = "";

	useEffect(() => {
		axios
			.get(process.env.REACT_APP_BACKEND_IP + "get/item/" + shop)
			.then((response) => {
				setItemsData(response.data)
				console.log(response.data)
			})
			.catch((error) => {
				console.log(error.response.status);
			});
	}, []);

	idData && (shopId = idData.uid);

	async function creatingNewItemStateChange() {
		setCreatingNewItem(!creatingNewItem);
	}

	const newItemHandler = async (e) => {
		e.preventDefault();
		setItemPrice(parseInt(itemPrice, 10));
		const item = {
			itemName: itemName,
			itemPrice: itemPrice,
			itemImageURL: itemImageURL,
			shopName: shop,
			createdAt: Date.now(),
			staffId: idData.uid,
			tags: tags,
		};
		axios
			.post(process.env.REACT_APP_BACKEND_IP + "post/newitem", item)
			.then((response) => {
				setItemName("");
				setItemPrice("");
				return setImageValue("");
			})
			.catch((error) => {
				console.log(error.response.status);
				if (error.response.status === 409) {
					return setError(
						`error"`
					);
				}
			});
	};

	const onFileChange = async (e) => {
		setImageUploadLoading(true);
		const file = e.target.files[0];
		const storageRef = app.storage().ref();
		const fileRef = storageRef.child(file.name);
		await fileRef
			.put(file)
			.then(async () => {
				setItemImageURL(await fileRef.getDownloadURL());
				console.log(e.target.value);
			})
			.finally(() => {
				setImageUploadLoading(false);
			});
		console.log(itemImageURL);
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
									Item Tags: &nbsp;
									<input
										required
										type="text"
										value={tags}
										onChange={(e) =>
											setTags(e.target.value)
										}
									/>
								</label>
								<br />
								<label>
									Item Image: &nbsp;
									<input
										required
										type="file"
										value={imageValue}
										onChange={onFileChange}
									/>
								</label>
								{imageUploadLoading ? (
									<div className="loader" />
								) : (
									<button type="submit">Create</button>
								)}
							</form>
							<button onClick={creatingNewItemStateChange}>
								Cancel
							</button>
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
				{error}
			</div>
		</div>
	);
}
