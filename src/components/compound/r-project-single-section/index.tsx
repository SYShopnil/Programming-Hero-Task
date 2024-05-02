import React, { Suspense } from "react";
import { CProjectTaskContainer } from "./r-project-tasks/c-project-task-container";
import { RProjectTaskSection } from "./r-project-tasks";
import { SLoading } from "@src/components/root";
import { RProjectRecentActivities } from "./r-project-recent-activites";
import { RProjectTeamMember } from "./r-project-team-members";

interface IRProjectSinglePage {
  projectId: string;
}

export const RProjectSinglePage = async ({
  projectId,
}: IRProjectSinglePage) => {
  return (
    <div className={`grid grid-cols-12 gap-2`}>
      <section className={`col-span-12 `}>
        <Suspense fallback={<SLoading text="Task section loading...." />}>
          <RProjectTaskSection projectId={projectId} />
        </Suspense>
      </section>
      <aside className={`col-span-12 lg:col-span-6`}>
        <Suspense
          fallback={<SLoading text="Recent Activities section loading...." />}
        >
          <RProjectRecentActivities />
        </Suspense>
      </aside>
      <aside className={`col-span-12 lg:col-span-6`}>
        <Suspense fallback={<SLoading text="Team members loading...." />}>
          <RProjectTeamMember />
        </Suspense>
      </aside>
    </div>
  );
};
