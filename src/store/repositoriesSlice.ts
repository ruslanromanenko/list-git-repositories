import { createSlice } from "@reduxjs/toolkit";
import { IRepositoriesState } from "../types/interfaces/IRepositoriesState";
import { Statuses } from "../types/enums/Statuses";
import { fetchRepositoriesAsync } from "./operations";

const initialState: IRepositoriesState = {
  repositoriesData: [],
  status: Statuses.Loading,
  error: null,
  totalCount: 0,
};

const repositoriesSlice = createSlice({
  name: "repositories",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchRepositoriesAsync.pending]: (state, action) => {
      state.status = Statuses.Loading;
      state.error = null;
    },
    [fetchRepositoriesAsync.fulfilled]: (state, action) => {
      state.status = Statuses.Resolved;
      state.repositoriesData = action.payload.items;
      state.totalCount = action.payload.total_count;
    },
    [fetchRepositoriesAsync.rejected]: (state, action) => {
      state.status = Statuses.Rejected;
      state.error = action.payload;
    },
  },
});

export default repositoriesSlice.reducer;
