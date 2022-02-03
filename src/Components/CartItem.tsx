import { IProduct } from "../interfaces/product";

const s = {
  container: {
    display: "flex",
    border: "1px solid",
    padding: ".5rem",
  },
};

interface ICartItemProps {
  product: IProduct;
  quantity: number;
}

export const CartItem = ({ product, quantity }: ICartItemProps) => {
  const { id, nome, pote, imgPath, valor } = product;

  return (
    <div style={s.container}>
      <div>{nome}</div>
      <div style={{ color: "orangered", paddingInline: 10 }}>{quantity}</div>
      <div style={{ color: "goldenrod" }}>R${(valor / 100) * quantity}</div>
    </div>
  );
};
