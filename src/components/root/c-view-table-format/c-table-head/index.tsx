import React from "react";
import { ITableHead } from "@src/types/root/c-view-table-dynamic";

export const CTableHead = ({
  elementDistribution,
  headPayload,
}: ITableHead) => {
  return (
    <div
      className={`flex flex-row flex-wrap border-b-[5px] border-[#7F4D4F]  border-dashed `}
    >
      {headPayload.map((head, ind) => {
        return (
          <div
            key={ind}
            style={{ flex: `0 0 ${elementDistribution.toFixed(2)}%` }}
            className={`text-center pb-2 text-lg font-bold capitalize`}
          >
            <p>{head}</p>
          </div>
        );
      })}
    </div>
  );
};
