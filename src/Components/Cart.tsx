import { useEffect, useState } from "react";
import { useOrdersContext } from "../hooks/OrdersContext";

export const Cart = () => {
  const { val, sumVal } = useOrdersContext();

  const handleClick = () => {
    sumVal();
  };

  return (
    <div>
      <h2>Sacola</h2>
      <button onClick={handleClick}>click</button>
      <ul>
        {val}
        {/* {cart.map((item) => {
          <li key={item.id}>
            <div>{item.product.nome}</div>
            <div>{item.quantity}</div>
          </li>;
        })} */}
      </ul>
    </div>
  );
};
