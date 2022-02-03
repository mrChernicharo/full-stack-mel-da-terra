import { useContext, useState } from "react";
import { IProduct } from "../interfaces/product";
import { FaPlusCircle, FaMinusCircle } from "react-icons/fa";
import { useOrdersContext } from "../contexts/OrdersContext";

const s: { [key: string]: {} } = {
  modalContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    position: "fixed",
    top: "50%",
    left: "50%",
    textAlign: "center",
    background: "#232323",
    padding: "1.5rem",
    borderRadius: 12,
    minWidth: 260,
    height: 200,
    zIndex: 10,
    transform: "translate(-50%, -50%)",
  },
  quantitySelector: {
    width: 120,
    background: "#686868",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: ".2rem",
    paddingInline: ".2rem",
    borderRadius: 10,
  },
  overlay: {
    position: "fixed",
    background: "#a7a7a7",
    opacity: 0.4,
    height: "200vh",
    width: "100vw",
    zIndex: 1,
  },
};

interface IProductDetailProps {
  product: IProduct;
  onClose: () => void;
}

export const ProductDetailModal = ({ product, onClose }: IProductDetailProps) => {
  const { addToCart } = useOrdersContext();

  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    addToCart({ product, quantity });
  };

  const handleChangeQuantity = (action: "+" | "-") => {
    const actions = {
      "-": () => (quantity > 1 ? setQuantity(quantity - 1) : null),
      "+": () => setQuantity(quantity + 1),
    };

    actions[action]();
  };

  return (
    <>
      <div style={s.modalContainer}>
        <h1>{product.nome}</h1>

        <div style={s.quantitySelector}>
          <span onClick={() => handleChangeQuantity("-")}>
            <FaMinusCircle />
          </span>
          <span>{quantity}</span>
          <span onClick={() => handleChangeQuantity("+")}>
            <FaPlusCircle />
          </span>
        </div>

        <h3>R${(product.valor * quantity) / 100}</h3>

        <button onClick={handleAddToCart}>Botar na Sacola</button>
      </div>
      <div style={s.overlay} onClick={onClose}></div>
    </>
  );
};
