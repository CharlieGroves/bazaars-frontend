import React, { useEffect, useState } from "react";
import { firestore } from "../firebase";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { useAuth } from "../context/AuthenticationContext";
import { Select } from "react-functional-select";
import axios from "axios";

import app from "../firebase";
import "../css/Shop.css";
import "../css/Loader.css";
import "../css/Form.css";
import "../css/Buttons.css";
import ShopItem from "./shopItem";

export default function Shop({
	match: {
		params: { seller, shop },
	},
}) {
	const categories = [
		"Books",
		"Clothing, Shoes & Accessories",
		"Computers/Tablets & Networking",
		"Consumer Electronics",
		"Craft",
		"Garden",
		"Home",
		"Pets",
		"Toys",
	];

	let categoriesList = [];
	categories.forEach(function (element) {
		categoriesList.push({ label: element, value: element });
	});

	const idRef = firestore.collection("urls").doc(seller);

	const [itemsData, setItemsData] = useState();
	const [idData] = useDocumentData(idRef);
	const [creatingNewItem, setCreatingNewItem] = useState(false);
	const [itemName, setItemName] = useState("");
	const [itemPrice, setItemPrice] = useState();
	const [itemImageURL, setItemImageURL] = useState(null);
	const [imageUploadLoading, setImageUploadLoading] = useState(false);
	const [imageValue, setImageValue] = useState();
	const [tags, setTags] = useState([]);
	const [error, setError] = useState("");
	const [selectedCategory, setSelectedCategory] = useState("");
	const [isImageValid, setIsImageValid] = useState(true);
	const { currentUser } = useAuth();
	let uid = "no user";
	let shopId = "";

	useEffect(() => {
		axios
			.get(process.env.REACT_APP_BACKEND_IP + "get/item/" + shop)
			.then((response) => {
				setItemsData(response.data);
			})
			.catch((error) => {
				console.log(error.response.status);
			});
	}, []);

	idData && (shopId = idData.uid);

	function creatingNewItemStateChange() {
		setCreatingNewItem(!creatingNewItem);
		setError("");
	}

	const newItemHandler = async (e) => {
		e.preventDefault();
		if (!isImageValid) {
			return setError(
				"Please choose another file with either png or jpg file extension"
			);
		}
		setItemPrice(parseInt(itemPrice, 10));
		const item = {
			itemName: itemName,
			itemPrice: itemPrice,
			itemImageURL: itemImageURL,
			shopName: shop,
			createdAt: Date.now(),
			staffId: idData.uid,
			sellerId: currentUser.uid,
			tags: tags,
			category: selectedCategory,
		};
		axios
			.post(process.env.REACT_APP_BACKEND_IP + "post/newitem", item)
			.then((response) => {
				setItemName("");
				setItemPrice("");
				setTags([]);
				setSelectedCategory("");
				return setImageValue("");
			})
			.catch((error) => {
				console.log(error.response.status);
				if (error.response.status === 409) {
					return setError(`error"`);
				}
			});
	};

	const onFileChange = async (e) => {
		setImageUploadLoading(true);
		const file = e.target.files[0];
		const storageRef = app.storage().ref();
		const fileRef = storageRef.child(file.name);
		console.log(file.name);
		let fileExtension = file.name.split(".").pop();
		if ((fileExtension !== "png", "jpg")) {
			setImageUploadLoading(false);
			setItemImageURL("");
			setImageValue();
			setIsImageValid(false);
			return setError("not a valid file format, please use png or jpg");
		}
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
					<div className="ml-3">hello seller</div>

					{creatingNewItem ? (
						<div className="ml-3">
							<form onSubmit={newItemHandler}>
								<label className="shop-label">
									Item Name: &nbsp;
									<input
										required
										type="text"
										value={itemName}
										onChange={(e) =>
											setItemName(e.target.value)
										}
										className="shop-input"
									/>
								</label>
								<br />
								<label className="shop-label">
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
										className="shop-input"
									/>
								</label>
								<br />

								<label className="shop-label">
									Item Tags: &nbsp;
									<input
										required
										type="text"
										value={tags}
										onChange={(e) =>
											setTags(e.target.value)
										}
										className="shop-input"
									/>
								</label>
								<br />
								<label
									className="shop-label"
									htmlFor="Category"
								>
									Category:
									<div className="select-container">
										<Select
											required
											className="ml-4 mr-4 select"
											options={categoriesList}
											onOptionChange={(e) =>
												setSelectedCategory(e.label)
											}
										/>
									</div>
								</label>
								<br />
								<label className="shop-label">
									Item Image: &nbsp;
									<input
										required
										type="file"
										value={imageValue}
										onChange={onFileChange}
									/>
								</label>
								<br />
								{error}
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
			<ShopItem itemsData={itemsData} />
		</div>
	);
}
