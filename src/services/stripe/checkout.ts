import { User } from "firebase/auth";
import { IAppUser, useAuthContext } from "../../contexts/AuthContext";
import { IOrder, IOrderItem } from "../../interfaces/order";

export const startCheckoutSession = async (orderItems: IOrderItem[], user: IAppUser) => {
  if (!user) return alert("login first!");

  const jwt = await user.getIdToken();
  const order: IOrder = orderItems.map((item) => ({ productId: item.product.id, quantity: item.quantity }));

  console.log({ jwt, orderItems, order });

  const response = await fetch("http://localhost:9000/checkout", {
    method: "POST",
    mode: "cors",
    body: JSON.stringify({ order, callbackUrl: buildCallbackUrl() }),
    headers: [
      ["Authorization", jwt],
      ["Content-Type", "application/json"],
    ],
  });

  const data = await response.json();

  console.log(data);
};

const buildCallbackUrl = () => {
  const protocol = window.location.protocol,
    hostname = window.location.hostname,
    port = window.location.port;

  let callbackUrl = `${protocol}//${hostname}`;

  if (port) callbackUrl += ":" + port;

  callbackUrl += "/stripe-checkout";

  return callbackUrl;
};
