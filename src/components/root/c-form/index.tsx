"use client";

// External Imports
import { useState } from "react";
import Link from "next/link";
import { IForm, IFormValues } from "@src/types/root/c-form";
import { FormField } from "./c-form-field";
import { Button } from "../button";
import { EDataTestId } from "@src/types/common";

export const CForm = ({
  formTitle,
  formFields,
  buttonInfo,
  privacyInfo,
  onSubmit,
  initialValue = {},
}: IForm) => {
  const [formValues, setFormValues] = useState<IFormValues>(initialValue);
  const [formErrors, setFormErrors] = useState<IFormValues>(initialValue);
  const handleFormChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement | any>
  ) => {
    const { name, value, type } = e.target;
    if (type === "checkbox" && e.target instanceof HTMLInputElement) {
      setFormValues({
        ...formValues,
        [name]: e.target.checked ? "true" : "",
      });
    } else {
      setFormValues({
        ...formValues,
        [name]: value,
      });
    }
  };
  const uploadHandler = (base64: any) => {
    setFormValues({
      ...formValues,
      image: base64,
    });
  };

  const antDesignFormHandler = (value: string, name: string) => {
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };
  // submitHandler
  const submitHandler = (
    e: React.MouseEvent<HTMLElement> | React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    onSubmit(formValues);
  };

  return (
    <form className={`form grid gap-4 lg:grid-cols-2 p-3`}>
      {formTitle && (
        <div className="mb-[.5rem] md:mb-[.75rem] col-start-1 col-end-3">
          <h3 className="text-center text-[1.75rem] font-medium leading-[1.3] md:text-[3rem] md:font-bold md:leading-[1.1] capitalize text-secondary">
            {formTitle}
          </h3>
        </div>
      )}

      {formFields &&
        formFields.map((field, index) => {
          const halfWidth = "max-sm:col-start-1 max-sm:col-end-3";
          const fullWidth = "col-start-1 col-end-3";
          return (
            <div
              key={index}
              className={field.space === 0.5 ? halfWidth : fullWidth}
            >
              <FormField
                fieldProps={field}
                value={formValues[field.name] ? formValues[field.name] : ""}
                onChange={handleFormChange}
                formErrors={formErrors}
                uploadHandler={uploadHandler}
                antDesignFormHandler={antDesignFormHandler}
              />
            </div>
          );
        })}

      {privacyInfo && (
        <div className="col-start-1 col-end-3">
          <Link href={`${privacyInfo?.link}`} passHref>
            <a className="inline-flex focus:outline-0 focus:shadow-none focus-visible:outline-0 text-[.9375rem] text-secondary underline uppercase transition-colors duration-300 hover:text-secondaryLight">
              {privacyInfo?.linkText}
            </a>
          </Link>
        </div>
      )}

      {/* submit button */}
      {buttonInfo.btnText && (
        <div className="col-start-1 col-end-3">
          <Button {...buttonInfo} clickHandler={submitHandler} />
        </div>
      )}
    </form>
  );
};
