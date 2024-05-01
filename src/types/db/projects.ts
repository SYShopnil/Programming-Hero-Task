export interface IProjectDB {
  projectId: string;
  title: string;
  teamMembers: string[]; //IUser (FK)
  createdBy: string; //IUser (FK)
}
