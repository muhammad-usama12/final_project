import React, { useContext }from "react";
import { Link } from "react-router-dom";
import { ApplicationContext } from "../App";


export default function Actions(props) {
  const { logout  } = useContext(ApplicationContext)


  return (
    <>
    <p>heyy</p>
   <div className="guest-actions">
      {!document.cookie && <Link to="/login">
      <div className="pill-container">login</div>
      </Link>}
      {!document.cookie && <Link to="/signup">
      <div className="pill-container">sign up</div>
      </Link>}
      {document.cookie && <Link to="/profile">
        <div 
          className="pill-container"
          onClick={props.toggleProfile}
        >
          profile
        </div>
      </Link>}
      <Link to="/">
        <button onClick={logout}>log out</button>
        </Link>

    </div> 
    </>
  );
}