import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { useAuth } from "../context/AuthenticationContext";
import "../css/Loader.css";


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
			<button onClick={() => handleSignIn(googleProvider)}>Google</button>
			{loading && <div className="loader" />}
		</div>
	);
}
