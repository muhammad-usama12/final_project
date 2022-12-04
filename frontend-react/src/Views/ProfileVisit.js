import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import BeatLoader from "react-spinners/BeatLoader";
import classNames from "classnames";

import "./Profile.scss";
import "../components/Watchlist.scss";
import "../components/Button.scss";

import Header from "../components/Header";
import Spacing from "../components/Spacing";
import CategoryList from "../components/CategoryList";
import Watchlist from "../components/Watchlist";
import Article from "../components/Article";
import Button from "../components/Button";
import Footer from "../components/Footer";
import ScrollToTop from "../components/ScrollToTop";

import useApplicationData from "../hooks/useApplicationData";
import useVisualMode from "../hooks/useVisualMode";
import {
  getPostsByUser,
  getShowForPost,
  getFavouritesByUser,
} from "../helpers/selectors";

import { useParams } from "react-router-dom";

export default function ProfileVisit(props) {
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const [user, setUser] = useState({});
  const [profileUser, setProfileUser] = useState({ id });
  // const stateParamVal = useLocation().state;
  console.log("Props Parameter Value:", id);
  // console.log("Props State Value:", stateParamVal);
  console.log("CURRENT USER:", profileUser.id);

  const WATCHLIST = "WATCHLIST";
  const POSTS = "POSTS";

  const { mode, transition, back } = useVisualMode(POSTS);
  const [togglePosts, setTogglePosts] = useState(true);
  const [toggleWatchlist, setToggleWatchlist] = useState(false);

  const clickPostsClass = classNames("toggle", {
    "toggle-posts": togglePosts,
  });

  const clickWatchlistClass = classNames("toggle", {
    "toggle-watchlist": toggleWatchlist,
  });

  const applicationData = useApplicationData();
  const {
    state,
    hideSpoiler,
    handleSpoilerToggle,
    getFilteredShows,
    getAllShows,
    addToWatchList,
    logout,
    saveComment,
    loadApplicationState,
  } = applicationData;

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 500);

    loadApplicationState();

    const userId = localStorage.getItem("teeboUser");

    axios.get(`http://localhost:3001/api/users/${userId}`).then((res) => {
      console.log("userid response", userId, res);
      setUser(res.data);
    });


    axios.get(`http://localhost:3001/api/users/${profileUser.id}`).then((res) => {
      console.log("userid response", res.data.id);
      setProfileUser(res.data);
    });
  }, []);

  // const handleChange = async (query) => {
  //   await axios
  //     .get(`https://api.tvmaze.com/search/shows?q=${query}`)
  //     .then((res) => {
  //       console.log("data from profile:", res.data);
  //       setUser(res.data);
  //     });
  // };

  // axios.get(`http://localhost:3001/api/users/${user.id}`).then((res) => {
  //   console.log("userid response", res);
  //   setUser(res.data);
  // });

  const favouriteShows = getFavouritesByUser(state, profileUser.id);

  const posts = getPostsByUser(state, profileUser.id);
  const articleList = posts.map((post) => {
    const show = getShowForPost(state, post.tvshow_id);

    return (
      <div className="profile-article">
        <Article
          key={post.id}
          {...post}
          state={state}
          show={show}
          loggedInUser={user}
          user={profileUser}
          spoiler={hideSpoiler && post.spoiler}
          getFilteredShows={getFilteredShows}
          addToWatchList={addToWatchList}
          saveComment={saveComment}
        />
      </div>
    );
  });

  return (
    <>
      <Header logout={logout} />
      <Spacing />
      {loading ? (
        <BeatLoader
          className="loader"
          color={"#D9D9D9"}
          loading={loading}
          size={30}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      ) : (
        <>
          <section className="profile-header">
            <img
              className="profile-display-picture"
              src={profileUser.icon_url}
              alt="profile"
            ></img>
            <div className="handle-and-bio">
              <div className="handle">
                <h1>@{profileUser.username}</h1>
              </div>
              <div className="bio">
                <p>{profileUser.bio}</p>
              </div>
            </div>
          </section>
          <section className="posts-watchlist">
            <div className="toggleWatchlist">
              <div
                className={clickPostsClass}
                onClick={() => {
                  setTogglePosts(true);
                  setToggleWatchlist(false);
                  back();
                }}
              >
                posts
              </div>
              <div
                className={clickWatchlistClass}
                onClick={() => {
                  setToggleWatchlist(true);
                  setTogglePosts(false);
                  transition(WATCHLIST);
                }}
              >
                watchlist
              </div>
            </div>
          </section>
          {mode === WATCHLIST && <Watchlist state={state} profileUser={profileUser} />}
          {mode === POSTS && (
            <section className="category-filters">
              <CategoryList
                state={state}
                user={profileUser}
                shows={favouriteShows}
                hideSpoilers={handleSpoilerToggle}
                getFilteredShows={getFilteredShows}
                getAllShows={getAllShows}
              />
            </section>
          )}
          {/* <CategoryListItem
              spoiler
              user={user}
              state={state}
              name="hide spoilers"
              onClick={handleSpoilerToggle}
            /> */}
          {mode === POSTS && (
            <section className="article-container profile-article-container">
              {articleList}
            </section>
          )}
        </>
      )}
      <ScrollToTop />
      <Footer />
    </>
  );
}
