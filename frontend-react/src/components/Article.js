import React from "react";
import "./Article.scss"

import like from './images/like.png'
import watchlist from './images/watchlist.png'
import comment from './images/comment.png'

export default function Article() {
  return (
    <article>

      <div className="screen-and-buttons">

        <div className="screen">
          <p>
            what if we kissed at the non anti homeless saul goodman bench 😳😳🙈
          </p>
          <img 
            className="article-image"
            src="https://pbs.twimg.com/media/FiXRrxpVEAEDLx4?format=jpg&name=900x900"
            alt=""
          >
          </img>
        </div>

        <div className="buttons">
          <img 
          className="profile-icon"
          src="https://i.pinimg.com/474x/ce/9c/ab/ce9cab218f2849c81f230e4296fd120c.jpg"
          alt="profile"
          >
          </img>

          <div className="actions">
            <img src={like} alt="like" />
            <img src={watchlist} alt="watchlist" />
            <img src={comment} alt="comment" />
          </div>
        </div>

      </div>

      <div className="article-tags">
        the office
      </div>

    </article>
  );
}