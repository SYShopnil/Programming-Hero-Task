// External Imports
import React from "react";
import { IButton } from "../Button";

// Internal Imports

export enum FormElementEnum {
  Input = "input",
  TextArea = "textarea",
  Checkbox = "checkbox",
  Select = "select",
  Upload = "upload",
  Calender = "Calender",
}

// IForm
export interface IForm {
  formFields: IFormFieldProp[];
  buttonInfo: Omit<IButton, "clickHandler">;
  formTitle?: string;
  privacyInfo?: IPrivacyInfo;
  onSubmit: (formValues: IFormValues) => void;
  initialValue?: IFormValues;
}

// IFormField
export interface IFormField {
  fieldProps: IFormFieldProp;
  value: string | undefined;
  onChange?: (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement | any>
  ) => void;
  formErrors: IFormValues;
  uploadHandler?: (base64: any, size: number) => void;
  antDesignFormHandler?: (value: string, name: string) => void;
}

// IFormFieldProp
export interface IFormFieldProp {
  name: string;
  space: number;
  isRequired: boolean;
  label?: string;
  elementType: FormElementEnum;
  type: string;
  placeholder?: string;
  defaultValue?: string;
  options?: { value: string; label: string }[];
}

// IFormValues
export interface IFormValues {
  [key: string]: string | undefined;
}

// IPrivacyInfo
export interface IPrivacyInfo {
  link: string;
  linkText: string;
}
