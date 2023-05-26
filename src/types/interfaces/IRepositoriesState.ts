import { IRepository } from "./IRepository";

export interface IRepositoriesState {
  data: IRepository[];
  loading: boolean;
  error: string | null;
  keyword: string;
  activePage: number;
  perPage: number;
  totalCount: number;
}
