import { useEffect, useState } from "react";
import { IOrderItem, useOrdersContext } from "../hooks/OrdersContext";

export const Cart = () => {
  const [items, setItems] = useState<IOrderItem[]>([]);

  const { cart } = useOrdersContext();

  useEffect(() => {
    setItems((its) => cart.map((item) => item));

    return () => {};
  }, [cart]);

  useEffect(() => {
    console.log(items);
  }, [items]);

  return (
    <div>
      <h2>Sacola</h2>
      <ul>
        {items.map((item) => {
          <li key={item.id}>
            <div>{item.product.nome}</div>
            <div>{item.quantity}</div>
          </li>;
        })}
      </ul>
    </div>
  );
};
