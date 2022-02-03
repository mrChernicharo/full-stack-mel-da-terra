import React from "react";
import ReactDOM from "react-dom";
import "./globals.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./contexts/AuthContext";
import { OrdersContextProvider } from "./contexts/OrdersContext";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <OrdersContextProvider>
          <App />
        </OrdersContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
