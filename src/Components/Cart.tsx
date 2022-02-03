import { nanoid } from "nanoid";
import { useEffect, useState } from "react";
import { useOrdersContext } from "../hooks/OrdersContext";
import { CartItem } from "./CartItem";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";

export const Cart = () => {
  const { orderItems, addToCart } = useOrdersContext();

  const handleClick = () => {};

  return (
    <div style={{ border: "1px solid", padding: ".5rem" }}>
      <h2>Sacola</h2>
      <Link to="/checkout">
        <button>
          <FaShoppingCart />
        </button>
      </Link>
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
