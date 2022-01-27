import { useState } from "react";

const s = {
  app: {
    background: "black",
    color: "white",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  },
};

function App() {
  const [count, setCount] = useState(0);

  return <div style={s.app}>hello mel</div>;
}

export default App;
