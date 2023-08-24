import React from "react";
import "../message.css";
import { Alert } from "react-bootstrap";
const AddedBlog = ({ message, style }) => {
  if (message != null) {
    return (
      <div id="notification" className="container">
        <Alert variant={style}>{message}</Alert>
      </div>
    );
  }
};

export default AddedBlog;
