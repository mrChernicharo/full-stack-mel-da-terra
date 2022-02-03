import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import { IAppUser } from "../../contexts/AuthContext";

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
    console.log("New account created", userCredential.user.email);

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
