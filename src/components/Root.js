import React from "react";
import { useHistory } from "react-router";

import { googleProvider } from "../context/authMethods";
import socialMediaAuth from "../socialMediaAuth";

export default function Root() {
	const history = useHistory();

	function handleClick() {
		history.push("/home");
	}

	const handleSignIn = async (provider) => {
		const res = await socialMediaAuth(provider)
		console.log(res);
		history.push("/home")
		
	};

	return (
		<div>
			<button onClick={() => handleSignIn(googleProvider)}>Google</button>
		</div>
	);
}
