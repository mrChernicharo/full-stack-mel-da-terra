import { BaseSyntheticEvent, useContext } from "react";
import { Link } from "react-router-dom";
import "firebaseui/dist/firebaseui.css";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const { signIn } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleSubmit = async (e: BaseSyntheticEvent) => {
    e.preventDefault();

    const [email, password] = [e.target[0].value, e.target[1].value];

    signIn(email, password)
      .then((success) => {
        setTimeout(() => navigate("/"), 1000);
      })
      .catch((err) => {
        alert(err);
      });
  };

  return (
    <div className="page-container">
      <h1>Login</h1>

      <form onSubmit={handleSubmit}>
        <label>Email</label>
        <input type="email" required lang="pt-BR" />

        <label>Senha</label>
        <input type="password" required lang="pt-BR" />
        <button type="submit">Ok!</button>
      </form>

      <Link to="/register">Criar conta</Link>
    </div>
  );
};
