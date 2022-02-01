import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../hooks/AuthContext";

const s: any = {
  container: {
    position: "fixed",
    color: "white",
  },
};

export const Header = () => {
  const { user, signOut } = useContext(AuthContext);

  const [username, setUsername] = useState<string | null>(null);

  const handleLogout = () => {
    signOut();
  };

  useEffect(() => {
    console.log({ headerUser: user });
    setUsername(user?.displayName || user?.email || null);
  }, [user]);

  return (
    <header style={s.container}>
      <Link to="/" onClick={handleLogout}>
        Logout
      </Link>

      <span>{username}</span>
    </header>
  );
};
