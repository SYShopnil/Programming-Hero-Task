import { ICViewTableFormat } from "@src/components/root/c-view-table-format";
import { IModifiedProjectDB } from "@src/types/lib/project-handler";
import { BtnColorSchema } from "@src/types/root";
import { EFieldType, IField } from "@src/types/root/c-view-table-dynamic";

interface setProjectStructureAccordingToRequirementReturn
  extends ICViewTableFormat {}

export function setProjectStructureAccordingToRequirement(
  projects: IModifiedProjectDB[]
): setProjectStructureAccordingToRequirementReturn {
  const headers: string[] = ["Project ID", "Name", "Role", "Show Details"];
  const rows: IField[][] = [];
  projects.forEach((project) => {
    const createRow: IField[] = [
      {
        payload: {
          label: project.projectId,
        },
        type: EFieldType.LABEL,
      },
      {
        payload: {
          label: project.title,
        },
        type: EFieldType.LABEL,
      },
      {
        payload: {
          label: project.isOwner ? "Owner" : "Contributor",
        },
        type: EFieldType.LABEL,
      },
      {
        payload: {
          btnText: "Show Details",
          colorSchema: BtnColorSchema.SolidBgGrayTextViolet,
          isArrow: false,
          redirectLink: `/dashboard/projects/${project.projectId}`,
        },
        type: EFieldType.BUTTON_REDIRECT,
      },
    ];
    rows.push(createRow);
  });
  return {
    headers,
    rows,
  };
}
