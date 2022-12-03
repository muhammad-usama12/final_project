import React, { useState } from "react";
import classNames from "classnames";

import { getFavouritesByUser } from "../helpers/selectors";

export default function CategoryListItem(props) {
  const [clicked, setClicked] = useState(false);

  const user = props.user;
  const state = props.state;

  const favouriteShows = getFavouritesByUser(state, user.id)
  const currentFavouriteShow = favouriteShows.find 
  (favouriteShows => favouriteShows.id === props.tvShowId);

  const categoryclass = classNames("pill-container category-item", {
    "profile-hide-spoiler": props.spoiler,
    "show-all": props.showAll,
    "clicked": props.spoiler && clicked,
    "favourite-show": currentFavouriteShow
  });

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
    if (props.tvShowId) {
      return props.deleteFavourites(props.tvShowId, 1);
    }
    props.onClick()
  }

  return (
    <div
      className={categoryclass}
      onClick={handleClick}
    >
      <p>{props.name}&nbsp;</p>
      <img src={props.img} alt=""></img>
      {someFavouriteShow && <i className="fa-regular fa-circle-xmark"></i>}
    </div>
  );
}