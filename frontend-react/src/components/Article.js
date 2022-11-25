import React from "react";
import "./Article.scss"
import Category from "./Category"

// We pass props from App.js
// Will probably make another component that passes props to Article.js instead of App.js similar to DayList and DayListItem from scheduler
export default function Article(props) {
  return (
    <article>

      <div className="screen-and-buttons">

        <div className="screen">
          <p>
            {props.text}
          </p>
          <img 
            className="article-image"
            src={props.image}
            alt=""
          >
          </img>
        </div>

        <div className="article-buttons">
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

      <Category
        name={props.category}
      />

    </article>
  );
}