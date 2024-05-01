export interface IRecentActivitiesDB {
  activityId: string;
  activity: string;
  project: string; //IProject (FK)
}
