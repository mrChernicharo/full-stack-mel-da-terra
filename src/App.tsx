import { useEffect, useState } from "react";

const s = {
  app: {
    background: "black",
    color: "white",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  },
};

function App() {
  const [products, setProducts] = useState<any[]>([]);

  const fetchProducts = async () => {
    const response = await fetch("http://localhost:9000/products");
    const data = await response.json();
    setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div style={s.app}>
      <h1>hello mel</h1>
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
}

export default App;
