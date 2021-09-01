import React, { useState } from "react";
import { useHistory } from "react-router";
import "../css/Loader.css";
import "../css/Root.css";
import GoogleButton from "react-google-button";

import { googleProvider } from "../context/authMethods";
import socialMediaAuth from "../socialMediaAuth";

export default function Root() {
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
		<div>
			{loading ? (
				<div className="loader" />
			) : (
				<GoogleButton
					className="google-login-button"
					onClick={() => handleSignIn(googleProvider)}
				/>
			)}
		</div>
	);
}
