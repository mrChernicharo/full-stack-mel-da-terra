import { BaseSyntheticEvent } from "react";

export const Register = () => {
  const handleSubmit = async (e: BaseSyntheticEvent) => {
    e.preventDefault();
    console.log({ e, target: e.target, email: e.target[0].value, password: e.target[1].value });

    const [email, password] = [e.target[0].value, e.target[1].value];
  };
  return (
    <div className="page-container">
      <h1>Register</h1>

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
