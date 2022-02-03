import { nanoid } from "nanoid";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { IProduct } from "../interfaces/product";

interface IOrdersContextProviderProps {
  children: ReactNode;
}

export interface IOrdersContext {
  orderItems: any;
  addToCart: (item: any) => void;
}

const OrdersContext = createContext({
  orderItems: [],
  addToCart: (item: any) => {},
});

export const OrdersContextProvider = ({ children }: IOrdersContextProviderProps) => {
  const [orderItems, setOrderItems] = useState<any[]>([]);

  const addToCart = (item: any) => {
    console.log(item);
    setOrderItems((prev) => [...prev, item]);
  };

  const context: IOrdersContext = {
    orderItems,
    addToCart,
  };

  return <OrdersContext.Provider value={context}>{children}</OrdersContext.Provider>;
};

export const useOrdersContext = () => {
  return useContext(OrdersContext);
};
