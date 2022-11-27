import React from "react";
import "./Article.scss"
import CategoryTag from "./CategoryTag";
import ArticleRightButtons from "./ArticleRightButtons";
import CommentList from "./CommentList";
import useVisualMode from "../../hooks/useVisualMode";


export default function Article(props) {
  const SHOW = "SHOW";
  const HIDE = "HIDE";
  
  const { mode, transition, back } = useVisualMode(HIDE);

  function toggleComments() {
    if (mode === SHOW) {
      back();
    } else {
      transition(SHOW);
    }
  }

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
          onComment={toggleComments}
        />
      </div>
      <CategoryTag
        show={props.show}
      />
      { mode === SHOW && <CommentList />}

    </article>
  );
}