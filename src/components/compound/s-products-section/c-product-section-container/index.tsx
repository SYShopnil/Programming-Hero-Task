"use client";

import React, { useState } from "react";
import { CProductSearch } from "./c-product-search";
import { CProductShow } from "./c-product-show";
import { CPaginationTrack } from "@src/components/root/c-pagnination-track";
import { useQuery } from "@tanstack/react-query";
import { getAllProducts } from "@root/lib/product-handler";
import { configProductDataLimit } from "@root/config";

export const CProductSectionContainer = () => {
  const [currentPage, setCurrentPage] = useState<string>("1");
  const { data: responseProduct } = useQuery({
    queryKey: ["get-all-products", currentPage],
    queryFn: () =>
      getAllProducts({
        currentPage: currentPage,
        dataLimit: configProductDataLimit,
      }),
    staleTime: 10 * 1000,
  });
  if (responseProduct) {
    const {
      payload: { currentPage, products, totalPage },
    } = responseProduct;

    const pageHandler = (value: string) => {
      setCurrentPage(value);
      return +value;
    };
    return (
      <>
        <CProductSearch />

        {/* dynamically show all products */}
        <CProductShow products={products} />
        <div className="p-[2rem]">
          <CPaginationTrack
            pageHandler={pageHandler}
            totalPage={+totalPage}
            currentPage={currentPage}
          />
        </div>
      </>
    );
  } else {
    return <div>No Product found</div>;
  }
};
