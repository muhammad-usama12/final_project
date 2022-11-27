import React from "react";
import "../Category.scss"

// We pass props from Article.js, and App.js
export default function CategoryTag(props) {
  return (
    <div className="pill-container">
      {props.show}
    </div>
  );
}