import { createSlice } from '@reduxjs/toolkit'

const notifSlice = createSlice({
  name: "notif",
  initialState: null,
  reducers: {
    setNotif(state, action) {
      return action.payload;
    },
    removeNotif(state, action) {
      return null;
    }
  },
});

export const { setNotif, removeNotif } = notifSlice.actions;

export default notifSlice.reducer;
