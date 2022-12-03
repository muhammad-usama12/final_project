import React from "react";

export default function CommentListItem(props) {
  const userId = localStorage.getItem('teeboUser');
  console.log("user in listitem",props.user)
  return (
    <div className="comment-item">
      <div className="comment-and-profile-image">
        <div className="screen">
          <p>{props.text}</p>
        </div>
        <img 
          className="profile-icon"
          src={props.user.icon_url}
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