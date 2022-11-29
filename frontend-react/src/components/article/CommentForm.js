import React, { useState } from "react";

import Button from "../Button";
import useApplicationData from "../../hooks/useApplicationData";

export default function CommentForm() {
  const [text, setText] = useState("");
  const [error, setError] = useState(null);

  const { saveComment } = useApplicationData();

  function validate() {
    if (text === "") {
      setError("can't get his ass with no words, bestie");
    }
    else {
      saveComment(text);
    }
  }

  return (
    <div className="comment-form">
      {error !== "" && <section>{error}</section>}
      <form onSubmit={event => event.preventDefault()} autoComplete="off">
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
        onClick={validate}
      />
    </div>
  );
}