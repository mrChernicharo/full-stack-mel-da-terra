import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { FaArrowLeft } from "react-icons/fa";
import { defaultImgUrl } from "../services/firebase/auth";

const s: { [key: string]: {} } = {
  container: {
    position: "fixed",
    width: "100%",
    color: "white",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: "1px solid white",
  },
  userData: {
    display: "flex",
    alignItems: "center",
  },
  avatar: {
    height: 32,
    width: 32,
    marginLeft: 6,
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

      <div style={s.userData}>
        <span>{username}</span>

        <Link to="/profile">
          <img style={s.avatar} src={user?.photoURL || defaultImgUrl} />
        </Link>
      </div>

      <Link to="/">
        <FaArrowLeft />
      </Link>
    </header>
  );
};
