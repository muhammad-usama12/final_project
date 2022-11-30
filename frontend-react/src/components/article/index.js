import "./Article.scss";

import CategoryTag from "./CategoryTag";
import CommentList from "./CommentList";
import { useState } from "react";
import useVisualMode from "../../hooks/useVisualMode";
import classNames from "classnames";
import axios from "axios";

export default function Article(props) {
  // This checks if props.spoiler is true, and if it is, apply the "spoiler" class to blur spoiler posts
  const ifSpoilerClass = classNames("screen", { spoiler: props.spoiler });

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
  const [likecounter, setLikecounter] = useState(props.total_likes);
  const [commentcounter, setCommentcounter] = useState(props.total_comments);

  const post_id = props.id;

  const addLike = (e) => {
    e.preventDefault();
    axios
      .put(`/api/posts/${post_id}/like`)
      .then((res) => {
        setLikecounter(() => res.data.total_likes);
      })
      .catch((err) => console.log("error from addlike", err));
  };
  const commentCounter = () => {
    axios
      .put(`/api/comments/${post_id}/counter`)
      .then((res) => {
        console.log("res from comment", res.data.count);
        setCommentcounter(() => res.data.count);
      })
      .catch((err) => console.log("error from addlike", err));
  };
  commentCounter();

  return (
    <article>
      <div className="screen-and-buttons">
        <div className={ifSpoilerClass}>
          <p>{props.text}</p>
          <img className="article-image" src={props.image} alt=""></img>
        </div>
        <div className="article-buttons">
          <img
            className="profile-icon"
            src={props.user.icon_url}
            alt={props.user.user_name}
          ></img>
          <div className="actions">
            <button onClick={addLike}>
              <i className="fa-solid fa-star"></i>
              <p>{likecounter}</p>
            </button>
            <i
              className="fa-solid fa-comment-dots"
              onClick={toggleComments}
            ></i>

            <p>{commentcounter}</p>

            <i className="fa-solid fa-circle-plus"></i>
          </div>
        </div>
      </div>
      <CategoryTag name={props.show.name} />
      {mode === SHOW && <CommentList postId={props.id} />}
    </article>
  );
}
