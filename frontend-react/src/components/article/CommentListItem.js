import React from "react";

export default function CommentListItem(props) {
  return (
    <div className="comment-item">
      <div className="comment-and-profile-image">
        <div className="screen">
          <p>{props.text}</p>
        </div>
        <img 
          className="profile-icon"
          src={props.image}
          alt="profile"
        >
        </img>
      </div>
      <div className="timestamp">
        {props.timestamp}
      </div>
    </div>
  );
}