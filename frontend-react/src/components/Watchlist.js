import React from "react";
import "./watchlist.scss"
import { getWatchlistByUser } from "../helpers/selectors";

export default function Watchlist(props) {

  // ******* HARDCODED USER.ID
  const userWatchlist = getWatchlistByUser(props.state, 1)
  const watchlist = userWatchlist.map((show) => {

    return (
      <div className="watchlist-item">
        {show.name}
      </div>
    );
  });

  return (
    <section className="watchlist">
      {watchlist}
    </section>
  );
}