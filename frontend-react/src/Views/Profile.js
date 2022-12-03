import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

import "../components/Profile/Profile.scss"

import Header from '../components/Header';
import Spacing from '../components/Spacing';
import CategoryListItem from '../components/CategoryListItem';
import Article from '../components/Article';
import Button from '../components/Button';

import useApplicationData from '../hooks/useApplicationData'; 
import { getPostsByUser, getShowForPost } from '../helpers/selectors';

export default function Profile() {
  const [user, setUser] = useState({})

  const navigate = useNavigate()

  const applicationData = useApplicationData();
  const {
    state,
    handleSpoilerToggle,
    hideSpoiler,
    deletePost,
    logout,
    loadApplicationState
  } = applicationData;

  useEffect(() => {
    loadApplicationState()

    const userId = localStorage.getItem('teeboUser');
    if (!userId) {
      navigate('/login')
    }
    axios.get(`http://localhost:3001/api/users/${userId}`)
    .then(res => {
      console.log("userid response", userId, res)
      setUser(res.data)
    })
  },[ state.posts.length ])

  const posts = getPostsByUser(state, user.id);
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
        <Button
          message={<i className="fa-solid fa-trash-can"></i>}
          onClick={() => deletePost(post.id)}
        />
      </div>
    );
  });
 
  return (
    <>
      <Header
        logout={logout}
      />
      <Spacing />
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
        <Link to="/profile/edit">
          <div className="pill-container edit-profile-button">
            edit profile
          </div>
        </Link>
      </section>
      <CategoryListItem
        spoiler
        user={user}
        state={state}
        name="Hide Spoilers"
        onClick={handleSpoilerToggle}
      />
      <section className="article-container profile-article-container">{articleList}</section>
    </>
  )
}