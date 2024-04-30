import { IGetAllProductsReturn } from "@src/types/lib/product-handler";

export interface ISProductSection {
  requestForGetAllProduct: Promise<IGetAllProductsReturn>;
}
