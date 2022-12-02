import React, { useState } from "react";
import classNames from "classnames";
import axios from "axios";

export default function CategoryListItem(props) {
  const [clicked, setClicked] = useState(false);

  const categoryclass = classNames("pill-container category-item", {
    "profile-hide-spoiler": props.spoiler,
    "show-all": props.showAll,
    "clicked": props.spoiler && clicked,
    "current-user-favourite": props.favourite
  });

  // hardcoded user
  const userId = 1;
  
  const updateFavourites = (tvShowId, userId) => {
    axios.post(`/api/favourites/new`, {
      user_id: userId,
      tvshow_id: tvShowId
    })
    .then(() => console.log("favourites updated"))
    .catch(err => console.log("update favourites failed", err.message, "userid and tvshowid", userId, tvShowId))
  }

  const deleteFavourites = (tvShowId, userId) => {
    axios.delete(`/api/favourites/delete`, {
      user_id: userId,
      tvshow_id: tvShowId
    })
    .then(() => console.log("favourite deleted"))
    .catch(err => console.log("delete favourite failed", err.message, "userid and tvshowid", userId, tvShowId))
  }

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
      onClick={() => deleteFavourites(props.tvShowId, userId)}
    >
      <p>{props.name}</p>
      <img src={props.img} alt=""></img>
    </div>
  );
}