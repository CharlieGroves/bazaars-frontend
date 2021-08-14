import React, { useContext, useState, useEffect } from "react";
import { auth } from "../firebase";

// Setting up a context to access current user anywhere in the child components of the app
const AuthenticationContext = React.createContext();

// Custom hook so that AuthenticationContext only ever needs to be accessed in this file,
// but the value of AuthenticationContext can be accessed anywhere
export function useAuth() {
	return useContext(AuthenticationContext);
}

export function AuthenticationProvider({ children }) {
	const [currentUser, setCurrentUser] = useState();
	const [loading, setLoading] = useState(true);

	async function signup(email, password) {
		return await auth.createUserWithEmailAndPassword(email, password);
	}

	async function login(email, password) {
		return await auth.signInWithEmailAndPassword(email, password);
	}

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged((user) => {
			setCurrentUser(user);
		});

		return unsubscribe;
	}, []);

	// An array of functions and values to return in the AuthenticationContext.Provider.
	// It is an array so I can return more than one function/value.
	const values = [currentUser, signup, login, logout];

	return (
		<AuthenticationContext.Provider value={values}>
			{children}
		</AuthenticationContext.Provider>
	);
}
