import React from "react";

export default function SignInWithGoogleButton(props) {

    const {loading, setLoading, socialMediaAuth, history, GoogleButton, googleProvider} = props;

    const handleSignIn = async (provider) => {
		setLoading(true);
		const res = await socialMediaAuth(provider);
		console.log(res);
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
