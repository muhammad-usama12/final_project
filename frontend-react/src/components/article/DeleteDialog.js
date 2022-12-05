import React from "react";
import "./DeleteDialog.scss";

function DeleteDialog(props) {
  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <button
            onClick={() => {
              props.close(false);
            }}
          >
            X
          </button>
        </div>
        <div className="title">
          <h1>Are you sure you want to delete the post?</h1>
        </div>
        <div className="body"></div>
        <div className="footer">
          <button
            onClick={() => {
              props.close(false);
            }}
            id="cancelBtn"
          >
            Cancel
          </button>
          <button onClick={props.open} id="deletebtn">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteDialog;
