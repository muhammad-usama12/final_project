import React, { useState } from "react";
import classNames from "classnames";

export default function CategoryListItem(props) {
  const [clicked, setClicked] = useState(false);

  const user = props.user;

  const categoryclass = classNames("pill-container category-item", {
    "profile-hide-spoiler": props.spoiler,
    "show-all": props.showAll,
    "clicked": props.spoiler && clicked,
    "pill-image": props.img,
   
  });

  console.log("props in item", props)
  const someFavouriteShow = props.tvShowId;

  const handleClick = () => {
    if (props.spoiler) {
      if (!clicked) {
        props.onClick()
        return setClicked(true);
      } else {
        props.onClick()
        return setClicked(false)
      }
    }
    if (someFavouriteShow) {
      return props.deleteFavourites(someFavouriteShow, user.id);
    }
    props.onClick()
  }

  return (
    <>
    <div
      className={categoryclass}
      onClick={handleClick}
    >
      <p className="show-name">{props.name}</p>
      <img src={props.img} alt=""></img>
      {someFavouriteShow && <>&nbsp;</>}
      {someFavouriteShow && <i className="fa-regular fa-circle-xmark"></i>}
    </div>
    </>
  );
}