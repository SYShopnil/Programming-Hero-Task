export enum ETaskStatus {
  ToDo = "ToDo",
  InProgress = "InProgress",
  Done = "Done",
}

export interface ITaskDB {
  taskId: string;
  title: string;
  status: ETaskStatus;
  desc: string;
  deadLine: number;
  assignTo: string; //IUser (FK)
  project: string; //IProject (FK)
}
