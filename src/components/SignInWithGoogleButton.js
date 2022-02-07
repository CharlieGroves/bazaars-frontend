import React, { useState } from "react";
import { firestore } from "../firebase";
import axios from "axios";
import "../css/Google.css";

export default function SignInWithGoogleButton(props) {
	const {
		loading,
		setLoading,
		socialMediaAuth,
		history,
		GoogleButton,
		googleProvider,
	} = props;

	const urlsRef = firestore.collection("urls");

	const [error, setError] = useState("");

	const handleSignIn = async (provider) => {
		setLoading(true);
		const res = await socialMediaAuth(provider);
		const { uid, displayName, photoURL } = res;
		const urlsDocRef = firestore.collection("urls").doc(displayName);
		const userDocRef = firestore.collection("users").doc(uid);
		userDocRef.get().then(async (docSnapshot) => {
			if (docSnapshot.exists) {
				return;
			} else {
				// user doesn't exist yet
				// create user document

				const user = {
					id: uid,
					username: displayName,
					url: displayName,
					admin: false,
					photoURL: photoURL,
					shoppingCart: [],
					createdAt: Date.now(),
				};
				console.log(user);

				axios
					.post(
						process.env.REACT_APP_BACKEND_IP + "post/newuser",
						user
					)
					.then(() => {
						urlsDocRef.get().then(async (docSnapshot) => {
							if (docSnapshot.exists) {
								// if someone with same username exists, make the new user's
								// url to be their uid which is unique
								await urlsRef.doc(uid).set({
									url: uid,
									uid: uid,
								});
							} else {
								// if this is the first user with this username, make the new
								// user's url to be their name
								await urlsRef.doc(displayName).set({
									url: displayName,
									uid: uid,
								});
							}
						});
					})
					.catch((error) => {
						//console.log(error.response.status);
						// if (error.response.status === 409) {
						// 	return setError(`error`);
						// }
					});
			}
		});
		// no longer loading
		setLoading(false);

		// once logged in, redirect user to their homepage
		history.push("/home");
	};
	return (
		<div className="google-login-button">
			{loading ? (
				<div className="loader" />
			) : (
				<GoogleButton onClick={() => handleSignIn(googleProvider)} />
			)}
			{error}
		</div>
	);
}
