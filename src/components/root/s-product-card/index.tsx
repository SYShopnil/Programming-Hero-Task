import { BtnColorSchema } from "@src/types/root";
import { CRedirectButton } from "../button";
import Image from "next/image";
import { EDataTestId } from "@src/types/common";
import { ISProductCard } from "@src/types/root/s-product-card";

export function SProductCard({
  desc,
  id: productId,
  image,
  name,
  price,
}: ISProductCard) {
  return (
    <div
      data-testid={EDataTestId.SProductCard}
      className={`max-h-[33rem] w-[18.75rem] text-center `}
    >
      <div className={`rounded-sm flex justify-center items-center`}>
        <Image
          alt={name}
          src={image}
          placeholder="blur"
          blurDataURL="/assert/blur-demo-product.jpg"
          priority
          height={350}
          width={300}
        />
      </div>
      <div className={`h-[11.125rem] `}>
        <p className="text-[#777777] font-bold text-lg">{name}</p>
        <p className="text-[#79494B] font-bold text-[1rem] line-clamp-4">
          {price}$
        </p>
        <p className={`text-[#777777] font-bold text-sm line-clamp-2 mb-4`}>
          {desc}
        </p>
        <div className="flex justify-center items-center">
          <CRedirectButton
            btnText="View Details"
            colorSchema={BtnColorSchema.SolidBgWhiteTextGreen}
            isArrow={false}
            isOpenNewTab={false}
            redirectLink={`/dashboard/products/${productId}`}
          />
        </div>
      </div>
    </div>
  );
}
