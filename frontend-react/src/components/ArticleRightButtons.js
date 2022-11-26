import React from "react";

export default function ArticleRightButtons() {
  return (
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
  );
}