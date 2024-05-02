"use server";

import { promises as fs } from "fs";
import { getLoggedInUser, searchIndividualUserById } from "../user-handler";
import { IProjectDB } from "@src/types/db/projects";
import { ICommonReturnData } from "@src/types/common";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  IGetOwnProjectReturn,
  IModifiedProjectDB,
} from "@src/types/lib/project-handler";
import { paginationHandler } from "../product-handler";
import { IUser } from "@src/types/db/user";

const databaseLocation = process.cwd() + "/public/db";
const projectDataLimit: number = 4;

export async function isProjectOwnerOrNot(
  projects: IProjectDB[],
  ownerId: string
) {
  const createNewProjectStructureAndAddIsOwnerOrNot = projects.map(
    (project) => {
      let newProjectStructure: IModifiedProjectDB = project;
      project.createdBy == ownerId
        ? (newProjectStructure.isOwner = true)
        : (newProjectStructure.isOwner = false);
      return newProjectStructure;
    }
  );
  return createNewProjectStructureAndAddIsOwnerOrNot;
}

export async function getProjectByUserIdFromJsonDatabase(userId: string) {
  const getAllProject: IProjectDB[] = JSON.parse(
    await fs.readFile(`${databaseLocation}/projects.db.json`, "utf8")
  );
  const getOnlyLoggedInUserProjects = getAllProject.filter((project) => {
    const convertProjectTeamMembersToSet = new Set(project.teamMembers);
    return (
      project.createdBy == userId || convertProjectTeamMembersToSet.has(userId)
    );
  });
  return getOnlyLoggedInUserProjects;
}

function applyingPaginationToGetDataOfProjectAndTask(
  payload: IProjectDB[],
  dataLimit: number,
  skipData: number
): IProjectDB[] {
  /**
   *
   *  Just slice or cut data from  respective products
   *
   */
  const startIndex = skipData;
  const endIndex = skipData + dataLimit;
  return payload.slice(startIndex, endIndex);
}

export async function getOwnProject(
  pageNo: string = "1"
): Promise<IGetOwnProjectReturn> {
  let redirectLink = "";
  try {
    //first check logged in user
    const {
      payload: { loggedInUser },
    } = await getLoggedInUser();

    if (loggedInUser) {
      const { userId } = loggedInUser;
      const getLoggedInUserProjects = await getProjectByUserIdFromJsonDatabase(
        userId
      );

      if (getLoggedInUserProjects.length) {
        const { skipData, totalPage, dataLimit } = await paginationHandler(
          projectDataLimit,
          getLoggedInUserProjects,
          pageNo
        );
        const applyingPaginationLogicAndGetProjects =
          await applyingPaginationToGetDataOfProjectAndTask(
            getLoggedInUserProjects,
            dataLimit,
            skipData
          );
        const checkIsOwnerOrNotAndGetFinalListOfProjects =
          await isProjectOwnerOrNot(
            applyingPaginationLogicAndGetProjects,
            userId
          );
        return {
          message: `${checkIsOwnerOrNotAndGetFinalListOfProjects.length} project found!!!`,
          payload: {
            projects: checkIsOwnerOrNotAndGetFinalListOfProjects,
            totalPage: totalPage,
          },
          status: 202,
        };
      } else {
        return {
          message: "No Project Found!!",
          payload: {
            projects: null,
            totalPage: null,
          },
          status: 404,
        };
      }
    } else {
      redirectLink = "/login";
      return {
        message: "Please Logged in",
        payload: {
          projects: null,
          totalPage: null,
        },
        status: 404,
      };
    }
  } catch (err) {
    console.log(err);
    return {
      message: "Some internal error",
      payload: {
        projects: null,
        totalPage: null,
      },
      status: 503,
    };
  } finally {
    if (redirectLink) {
      revalidatePath(redirectLink);
      redirect(redirectLink);
    }
  }
}

interface IGetIndividualProjectByProjectID {
  projectId: string;
}

interface IGetAllTeamMemberByProjectId
  extends Pick<IGetIndividualProjectByProjectID, "projectId"> {}

async function getIndividualProjectByProjectID({
  projectId,
}: IGetIndividualProjectByProjectID) {
  const getProjects: IProjectDB[] = JSON.parse(
    await fs.readFile(`${databaseLocation}/projects.db.json`, "utf8")
  );
  const getProject: IProjectDB[] = getProjects.filter(
    (project) => project.projectId == projectId
  );
  return getProject[0];
}

export async function getAllTeamMemberByProjectId({
  projectId,
}: IGetAllTeamMemberByProjectId) {
  try {
    const getProject = await getIndividualProjectByProjectID({ projectId });
    if (getProject) {
      const { teamMembers } = getProject;

      const getTeamMembers = teamMembers.map(async (member, ind) => {
        return await searchIndividualUserById(member);
      });
      const myProjectTeamMembers: IUser[] = [];
      await Promise.all(getTeamMembers)
        .then((members) => {
          members.map((member) => {
            member.payload.user &&
              myProjectTeamMembers.push(member.payload.user);
          });
        })
        .catch((error) => {
          console.error("Error occurred:", error);
          return null;
        });
      return myProjectTeamMembers;
    } else {
      return null;
    }
  } catch (err) {
    console.log(err);
    return null;
  }
}
