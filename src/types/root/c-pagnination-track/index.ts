export interface ICPaginationTrack {
  pageHandler: (value: string) => void;
  currentPage: number;
  totalPage: number;
}
