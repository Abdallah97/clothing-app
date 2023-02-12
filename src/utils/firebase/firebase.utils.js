// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getAuth, signInWithPopup, GoogleAuthProvider, signInWithRedirect,createUserWithEmailAndPassword,signInWithEmailAndPassword } from "firebase/auth";

import {getDoc,setDoc,doc,getFirestore} from 'firebase/firestore';


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC7NY_f5esbEBhhlgB9ZJPai0_IRvfo-sY",
  authDomain: "crown-clothing-16db5.firebaseapp.com",
  projectId: "crown-clothing-16db5",
  storageBucket: "crown-clothing-16db5.appspot.com",
  messagingSenderId: "283788558193",
  appId: "1:283788558193:web:01cda406fb5d8b494540d0"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();


googleProvider.setCustomParameters({ prompt: 'select_account' });

export const auth = getAuth();

export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);

export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);

const db = getFirestore();

export const createUserProfileDocument = async (userAuth,additionalData={}) => {
 const userRef = doc(db, "users", userAuth.uid);

    const snapShot = await getDoc(userRef);

    console.log(snapShot.exists());

    if (!snapShot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userRef, {
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        } catch (error) {
            console.log('error creating user', error.message);
        }
    }

    return userRef;
}

export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;
  
    return await createUserWithEmailAndPassword(auth, email, password);
  };

  export const signInAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;
    return await signInWithEmailAndPassword(auth, email, password);
  };


export default firebaseApp;
