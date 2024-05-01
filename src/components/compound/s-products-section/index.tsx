import { getLoggedInUser } from "@root/lib/user-handler";
import { Button, SProductCard } from "@src/components/root";
import { CPaginationTrack } from "@src/components/root/c-pagnination-track";
import { CSearchBar } from "@src/components/root/search-bar";
import { BtnColorSchema } from "@src/types/root";
import { EDataTestId } from "@src/types/common";
import { ISProductSection } from "@src/types/compound/s-products-section";
import { CProductSearch } from "./c-product-section-container/c-product-search";
import { CProductShow } from "./c-product-section-container/c-product-show";
import { CProductSectionContainer } from "./c-product-section-container";
import { QueryClient, QueryFunction, dehydrate } from "@tanstack/query-core";
import { IGetAllProductsReturn } from "@src/types/lib/product-handler";
import { HydrationBoundary } from "@tanstack/react-query";

export async function SProductSection({
  requestForGetAllProduct,
}: ISProductSection) {
  const responseOfGetAllProducts = await requestForGetAllProduct;
  const {
    payload: { loggedInUser },
  } = await getLoggedInUser();

  // Define the function type for requestForGetAllProduct

  const queryClient = new QueryClient();

  // Define the function type for requestForGetAllProduct

  // Define a query function that conforms to the QueryFunction type
  const getAllProductsQueryFn: QueryFunction<
    IGetAllProductsReturn
  > = async () => {
    // Call the requestForGetAllProduct function here
    const data = await requestForGetAllProduct;
    return data;
  };

  // Your prefetching code
  await queryClient.prefetchQuery({
    queryKey: ["get-all-products"],
    queryFn: getAllProductsQueryFn,
  });

  return (
    <div data-testid={EDataTestId.SProductSection}>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <CProductSectionContainer />
      </HydrationBoundary>
    </div>
  );
}
