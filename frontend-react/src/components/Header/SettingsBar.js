import React from "react";
import { Link } from "react-router-dom";

import "./Header.scss";

export default function SettingsBar(props) {
  return (
    <section className="settings">
      <Link to="/dash">
        <div className="pill-container">Dashboard</div>
      </Link>
      {document.cookie && <Link to="/profile/edit">
        <div className="pill-container">Edit Profile</div>
      </Link>}
      {document.cookie && <Link to="/login">
        <div className="pill-container" onClick={props.onLogOut}>
          Logout
        </div>
      </Link>}
      {!document.cookie && <Link to="/login">
        <div className="pill-container">Login</div>
      </Link>}
      {!document.cookie && <Link to="/signup">
        <div className="pill-container">Signup</div>
      </Link>}
    </section>
  );
}
