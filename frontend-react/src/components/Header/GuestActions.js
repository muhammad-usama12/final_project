import React from "react";
import { Link } from "react-router-dom";

export default function GuestActions(props) {

  return (
    <div className="guest-actions">
      <Link to="/login">
      <div className="pill-container">Log in</div>
      </Link>
      <Link to="/signup">
      <div className="pill-container">Sign up</div>
      </Link>
    </div>
  );
}