import React from "react";
import { ICtableRow, IField } from "@src/types/root/c-view-table-dynamic";
import { fieldHandler } from "./utils";

export const CTableRow = ({
  elementDistribution: eachElementDistribution,
  rowPayloads,
}: ICtableRow) => {
  const eachRowElementOtherStyle = `py-2 text-sm font-semibold capitalize  `;
  const eachRowElementBorderStyle = `border-b-[3px] border-[#7F4D4F]  border-dashed`;
  return (
    <>
      {rowPayloads.map((row, ind) => {
        return (
          <div
            key={ind}
            className={` ${
              ind % 2 == 0 && "bg-blue-100"
            } flex flex-row flex-wrap`}
          >
            {row.map((field: IField, ind) => {
              return (
                <div
                  key={ind}
                  style={{
                    flex: `0 0 ${eachElementDistribution.toFixed(2)}%`,
                  }}
                  className={`flex justify-center items-center ${eachRowElementOtherStyle} ${eachRowElementBorderStyle}`}
                >
                  {fieldHandler(field)}
                </div>
              );
            })}
          </div>
        );
      })}
    </>
  );
};
