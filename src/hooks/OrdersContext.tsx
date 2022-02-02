import { nanoid } from "nanoid";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { IProduct } from "../interfaces/product";

interface IOrdersContextProviderProps {
  children: ReactNode;
}

const OrdersContext = createContext({
  val: 0,
  sumVal: () => {},
});

export const OrdersContextProvider = ({ children }: IOrdersContextProviderProps) => {
  const [val, setVal] = useState(0);

  const sumVal = () => {
    setVal((v) => v + 1);
  };

  const context = {
    val,
    sumVal,
  };

  return <OrdersContext.Provider value={context}>{children}</OrdersContext.Provider>;
};

export const useOrdersContext = () => {
  return useContext(OrdersContext);
};
