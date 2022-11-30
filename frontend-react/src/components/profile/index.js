import React from "react";

import "./Profile.scss";

import { getCurrentUser } from "../../helpers/selectors";

export default function Profile(props) {

const state = props.state;

const currentUser = getCurrentUser(state, props.user.userId)

  return (
    <>
      <section className="profile-header">
        <img
          className="profile-display-picture"
          src={currentUser.icon_url}
          alt={currentUser.username}
        ></img>
        <div className="handle-and-bio">
          <div className="handle">
            <h1>@{currentUser.username}</h1>
          </div>
          <div className="bio">
            <p>
              {currentUser.bio}
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
