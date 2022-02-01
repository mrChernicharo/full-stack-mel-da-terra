export type IPote = "780" | "480" | "350" | "150" | "kit";

export interface IProduct {
  id: string;
  nome: string;
  pote: IPote;
  valor: number;
  imgPath: string;
}
