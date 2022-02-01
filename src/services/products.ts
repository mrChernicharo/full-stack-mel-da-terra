import { getDocData } from "./firebase/firestore";

export const fetchAllProducts = async () => {
  const response = await fetch("http://localhost:9000/products");
  const data = await response.json();
  return data;
};

export const getProduct = async (docId: string) => {
  const docData = await getDocData("products", docId);
  return docData;
};
