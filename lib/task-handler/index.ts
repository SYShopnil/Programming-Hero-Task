"use server";

import { ICommonReturnData } from "@src/types/common";
import { ETaskStatus, ITaskDB } from "@src/types/db/task";

import { promises as fs } from "fs";
import { paginationHandler } from "../product-handler";
import { TGetAllTaskByProjectIdHandler } from "@src/types/lib/task-handler";
/**
 *
 * get all task by project id
 * with search by (tittle or id)
 * and sort by (due date)
 * and filter by (status)
 * and add pagination
 *
 */

const databaseLocation = process.cwd() + "/public/db";
const inputDataLimit = 4;
export const getAllTaskByProjectIdFromJsonDB = async (
  projectId: string,
  sortBy: string,
  searchBy: string,
  filterBy: ETaskStatus
): Promise<ITaskDB[]> => {
  const getAlTask: ITaskDB[] = JSON.parse(
    await fs.readFile(`${databaseLocation}/tasks.db.json`, "utf8")
  );
  const queryAllTaskApplyingFilterSort = getAlTask
    .filter((task) => {
      if (searchBy) {
        const declareSearchInputRegex = new RegExp(searchBy, "i");
        const isMatch =
          declareSearchInputRegex.test(task.title) ||
          declareSearchInputRegex.test(task.taskId);
        return isMatch && task.project == projectId && task.status == filterBy;
      } else {
        return task.project == projectId && task.status == filterBy;
      }
    })
    .sort((a, b) => {
      if (sortBy == "asc") {
        return a.deadLine - b.deadLine;
      } else {
        return b.deadLine - a.deadLine;
      }
    });
  return queryAllTaskApplyingFilterSort;
};

function applyingPaginationToGetDataOfTask(
  payload: ITaskDB[],
  dataLimit: number,
  skipData: number
): ITaskDB[] {
  /**
   *
   *  Just slice or cut data from  respective products
   *
   */
  const startIndex = skipData;
  const endIndex = skipData + dataLimit;
  return payload.slice(startIndex, endIndex);
}

export const getAllTaskByProjectId: TGetAllTaskByProjectIdHandler = async (
  projectId,
  searchBy,
  sortBy,
  currentPage,
  filterBy = ETaskStatus.ToDo
) => {
  try {
    const getAllTask = await getAllTaskByProjectIdFromJsonDB(
      projectId,
      sortBy,
      searchBy,
      filterBy
    );
    if (getAllTask.length) {
      const { dataLimit, skipData, totalPage } = await paginationHandler(
        inputDataLimit,
        getAllTask,
        currentPage
      );
      const finalTaskDataAfterApplyingPaginationLogic: ITaskDB[] =
        await applyingPaginationToGetDataOfTask(
          getAllTask,
          dataLimit,
          skipData
        );
      return {
        message: `${finalTaskDataAfterApplyingPaginationLogic.length} Product Found!!`,
        payload: {
          tasks: finalTaskDataAfterApplyingPaginationLogic,
          totalPage,
        },
        status: 202,
      };
    } else {
      return {
        message: "No Task Found!!",
        payload: {
          tasks: null,
          totalPage: 0,
        },
        status: 404,
      };
    }
  } catch (err) {
    console.log(err);
    return {
      message: "Some Internal Error",
      payload: {
        tasks: null,
        totalPage: 0,
      },
      status: 503,
    };
  }
};

interface IAddNewTask {
  productId: string;
  taskData: any;
}
export async function addNewTask({ productId, taskData }: IAddNewTask) {}
