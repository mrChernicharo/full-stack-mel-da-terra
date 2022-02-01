import { IProduct } from "../interfaces/product";

const s: { [key: string]: {} } = {
  modalContainer: {
    display: "block",
    position: "fixed",
    top: "50%",
    left: "50%",
    textAlign: "center",
    background: "#232323",
    width: 300,
    height: 200,
    zIndex: 10,
    transform: "translate(-50%, -50%)",
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
  return (
    <>
      <div style={s.modalContainer}>
        <h1>{product.nome}</h1>
        <h3>R${product.valor / 100}</h3>
        <button>Botar na Sacola</button>
      </div>
      <div style={s.overlay} onClick={onClose}></div>
    </>
  );
};
