import { ETaskStatus } from "@src/types/db/task";
import { FormElementEnum, IFormFieldProp } from "@src/types/root/c-form";

export function generateFormFieldDemo(
  formAssignToOptions: { value: string; label: string }[]
) {
  const formFieldDemo: IFormFieldProp[] = [
    {
      elementType: FormElementEnum.Input,
      isRequired: true,
      name: "title",
      space: 2,
      type: FormElementEnum.Input,
      placeholder: "Give Title",
      label: "Title",
    },
    {
      elementType: FormElementEnum.Select,
      isRequired: true,
      name: "status",
      space: 2,
      type: FormElementEnum.Select,
      placeholder: "Give Task Status",
      label: "Task Status",
      defaultValue: ETaskStatus.ToDo,
      options: [
        {
          label: ETaskStatus.ToDo,
          value: ETaskStatus.ToDo,
        },
        {
          label: ETaskStatus.InProgress,
          value: ETaskStatus.InProgress,
        },
        {
          label: ETaskStatus.Done,
          value: ETaskStatus.Done,
        },
      ],
    },
    {
      elementType: FormElementEnum.Select,
      isRequired: true,
      name: "assignTo",
      space: 2,
      type: FormElementEnum.Select,
      placeholder: "Give Assign To",
      options: formAssignToOptions,
      defaultValue: formAssignToOptions[0].value
        ? formAssignToOptions[0].value
        : "Assign To",
      label: "Assign To",
    },
    {
      elementType: FormElementEnum.Calender,
      isRequired: true,
      name: "deadline",
      space: 2,
      type: FormElementEnum.Calender,
      placeholder: "Give Deadline",
      label: "Dead Line",
    },
    {
      elementType: FormElementEnum.TextArea,
      isRequired: true,
      name: "desc",
      space: 2,
      type: FormElementEnum.TextArea,
      placeholder: "Give Task Description",
      label: "Give Task Description",
    },
  ];
  return formFieldDemo;
}
