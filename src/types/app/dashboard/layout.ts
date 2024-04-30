export interface IMenuItem {
  url: string;
  title: DashboardMenuItem;
  isActive: boolean;
  access: string[];
}

export enum DashboardMenuItem {
  Profile = "Profile",
  Products = "Products",
  UserList = "UserList",
}
export const menuItems: IMenuItem[] = [
  {
    url: "/dashboard/profile",
    title: DashboardMenuItem.Profile,
    isActive: false,
    access: ["admin", "user"],
  },
  {
    url: "/dashboard/userList",
    title: DashboardMenuItem.UserList,
    isActive: false,
    access: ["admin"],
  },
  {
    url: "/dashboard/products",
    title: DashboardMenuItem.Products,
    isActive: false,
    access: ["admin", "user"],
  },
];
