import React, { useState } from "react";

import { firestore } from "../firebase";
import { useAuth } from "../context/AuthenticationContext";

export default function Home() {
	const messagesRef = firestore.collection("messages");
	const [value, setValue] = useState("");
	const { currentUser, logout } = useAuth();
	currentUser && console.log(currentUser);

	async function AddMessage(e) {
		e.preventDefault();
		console.log("a");

		await messagesRef.add({
			text: value,
		});
	}

	async function HandleLogout(e) {
		e.preventDefault();
		await logout();
	}

	return (
		<div className="App">
			<header className="App-header">
				<img src={currentUser.photoURL} alt="Google Profile" />
				<form onSubmit={AddMessage}>
					<label>
						Your Message: &nbsp;
						<input
							type="text"
							value={value}
							onChange={(e) => setValue(e.target.value)}
						/>
					</label>
					<input type="submit" name="Submit" />
					<button onClick={HandleLogout}>log out</button>
				</form>
			</header>
		</div>
	);
}
