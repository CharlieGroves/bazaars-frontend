import React, { useState } from "react";
import { useDocumentData } from "react-firebase-hooks/firestore";

import { useAuth } from "../context/AuthenticationContext";
import { firestore } from "../firebase";

import "../css/Titles.css";
import "../css/Buttons.css";
import "../css/ManageAccount.css";

export default function ManageAccount() {
	const { currentUser } = useAuth();
	const accountRef = firestore.collection("users").doc(currentUser.uid);
	const [accountInformation] = useDocumentData(accountRef);

	const [username, setUsername] = useState("");
	const [url, setUrl] = useState("");

	currentUser && console.log(currentUser);
	accountInformation && console.log(accountInformation);

	const updateUsername = async (e) => {
		e.preventDefault();
		accountRef.set({
			username: username,
		});
	};

	const updateUrl = async (e) => {
		e.preventDefault();
		accountRef.set({
			url: url,
		});
	};

	return (
		<div>
			{accountInformation && (
				<div className="manage-account-container ml-2">
					<div className="title">Manage Account:</div>
					<form
						onSubmit={updateUsername}
						className="update-account-form"
					>
						<label className="form-label shop-name-label">
							<div className="title-smaller">
								Username: &nbsp;
							</div>
							<input
								className="input"
								value={username}
								onChange={(e) => setUsername(e.target.value)}
								required
								type="text"
								placeholder={accountInformation.username}
							/>
						</label>
						<button type="submit" className="shop-button mt-2">
							Update
						</button>
					</form>
					<form onSubmit={updateUrl} className="update-account-form">
						<label className="form-label shop-name-label">
							<div className="title-smaller">URL: &nbsp;</div>
							<input
								className="input"
								value={url}
								onChange={(e) => setUrl(e.target.value)}
								required
								type="text"
								placeholder={accountInformation.url}
							/>
						</label>
						<button type="submit" className="shop-button mt-2">
							Update
						</button>
					</form>
					{/* <label className="form-label shop-name-label">
					<div className="title-smaller">Name: &nbsp;</div>
					<input
						className="input"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						required
						type="text"
					/>
				</label> */}
				</div>
			)}
		</div>
	);
}
