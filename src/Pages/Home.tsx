import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getDocData } from "../services/firebase/firestore";
import { fetchAllProducts, getProduct } from "../services/products";

export const Home = () => {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    fetchAllProducts().then((prods) => setProducts(prods));

    // getProduct("mlU1nbnueP3wTtN4wt90").then((prod) => console.log(prod));
  }, []);

  return (
    <div className="page-container">
      <h1>Hello Mel</h1>

      <Link to="/login">Login</Link>

      <ul>
        {products.map((prod) => (
          <li key={prod.id}>
            <div>
              <div>{prod.nome}</div>
              <div>R${prod.valor / 100}</div>
              <img src={prod.imgPath} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
