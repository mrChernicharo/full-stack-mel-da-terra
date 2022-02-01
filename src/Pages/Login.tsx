// import * as fireAuth from "firebase/auth";
// import * as firebaseui from "firebaseui";
// import "firebaseui/dist/firebaseui.css";
import { Link } from "react-router-dom";

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
