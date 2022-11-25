import React from "react";
import "./Category.scss"

export default function Category(props) {
  return (
    <div className="article-tags">
      {props.name}
    </div>
  );
}