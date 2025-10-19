import {createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth";
import {auth} from "./firebaseClient";

export const doCreateUserWithEmailAndPassword = async (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
}

// TODO
// export const signInWithGoogle = async () => {
//     const provider = new GoogleAuthProvider();
//     const result = await signInWithPopup(auth, provider);
//
//     // save result.user to firestore?
//
//     return result;
// }

export const doSignInWithEmailAndPassword = async (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
}

export const doSignOut = () => {
    return auth.signOut();
}

// TODO
// export const doPasswordReset = (email) => {
//     return sendPasswordResetEmail(auth, email);
// }
//
// export const doPasswordChange = (password) => {
//     return updatePassword(auth.currentUser, password);
// }
//
// export const doSendEmailVerification = () => {
//     return sendEmailVerification(auth.currentUser, {
//         url: `${window.location.origin}/home`,
//     });
// }
