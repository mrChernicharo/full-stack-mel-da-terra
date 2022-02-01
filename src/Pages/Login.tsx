import { Link } from "react-router-dom";
import "firebaseui/dist/firebaseui.css";

export const Login = () => {
  return (
    <div className="page-container">
      <h1>Login</h1>

      <Link to="/register">Criar conta</Link>
    </div>
  );
};

// const onLoginSuccessful = (result: string) => {
//   console.log(result);
// };

// const uiConfig = {
//   signInOptions: [
//     fireAuth.GoogleAuthProvider.PROVIDER_ID,
//     fireAuth.EmailAuthProvider.PROVIDER_ID,
//   ],
//   callbacks: {
//     signInSuccessWithAuthResult: onLoginSuccessful,
//   },
// };
// const ui = firebaseui.auth.AuthUI(fireAuth.getAuth());
