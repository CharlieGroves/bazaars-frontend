import React, { useState } from "react";
import { useHistory } from "react-router";
import GoogleButton from "react-google-button";

import "../css/Loader.css";
import "../css/SignIn.css";

import { googleProvider } from "../context/authMethods";
import socialMediaAuth from "../socialMediaAuth";

export default function SignIn() {
	const history = useHistory();
	const [loading, setLoading] = useState(false);

	const handleSignIn = async (provider) => {
		setLoading(true);
		const res = await socialMediaAuth(provider);
		console.log(res);
		setLoading(false);
		history.push("/home");
	};

	return (
		<div className="google-login-button-container">
			<div className="google-login-button">
				{loading ? (
					<div className="loader" />
				) : (
					<GoogleButton
						onClick={() => handleSignIn(googleProvider)}
					/>
				)}
			</div>
		</div>
	);
}
