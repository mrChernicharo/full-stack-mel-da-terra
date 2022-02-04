import { useGetQueryParam } from "../hooks/useGetQueryParam";

type PurchaseResult = "success" | "canceled";

export const Checkout = () => {
  const purchaseResult = useGetQueryParam("purchaseResult") as PurchaseResult;

  return (
    <div className="page-container">
      <h1>Checkout</h1>
      {purchaseResult}
    </div>
  );
};
