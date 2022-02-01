import { BaseSyntheticEvent } from "react";
import { Link } from "react-router-dom";
import "firebaseui/dist/firebaseui.css";

import { firebaseSignInWithEmailAndPassword } from "../services/firebase/auth";

export const Login = () => {
  const handleSubmit = async (e: BaseSyntheticEvent) => {
    e.preventDefault();
    console.log({ e, target: e.target, email: e.target[0].value, password: e.target[1].value });

    const [email, password] = [e.target[0].value, e.target[1].value];

    firebaseSignInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const user = userCredential?.user;
      })
      .catch((error) => {
        console.log(error.code, error.message);
      });
  };

  return (
    <div className="page-container">
      <h1>Login</h1>

      <Link to="/register">Criar conta</Link>

      <form onSubmit={handleSubmit}>
        <label>Email</label>
        <input type="email" />

        <label>Senha</label>
        <input type="password" />
        <button type="submit">Ok!</button>
      </form>
    </div>
  );
};
