import React, { useState } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import GoogleButton from "react-google-button";

import { googleProvider } from "../context/authMethods";
import socialMediaAuth from "../socialMediaAuth";
import SignInWithGoogleButton from "./SignInWithGoogleButton";

import "../css/Buttons.css";
import "../css/Loader.css";
import "../css/SignIn.css";

export default function Welcome() {
	const history = useHistory();
	const [loading, setLoading] = useState(false);
	return (
		<div className="welcome-container">
            
			<SignInWithGoogleButton
				loading={loading}
				setLoading={setLoading}
				socialMediaAuth={socialMediaAuth}
				history={history}
				GoogleButton={GoogleButton}
				googleProvider={googleProvider}
			/>
			<Link to="signin">Sign In </Link>
			Welcome
		</div>
	);
}
