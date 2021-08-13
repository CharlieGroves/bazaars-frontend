import firebase from 'firebase/app';
import 'firebase/auth';
import 'dotenv';

const app = firebase.initializeApp({
    apiKey: 'AIzaSyD3MqTazEE9VFiFoXJXB6ibG3yL3fiOAJk',
    authDomain: 'shop-builder-dev.firebaseapp.com',
    projectId: 'shop-builder-dev',
    storageBucket: 'shop-builder-dev.appspot.com',
    messagingSenderId: '198650430257',
    appId: '1:198650430257:web:a6170b3dbbac3acc83a610'
});

export const auth = app.auth();
export default app; 