import { createSlice } from "@reduxjs/toolkit";

const initialState = null;

const notif = createSlice({
  name: "notif",
  initialState,
  reducers: {
    showNotifications(state, action) {
      switch (action.payload.notif) {
        case "VOTE":
          return `you voted ${action.payload.content}`;
        case "CREATE":
          return `you added an anecdotes with the content : ${action.payload.content}`;
        default:
          return null;
      }
    },
  },
});

export const { showNotifications } = notif.actions;
export const setNotifications = (notif, time) => {
  return async dispatch => {
    const timer = setTimeout(() => dispatch(showNotifications(notif)), time); // 5000 milliseconds = 5 seconds
    return () => clearTimeout(timer); // Clear the timeout when the component unmounts
  }
}
export default notif.reducer;
