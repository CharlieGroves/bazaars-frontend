import React, { useEffect, useRef, useState } from "react";
import { firestore } from "../firebase";
import { useAuth } from "../context/AuthenticationContext";
import {
	useDocumentData,
} from "react-firebase-hooks/firestore";
import axios from "axios";

// import css files
import "../css/Home.css";
import "../css/Buttons.css";
import "../css/Dropdown.css";

// import custom made components
import ArrowDown from "./icons/ArrowDown";
import ShopListItem from "./ShopListItem";
import NewShopLabel from "./NewShopLabel";
import DefaultButton from "./DefaultButton";

export default function Home() {
	// define variables to be assigned values dynamically later
	let uid;
	let userRef;

	// define constants used the Home function
	const [shopName, setShopName] = useState("");
	const [shopDescription, setShopDescription] = useState("");
	const [creatingNewShop, setCreatingNewShop] = useState(false);
	const [dropdownVisible, setDropdownVisible] = useState(false);
	const [error, setError] = useState("");
	const dropdownRef = useRef(null);
	const { currentUser, logout } = useAuth();

	// once currentUser loads
	if (currentUser) {
		// extract the uid from currentUser
		currentUser && (uid = currentUser.uid);
		// create a database reference for the currentUser
		currentUser && (userRef = firestore.collection("users").doc(uid));
	}

	// Get information on currentUser's shops from database
	// Get information on currentUser from database
	const [userData] = useDocumentData(userRef);

	const [shops, setShops] = useState()

	useEffect(() => {
		axios
			.get(process.env.REACT_APP_BACKEND_IP + "get/shop/id/" + uid)
			.then((response) => {
				setShops(response.data)
			})
			.catch((error) => {
				console.log(error.response.status);
			});
	}, []);


	const newShopHandler = async (e) => {
		e.preventDefault();
		setError("");
		const shop = {
			shop_name: shopName,
			owner_id: uid,
			shop_description: shopDescription,
			createdAt: Date.now(),
		};
		axios
			.post(process.env.REACT_APP_BACKEND_IP + "post/newshop", shop)
			.then((response) => {
				setShopName("");
				setShopDescription("");
				return newShopClickHandler();
			})
			.catch((error) => {
				console.log(error.response.status);
				if (error.response.status === 409) {
					return setError(
						`You already have shop with name "${shopName}"`
					);
				}
			});
	};

	const newShopClickHandler = () => {
		setCreatingNewShop(!creatingNewShop);
	};

	const handleLogout = async (e) => {
		e.preventDefault();
		await logout();
	};

	const onDropdownClick = () => {
		setDropdownVisible(!dropdownVisible);
	};

	return (
		<div className="home-container">
			<div className="menu-container">
				<div className="dropdown flex-space-between">
					<div />
					<button onClick={onDropdownClick} className="menu-trigger">
						<img
							className="google-profile-photo"
							src={currentUser.photoURL}
							alt="User Avatar"
							referrerPolicy="no-referrer"
						/>
						<span>
							<ArrowDown />
						</span>
					</button>
				</div>
				<div className="dropdown-container">
					<nav
						ref={dropdownRef}
						className={`menu ${
							dropdownVisible ? "active" : "inactive"
						}`}
					>
						<ul>
							<li>
								<a href="/manage-account">Manage Account</a>
							</li>
							<li>
								<a onClick={handleLogout}>Log out</a>
							</li>
						</ul>
					</nav>
				</div>
			</div>
			{creatingNewShop ? (
				<div className="creating-new-shop-container">
					<div className="creating-new-shop-title title">
						Creating new shop
					</div>
					<form
						// className="creating-new-shop-form"
						onSubmit={newShopHandler}
					>
						<NewShopLabel
							childClassName="form-label"
							stateValue={shopName}
							setStateValue={setShopName}
							subTitle="Name"
							type="text"
						/>
						<NewShopLabel
							stateValue={shopDescription}
							setStateValue={setShopDescription}
							subTitle="Description"
							type="text"
						/>
						<button
							className="creating-new-shop-submit shop-button"
							type="submit"
						>
							Create
						</button>
					</form>
					{error}
					<br />
					<button
						className="creating-new-shop-cancel cancel-button"
						onClick={newShopClickHandler}
					>
						Cancel
					</button>
				</div>
			) : (
				<div>
					<div className="title-and-create-new-shop-container">
						<div className="title">Shops</div>
						<DefaultButton
							text="make new shop"
							childClassName="shop-button"
							childOnClick={newShopClickHandler}
						/>
					</div>
					<div className="shops-container">
						{shops &&
							shops.map((shop, index) => (
								<ShopListItem
									key={index}
									shop={shop}
									userData={userData}
								/>
							))}
					</div>
				</div>
			)}
			<br />
		</div>
	);
}
