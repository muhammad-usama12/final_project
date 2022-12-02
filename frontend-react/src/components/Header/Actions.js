import React from "react";
import { Link } from "react-router-dom";

export default function Actions(props) {

  return (
    <div className="guest-actions">
      {!document.cookie && <Link to="/login">
      <div className="pill-container">log in</div>
      </Link>}
      {!document.cookie && <Link to="/signup">
      <div className="pill-container">sign up</div>
      </Link>}
      {document.cookie &&
      <div 
        className="pill-container"
        onClick={props.toggleProfile}
      >
        profile
      </div>}
      <Link to="/login">
        {document.cookie &&
        <div
          className="pill-container"
          onClick={props.logOut}
        >
          log out
        </div>}
      </Link>
    </div>
  );
}