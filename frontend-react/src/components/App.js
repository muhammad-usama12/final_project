import { useEffect, createContext, useState } from "react";
import axios from "axios";
import BeatLoader from "react-spinners/BeatLoader";

import "./App.scss";
import { Link } from "react-router-dom";

import Header from "./Header";
import Article from "./Article";
import CategoryList from "./CategoryList";
import NewPost from "./NewPost";
import Spacing from "./Spacing";

import useApplicationData from "../hooks/useApplicationData";
import { getShowForPost, getUser, getFavouritesByUser } from "../helpers/selectors";

export const ApplicationContext = createContext();

function App() {
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState({})
  const applicationData = useApplicationData();
  const {
    state,
    hideSpoiler,
    handleSpoilerToggle,
    getFilteredShows,
    getAllShows,
    deleteFavourites,
    updateFavourites,
    logout,
    saveComment,
    loadApplicationState
  } = applicationData;

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 500)

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
  }, [ state.posts.length, state.favourites.length ]);

  const favouriteShows = getFavouritesByUser(state, user.id)

  console.log("user", user)

  const articleList = state.filerteredPosts.map((post) => {
    const show = getShowForPost(state, post.tvshow_id);
    const user = getUser(state, post.user_id);

    return (
      <Article
        key={post.id}
        {...post}
        show={show}
        user={user}
        saveComment = {saveComment}
        spoiler={hideSpoiler && post.spoiler}
      />
    );
  });

  // console.log("cookie", document.cookie);

  return (
    
    <ApplicationContext.Provider value={applicationData}>
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
        <main>
          { user.id &&
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
          {favouriteShows.length === 0 && user.id &&
          <h4>you have no favourite shows! :( <br /><Link to="/profile/edit">add your favourite shows</Link> to filter them :)</h4>}

          {user.id && <NewPost
            user={user}
            state={state}
          />}
          <section className="article-container">{articleList}</section>
        </main>
      }
    </ApplicationContext.Provider>
  );
}
export default App;