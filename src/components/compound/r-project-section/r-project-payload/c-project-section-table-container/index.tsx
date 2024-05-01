"use client";

import { getOwnProject } from "@root/lib/project-handler";
import { CTableDynamic } from "@src/components/root";
import { CPaginationTrack } from "@src/components/root/c-pagnination-track";
import { IGetOwnProjectReturn } from "@src/types/lib/project-handler";

import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { setProjectStructureAccordingToRequirement } from "./utils";

interface ICProjectSectionTableContainer {
  projects: IGetOwnProjectReturn;
}

export function CProjectSectionTableContainer({
  projects,
}: ICProjectSectionTableContainer) {
  const [pageNo, setPageNo] = useState(1);

  // react query part
  const {
    data: {
      payload: { projects: getProjects, totalPage },
    },
  } = useQuery<IGetOwnProjectReturn>({
    queryKey: ["get-own-projects", pageNo],
    queryFn: () => getOwnProject(pageNo.toString()),
    initialData: projects,
    staleTime: 2 * 1000,
  });

  if (getProjects) {
    const { headers, rows } =
      setProjectStructureAccordingToRequirement(getProjects);
    return (
      <div>
        <div className={`min-h-[60vh]`}>
          <CTableDynamic headers={headers} rows={rows} />
        </div>
        <>
          <CPaginationTrack
            currentPage={pageNo}
            pageHandler={(value: string) => setPageNo(+value)}
            totalPage={totalPage ? +totalPage : 1}
          />
        </>
      </div>
    );
  }
}
