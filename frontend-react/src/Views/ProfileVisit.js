import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import BeatLoader from "react-spinners/BeatLoader";

import "../components/Profile/Profile.scss";

import Header from "../components/Header";
import Spacing from "../components/Spacing";
import CategoryListItem from "../components/CategoryListItem";
import Article from "../components/Article";
import Button from "../components/Button";

import useApplicationData from "../hooks/useApplicationData";
import { getPostsByUser, getShowForPost } from "../helpers/selectors";
import { useParams, useLocation } from "react-router-dom";

export default function ProfileVisit(props) {
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const [user, setUser] = useState({ id });
  // const stateParamVal = useLocation().state;
  console.log("Props Parameter Value:", id);
  // console.log("Props State Value:", stateParamVal);
  console.log("CURRENT USER:", user.id);

  // const id = props.id;
  // const navigate = useNavigate();

  const applicationData = useApplicationData();
  const {
    state,
    handleSpoilerToggle,
    hideSpoiler,
    deletePost,
    logout,
    loadApplicationState,
  } = applicationData;

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 500);

    loadApplicationState();

    axios.get(`http://localhost:3001/api/users/${user.id}`).then((res) => {
      console.log("userid response", res.data.id);
      setUser(res.data);
    });
  }, [user.id]);

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

  const posts = getPostsByUser(state, user.id);
  console.log("USER POSTS:", posts);
  const articleList = posts.map((post) => {
    const show = getShowForPost(state, post.tvshow_id);

    return (
      <div className="profile-article">
        <Article
          key={post.id}
          {...post}
          show={show}
          user={user}
          spoiler={hideSpoiler && post.spoiler}
        />
      </div>
    );
  });
  return (
    <>
      <Header />
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
              src={user.icon_url}
              alt="profile"
            ></img>
            <div className="handle-and-bio">
              <div className="handle">
                <h1>@{user.username}</h1>
              </div>
              <div className="bio">
                <p>{user.bio}</p>
              </div>
            </div>
          </section>
          <CategoryListItem
            spoiler
            user={user}
            state={state}
            name="hide spoilers"
            onClick={handleSpoilerToggle}
          />
          <section className="article-container profile-article-container">
            {articleList}
          </section>
        </>
      )}
    </>
  );
}
