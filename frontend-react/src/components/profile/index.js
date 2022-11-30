import React, { useContext } from "react";
import { Link } from "react-router-dom";

import "./Profile.scss";

import Header from "../Header";
import Article from "../Article";
import CategoryList from "../CategoryList";

import useApplicationData from "../../hooks/useApplicationData";
import { getCurrentUser, getPostsByUser, getShowForPost } from "../../helpers/selectors";
import { AccountContext } from "../AccountContext";

export default function Profile() {
  const {
    state,
    hideSpoiler,
    handleSpoilerToggle,
    getFilteredShows,
    getAllShows,
  } = useApplicationData()
  const { user } = useContext(AccountContext);

  const currentUser = getCurrentUser(state, user.userId);  
  const posts = getPostsByUser(state, user.userId)

  const articleList = posts.map((post) => {
    const show = getShowForPost(state, post.tvshow_id);

  return (
    <Article
      key={post.id}
      {...post}
      show={show}
      user={currentUser}
      spoiler={hideSpoiler && post.spoiler}
    />
  );
});

  return (
    <>
      <Header />
      <section className="profile-header">
        <img
          className="profile-display-picture"
          src={ currentUser && currentUser.icon_url }
          alt="profile"
        ></img>
        <div className="handle-and-bio">
          <div className="handle">
            <h1>@{ currentUser && currentUser.username }</h1>
          </div>
          <div className="bio">
            <p> 
              asd
            </p>
            <Link to="/dash">
              <div className="pill-container">Dashboard</div>
            </Link>
          </div>
        </div>
      </section>
      <CategoryList
        shows={state.shows}
        hideSpoilers={handleSpoilerToggle}
        getFilteredShows={getFilteredShows}
        getAllShows={getAllShows}
      />
      <section className="article-container">{articleList}</section>
    </>
  );
}
