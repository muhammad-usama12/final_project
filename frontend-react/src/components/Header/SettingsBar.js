import React from "react";
import "./Header.scss";

export default function SettingsBar(props) {

  return (
    <section className="settings">
      <div className="pill-container">
        Edit Profile
      </div>
      <div className="pill-container" onClick={props.onLogOut}>
        Logout
      </div>
    </section>
  );
}