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
            elementDistribution={100 / headers.length}
            headPayload={headers}
          />

          <CTableRow
            elementDistribution={100 / headers.length}
            rowPayloads={rows}
          />
        </>
      )}
    </div>
  );
};
