"use client";
import React, { useState } from "react";
import singleFileUploaderStyle from "./singleFileUploaderStyle.module.css";

interface ICSingleFileUploader {
  filePassHandler: any;
  fileType: string;
}

export const CSingleFileUploader = ({
  filePassHandler,
  fileType,
}: ICSingleFileUploader) => {
  const [fileBase64, setFileBase64] = useState<any>("");
  const handleChange = (e: any) => {
    e.preventDefault();
    const file = e.target.files[0];

    if (file.name) {
      const { size } = file;
      const reader = new FileReader();

      // convert the data to base64
      reader.onloadend = () => {
        filePassHandler(reader.result, size);
        if (fileType == "img") {
          setFileBase64(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <div className="mb-3">
        <input
          onChange={handleChange}
          placeholder=""
          type="file"
          className="form-control"
          required
        ></input>
      </div>
      {fileBase64 && (
        <img
          src={fileBase64}
          alt="upload_image"
          className={`${singleFileUploaderStyle.imageSize}`}
        />
      )}
    </>
  );
};
