import "./Article.scss"

import CategoryTag from "./CategoryTag";
import ArticleRightButtons from "./ArticleRightButtons";
import CommentList from "./CommentList";

import useVisualMode from "../../hooks/useVisualMode";
import classNames from "classnames";

export default function Article(props) {

  // This checks if props.spoiler is true, and if it is, apply the "spoiler" class to blur spoiler posts
  const ifSpoilerClass = classNames("screen", { "spoiler": props.spoiler });

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
        <div className={ifSpoilerClass}>
          <p>{props.text}</p>
          <img 
            className="article-image"
            src={props.img}
            alt=""
          >
          </img>
        </div>
        <ArticleRightButtons
          toggleComments={toggleComments}
          likes={props.likes}
          comments={props.comments}
        />
      </div>
      <CategoryTag
        show={props.show}
      />
      { mode === SHOW && <CommentList />}
    </article>
  );
}