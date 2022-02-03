import { User } from "firebase/auth";
import { useAuthContext } from "../../contexts/AuthContext";
import { IOrder, IOrderItem } from "../../interfaces/order";

export const startCheckoutSession = async (orderItems: IOrderItem[], user: User) => {
  if (!user) return alert("login first!");

  const jwt = await user.getIdToken();
  const order: IOrder = orderItems.map((item) => ({ productId: item.product.id, quantity: item.quantity }));

  console.log({ jwt, orderItems, order });

  const response = await fetch("http://localhost:9000/checkout", {
    method: "POST",
    mode: "cors",
    body: JSON.stringify(order),
    headers: [
      ["Authorization", jwt],
      ["Content-Type", "application/json"],
    ],
  });

  const data = await response.json();

  console.log(data);
};
