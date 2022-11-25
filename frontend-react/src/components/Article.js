import React from "react";
import "./Article.scss"

export default function Article() {
  return (
    <article>

      <div className="screen-and-buttons">

        <div className="screen">
          <p>
            when is somebody gonna talk to me about the rehearsal the same way guys talk about sports :|
          </p>
          {/* <img 
            className="article-image"
            src="https://pbs.twimg.com/media/FiXRrxpVEAEDLx4?format=jpg&name=900x900"
            alt=""
          >
          </img> */}
        </div>

        <div className="buttons">
          <img 
          className="profile-icon"
          src="https://i.pinimg.com/474x/ce/9c/ab/ce9cab218f2849c81f230e4296fd120c.jpg"
          alt="profile"
          >
          </img>

          <div className="actions">
            <i className="fa-solid fa-star"></i>
            <i className="fa-solid fa-circle-plus"></i>
            <i className="fa-solid fa-comment-dots"></i>
          </div>
        </div>

      </div>

      <div className="article-tags">
        the rehearsal
      </div>

    </article>
  );
}