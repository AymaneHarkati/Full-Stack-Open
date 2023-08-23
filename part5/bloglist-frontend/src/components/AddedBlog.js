import React from "react";
import "../message.css";
const AddedBlog = ({ message, style }) => {
  if (message != null) return <div id="notification" className={style}>{message} </div>;
};

export default AddedBlog;
