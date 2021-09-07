import React, { useRef, useState } from "react";
import { firestore } from "../firebase";
import { useAuth } from "../context/AuthenticationContext";
import {
	useCollectionData,
	// useDocumentData,
} from "react-firebase-hooks/firestore";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import "../css/Home.css";
import "../css/Dropdown.css";

import ArrowDown from "./icons/ArrowDown";
import ArrowRight from "./icons/ArrowRight";

export default function Home() {
	let uid;
	let userRef;
	let shopsRef;

	const [shopName, setShopName] = useState("");
	const [shopDescription, setShopDescription] = useState("");
	const [creatingNewShop, setCreatingNewShop] = useState(false);
	const [dropdownVisible, setDropdownVisible] = useState(false);
	const dropdownRef = useRef(null);
	const history = useHistory();
	const { currentUser, logout } = useAuth();

	if (currentUser) {
		currentUser && (uid = currentUser.uid);
		currentUser && (userRef = firestore.collection("users").doc(uid));
		currentUser && (shopsRef = userRef.collection("shops"));
	}

	// const [userData] = useDocumentData(userRef);
	const [shops] = useCollectionData(shopsRef);

	const newShopHandler = async (e) => {
		e.preventDefault();
		await shopsRef.doc(shopName).set({
			name: shopName,
			description: shopDescription,
		});
		setShopName("");
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
								<a href="/manage">Manage Account</a>
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
					<div className="creating-new-shop-title title">Creating new shop</div>
					<form className="creating-new-shop-form" onSubmit={newShopHandler}>
						<label className="creating-new-shop-label shop-name-label">
							<div className="title-smaller">Name: &nbsp;</div>
							<input
								className="creating-new-shop-input"
								required
								type="text"
								value={shopName}
								onChange={(e) => setShopName(e.target.value)}
							/>
						</label>
						<br />
						<label className="creating-new-shop-label">
							<div className="title-smaller">Description: &nbsp;</div>
							<input
								required
								className="creating-new-shop-input"
								type="text"
								value={shopDescription}
								onChange={(e) =>
									setShopDescription(e.target.value)
								}
							/>
						</label>
						<br />
						<button className="creating-new-shop-submit shop-button" type="submit">Create</button>
					</form>
					<br />
					<button className="creating-new-shop-cancel cancel-button" onClick={newShopClickHandler}>Cancel</button>
				</div>
			) : (
				<div>
					<div className="title-and-create-new-shop-container">
						<div className="title">Shops</div>
						<button
							className="shop-button"
							onClick={newShopClickHandler}
						>
							Make new shop
						</button>
					</div>
					<div className="shops-container">
						{shops &&
							shops.map((shop, index) => (
								<div
									className="shop-container"
									onClick={() => {
										history.push(
											`/seller/${currentUser.uid}/${shop.name}`
										);
									}}
									key={index}
								>
									<div className="shop">
										<Link
											to={`/seller/${currentUser.uid}/${shop.name}`}
											className="shop-link"
										>
											<div className="shop-name">
												<b>{shop.name}</b>
											</div>
											<div className="shop-description">
												{shop.description}
											</div>
										</Link>
										<div className="arrow-right-container">
											<ArrowRight className="right-arrow" />
										</div>
									</div>
								</div>
							))}
					</div>
				</div>
			)}
			<br />
		</div>
	);
}