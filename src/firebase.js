import firebase from "firebase/app";
import "firebase/auth";
import "firebase/storage";

// Log into the firebase account so I have access to
// auth and firestore
const app = firebase.initializeApp({
	apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
	authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
	projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
	storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
	messageSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
	appId: process.env.REACT_APP_FIREBASE_APP_ID,
});

// Initialize and export firebase auth
export const auth = app.auth();

// Initialize and export firestore
export const firestore = firebase.firestore();

// Export the initialized app
export default app;

console.log(process.env.REACT_APP_PORT)
