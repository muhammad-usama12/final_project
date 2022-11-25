import React from "react";
import "./Write.scss";

export default function Write() {
  return (
    <div className="write-post">
      <form onSubmit={event => event.preventDefault()} autoComplete="off">
          <textarea
            name="name"
            type="text"
            placeholder="Enter Student Name"
            value=""
          />
          <input
            name="name"
            type="text"
            placeholder="Enter Student Name"
            value=""
          />
        </form>
    </div>
  );
}