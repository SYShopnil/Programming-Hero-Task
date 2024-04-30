import { ICommonReturnData } from "@src/types/common";

export interface IProduct {
  productId: string;
  image: string;
  name: string;
  price: string;
  desc: string;
  category: string;
}

export interface IGetAllProductsReturn extends ICommonReturnData {
  payload: {
    products: IProduct[];
    totalPage: string;
    currentPage: number;
  };
}
export interface IGetIndividualProductByIdReturn extends ICommonReturnData {
  payload: {
    product: IProduct | null;
  };
}