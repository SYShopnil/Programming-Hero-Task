"use server";
import { ICommonReturnData } from "@src/types/common";
import {
  IGetAllProductsReturn,
  IGetIndividualProductByIdReturn,
  IProduct,
} from "@src/types/lib/product-handler";
import { promises as fs } from "fs";

interface paginationReturnInterface {
  dataLimit: number;
  skipData: number;
  totalPage: number;
}

interface IGetAllProducts {
  currentPage: string;
  dataLimit: number;
}

export const paginationHandler: (
  inputDataLimit: number,
  dataCollection: any,
  inputPageNo: string
) => paginationReturnInterface = (
  inputDataLimit,
  dataCollection,
  inputPageNo
) => {
  //if data limit has given from body then that will be apply otherwise global default data limit will b apply
  const limitData: number = inputDataLimit || 5;
  //get all data count
  const totalData: number = dataCollection.length;
  //if page number has given from body then that will be apply otherwise global default page number will b apply
  const pageNo: number = +inputPageNo ? +inputPageNo : 1;

  //this amount of data will be skip
  const skipData: number = pageNo * limitData - limitData;

  //total this amount of page we need
  const totalPage: number = Math.ceil(totalData / limitData);
  return {
    dataLimit: limitData,
    skipData,
    totalPage,
  };
};

export async function queryAllProductFromJson(): Promise<IProduct[]> {
  return new Promise(async (resolve) => {
    const parseProduct: IProduct[] = JSON.parse(
      await fs.readFile(process.cwd() + "/public/db/products.db.json", "utf8")
    );
    resolve(parseProduct);
  });
}

function getPaginationProductByApplyingSkipLimitData(
  products: IProduct[],
  dataLimit: number,
  skipData: number
): IProduct[] {
  /**
   *
   *  Just slice or cut data from  respective products
   *
   */
  const startIndex = skipData;
  const endIndex = skipData + dataLimit;
  return products.slice(startIndex, endIndex);
}

export async function getAllProducts({
  currentPage,
  dataLimit: limit,
}: IGetAllProducts): Promise<IGetAllProductsReturn> {
  try {
    const getAllProduct: IProduct[] = await queryAllProductFromJson();
    const { dataLimit, skipData, totalPage } = paginationHandler(
      limit,
      getAllProduct,
      currentPage
    );
    console.log({ dataLimit, skipData, totalPage });
    const getProductsAfterApplyingSkipAndLimitLogic: IProduct[] =
      getPaginationProductByApplyingSkipLimitData(
        getAllProduct,
        dataLimit,
        skipData
      );
    if (getProductsAfterApplyingSkipAndLimitLogic.length) {
      return {
        message: `${getAllProduct.length} products has found!!`,
        status: 202,
        payload: {
          products: getProductsAfterApplyingSkipAndLimitLogic,
          totalPage: totalPage.toFixed(),
          currentPage: +currentPage,
        },
      };
    } else {
      return {
        message: `No Product found!!!`,
        status: 404,
        payload: {
          products: getProductsAfterApplyingSkipAndLimitLogic,
          totalPage: totalPage.toFixed(),
          currentPage: 0,
        },
      };
    }
  } catch (err) {
    console.log(err);
    return {
      message: `Some things went wrong into product fetch`,
      status: 404,
      payload: {
        products: [],
        totalPage: "0",
        currentPage: 0,
      },
    };
  }
}

export async function getIndividualProductById(
  productId: string
): Promise<IGetIndividualProductByIdReturn> {
  try {
    const getAllProduct = await queryAllProductFromJson();
    if (getAllProduct.length) {
      const searchProductFromList = getAllProduct.find(
        (product) => product.productId == productId
      );
      if (searchProductFromList) {
        return {
          message: `${searchProductFromList.name} has found!!!`,
          status: 202,
          payload: {
            product: searchProductFromList,
          },
        };
      } else {
        return {
          message: `No Product found`,
          status: 404,
          payload: {
            product: null,
          },
        };
      }
    } else {
      return {
        message: `No Product found`,
        status: 404,
        payload: {
          product: null,
        },
      };
    }
  } catch (err) {
    return {
      message: `Somethings went wrong`,
      status: 501,
      payload: {
        product: null,
      },
    };
  }
}
