import React from "react";
import classNames from "classnames";

export default function CategoryListItem(props) {
  const categorylass = classNames("pill-container category-item", {
    "profile-hide-spoiler": props.spoiler
  });

  return (
    <div
      className={categorylass}
      onClick={props.onClick}
    >
      <p>{props.name}</p>
      <img src={props.img} alt=""></img>
    </div>
  );
}