import { ICommonReturnData } from "@src/types/common";
import { IProjectDB } from "@src/types/db/projects";

export interface IGetOwnProjectReturn extends ICommonReturnData {
  payload: {
    projects: IModifiedProjectDB[] | null;
    totalPage: number | null;
  };
}
export interface IModifiedProjectDB extends IProjectDB {
  isOwner?: boolean;
}
