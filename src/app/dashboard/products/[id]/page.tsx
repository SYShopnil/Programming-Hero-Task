import { getIndividualProductById } from "@root/lib/product-handler";
import {
  CRedirectButton,
  RSingleProduct,
  SLoading,
} from "@src/components/root";
import { ISingleProductPage } from "@src/types/app/dashboard/products/[id]";
import { IGetIndividualProductByIdReturn } from "@src/types/lib/product-handler";
import { BtnColorSchema } from "@src/types/root";
import { Suspense } from "react";

export default function SingleProductPage({
  params: { id: productId },
}: ISingleProductPage) {
  const requestForGetProductDataById: Promise<IGetIndividualProductByIdReturn> =
    getIndividualProductById(productId);
  return (
    <section className={`grid grid-cols-12 pb-[3.25rem]`}>
      <div className={`col-span-8 lg:col-span-10`}></div>
      <div className={`flex justify-end items-end  col-span-4 lg:col-span-2`}>
        <CRedirectButton
          btnText="Back To Products"
          colorSchema={BtnColorSchema.SolidBgWhiteTextGreen}
          redirectLink="/dashboard/products"
          isArrow={false}
          isOpenNewTab={false}
        />
      </div>
      <div className={`col-span-12`}>
        <Suspense fallback={<SLoading text="Loading... Product" />}>
          <RSingleProduct
            requestFetchForSingleProduct={requestForGetProductDataById}
          />
        </Suspense>
      </div>
    </section>
  );
}
