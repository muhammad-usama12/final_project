import React from "react";
import "./Article.scss"
import Category from "./Category"
import ArticleRightButtons from "./ArticleRightButtons";

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
        <ArticleRightButtons />
      </div>
      <Category name={props.category} />
    </article>
  );
}