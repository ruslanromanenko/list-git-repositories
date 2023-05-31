import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { fetchRepositories } from "../api";

export const fetchRepositoriesAsync = createAsyncThunk<
  void,
  { keyword: string; currentPage: number; perPage: number },
  { state: RootState }
>(
  "repositories/fetchRepositories",
  async ({ keyword, currentPage, perPage }, { rejectWithValue }) => {
    try {
      const response = await fetchRepositories(keyword, currentPage, perPage);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
) as any;
