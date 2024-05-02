"use client";
import { CSearchBar } from "@src/components/root/search-bar";
import { ETaskStatus, ITaskDB } from "@src/types/db/task";
import { Modal, Select } from "antd";
import React, { useState } from "react";
import styles from "./style.module.css";
import { Button, CTableDynamic } from "@src/components/root";
import { BtnColorSchema, IButton } from "@src/types/root";
import { CForm } from "@src/components/root/c-form";
import { mockProps } from "@src/components/root/c-form/_mock_data";
import {
  FormElementEnum,
  IForm,
  IFormFieldProp,
  IFormValues,
} from "@src/types/root/c-form";
import { IGetAllTaskByProjectIdResponse } from "@src/types/lib/task-handler";
import { getAllTaskByProjectId } from "@root/lib/task-handler";
import { useQuery } from "@tanstack/react-query";
import { IUser } from "@src/types/db/user";
import { generateFormFieldDemo } from "./config";
import { setTableBodyStructureAccordingToRequirement } from "./utils";

interface ICProjectTaskContainer {
  tasks: IGetAllTaskByProjectIdResponse;
  projectId: string;
  teamMembers: IUser[];
}

export const CProjectTaskContainer = ({
  tasks,
  projectId,
  teamMembers,
}: ICProjectTaskContainer) => {
  //get task part with (sort, filter, pagination and search)
  const [pageNo, setPageNo] = useState(1);
  const [searchBy, setSearchBy] = useState("");
  const [filterBy, setFilterBy] = useState<ETaskStatus>(ETaskStatus.ToDo);
  const [sortBy, setSortBy] = useState<"asc" | "desc">("asc");

  // react query for get tasks
  const {
    data: {
      payload: { tasks: allTask, totalPage },
    },
  } = useQuery<IGetAllTaskByProjectIdResponse>({
    queryKey: ["get-task-by-projectId", pageNo, searchBy, sortBy, filterBy],
    queryFn: () =>
      getAllTaskByProjectId(
        projectId,
        searchBy,
        sortBy,
        pageNo.toString(),
        filterBy
      ),
    initialData: tasks,
    staleTime: 2 * 1000,
  });

  const filterHandler = (value: ETaskStatus) => {
    setFilterBy(value);
  };
  const [isSortByArrowDown, setTsSortByArrowDown] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  //task update part start
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [initialValueOfUpdateForm, setInitialValueOfUpdateForm] = useState({});
  const showUpdateModal = () => {
    setOpenUpdateModal(false);
  };
  const handleUpdateModalCancel = () => {
    setOpenUpdateModal(false);
  };
  type IUpdateButtonInfo = Omit<IButton, "clickHandler">;
  const updateButtonInfo: IUpdateButtonInfo = {
    btnText: "Update Task",
    colorSchema: BtnColorSchema.SolidBgVioletTextWhite,
    isArrow: false,
  };
  const taskUpdateHandler = (task: ITaskDB) => {
    setOpenUpdateModal(true);
    // const createStructureOfExistingTask: ITaskDB = {
    //   title: task.title,
    //   status: task.status,
    //   assign,
    // };
    setInitialValueOfUpdateForm(task);
  };
  const showModal = () => {
    setIsModalOpen(false);
  };
  const handleModalCancel = () => {
    setIsModalOpen(false);
  };
  const sortByHandler = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    setTsSortByArrowDown(!isSortByArrowDown);
    switch (sortBy) {
      case "asc": {
        setSortBy("desc");
        break;
      }
      case "desc": {
        setSortBy("asc");
        break;
      }
      default: {
        setSortBy("desc");
      }
    }
  };

  // create the task show table format
  const { headers, rows } = setTableBodyStructureAccordingToRequirement(
    allTask ? allTask : [],
    teamMembers,
    taskUpdateHandler
  );
  //add task form part start
  type IButtonInfo = Omit<IButton, "clickHandler">;
  const buttonInfo: IButtonInfo = {
    btnText: "Add New Task",
    colorSchema: BtnColorSchema.SolidBgWhiteTextGreen,
    isArrow: false,
  };

  // generate assign by user name by using teamMembers data which is coming from server
  const formAssignToOptions: { value: string; label: string }[] = [];
  teamMembers.forEach((member) => {
    formAssignToOptions.push({ value: member.userId, label: member.userName });
  });

  const formFieldDemo = generateFormFieldDemo(formAssignToOptions);
  const formTitle: string = "Add New Task Form";

  const addTaskFormHandler = (formValue: IFormValues) => {
    console.log(formValue);
  };

  return (
    <div className={`grid grid-cols-12 gap-2 space-y-3 lg:space-y-0`}>
      {/* search bar */}
      <div className={`col-span-12 lg:col-span-5`}>
        <CSearchBar />
      </div>

      {/* filter part */}
      <div
        className={`col-span-4 lg:col-span-2 flex flex-col items-start lg:items-center space-y-2`}
      >
        <p className={`font-bold text-[#7F4D4F] `}>Filter By</p>
        <Select
          defaultValue={ETaskStatus.ToDo}
          style={{ width: 100 }}
          onChange={filterHandler}
          options={[
            { value: ETaskStatus.ToDo, label: ETaskStatus.ToDo },
            { value: ETaskStatus.InProgress, label: ETaskStatus.InProgress },
            { value: ETaskStatus.Done, label: ETaskStatus.Done },
          ]}
        />
      </div>

      {/* sort by */}
      <div className={`col-span-4 lg:col-span-2 space-y-2 lg:mr-4`}>
        <p className="text-center font-bold text-[#7F4D4F]">Sort By</p>
        <div
          onClick={sortByHandler}
          className={`cursor-pointer flex justify-center items-start lg:items-center border border-[#ECECEC] rounded-md`}
        >
          <div>Due Date</div>
          <div className={styles.container}>
            <div
              className={`${styles.arrowIcon} ${
                isSortByArrowDown ? styles.open : ""
              }`}
            ></div>
          </div>
        </div>
      </div>

      {/* add task button */}
      <div
        className={`col-span-4 lg:col-span-3 flex justify-center lg:justify-start items-center`}
      >
        <Button
          btnText="Add New Task"
          colorSchema={BtnColorSchema.SolidBgWhiteTextGreen}
          isArrow={true}
          clickHandler={() => setIsModalOpen(true)}
        />
        <Modal
          open={isModalOpen}
          onOk={showModal}
          onCancel={handleModalCancel}
          footer={false}
        >
          {/* <CForm {...mockProps} /> */}
          <CForm
            buttonInfo={buttonInfo}
            formFields={formFieldDemo}
            onSubmit={addTaskFormHandler}
            formTitle={formTitle}
          />
        </Modal>
      </div>

      {/* task show table */}
      <div className={`col-span-12`}>
        <CTableDynamic headers={headers} rows={rows} />
        {/* update modal part */}
        <Modal
          open={openUpdateModal}
          onOk={showUpdateModal}
          onCancel={handleUpdateModalCancel}
          footer={false}
        >
          {/* <CForm {...mockProps} /> */}
          <CForm
            buttonInfo={updateButtonInfo}
            formFields={formFieldDemo}
            onSubmit={addTaskFormHandler}
            formTitle={formTitle}
            initialValue={initialValueOfUpdateForm}
          />
        </Modal>
      </div>
    </div>
  );
};
