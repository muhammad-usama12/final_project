import React from "react";
import "./Profile.scss";

export default function Profile(props) {
  return (
    <section className="profile-header">
      <img 
        className="profile-display-picture"
        src="https://i.pinimg.com/474x/ce/9c/ab/ce9cab218f2849c81f230e4296fd120c.jpg"
        alt="profile"
      >
      </img>
      <div className="handle-and-bio">
        <div className="handle">
          <h1>@blackbeardsbarANDmilfs</h1>
        </div>
        <div className="bio">
          <p>adam / 27 / 🇨🇦  / the office is my personality yes you can bully me but occasionally i have opinions on friends</p>
        </div>
      </div>
    </section>
  );
}