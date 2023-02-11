import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";
import { FirebaseAuth } from "./config";

const googleProvider = new GoogleAuthProvider();

export const singnInWithGoogle = async ()=>{
    try {
        const resp = await signInWithPopup(FirebaseAuth,googleProvider);
        // accessToken
        // const credentials = GoogleAuthProvider.credentialFromResult( result );
        const { displayName, email, photoURL, uid } = resp.user;
        return {
            ok: true,
            displayName, email, photoURL, uid
        }
    } catch (error) {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        // const email = error.customData.email;
        // The AuthCredential type that was used.
        // const credential = GoogleAuthProvider.credentialFromError(error);
        return {
            ok: false,
            errorCode,
            errorMessage
        }
    } 
}

export const registerUserWithEmailPassword = async ({ email, password, displayName }) => {
    try {
        const resp = await createUserWithEmailAndPassword(FirebaseAuth,email,password);
        const { photoURL, uid } = resp.user;
        // ACTUALIZAR EL displayName
        await updateProfile( FirebaseAuth.currentUser, {
            displayName
        });
        return {
            ok: true,
            displayName,
            email,
            photoURL,
            uid
        }
    } catch (error) {
        // REVISAR ERRORES
        // const errorCode = error.code;
        // const errorMessage = error.message;
        let errorMessage = '';
        if ( error.code === 'auth/email-already-in-use' ) {
            errorMessage = 'El usuario ya existe.';
        }
        return {
            ok: false,
            errorMessage
        }
    }
}

export const loginWithEmailPassword = async ({ email, password }) => {
    try {
        const resp = await signInWithEmailAndPassword(FirebaseAuth,email,password);
        const { displayName, photoURL, uid } = resp.user;
        return {
            ok: true,
            displayName,
            email,
            photoURL,
            uid
        }
    } catch (error) {
        let errorMessage = '';
        if ( error.code === 'auth/user-not-found' ) {
            errorMessage = 'El usuario no existe.';
        }
        return {
            ok: false,
            errorMessage
        }
    }
}

export const logoutFirebase = async() => {
    return await FirebaseAuth.signOut();
}