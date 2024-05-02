import { ICommonReturnData } from "@src/types/common";
import { ETaskStatus, ITaskDB } from "@src/types/db/task";

export interface IGetAllTaskByProjectIdResponse extends ICommonReturnData {
  payload: {
    tasks: ITaskDB[] | null;
    totalPage: number;
  };
}

export type TGetAllTaskByProjectIdHandler = (
  projectId: string,
  searchBy: string,
  sortBy: string,
  currentPage: string,
  filterBy: ETaskStatus
) => Promise<IGetAllTaskByProjectIdResponse>;
