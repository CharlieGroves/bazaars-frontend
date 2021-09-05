import React, { useState } from "react";
import { firestore } from "../firebase";
import { useAuth } from "../context/AuthenticationContext";
import {
	useCollectionData,
	useDocumentData,
} from "react-firebase-hooks/firestore";
import { Link } from "react-router-dom";
import "../css/Home.css";

export default function Home() {
	let uid;
	let userRef;
	let shopsRef;

	const [shopName, setShopName] = useState("");
	const [shopDescription, setShopDescription] = useState("");
	const [creatingNewShop, setCreatingNewShop] = useState(false);
	const { currentUser, logout } = useAuth();

	currentUser && (uid = currentUser.uid);
	currentUser && (userRef = firestore.collection("users").doc(uid));
	currentUser && (shopsRef = userRef.collection("shops"));

	const [userData] = useDocumentData(userRef);
	const [shops] = useCollectionData(shopsRef);

	const newShopHandler = async (e) => {
		e.preventDefault();
		await shopsRef.doc(shopName).set({
			name: shopName,
			description: shopDescription,
		});
		setShopName("");
	};

	function newShopClickHandler() {
		setCreatingNewShop(true);
	}

	async function HandleLogout(e) {
		e.preventDefault();
		await logout();
	}

	return (
		<div className="home-container">
			<img
				className="google-profile-photo"
				src={currentUser.photoURL}
				alt="Google Profile"
			/>
			<div className="flex-grid-master">
				Shops: &nbsp;
				<div className="shops-container">
					{shops &&
						shops.map((shop, index) => (
							<div className="shops" key={index}>
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
							</div>
						))}
				</div>
				<button onClick={newShopClickHandler}>Make a new shop</button>
			</div>
			{creatingNewShop && (
				<div>
					<div>Creating new shop</div>
					<form onSubmit={newShopHandler}>
						<label>
							Shop Name: &nbsp;
							<input
								type="text"
								value={shopName}
								onChange={(e) => setShopName(e.target.value)}
							/>
						</label>
						<br />
						<label>
							Shop Name: &nbsp;
							<input
								type="text"
								value={shopDescription}
								onChange={(e) =>
									setShopDescription(e.target.value)
								}
							/>
						</label>
						<button type="submit">Create</button>
					</form>
				</div>
			)}
			<br />
			<button onClick={HandleLogout}>log out</button>
		</div>
	);
}
