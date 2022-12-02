import React, { useContext } from "react";

import "./Profile.scss";

import Header from "../Header";
import Article from "../Article";
import CategoryListItem from "../CategoryListItem";
import Spacing from "../Spacing";
import EditProfile from "./EditProfile";
import useVisualMode from "../../hooks/useVisualMode";

import {
  getCurrentUser,
  getPostsByUser,
  getShowForPost,
} from "../../helpers/selectors";

import { AccountContext } from "../AccountContext";
import { ApplicationContext } from "../App";
import Button from "../Button";
import axios from "axios";

export default function Profile(props) {
  const PROFILE = "PROFILE";
  const EDIT_PROFILE = "EDIT_PROFILE";
  const user = useContext(AccountContext);

  const { state, hideSpoiler, handleSpoilerToggle } =
    useContext(ApplicationContext);

  const currentUser = getCurrentUser(state, user.user.userId);

  const deleteArticle = (id) => {
    return axios
      .delete(`/api/posts/${id}`)
      .then((res) => {
        console.log("delete successful", res);
      })
      .then.catch((err) => console.log("delete failed", err.message));
  };

  const posts = getPostsByUser(state, user.user.userId);
  const articleList = posts.map((post) => {
    const show = getShowForPost(state, post.tvshow_id);

    return (
      <div className="profile-article">
        <Article
          key={post.id}
          {...post}
          show={show}
          user={currentUser}
          spoiler={hideSpoiler && post.spoiler}
        />
        <Button
          message={<i className="fa-solid fa-trash-can"></i>}
          onClick={() => deleteArticle(post.id)}
        />
      </div>
    );
  });

  const { mode, transition } = useVisualMode();

  return (
    <>
      <Header
        toggleProfile={() => transition(PROFILE)}
        toggleEditProfile={() => transition(EDIT_PROFILE)}
      />
      <Spacing />
      {mode === EDIT_PROFILE ? (
        <EditProfile />
      ) : (
        <>
          <section className="profile-header">
            <img
              className="profile-display-picture"
              src={currentUser && currentUser.icon_url}
              alt="profile"
            ></img>
            <div className="handle-and-bio">
              <div className="handle">
                <h1>@{currentUser && currentUser.username}</h1>
              </div>
              <div className="bio">
                <p>{currentUser && currentUser.bio}</p>
              </div>
            </div>
          </section>
          <CategoryListItem
            spoiler
            name="Hide Spoilers"
            onClick={handleSpoilerToggle}
          />
          <section className="article-container">{articleList}</section>
        </>
      )}
    </>
  );
}
