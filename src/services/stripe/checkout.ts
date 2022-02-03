import { useAuthContext } from "../../hooks/AuthContext";

export const startCheckoutSession = async (order, user) => {
  if (!user) throw new Error("login first!");

  const jwt = await user.getIdToken();

  console.log({ jwt, order });

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
