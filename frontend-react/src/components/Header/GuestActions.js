import React from "react";
import { Link } from "react-router-dom";

export default function GuestActions() {
  return (
    <div className="guest-actions">
      <Link to="/login">
        <div className="pill-container">Login</div>
      </Link>
      <Link to="/signup">
        <div className="pill-container">SignUp</div>
      </Link>
    </div>
  );
}
