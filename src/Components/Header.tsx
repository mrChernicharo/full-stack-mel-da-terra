import { Link } from "react-router-dom";

const s = {
  container: {
    position: "fixed",
  },
};

export const Header = () => {
  return (
    <header style={s.container}>
      <Link to="/">Logout</Link>
    </header>
  );
};
