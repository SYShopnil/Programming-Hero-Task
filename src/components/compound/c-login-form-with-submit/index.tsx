"use client";
import { LoginController } from "@root/lib/login-handler";
import { Button } from "@src/components/root";
import { BtnColorSchema } from "@src/types/root";
import React, { useState } from "react";
import { FormData } from "@src/types/compound/c-login-form-with-submit";
import { EDataTestId } from "@src/types/common";

export const CLoginFormWithSubmit = () => {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState<boolean>(true);
  const [isValidPassword, setIsValidPassword] = useState<boolean>(true);
  const [payload, setPayload] = useState("");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const formValidation = (formData: FormData) => {
    let isAllValid = true;
    const allFormKey = Object.keys(formData);
    allFormKey.forEach((key) => {
      switch (key) {
        case "email": {
          const isValid: boolean =
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
              formData[key]
            );
          if (isValid) {
            isAllValid = true;
          } else {
            isAllValid = false;
            setIsValidEmail(false);
            setPayload("Email or password validation error");
          }
          break;
        }
        case "password": {
          const isValidPassword = /^.{8,}$/.test(formData[key]);
          if (isValidPassword) {
            isAllValid = true;
          } else {
            isAllValid = false;
            setIsValidPassword(false);
            setPayload("Email or password validation error");
          }
          break;
        }
      }
    });

    return isAllValid;
  };

  const formSubmitHandler = async (): Promise<void> => {
    const isAllValid = formValidation(formData);
    if (isAllValid) {
      setIsValidEmail(true);
      setIsValidPassword(true);
      setPayload("");
      setIsLoading(true);
      try {
        await LoginController(formData);
      } catch (err) {
        setPayload("Somethings went wrong");
      }
    } else {
      setPayload("Form Validation error");
    }
  };
  return (
    <div
      className="flex justify-center items-center h-[80vh] bg-gray-100"
      data-testid={EDataTestId.cLoginFormWithSubmit}
    >
      <form className="bg-white p-8 rounded shadow-md">
        <h2 className="text-2xl font-semibold mb-4 text-center">Login</h2>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700">
            Email:
          </label>
          <input
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 mt-1 focus:outline-none focus:ring focus:border-blue-300"
            style={!isValidEmail ? { borderColor: "#F20B0B" } : {}}
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-700">
            Password:
          </label>
          <input
            id="password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 mt-1 focus:outline-none focus:ring focus:border-blue-300"
            required
            style={!isValidPassword ? { borderColor: "#F20B0B" } : {}}
          />
        </div>

        <Button
          btnText={isLoading ? "Loading.." : "Login"}
          colorSchema={BtnColorSchema.SolidBgWhiteTextGreen}
          isArrow={false}
          clickHandler={formSubmitHandler}
        />
        <span className={`text-bold text-[#7F4D4F] `}>{payload}</span>
      </form>
    </div>
  );
};
