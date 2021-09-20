import React from "react";
import { firestore } from "../firebase";

export default function SignInWithGoogleButton(props) {
	const {
		loading,
		setLoading,
		socialMediaAuth,
		history,
		GoogleButton,
		googleProvider,
	} = props;

	const userRef = firestore.collection("users");
	const urlsRef = firestore.collection("urls");

	const handleSignIn = async (provider) => {
		setLoading(true);
		const res = await socialMediaAuth(provider);
		const { uid, displayName, photoURL } = res;
		const urlsDocRef = firestore.collection("urls").doc(displayName);
		const userDocRef = firestore.collection("users").doc(uid)
		userDocRef.get().then(async (docSnapshot) => {
			if (docSnapshot.exists) {
				return;
			} else {
				// user doesn't exist yet
				// create user document
				await userRef.doc(uid).set({
					username: displayName,
					id: uid,
					url: displayName,
					shops: [],
					admin: false,
					photoURL: photoURL,
				});
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
			}
		})
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
		</div>
	);
}
