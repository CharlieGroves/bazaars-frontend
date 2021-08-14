import firebase from 'firebase/app';
import 'firebase/auth';

// Log into the firebase account so I have access to 
// auth and firestore
const app = firebase.initializeApp({
    apiKey: 'AIzaSyD3MqTazEE9VFiFoXJXB6ibG3yL3fiOAJk',
    authDomain: 'shop-builder-dev.firebaseapp.com',
    projectId: 'shop-builder-dev',
    storageBucket: 'shop-builder-dev.appspot.com',
    messagingSenderId: '198650430257',
    appId: '1:198650430257:web:a6170b3dbbac3acc83a610'
});

// Initialize and export firebase auth
export const auth = app.auth();

// Initialize and export firestore
export const firestore = firebase.firestore();

// Export the initialized app
export default app; 