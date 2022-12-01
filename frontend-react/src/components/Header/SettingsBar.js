import React from "react";
import { Link } from "react-router-dom";
import "./Header.scss";

export default function SettingsBar(props) {
  return (
    <section className="settings">
      <div className="pill-container">Edit Profile</div>
      <Link to="/login">
        <div className="pill-container" onClick={props.onLogOut}>
          Logout
        </div>
      </Link>
    </section>
  );
}
