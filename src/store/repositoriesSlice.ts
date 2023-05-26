import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { fetchRepositories } from "../api";
import { IRepositoriesState } from "../types/interfaces/IRepositoriesState";

const initialState: IRepositoriesState = {
  data: [],
  loading: false,
  error: null,
  keyword: "react",
  activePage: 1,
  perPage: 3,
  totalCount: 0,
};

export type Error = globalThis.Error;

export const fetchRepositoriesAsync = createAsyncThunk<
  void,
  void,
  { state: RootState }
>("repositories/fetchRepositories", async (_, { getState, dispatch }) => {
  const { keyword, activePage, perPage } = getState().repositories;

  dispatch(fetchRepositoriesStart());

  try {
    const response = await fetchRepositories(keyword, activePage, perPage);
    dispatch(fetchRepositoriesSuccess(response));
  } catch (error: any) {
    dispatch(fetchRepositoriesFailure(error.message));
  }
}) as any;

const repositoriesSlice = createSlice({
  name: "repositories",
  initialState,
  reducers: {
    fetchRepositoriesStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchRepositoriesSuccess(state, action: PayloadAction<any>) {
      state.loading = false;
      state.data = action.payload.items;
      state.totalCount = action.payload.total_count;
    },
    fetchRepositoriesFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    setKeyword(state, action: PayloadAction<string>) {
      state.keyword = action.payload;
    },
    setPage(state, action: PayloadAction<number>) {
      state.activePage = action.payload;
    },
  },
});

export const {
  fetchRepositoriesStart,
  fetchRepositoriesSuccess,
  fetchRepositoriesFailure,
  setKeyword,
  setPage,
} = repositoriesSlice.actions;

export const selectRepositories = (state: RootState) => state.repositories;

export default repositoriesSlice.reducer;
