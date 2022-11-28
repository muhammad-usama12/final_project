import React from "react";
import axios from "axios";

import Button from "../Button";

import useApplicationData from "../../hooks/useApplicationData";

export default function CommentForm(props) {
  const {
    text, setText,
    error, setError
  } = useApplicationData()

  const saveComment = () => {
    axios.post("/api/posts/new",{
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