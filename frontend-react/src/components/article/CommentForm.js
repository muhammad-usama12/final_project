import React from "react";

export default function CommentForm(props) {

  return (
    <div className="comments-container">
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
    </div>
  );
}