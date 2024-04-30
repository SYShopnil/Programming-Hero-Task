import { IGetIndividualProductByIdReturn } from "@src/types/lib/product-handler";

export interface IRSingleProduct {
  requestFetchForSingleProduct: Promise<IGetIndividualProductByIdReturn>;
}
