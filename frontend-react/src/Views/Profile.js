import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import BeatLoader from "react-spinners/BeatLoader";

import "./Profile.scss"
import "../components/Button.scss"

import Header from '../components/Header';
import Spacing from '../components/Spacing';
import CategoryListItem from '../components/CategoryListItem';
import Article from '../components/Article';
import Button from '../components/Button';

import useApplicationData from '../hooks/useApplicationData'; 
import { getPostsByUser, getShowForPost } from '../helpers/selectors';
import Footer from '../components/Footer';

export default function Profile() {
  const [loading, setLoading] = useState(false)
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
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 500)

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

  console.log("state in profile: ", state)

  const posts = getPostsByUser(state, user.id);
  const articleList = posts.map((post) => {
    const show = getShowForPost(state, post.tvshow_id);

    return (
      <div className="profile-article">
        <Article
          key={post.id}
          {...post}
          state={state}
          show={show}
          user={user}
          spoiler={hideSpoiler && post.spoiler}
        />
        <Button
          trash
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
      { loading ? 
        <BeatLoader
          className="loader"
          color={"#D9D9D9"}
          loading={loading}
          size={30}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
        :
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
            name="hide spoilers"
            onClick={handleSpoilerToggle}
          />
          <section className="article-container profile-article-container">{articleList}</section>
        </>
      }
      <Footer />
    </>
  )
}