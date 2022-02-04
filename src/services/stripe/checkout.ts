import { IAppUser, useAuthContext } from "../../contexts/AuthContext";
import { CheckoutSession } from "../../interfaces/checkoutSession";
import { IOrder, IOrderItem } from "../../interfaces/order";

declare const Stripe: any;

export const startCheckoutSession = async (orderItems: IOrderItem[], user: IAppUser) => {
  if (!user) return alert("login first!");

  const jwt = await user.getIdToken();
  const order: IOrder = orderItems.map((item) => ({ productId: item.product.id, quantity: item.quantity }));

  const response = await fetch("http://localhost:9000/checkout", {
    method: "POST",
    mode: "cors",
    body: JSON.stringify({ order, callbackUrl: buildCallbackUrl() }),
    headers: [
      ["Authorization", jwt],
      ["Content-Type", "application/json"],
    ],
  });

  const session = await response.json();

  redirectToCheckout(session);
};

const buildCallbackUrl = () => {
  const protocol = window.location.protocol,
    hostname = window.location.hostname,
    port = window.location.port;

  let callbackUrl = `${protocol}//${hostname}`;

  if (port) callbackUrl += ":" + port;

  callbackUrl += "/stripe-checkout-result";

  return callbackUrl;
};

export const redirectToCheckout = (session: CheckoutSession) => {
  const stripe = Stripe(session.stripePublicKey);

  stripe.redirectToCheckout({
    sessionId: session.stripeCheckoutSessionId,
  });
};
