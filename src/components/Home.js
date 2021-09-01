import React, { useState } from "react";
import { firestore } from "../firebase";
import { useAuth } from "../context/AuthenticationContext";
import {
	useCollectionData,
	useDocumentData,
} from "react-firebase-hooks/firestore";
import { Link } from "react-router-dom";

export default function Home() {
	let uid;
	let userRef;
	let shopsRef;
	const [shopName, setShopName] = useState("");
	const [creatingNewShop, setCreatingNewShop] = useState(false);
	const { currentUser, logout } = useAuth();
	currentUser && (uid = currentUser.uid);
	currentUser && (userRef = firestore.collection("users").doc(uid));
	currentUser && (shopsRef = userRef.collection("shops"));
	console.log(uid);
	currentUser && console.log(currentUser.photoURL);
	// currentUser && console.log(photoURL)
	const [userData] = useDocumentData(userRef);
	const [shops] = useCollectionData(shopsRef);

	userData && console.log(userData.shops);

	const newShopHandler = async (e) => {
		e.preventDefault();
		await shopsRef.doc(shopName).set({
			name: shopName,
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
		<div className="App">
			<header className="App-header">
				<img src={currentUser.photoURL} alt="Google Profile" />
				<div className="flex-grid-master">
					{shops &&
						shops.map((shop, index) => (
							<Link
								to={`/seller/${currentUser.uid}/${shop.name}`}
								key={index}
							>
								<div>{shop.name}</div>
								<div>{shop.description}</div>
							</Link>
						))}
					<button onClick={newShopClickHandler}>
						Make a new shop
					</button>
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
									onChange={(e) =>
										setShopName(e.target.value)
									}
								/>
							</label>
							<button type="submit">Create</button>
						</form>
					</div>
				)}
				<br />
				<button onClick={HandleLogout}>log out</button>
			</header>
		</div>
	);
}
