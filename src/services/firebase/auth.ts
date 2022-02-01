import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";

export const fireAuth = getAuth();

export const authStateSubscription = () => {
  onAuthStateChanged(fireAuth, (user) => {
    if (user) {
      console.log(user);
      const uid = user.uid;
      // ...
    } else {
      console.log("user signed out");
      // User is signed out
      // ...
    }
  });
};

export const firebaseCreateAccountWithEmailAndPassword = async (email: string, password: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(fireAuth, email, password);

    return userCredential;
  } catch (err) {
    console.log(err);
  }
};

export const firebaseSignInWithEmailAndPassword = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(fireAuth, email, password);

    return userCredential;
  } catch (err) {
    console.log(err);
  }
};

export const firebaseSignOut = async () => {
  try {
    await signOut(fireAuth);

    console.log("Logged out!");
  } catch (err) {
    console.log(err);
  }
};
