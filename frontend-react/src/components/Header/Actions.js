import React from "react";
import { Link } from "react-router-dom";

export default function Actions(props) {

  return (
    <>
      <div className="guest-actions">
        {!document.cookie && <Link to="/login">
        <div className="pill-container">login</div>
        </Link>}
        {!document.cookie && <Link to="/signup">
        <div className="pill-container">sign up</div>
        </Link>}
        {document.cookie && <Link to="/profile">
          <div className="pill-container">
            profile
          </div>
        </Link>}
        {document.cookie && <Link to="/login">
          <div className="pill-container" onClick={props.logout}>log out</div>
        </Link>}

      </div> 
    </>
  );
}