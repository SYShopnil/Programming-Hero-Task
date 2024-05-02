import { BtnColorSchema } from "@src/types/root";
import { FormElementEnum, IForm } from "@src/types/root/c-form";

export const mockProps: IForm = {
  buttonInfo: {
    btnText: "Demo One",
    colorSchema: BtnColorSchema.SolidBgGrayTextViolet,
    isArrow: false,
  },
  formFields: [
    {
      elementType: FormElementEnum.Input,
      label: "Food Name",
      space: 2,
      isRequired: true,
      name: "name",
      type: "input",
      placeholder: "Give Name",
    },
    {
      elementType: FormElementEnum.Input,
      label: "Food Price",
      space: 2,
      isRequired: true,
      name: "price",
      type: "input",
      placeholder: "Give Price",
    },
    {
      elementType: FormElementEnum.TextArea,
      label: "Description",
      space: 2,
      isRequired: true,
      name: "desc",
      type: "input",
      placeholder: "Give Description",
    },
    {
      elementType: FormElementEnum.Upload,
      label: "Upload Food Picture",
      space: 2,
      isRequired: true,
      name: "image",
      type: "input",
      placeholder: "Give image",
    },
  ],
  onSubmit: () => {},
  formTitle: "Test Form",
};
