import { User as FirebaseUser } from "firebase/auth";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import {
  authStateSubscription,
  firebaseCreateAccountWithEmailAndPassword,
  firebaseSignInWithEmailAndPassword,
  firebaseSignOut,
} from "../services/firebase/auth";

export type IAppUser = FirebaseUser | null;
export interface IAuthContext {
  user: IAppUser | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}
interface IAuthContextProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext<IAuthContext>({
  user: null,
  signIn: (email: string, password: string) => new Promise(() => {}),
  signUp: (email: string, password: string) => new Promise(() => {}),
  signOut: () => new Promise(() => {}),
});

export const AuthContextProvider = ({ children }: IAuthContextProviderProps) => {
  const [user, setUser] = useState<IAppUser>(null);

  const signIn = async (email: string, password: string) => {
    firebaseSignInWithEmailAndPassword(email, password).then((credential) => {
      if (credential) setUser((u) => credential.user);
    });
  };

  const signUp = async (email: string, password: string) => {
    firebaseCreateAccountWithEmailAndPassword(email, password).then((credential) => {
      if (credential) setUser((u) => credential.user);
    });
  };

  const signOut = async () => {
    await firebaseSignOut();
    setUser((u) => null);
  };

  useEffect(() => {
    const unsubscribe = authStateSubscription(setUser);

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    console.log({ user });
  }, [user]);

  const context: IAuthContext = {
    user,
    signIn,
    signUp,
    signOut,
  };

  return <AuthContext.Provider value={context}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};
