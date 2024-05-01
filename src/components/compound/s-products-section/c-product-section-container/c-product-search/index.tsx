"use client";

import { Button } from "@src/components/root";
import { CSearchBar } from "@src/components/root/search-bar";
import { BtnColorSchema } from "@src/types/root";
import React from "react";

export const CProductSearch = () => {
  return (
    <div className={`flex justify-evenly items-start space-x-2 pl-[2rem]`}>
      <div className="flex-[1_1_50%]">
        <CSearchBar />
      </div>
      {/* only admin can see this button of add delete and update */}
      <>
        <div className="flex-[1_1_16%]">
          <Button
            btnText={"Add++"}
            isArrow={true}
            colorSchema={BtnColorSchema.SolidBgWhiteTextGreen}
          />
        </div>
        <div className="flex-[1_1_16%]">
          <Button
            btnText={"Update"}
            isArrow={true}
            colorSchema={BtnColorSchema.SolidBgVioletTextWhite}
          />
        </div>
        <div className="flex-[1_1_17%]">
          <Button
            btnText={"Delete--"}
            isArrow={true}
            colorSchema={BtnColorSchema.SolidBgGrayTextViolet}
          />
        </div>
      </>
    </div>
  );
};
