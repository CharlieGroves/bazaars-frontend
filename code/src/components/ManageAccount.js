import React from "react";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { useAuth } from "../context/AuthenticationContext";
import { firestore } from "../firebase";
import "../css/Titles.css";

export default function ManageAccount() {
	const { currentUser } = useAuth();
	const accountRef = firestore.collection("users").doc(currentUser.uid);
	const [accountInformation] = useDocumentData(accountRef);
	currentUser && console.log(currentUser);
	accountInformation && console.log(accountInformation);
	return <div className="title">Manage Account:</div>;
}
