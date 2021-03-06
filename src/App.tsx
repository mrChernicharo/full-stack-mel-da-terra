import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { Header } from "./Components/Header";
import { OrdersContextProvider } from "./contexts/OrdersContext";
import { PurchaseResult } from "./Pages/PurchaseResult";
import { Home } from "./Pages/Home";
import { Login } from "./Pages/Login";
import { NotFound } from "./Pages/NotFound";
import { Register } from "./Pages/Register";

function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Home />} />
        <Route path="/stripe-checkout-result" element={<PurchaseResult />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
