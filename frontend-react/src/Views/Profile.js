import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import BeatLoader from "react-spinners/BeatLoader";

import "./Profile.scss"
import "../components/Button.scss"

import Header from '../components/Header';
import Spacing from '../components/Spacing';
import CategoryList from '../components/CategoryList';
import Article from '../components/Article';
import Button from '../components/Button';
import Footer from '../components/Footer';
import ScrollToTop from '../components/ScrollToTop';

import useApplicationData from '../hooks/useApplicationData'; 
import { getPostsByUser, getShowForPost, getFavouritesByUser } from '../helpers/selectors';



export default function Profile() {
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState({})

  const navigate = useNavigate()

  const applicationData = useApplicationData();
  const {
    state,
    hideSpoiler,
    handleSpoilerToggle,
    getFilteredShows,
    getAllShows,
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

  const favouriteShows = getFavouritesByUser(state, user.id)

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
          getFilteredShows={getFilteredShows}
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
              <button className="pill-container edit-profile-button">
                edit profile
              </button>
            </Link>
          </section>
          <section className="category-filters">
              <CategoryList
                state={state}
                user={user}
                shows={favouriteShows}
                hideSpoilers={handleSpoilerToggle}
                getFilteredShows={getFilteredShows}
                getAllShows={getAllShows}
              />
            </section>
          {/* <CategoryListItem
            spoiler
            user={user}
            state={state}
            name="hide spoilers"
            onClick={handleSpoilerToggle}
          /> */}
          <section className="article-container profile-article-container">{articleList}</section>
        </>
      }
      <ScrollToTop />
      <Footer />
    </>
  )
}