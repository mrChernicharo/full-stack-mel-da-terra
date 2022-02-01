import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { Header } from "./Components/Header";
import { OrdersContextProvider } from "./hooks/OrdersContext";
import { Home } from "./Pages/Home";
import { Login } from "./Pages/Login";
import { NotFound } from "./Pages/NotFound";
import { Register } from "./Pages/Register";

function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route
          path="/"
          element={
            <OrdersContextProvider>
              <Home />
            </OrdersContextProvider>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
