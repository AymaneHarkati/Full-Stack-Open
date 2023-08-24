import { createSlice } from "@reduxjs/toolkit";

const user = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    saveUser(state, action) {
      return action.payload;
    },
  },
});

export const { saveUser } = user.actions;

export default user.reducer;
