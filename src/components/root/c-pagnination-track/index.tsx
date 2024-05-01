"use client";

import { EDataTestId } from "@src/types/common";
import { ICPaginationTrack } from "@src/types/root/c-pagnination-track";
import React from "react";

export const CPaginationTrack = ({
  pageHandler,
  currentPage,
  totalPage,
}: ICPaginationTrack) => {
  //have to show total needed page as linkable option
  const catchNeedTotalPageNumberAsArray = new Array(totalPage).fill("");
  return (
    <div
      data-testid={EDataTestId.CPaginationTrack}
      className={`flex space-x-2`}
    >
      {catchNeedTotalPageNumberAsArray.map((_, ind) => {
        const trackIndex = ++ind;
        const activeBg = currentPage == trackIndex && "!bg-[#E0E3EA]";
        const activeText = currentPage == trackIndex && " !text-[#7F4D4F]";
        return (
          <div
            className={`cursor-pointer ${activeBg} duration-[0.2s] h-[2rem] w-[2rem]  bg-[#7F4D4F] hover:bg-[#E0E3EA] flex justify-center items-center`}
            key={ind}
            onClick={() => pageHandler(trackIndex.toString())}
          >
            <span
              className={` ${activeText} duration-[0.2s]  text-white hover:text-[#7F4D4F]  font-bold text-lg`}
            >
              {trackIndex}
            </span>
          </div>
        );
      })}
    </div>
  );
};
