import React from "react";
import { Link } from "react-router-dom";

export default function Actions(props) {

  return (
    <>
      <div className="guest-actions">
        {!document.cookie && <Link to="/login">
        <button className="pill-container">login</button>
        </Link>}
        {!document.cookie && <Link to="/signup">
        <button className="pill-container">sign up</button>
        </Link>}
        {document.cookie && <Link to="/profile">
          <button className="pill-container">
            profile
          </button>
        </Link>}
        {document.cookie && <Link to="/login">
          <button className="pill-container" onClick={props.logout}>log out</button>
        </Link>}

      </div> 
    </>
  );
}