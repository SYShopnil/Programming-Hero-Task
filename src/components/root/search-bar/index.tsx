"use client";

import React, { ChangeEvent } from "react";
import { RiSearchLine } from "react-icons/ri";
import styles from "./index.module.css";

export const CSearchBar = () => {
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    //inactive functionality
    console.log(event.target.value);
  };

  return (
    <div className={styles["search-container"]}>
      <input
        type="text"
        className={styles["search-input"]}
        placeholder="Search..."
        onChange={handleInputChange}
      />
      <RiSearchLine className={styles["search-icon"]} />
    </div>
  );
};
