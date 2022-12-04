import React from "react";
import "./Watchlist.scss"
import { getWatchlistByUser } from "../helpers/selectors";

export default function Watchlist(props) {

  const userWatchlist = getWatchlistByUser(props.state, props.user.id)
  console.log("props.state", userWatchlist)
  const watchlist = userWatchlist.map((show) => {

    return (
      <div
        key={show.id}
        className="pill-container"
      >
        {show.name}
        <>&nbsp;</>
        <i onClick={() => props.deleteFromWatchlist(show.id, props.user.id)} className="fa-regular fa-circle-xmark"></i>
      </div>
    );
  });

  return (
    <section className="watchlist-page">
      <h1>{props.user.username} still needs to watch:</h1>
      <div className="watchlist">
        {watchlist}
      </div>
    </section>
  );
}