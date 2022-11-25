import React from "react";
import "./Header.scss"

export default function Header() {
  return (
    <header>
      <i class="fa-solid fa-bars"></i>

      <div className="logo-name">
        <img
          className="logo-image"
          src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBkPSJNMTMuMTEyIDZsMi44ODgtMy4zNzUtLjc4MS0uNjI1LTMuMjE5IDMuNzUtMy4yMTktMy43NS0uNzgxLjYyNSAyLjg4OCAzLjM3NWgtMTAuODg4djE2aDI0di0xNmgtMTAuODg4em03Ljg4OCAxNGgtMTh2LTEyaDE4djEyem0tMi0xaC0xNHYtMTBoMTR2MTB6Ii8+PC9zdmc+"
          alt="logo"
        >
        </img>
        teebo
      </div>

      <img 
        className="profile-icon"
        src="https://i.pinimg.com/474x/ce/9c/ab/ce9cab218f2849c81f230e4296fd120c.jpg"
        alt="profile"
      >
      </img>
    </header>
  );
}