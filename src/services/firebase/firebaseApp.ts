import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCYPBOpicp_S2yQVZbTx8RyWMceNyiVtIk",
  authDomain: "full-stack-mel-da-terra.firebaseapp.com",
  projectId: "full-stack-mel-da-terra",
  storageBucket: "full-stack-mel-da-terra.appspot.com",
  messagingSenderId: "243460467374",
  appId: "1:243460467374:web:84fe332b4131fb73609b3f",
};

export const firebaseApp = initializeApp(firebaseConfig);
