import React from "react";
import { useAuth } from "../context/AuthenticationContext";
import { firestore } from "../firebase";

export default function SignInWithGoogleButton(props) {

    const {loading, setLoading, socialMediaAuth, history, GoogleButton, googleProvider} = props;
	const userRef = firestore.collection("users")
	const currentUser = useAuth();

    const handleSignIn = async (provider) => {
		setLoading(true);
		const res = await socialMediaAuth(provider);
		console.log(res);
		const { uid, displayName, photoURL } = currentUser;
		await userRef.doc(displayName).set({
			username: displayName,
			id: uid,
			url: displayName,
			shops: [],
			admin: false,
			photoURL: photoURL,
		});
		setLoading(false);
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
