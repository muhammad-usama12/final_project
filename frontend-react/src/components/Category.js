import React from "react";
import "./Category.scss"

// We pass props from Article.js, and App.js
export default function Category(props) {
  return (
    <div className="article-tags">
      {props.name}
    </div>
  );
}