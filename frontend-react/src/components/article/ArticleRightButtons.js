import React, { useState } from "react";


export default function ArticleRightButtons(props) {

  const [like, setLike] = useState(props.likes);
  const handleClick = () => {
    setLike( like + 1 );
  };


  return (
    <div className="article-buttons">
      <img 
        className="profile-icon"
        src="https://i.pinimg.com/474x/ce/9c/ab/ce9cab218f2849c81f230e4296fd120c.jpg"
        alt="profile"
      >
      </img>
      <div className="actions">
      <button onClick={handleClick} >
        <i className="fa-solid fa-star"></i>
          <p>{like}</p>
          </button>
        <i
          className="fa-solid fa-comment-dots"
          onClick={props.toggleComments}
        >
        </i>
          <p>{props.comments}</p>
        <i className="fa-solid fa-circle-plus"></i>
      </div>
    </div>
  );
}