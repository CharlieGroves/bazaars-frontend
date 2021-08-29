import { auth } from "./firebase";
import { useHistory } from "react-router";

const socialMediaAuth = (provider) => {
	return auth
		.signInWithPopup(provider)
		.then((res) => {
			return res.user;
		})
		.catch((err) => {
			return err;
		});
};

export default socialMediaAuth;
