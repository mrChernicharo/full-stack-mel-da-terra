import { getDocData } from "./firebase/firestore";

export const fetchAllProducts = async () => {
  let data;

  if (!!localStorage.getItem("products")) {
    data = await JSON.parse(<string>localStorage.getItem("products"));
  } 
  else {
    const response = await fetch("http://localhost:3333/products");
    data = await response.json();

    localStorage.setItem("products", JSON.stringify(data));
  }

  return data;
};

export const getProduct = async (docId: string) => {
  const docData = await getDocData("products", docId);
  return docData;
};
