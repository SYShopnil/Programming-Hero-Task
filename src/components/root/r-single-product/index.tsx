import { Button } from "../button";
import { BtnColorSchema } from "@src/types/root";
import Image from "next/image";
import { EDataTestId } from "@src/types/common";
import { IRSingleProduct } from "@src/types/root/r-single-product";

export async function RSingleProduct({
  requestFetchForSingleProduct,
}: IRSingleProduct) {
  const {
    payload: { product },
  } = await requestFetchForSingleProduct;
  return (
    <>
      {product ? (
        <div
          data-testid={EDataTestId.RSingleProduct}
          className={`grid grid-cols-12 gap-2 px-[1.5rem]`}
        >
          <div
            className={`col-span-12 lg:col-span-5 flex justify-center items-center`}
          >
            <Image
              alt={product.name}
              src={product.image}
              placeholder="blur"
              blurDataURL="/assert/blur-demo-product.jpg"
              width={350}
              height={500}
            />
          </div>
          <div
            className={`col-span-12 lg:col-span-7 flex  justify-center items-center`}
          >
            <div className={`space-y-3  text-center lg:text-left`}>
              <p className={`text-sm font-semibold`}>
                Product ID: {product.productId}
              </p>
              <p className={`text-xl font-extrabold font-[#7F4D4F]`}>
                Name: {product.name}
              </p>
              <p className={`text-lg font-bold  `}>Price: {product.price}</p>
              <p className={`text-[1rem] font-light  `}>
                Category: {product.category}
              </p>
              <p className={`text-[0.8rem] font-light  `}>
                Description: {product.desc}
              </p>
              <div
                className={`flex justify-center  lg:justify-start items-center lg:items-start`}
              >
                <Button
                  btnText="Add To Cart"
                  colorSchema={BtnColorSchema.SolidBgGrayTextViolet}
                  isArrow={false}
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>No Product found</div>
      )}
    </>
  );
}
