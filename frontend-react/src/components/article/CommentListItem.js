import React from "react";
import Moment from "react-moment";
import { useNavigate } from "react-router-dom";
import { getUser } from "../../helpers/selectors";

export default function CommentListItem(props) {
  const userOfComment = getUser(props.state, props.user);
  const navigate = useNavigate()

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
          onClick={() => {
            navigate(`/profile/${userOfComment.id}`)
            navigate(0)
          }}
        ></img>
      </div>
      <div className="timestamp">
        <Moment fromNow>{props.timestamp}</Moment>
      </div>
    </div>
  );
}
