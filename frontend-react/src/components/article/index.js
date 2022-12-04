import { useState } from "react";
import axios from "axios";
import classNames from "classnames";

import "./Article.scss";

import CategoryTag from "./CategoryTag";
import CommentList from "./CommentList";

import useVisualMode from "../../hooks/useVisualMode";

export default function Article(props) {
  // This checks if props.spoiler is true, and if it is, apply the "spoiler" class to blur spoiler posts
  const ifSpoilerClass = classNames("screen", { spoiler: props.spoiler });
  const [error, setError] = useState(null);
  const [likecounter, setLikecounter] = useState(props.total_likes);
  const [liked, setLiked] = useState(false);
  const [commentCounter, setCommentCounter] = useState(props.total_comments);
  const post_id = props.id;

  const SHOW = "SHOW";
  const HIDE = "HIDE";

  const likeButtonClass = classNames("fa-solid fa-star", {
    "liked" : liked
  });

  const { mode, transition, back } = useVisualMode(HIDE);

  function toggleComments() {
    if (mode === SHOW) {
      back();
    } else {
      transition(SHOW);
    }
  }

  function validate(text) {
    if (text === "") {
      setError("can't get his ass with no words, bestie");
    } else {
      props.saveComment(text, post_id)
      .then((res) =>setCommentCounter(res))
    }
  }

  const addLike = (e) => {
    if (Object.keys(props.loggedInUser).length === 0) {
      return;
    }
    e.preventDefault();
    axios
      .put(`/api/posts/${post_id}/like`)
      .then((res) => {
        setLikecounter(() => res.data.total_likes);
        setLiked(!liked)
      })
      .catch((err) => console.error(err));
  };

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
            <i
              className={likeButtonClass}
              onClick={addLike}
            ></i>
            <p>{likecounter}</p>
            <i
              className="fa-solid fa-comment-dots"
              onClick={toggleComments}
            ></i>
            <p>{commentCounter}</p>

            <i className="fa-solid fa-circle-plus"></i>
          </div>
        </div>
      </div>
      <CategoryTag name={props.show.name} />

      {mode === SHOW && 
      <CommentList 
      user={props.user}
      error = {error} 
      postId={props.id} 
      validate = {validate}
      state={props.state}
      />}

    </article>
  );
}
