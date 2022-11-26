import React, { useState } from "react";
import "./Article.scss"
import CategoryTag from "./CategoryTag";
import ArticleRightButtons from "./ArticleRightButtons";
import CommentList from "./CommentList";

// We pass props from App.js
// Will probably make another component that passes props to Article.js instead of App.js similar to DayList and DayListItem from scheduler
export default function Article(props) {

  const [comments, setComments] = useState(false)

  return (
    <article>

      <div className="screen-and-buttons">
        <div className="screen">
          <p>{props.text}</p>
          <img 
            className="article-image"
            src={props.img}
            alt=""
          >
          </img>
        </div>
        <ArticleRightButtons
          onComment={() => setComments(true)}
        />
      </div>
      <CategoryTag
        show={props.show}
      />
      { comments && <CommentList  />}

    </article>
  );
}