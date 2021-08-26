import React, { useState } from "react";
import "../css/Flex.css";
import { firestore } from "../firebase";
import { useAuth } from "../context/AuthenticationContext";
import {
	useCollectionData,
	useDocumentData,
} from "react-firebase-hooks/firestore";

export default function Home() {
	const messagesRef = firestore.collection("messages");
	let uid;
	const [shopName, setShopName] = useState("");
	const [creatingNewShop, setCreatingNewShop] = useState(false);
	const { currentUser, logout } = useAuth();
	currentUser && (uid = currentUser.uid);
	const userRef = firestore.collection("users").doc(uid);
	const shopsRef = userRef.collection("shops");

	const [userData] = useDocumentData(userRef);
	const [shops] = useCollectionData(shopsRef);

	userData && console.log(userData.shops);

	function newShopHandler() {
		
	}

	function newShopClickHandler() {
		setCreatingNewShop(true);
	}

	// async function AddMessage(e) {
	// 	e.preventDefault();
	// 	console.log("a");

	// 	await messagesRef.add({
	// 		text: value,
	// 	});
	// }

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
							<div>
								<div>{shop.name}</div>
								<div>{shop.description}</div>
							</div>
						))}
					<button onClick={newShopClickHandler}>
						Make a new shop
					</button>
				</div>
				{creatingNewShop && (
					<div>
						<div>Creating new shop</div>
						<form onSubmit={newShopHandler}></form>
						<label>
						Shop Name: &nbsp;
						<input
							type="text"
							value={shopName}
							onChange={(e) => setShopName(e.target.value)}
						/>
					</label>
					<input type="submit" name="Submit" />
					</div>
				)}
				{/* <form onSubmit={AddMessage}>
					<label>
						Your Message: &nbsp;
						<input
							type="text"
							value={value}
							onChange={(e) => setValue(e.target.value)}
						/>
					</label>
					<input type="submit" name="Submit" />
				</form> */}
				<button onClick={HandleLogout}>log out</button>
			</header>
		</div>
	);
}
