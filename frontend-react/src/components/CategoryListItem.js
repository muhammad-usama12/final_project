import React, { useContext, useState } from "react";
import classNames from "classnames";

import { ApplicationContext } from "./App";
import { getFavouritesByUser } from "../helpers/selectors";
import { AccountContext } from "./AccountContext";

export default function CategoryListItem(props) {
  const [clicked, setClicked] = useState(false);

  // hardcoded user
  const { user } = useContext(AccountContext)
  const {
    state,
    updateFavourites,
    deleteFavourites
  } = useContext(ApplicationContext)

  const favouriteShows = getFavouritesByUser(state, user.userId)
  const currentFavouriteShow = favouriteShows.find 
  (favouriteShows => favouriteShows.id === props.tvShowId);

  const categoryclass = classNames("pill-container category-item", {
    "profile-hide-spoiler": props.spoiler,
    "show-all": props.showAll,
    "clicked": props.spoiler && clicked,
    "favourite-show": currentFavouriteShow
  });

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
      if (currentFavouriteShow) {
        return deleteFavourites(props.tvShowId, user.userId);
      } else {
        return updateFavourites(props.tvShowId, user.userId)
      }
    }
    props.onClick()
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