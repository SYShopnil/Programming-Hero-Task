import { getOwnProject } from "@root/lib/project-handler";
import { SIconWithMessage } from "@src/components/root";
import React from "react";
import { CProjectSectionTableContainer } from "./c-project-section-table-container";
import { IconName } from "@src/types/root/_icon";

export const RProjectPayload = async () => {
  const projects = await getOwnProject();
  if (projects.payload.projects) {
    return (
      <>
        <CProjectSectionTableContainer projects={projects} />
      </>
    );
  } else {
    <SIconWithMessage
      icon={IconName.TbError404}
      message="Project Not Found"
      url="/dashboard/profile"
    />;
  }
};
