import React from "react";

export default function CommentListItem(props) {
  return (
    <div className="comment-item">
      <div className="comment-profile">
        <div className="screen">
          <p>{props.comment}</p>
        </div>
        <img 
          className="profile-icon"
          src={props.profile}
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