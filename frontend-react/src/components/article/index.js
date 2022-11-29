import "./Article.scss"

import CategoryTag from "./CategoryTag";
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
            src={props.image}
            alt=""
          >
          </img>
        </div>
        <div className="article-buttons">
          <img 
            className="profile-icon"
            src={props.user.icon_url}
            alt={props.user.user_name}
          >
          </img>
          <div className="actions">
            <i className="fa-solid fa-star"></i>
              <p>{props.total_likes}</p>
            <i
              className="fa-solid fa-comment-dots"
              onClick={toggleComments}
            >
            </i>
              <p>{props.total_comments}</p>
            <i className="fa-solid fa-circle-plus"></i>
          </div>
        </div>
      </div>
      <CategoryTag
        name={props.show.name}
      />
      { mode === SHOW && <CommentList postId={props.id}/>}
    </article>
  );
}