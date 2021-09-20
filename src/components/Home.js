import React, { useRef, useState } from "react";
import { firestore } from "../firebase";
import { useAuth } from "../context/AuthenticationContext";
import {
	useCollectionData,
	useDocumentData,
} from "react-firebase-hooks/firestore";

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
	let shopsRef;

	// define constants used the Home function
	const [shopName, setShopName] = useState("");
	const [shopDescription, setShopDescription] = useState("");
	const [creatingNewShop, setCreatingNewShop] = useState(false);
	const [dropdownVisible, setDropdownVisible] = useState(false);
	const dropdownRef = useRef(null);
	const { currentUser, logout } = useAuth();

	// once currentUser loads
	if (currentUser) {
		// extract the uid from currentUser
		currentUser && (uid = currentUser.uid);
		// create a database reference for the currentUser
		currentUser && (userRef = firestore.collection("users").doc(uid));
		// build on the userRef with a reference to their shops
		currentUser && (shopsRef = userRef.collection("shops"));
	}

	// Get information on currentUser's shops from database
	const [shops] = useCollectionData(shopsRef);
	// Get information on currentUser from database
	const [userData] = useDocumentData(userRef);

	const newShopHandler = async (e) => {
		e.preventDefault();
		await shopsRef.doc(shopName).set({
			name: shopName,
			description: shopDescription,
		});
		setShopName("");
		setShopDescription("");
		newShopClickHandler();
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
