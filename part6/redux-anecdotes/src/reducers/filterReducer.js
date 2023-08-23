import { createSlice } from "@reduxjs/toolkit";

const initialState = "";

const filter = createSlice({
  name: "filter",
  initialState,
  reducers: { 
    filterChange(state, action) {
      return action.payload;
    }
  }
});

export const { filterChange } = filter.actions;
export default filter.reducer;
