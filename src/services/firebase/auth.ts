import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";

export const authStateSubscription = () => {
  onAuthStateChanged(getAuth(), (user) => {
    if (user) {
      console.log(user);
      const uid = user.uid;
    } else {
      console.log("user signed out");
    }
  });
};

export const firebaseCreateAccountWithEmailAndPassword = async (email: string, password: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(getAuth(), email, password);

    return userCredential;
  } catch (err) {
    console.log(err);
  }
};

export const firebaseSignInWithEmailAndPassword = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(getAuth(), email, password);

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
