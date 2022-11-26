import React, { useState } from "react";
import "./Write.scss";
import Button from "../Button";

export default function Write(props) {
  const [text, setText] = useState("");
  const [show, setShow] = useState("");
  const [error, setError] = useState("");


  function cancel() {
    props.onCancel();
  }

  function validate() {
    if (text === "") {
      setError("you can't stir nothing");
      return;
    }
    if (show === "") {
      setError("what show are you even talking about??");
      return;
    }
  
    setError("");
    props.onSave(text, show);
  }

  return (
    <div className="write-post">
      {error !== "" && <section>{error}</section>}
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
              message="cancel"
              onClick={cancel}
            />
          </div>
          <div className="right-buttons">
            <Button
              image
              className="button--image"
              // Below is icon of an image
              message={<i className="fa-solid fa-image"></i>}
            />
            <Button
              confirm
              className="button--confirm"
              message="greenlight"
              onClick={validate}
            />
          </div>
        </div>
    </div>
  );
}