import React from "react";
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

	currentUser && console.log(currentUser);
	accountInformation && console.log(accountInformation);

	const updateAccount = async () => {};

	return (
		<div className="manage-account-container">
			<div className="title">Manage Account:</div>
			<form onSubmit={updateAccount} className="update-account-form">
			<label className="form-label shop-name-label">
							<div className="title-smaller">Name: &nbsp;</div>
							<input
								className="form-input"
								required
								type="text"
								// value={shopName}
								// onChange={(e) => setShopName(e.target.value)}
							/>
						</label>
				<button type="submit" className="shop-button">
					Update
				</button>
			</form>
		</div>
	);
}
