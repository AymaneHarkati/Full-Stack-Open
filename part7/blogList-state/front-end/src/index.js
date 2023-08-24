import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import notifReducers from "./reducers/notifReducers";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import blogRedcuers from "./reducers/blogRedcuers";
import userReducers from "./reducers/userReducers";
import { BrowserRouter as Router } from "react-router-dom";

const store = configureStore({
  reducer: {
    notif: notifReducers,
    blog: blogRedcuers,
    user: userReducers,
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
);
