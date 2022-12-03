import { useEffect, createContext, useState } from "react";
import axios from "axios";

import "./App.scss";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";

import Header from "./Header";
import Article from "./Article";
import CategoryList from "./CategoryList";
import NewPost from "./NewPost";
import Spacing from "./Spacing";

import useApplicationData from "../hooks/useApplicationData";
import useVisualMode from "../hooks/useVisualMode";
import { getShowForPost, getUserForPost, getFavouritesByUser } from "../helpers/selectors";

export const ApplicationContext = createContext();

function App() {
  const [user, setUser] = useState({})
  const userId = localStorage.getItem('teeboUser');
  const applicationData = useApplicationData();
  const {
    state,
    hideSpoiler,
    handleSpoilerToggle,
    getFilteredShows,
    getAllShows,
    deleteFavourites,
    updateFavourites,
    loadApplicationState
  } = applicationData;

  useEffect(() => {
    const userId = localStorage.getItem('teeboUser');
    console.log("userId", userId)
    if (!userId) {
      // redirect to login
    }
    axios.get(`http://localhost:3001/api/users/${userId}`)
    .then(res => {
      console.log("userid response", res.data);
      setUser(res.data);
    })

    loadApplicationState();
  }, [ state.posts.length]);

  const favouriteShows = getFavouritesByUser(state, userId)

  // state.posts.length, state.comments.length, state.favourites.length
  // const { user } = useContext(AccountContext);
  // const favouriteShows = getFavouritesByUser(state, user.userId)

  const articleList = state.filerteredPosts.map((post) => {
    const show = getShowForPost(state, post.tvshow_id);
    const user = getUserForPost(state, post.user_id);

    return (
      <Article
        key={post.id}
        {...post}
        show={show}
        user={user}
        spoiler={hideSpoiler && post.spoiler}
      />
    );
  });

  // console.log("cookie", document.cookie);

  return (
    
    <ApplicationContext.Provider value={applicationData}>    
      <Header/>
      <Spacing />
        <main>
        {user &&
          <section className="category-filters">
            <CategoryList
              state={state}
              user={user}
              deleteFavourites={deleteFavourites}
              updateFavourites={updateFavourites}
              shows={favouriteShows}
              hideSpoilers={handleSpoilerToggle}
              getFilteredShows={getFilteredShows}
              getAllShows={getAllShows}
            />
          </section>
        }
        {favouriteShows.length === 0 && user &&
        <h4>you have no favourite shows! :( <br /> add your favourite shows to filter them :)</h4>}

        {user && <NewPost
          user={user}
          state={state}
        />}
        <section className="article-container">{articleList}</section>
      </main>    
  
    </ApplicationContext.Provider>
  );
}
export default App;