import { IProduct } from "./product";

export interface IOrderItem {
  product: IProduct;
  quantity: number;
}

export type IOrder = { productId: string; quantity: number }[];
