import { SProductCard } from "@src/components/root";
import { IProduct } from "@src/types/lib/product-handler";
import React from "react";

interface ICProductShow {
  products: IProduct[];
}

export const CProductShow = ({ products }: ICProductShow) => {
  return (
    <div
      className={`grid grid-cols-12 gap-2  mt-[5rem] pl-[2rem] place-content-center`}
    >
      {products.map((product) => {
        return (
          <div
            className="col-span-12  md:col-span-6  lg:col-span-4"
            key={product.productId}
          >
            <SProductCard
              desc={product.desc}
              id={product.productId}
              image={product.image}
              name={product.name}
              price={product.price}
            />
          </div>
        );
      })}
    </div>
  );
};
