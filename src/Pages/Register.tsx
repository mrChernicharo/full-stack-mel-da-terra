import { BaseSyntheticEvent, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

export const Register = () => {
  const { signUp } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleSubmit = async (e: BaseSyntheticEvent) => {
    e.preventDefault();
    console.log({ e, target: e.target, email: e.target[0].value, password: e.target[1].value });

    const [email, password] = [e.target[0].value, e.target[1].value];

    signUp(email, password)
      .then((success) => {
        setTimeout(() => navigate("/"), 1000);
      })
      .catch((err) => {
        alert(err);
      });
  };
  return (
    <div className="page-container">
      <h1>Register</h1>

      <form onSubmit={handleSubmit}>
        <label>Email</label>
        <input type="email" required />

        <label>Senha</label>
        <input type="password" required />
        <button type="submit">Ok!</button>
      </form>
    </div>
  );
};
