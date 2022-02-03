import { nanoid } from "nanoid";
import { useEffect, useState } from "react";
import { useOrdersContext } from "../hooks/OrdersContext";
import { CartItem } from "./CartItem";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { startCheckoutSession } from "../services/stripe/checkout";
import { useAuthContext } from "../hooks/AuthContext";

export const Cart = () => {
  const { user } = useAuthContext();
  const { orderItems } = useOrdersContext();

  const goToCheckout = () => {
    startCheckoutSession(orderItems, user);
  };

  return (
    <div style={{ border: "1px solid", padding: ".5rem" }}>
      <h2>Sacola</h2>
      <button onClick={goToCheckout}>
        <FaShoppingCart />
      </button>
      <ul>
        {orderItems.map((item) => (
          <li key={nanoid()}>
            <CartItem item={item} />
          </li>
        ))}
      </ul>
    </div>
  );
};
