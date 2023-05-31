import { Statuses } from "../enums/Statuses";
import { IRepository } from "./IRepository";

export interface IRepositoriesState {
  repositoriesData: IRepository[];
  status: Statuses;
  error: string | null;
  totalCount: number;
}
