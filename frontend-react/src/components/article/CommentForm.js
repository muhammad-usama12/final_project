import React, { useState } from "react";
import Button from "../Button";

export default function CommentForm(props) {
 
  const [text, setText] = useState("");

  return (
    <div className="comment-form">
      {props.error !== "" && <p className="error">{props.error}</p>}
      <form onSubmit={(event) => event.preventDefault()} autoComplete="off">
        <textarea
          name="text"
          type="text"
          placeholder="get his ass"
          value={text}
          onChange={(event) => setText(event.target.value)}
        />
      </form>
      <Button
        confirm
        className="button--confirm"
        message="greenlight"
        onClick={() => props.validate(text)}
      />
    </div>
  );
}
