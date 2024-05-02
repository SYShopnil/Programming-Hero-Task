import { ICViewTableFormat } from "@src/components/root/c-view-table-format";
import { ITaskDB } from "@src/types/db/task";
import { IUser } from "@src/types/db/user";
import { IModifiedProjectDB } from "@src/types/lib/project-handler";
import { BtnColorSchema } from "@src/types/root";
import { EFieldType, IField } from "@src/types/root/c-view-table-dynamic";

interface ISetTableBodyStructureAccordingToRequirementReturn
  extends ICViewTableFormat {}

export function setTableBodyStructureAccordingToRequirement(
  tasks: ITaskDB[],
  teamMembers: IUser[],
  updateHandler: (task: ITaskDB) => void
): ISetTableBodyStructureAccordingToRequirementReturn {
  console.log(tasks);
  const headers: string[] = [
    "Task ID",
    "Title",
    "Description",
    "AssignTo",
    "Status",
    "Update",
  ];
  const rows: IField[][] = [];
  tasks.forEach((task) => {
    const createRow: IField[] = [
      {
        payload: {
          label: task.taskId,
        },
        type: EFieldType.LABEL,
      },
      {
        payload: {
          label: task.title,
        },
        type: EFieldType.LABEL,
      },
      {
        payload: {
          label: task.desc,
          isLineClamp: true,
        },
        type: EFieldType.LABEL,
      },
      {
        // get respective  user name
        payload: {
          label: teamMembers
            ? teamMembers.filter((member) => member.userId == task.assignTo)[0]
                .userName
            : "UnKnown",
        },
        type: EFieldType.LABEL,
      },
      {
        payload: {
          label: task.status,
        },
        type: EFieldType.LABEL,
      },
      {
        payload: {
          btnText: "Update",
          colorSchema: BtnColorSchema.SolidBgGrayTextViolet,
          isArrow: false,
          clickHandler: () => updateHandler(task),
        },
        type: EFieldType.BUTTON_CTA,
      },
    ];
    rows.push(createRow);
  });
  return {
    headers,
    rows,
  };
}
