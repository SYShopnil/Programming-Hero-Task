import React from "react";
import { CProjectTaskContainer } from "./c-project-task-container";
import { getAllTaskByProjectId } from "@root/lib/task-handler";
import { ETaskStatus } from "@src/types/db/task";
import { getAllTeamMemberByProjectId } from "@root/lib/project-handler";

interface IRProjectTaskSection {
  projectId: string;
}
export const RProjectTaskSection = async ({
  projectId,
}: IRProjectTaskSection) => {
  const tasksResponse = await getAllTaskByProjectId(
    projectId,
    "",
    "desc",
    "1",
    ETaskStatus.ToDo
  );
  const getTeamMembers = await getAllTeamMemberByProjectId({
    projectId,
  });
  return (
    <>
      <CProjectTaskContainer
        tasks={tasksResponse}
        projectId={projectId}
        teamMembers={getTeamMembers ? getTeamMembers : []}
      />
    </>
  );
};
