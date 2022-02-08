import { useEffect, useState } from "react";
import { IProduct } from "../interfaces/product";
import { fetchAllProducts } from "../services/products";
import { ProductDetailModal } from "./ProductDetailModal";

const s: { [key: string]: {} } = {
  ul: {
    padding: ".5rem",
    border: "1px solid",
  },
  productCard: {
    background: "#787878",
    maxHeight: 140,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: ".5rem",
    margin: ".5rem",
    borderRadius: 6,
    cursor: "pointer",
  },
  cardTextWrapper: {
    // border: "1px solid",
    height: 60,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    padding: ".5rem",
    fontWeight: 700,
  },
  img: {
    maxHeight: 100,
  },
};

export const ProductsList = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null);
  //   const [modalShown, setModalShown] = useState<boolean>(false);

  const handleProductClick = (prod: IProduct) => {
    setSelectedProduct(prod);
  };

  const handleModalClose = () => {
    setSelectedProduct(null);
  };

  useEffect(() => {
    fetchAllProducts().then((prods) => setProducts(prods));
    // getProduct("mlU1nbnueP3wTtN4wt90").then((prod) => console.log(prod));
  }, []);

  return (
    <>
      <ul style={s.ul}>
        <h3>Produtos</h3>
        {products
          .sort((a, b) => a.pote - b.pote)
          .map((prod) => (
            <li key={prod.id} onClick={() => handleProductClick(prod)}>
              <div style={s.productCard}>
                <div style={s.cardTextWrapper}>
                  <div>{prod.nome}</div>
                  <div>R${prod.valor / 100}</div>
                </div>

                <img style={s.img} src={prod.imgPath} />
              </div>
            </li>
          ))}
      </ul>
      {selectedProduct && <ProductDetailModal product={selectedProduct} onClose={handleModalClose} />}
    </>
  );
};
