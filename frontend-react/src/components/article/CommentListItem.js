import React from "react";
import Moment from "react-moment";
import { getUser } from "../../helpers/selectors";

export default function CommentListItem(props) {
  const userOfComment = getUser(props.state, props.user);

  return (
    <div className="comment-item">
      
      <div className="comment-and-profile-image">
     
        <div className="screen">
          <p>{props.text}</p>
        </div>
        <img
          className="profile-icon"
          src={userOfComment.icon_url}
          alt="profile"
        ></img>
      </div>
      <div className="timestamp">
        <Moment fromNow>{props.timestamp}</Moment>
      </div>
    </div>
  );
}
