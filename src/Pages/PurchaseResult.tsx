import { useLocation, useNavigate } from "react-router-dom";
import { useGetQueryParam } from "../hooks/useGetQueryParam";

type PurchaseResult = "success" | "failed";

const message = {
  success: "seu pedido foi efetuado com sucesso!",
  failed: "compra cancelada",
};

export const PurchaseResult = () => {
  const purchaseResult = useGetQueryParam("purchaseResult") as PurchaseResult;

  setTimeout(() => {
    location.assign("/");
  }, 1200);

  return (
    <div className="page-container">
      <h1>Checkout</h1>
      <span>{message[purchaseResult]}</span>
    </div>
  );
};
