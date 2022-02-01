import { useEffect } from "react";
import { Link } from "react-router-dom";
import { firebaseSignOut } from "../services/firebase/auth";

const s: any = {
  container: {
    position: "fixed",
  },
};

export const Header = () => {
  const handleLogout = () => {
    firebaseSignOut();
  };

  return (
    <header style={s.container}>
      <Link to="/" onClick={handleLogout}>
        Logout
      </Link>
    </header>
  );
};
