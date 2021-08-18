import React, { useState } from "react";
import { firestore } from "../firebase";
import { googleProvider } from "../context/authMethods";

import { useAuth } from "../context/AuthenticationContext";
import socialMediaAuth from "../socialMediaAuth";

export default function Home() {
	const messagesRef = firestore.collection("messages");
	const [value, setValue] = useState("");
	const { currentUser } = useAuth();
	currentUser && console.log(currentUser);

	async function AddMessage(e) {
		e.preventDefault();
		console.log("a");

		await messagesRef.add({
			text: value,
		});
	}

	const handleOnClick = async (provider) => {
		const res = await socialMediaAuth(provider);
		console.log(res);
	};

	return (
		<div className="App">
			<header className="App-header">
				<button onClick={() => handleOnClick(googleProvider)}>
					Google
				</button>
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
				</form>
			</header>
		</div>
	);
}
