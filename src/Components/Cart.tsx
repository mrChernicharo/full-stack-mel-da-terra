import { nanoid } from "nanoid";
import { useEffect, useState } from "react";
import { useOrdersContext } from "../contexts/OrdersContext";
import { CartItem } from "./CartItem";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { startCheckoutSession } from "../services/stripe/checkout";
import { useAuthContext } from "../contexts/AuthContext";

export const Cart = () => {
  const { user } = useAuthContext();
  const { orderItems } = useOrdersContext();

  const goToCheckout = () => {
    startCheckoutSession(orderItems, user);
  };

  return (
    <div style={{ border: "1px solid", padding: ".5rem" }}>
      <h2>Sacola</h2>

      <ul>
        {orderItems.map((item) => (
          <li key={nanoid()}>
            <CartItem item={item} />
          </li>
        ))}
      </ul>

      {!!orderItems.length && (
        <button onClick={goToCheckout}>
          <div>
            <span>Comprar! </span>
            <FaShoppingCart />
          </div>
        </button>
      )}
    </div>
  );
};
