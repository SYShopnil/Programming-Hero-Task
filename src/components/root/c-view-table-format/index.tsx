"use client";
import React from "react";
import { CTableRow } from "./c-table-row";
import { CTableHead } from "./c-table-head";
import { IField } from "@src/types/root/c-view-table-dynamic";

export interface ICViewTableFormat {
  headers: string[];
  rows: IField[][];
}

export const CTableDynamic = ({ headers, rows }: ICViewTableFormat) => {
  return (
    <div className={` p-4 rounded-md`}>
      {headers.length && (
        <>
          <CTableHead
            elementDistribution={Math.floor(100 / headers.length)}
            headPayload={headers}
          />

          <>
            {rows.length ? (
              <CTableRow
                elementDistribution={Math.floor(100 / headers.length)}
                rowPayloads={rows}
              />
            ) : (
              <div className={`p-3 bg-[#E0E3EA]`}>
                <p className={`text-center text-[#7F4D4F] font-semibold`}>
                  No Data Found
                </p>
              </div>
            )}
          </>
        </>
      )}
    </div>
  );
};
