import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { Header } from "./Components/Header";
import { OrdersContextProvider } from "./contexts/OrdersContext";
import { PurchaseResult } from "./Pages/PurchaseResult";
import { Home } from "./Pages/Home";
import { Login } from "./Pages/Login";
import { NotFound } from "./Pages/NotFound";
import { Register } from "./Pages/Register";
import { useAuthContext } from "./contexts/AuthContext";
import { Profile } from "./Pages/Profile";

function App() {
  const { user } = useAuthContext();

  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/stripe-checkout-result" element={<PurchaseResult />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
