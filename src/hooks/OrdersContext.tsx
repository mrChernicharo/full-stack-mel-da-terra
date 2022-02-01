import { nanoid } from "nanoid";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { IProduct } from "../interfaces/product";

export type IOrderItem = { id: string; product: IProduct; quantity: number };

export type IOrder = IOrderItem[];

export interface IOrdersContext {
  cart: IOrder;
  previousOrders: IOrder[];
  addToCart: (product: IProduct, quantity: number) => void;
  removeFromCart: (id: string) => void;
}

interface IOrdersContextProviderProps {
  children: ReactNode;
}

const OrdersContext = createContext({
  cart: [] as IOrder,
  previousOrders: [] as IOrder[],
  addToCart: (product: IProduct, quantity: number) => {},
  removeFromCart: (id: string) => {},
});

export const OrdersContextProvider = ({ children }: IOrdersContextProviderProps) => {
  const [cart, setCart] = useState<IOrder>([]);
  const [previousOrders, setPreviousOrders] = useState<IOrder[]>([]);

  const addToCart = (product: IProduct, quantity: number) => {
    const id = nanoid(12);
    const item: IOrderItem = { id, product, quantity };
    setCart((items) => [item, ...items]);
  };

  const removeFromCart = (id: string) => {};

  const context: IOrdersContext = {
    cart,
    previousOrders,
    addToCart,
    removeFromCart,
  };

  //   useEffect(() => {
  //     console.log(cart);
  //   }, [cart]);

  return <OrdersContext.Provider value={context}>{children}</OrdersContext.Provider>;
};

export const useOrdersContext = () => {
  return useContext(OrdersContext);
};
