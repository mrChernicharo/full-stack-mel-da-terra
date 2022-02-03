import { nanoid } from "nanoid";
import { useEffect, useState } from "react";
import { useOrdersContext } from "../hooks/OrdersContext";
import { CartItem } from "./CartItem";

export const Cart = () => {
  const { orderItems, addToCart } = useOrdersContext();

  const handleClick = () => {};

  return (
    <div>
      <h2>Sacola</h2>
      <ul>
        {orderItems.map((item) => (
          <li key={nanoid()}>
            <CartItem product={item.product} quantity={item.quantity} />
          </li>
        ))}
      </ul>
    </div>
  );
};
