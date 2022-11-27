import React from "react";
import "./SettingsBar.scss";

export default function SettingsBar() {

  return (
    <section className="settings">
      <div className="pill-container">
        Edit Profile
      </div>
      <div className="pill-container">
        Sign Out
      </div>
    </section>
  );
}