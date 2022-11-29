import React from "react";
import "../Category.scss"

// The show name that appears on the bottom of an article
export default function CategoryTag(props) {
  return (
    <div className="pill-container">
      {props.name}
    </div>
  );
}