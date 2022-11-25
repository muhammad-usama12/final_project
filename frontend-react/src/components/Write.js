import React, { useState } from "react";
import "./Write.scss";
import Button from "./Button";

export default function Write(props) {
  const [text, setText] = useState("");
  const [show, setShow] = useState("");

  return (
    <div className="write-post">
      <form onSubmit={event => event.preventDefault()} autoComplete="off">
          <textarea
            name="text"
            type="text"
            placeholder="what do the people need to hear..."
            value={text}
            onChange={(event) => setText(event.target.value)}
          />
          <input
            name="show"
            type="text"
            placeholder="sorry, which show again?"
            value={show}
            onChange={(event) => setShow(event.target.value)}
          />
        </form>
        <div className="write-buttons">
          <div className="left-buttons">
            <Button
              cancel
              className="button--cancel"
              type="cancel"
              onClick={props.onCancel}
            />
          </div>
          <div className="right-buttons">
            <Button
              image
              className="button--image"
              type={<i className="fa-solid fa-image"></i>}
            />
            <Button
              confirm
              className="button--confirm"
              type="greenlight"
            />
          </div>
        </div>
    </div>
  );
}