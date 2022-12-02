import React, { useState } from "react";
import classNames from "classnames";

export default function CategoryListItem(props) {
  const [clicked, setClicked] = useState(false);

  const categoryclass = classNames("pill-container category-item", {
    "profile-hide-spoiler": props.spoiler,
    "show-all": props.showAll,
    "clicked": props.spoiler && clicked
  });

  const handleClick = () => {
    if (!clicked) {
      setClicked(true);
    } else {
      setClicked(false)
    }
    props.onClick();
  }

  return (
    <div
      className={categoryclass}
      onClick={handleClick}
    >
      <p>{props.name}</p>
      <img src={props.img} alt=""></img>
    </div>
  );
}