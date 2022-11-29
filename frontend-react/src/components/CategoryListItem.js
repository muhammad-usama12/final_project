import React from "react";

export default function CategoryListItem(props) {
  return (
    <div
      className="pill-container category-item"
      onClick={props.onClick}
    >
      <p>{props.name}</p>
      <img src={props.img} alt=""></img>
    </div>
  );
}