import { IUser } from "@src/types/db/user";
import { INormalButton, IRedirectButton } from "../Button";

export enum EFieldType {
  LABEL = "LABEL",
  BUTTON_CTA = "BUTTON_CTA",
  OPTION = "OPTION",
  BUTTON_REDIRECT = "BUTTON_REDIRECT",
}
export interface IPayloadCommon {
  handler?: (value: any) => void;
}
export interface IPayloadTypeOne extends IPayloadCommon {
  label: string;
}
export interface IPayloadTypeTwo extends INormalButton {}
export interface IPayloadTypeFour extends IRedirectButton {}
export interface IPayloadTypeThree extends IPayloadCommon {
  options: IUser[];
}
export interface IField {
  type: EFieldType;
  payload:
    | IPayloadTypeOne
    | IPayloadTypeTwo
    | IPayloadTypeThree
    | IPayloadTypeFour;
}
export type IMockDataOfTable = IField[][];

export interface ITableHead {
  elementDistribution: number;
  headPayload: string[];
}

export interface ICtableRow {
  elementDistribution: number;
  rowPayloads: IField[][];
}
