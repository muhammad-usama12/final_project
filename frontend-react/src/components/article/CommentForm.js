import React, { useState } from "react";
import axios from "axios";

import Button from "../Button";

export default function CommentForm(props) {
  const [text, setText] = useState("")
  const [error, setError] = useState(null)

  const saveComment = () => {
    axios.post("/api/comments/new",{
        text: text,
    })
      .then((res) => {
        console.log("res from commentForm.js: ", res)
      });
  }

  function validate() {
    if (text === "") {
      setError("can't get his ass with no words, bestie");
    }
    else {
      saveComment();
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