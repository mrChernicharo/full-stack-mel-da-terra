import { nanoid } from "nanoid";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { IOrderItem } from "../interfaces/order";
import { IProduct } from "../interfaces/product";

interface IOrdersContextProviderProps {
  children: ReactNode;
}

export interface IOrdersContext {
  orderItems: IOrderItem[];
  addToCart: (item: IOrderItem) => void;
}

const OrdersContext = createContext({
  orderItems: [] as IOrderItem[],
  addToCart: (item: IOrderItem) => {},
});

export const OrdersContextProvider = ({ children }: IOrdersContextProviderProps) => {
  const [orderItems, setOrderItems] = useState<IOrderItem[]>([]);

  const addToCart = (item: IOrderItem) => {
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
