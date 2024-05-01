import { BtnColorSchema } from "@src/types/root";
import { EFieldType, IField } from "@src/types/root/c-view-table-dynamic";

export const mockDataOfTable: IField[][] = [
  [
    {
      type: EFieldType.LABEL,
      payload: {
        label: "Brighton SEO",
      },
    },
    {
      type: EFieldType.OPTION,
      payload: {
        options: [
          {
            userId: "UK158",
            email: "sadmanishopnil@gmail.com",
            password: "123456789",
            userName: "John Doe",
            profilePicLink: "/assert/default-profile.png",
            gender: "male",
          },
          {
            userId: "UK159",
            email: "sadmanishopnil1@gmail.com",
            password: "123456789",
            userName: "Jane Smith",
            profilePicLink: "/assert/default-profile.png",
            gender: "male",
          },
          {
            userId: "UK160",
            email: "xyz@gmail.com",
            password: "123456789",
            userName: "Harry Rose",
            profilePicLink: "/assert/default-profile.png",
            gender: "female",
          },
        ],
        handler: (value) => {
          console.log(value);
        },
      },
    },
    {
      type: EFieldType.BUTTON_CTA,
      payload: {
        btnText: "Update",
        colorSchema: BtnColorSchema.SolidBgGrayTextViolet,
        isArrow: false,
        clickHandler: (e) => {
          console.log(`clicked`);
        },
      },
    },
    {
      type: EFieldType.BUTTON_REDIRECT,
      payload: {
        btnText: "View Details",
        colorSchema: BtnColorSchema.SolidBgVioletTextWhite,
        isArrow: false,
        redirectLink: "/dashboard/products/2",
      },
    },
  ],
  [
    {
      type: EFieldType.LABEL,
      payload: {
        label: "Brighton SEO",
      },
    },
    {
      type: EFieldType.OPTION,
      payload: {
        options: [
          {
            userId: "UK158",
            email: "sadmanishopnil@gmail.com",
            password: "123456789",
            userName: "John Doe",
            profilePicLink: "/assert/default-profile.png",
            gender: "male",
          },
          {
            userId: "UK159",
            email: "sadmanishopnil1@gmail.com",
            password: "123456789",
            userName: "Jane Smith",
            profilePicLink: "/assert/default-profile.png",
            gender: "male",
          },
          {
            userId: "UK160",
            email: "xyz@gmail.com",
            password: "123456789",
            userName: "Harry Rose",
            profilePicLink: "/assert/default-profile.png",
            gender: "female",
          },
        ],
        handler: (value) => {
          console.log(value);
        },
      },
    },
    {
      type: EFieldType.BUTTON_CTA,
      payload: {
        btnText: "Update",
        colorSchema: BtnColorSchema.SolidBgGrayTextViolet,
        isArrow: false,
        clickHandler: (e) => {
          console.log(`clicked`);
        },
      },
    },
    {
      type: EFieldType.BUTTON_REDIRECT,
      payload: {
        btnText: "View Details",
        colorSchema: BtnColorSchema.SolidBgVioletTextWhite,
        isArrow: false,
        redirectLink: "/dashboard/product/1",
      },
    },
  ],
  [
    {
      type: EFieldType.LABEL,
      payload: {
        label: "Brighton SEO",
      },
    },
    {
      type: EFieldType.OPTION,
      payload: {
        options: [
          {
            userId: "UK158",
            email: "sadmanishopnil@gmail.com",
            password: "123456789",
            userName: "John Doe",
            profilePicLink: "/assert/default-profile.png",
            gender: "male",
          },
          {
            userId: "UK159",
            email: "sadmanishopnil1@gmail.com",
            password: "123456789",
            userName: "Jane Smith",
            profilePicLink: "/assert/default-profile.png",
            gender: "male",
          },
          {
            userId: "UK160",
            email: "xyz@gmail.com",
            password: "123456789",
            userName: "Harry Rose",
            profilePicLink: "/assert/default-profile.png",
            gender: "female",
          },
        ],
        handler: (value) => {
          console.log(value);
        },
      },
    },
    {
      type: EFieldType.BUTTON_CTA,
      payload: {
        btnText: "Update",
        colorSchema: BtnColorSchema.SolidBgGrayTextViolet,
        isArrow: false,
        clickHandler: (e) => {
          console.log(`clicked`);
        },
      },
    },
    {
      type: EFieldType.BUTTON_REDIRECT,
      payload: {
        btnText: "View Details",
        colorSchema: BtnColorSchema.SolidBgVioletTextWhite,
        isArrow: false,
        redirectLink: "/dashboard/product/1",
      },
    },
  ],
];

export const mockTableHead: string[] = [
  "Project Name",
  "AssignTo",
  "Update",
  "View Details",
];
