import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";

const auth = getAuth();

export const firebaseCreateAccountWithEmailAndPassword = async (email: string, password: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);

    console.log(userCredential);
  } catch (err) {
    console.log(err);
  }
};

export const firebaseSignInWithEmailAndPassword = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);

    console.log(userCredential);
  } catch (err) {
    console.log(err);
  }
};

export const firebaseSignOut = async () => {
  try {
    await signOut(auth);

    console.log("Logged out!");
  } catch (err) {
    console.log(err);
  }
};
