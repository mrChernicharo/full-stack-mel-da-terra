import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import { DocumentReference, getDoc, setDoc, collection, doc } from "firebase/firestore";
import { IAppUser } from "../../contexts/AuthContext";
import { db } from "./firestore";

export const defaultImgUrl = "https://avatar-management--avatars.us-west-2.prod.public.atl-paas.net/default-avatar.png";

export const fireAuthStateSubscription = (setUser: (user: IAppUser) => void) => {
  return onAuthStateChanged(getAuth(), (user) => {
    if (user) {
      const uid = user.uid;
      console.log({ user, uid });
      setUser(user);
    } else {
      console.log("user signed out");
    }
  });
};

export const firebaseCreateAccountWithEmailAndPassword = async (email: string, password: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(getAuth(), email, password);
    console.log("New account created", userCredential);

    const userId = userCredential.user.uid;

    // Create firestore user...
    await setDoc(doc(db, `users`, userId), {
      email: userCredential.user.email,
      img: userCredential.user.photoURL || defaultImgUrl,
    });

    return userCredential;
  } catch (err) {
    console.log(err);
  }
};

export const firebaseSignInWithEmailAndPassword = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(getAuth(), email, password);
    console.log("Login successful", userCredential.user.email);

    return userCredential;
  } catch (err) {
    console.log(err);
  }
};

export const firebaseSignOut = async () => {
  try {
    const fireAuth = getAuth();

    await signOut(fireAuth);

    console.log("Logged out!");
  } catch (err) {
    console.log(err);
  }
};
