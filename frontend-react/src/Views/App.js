import { useEffect, createContext, useState } from "react";
import axios from "axios";
import BeatLoader from "react-spinners/BeatLoader";

import "./App.scss";
import { Link } from "react-router-dom";

import Header from "../components/Header";
import Footer from "../components/Footer";
import Article from "../components/Article";
import CategoryList from "../components/CategoryList";
import NewPost from "../components/NewPost";
import Spacing from "../components/Spacing";

import useApplicationData from "../hooks/useApplicationData";
import {
  getShowForPost,
  getUser,
  getFavouritesByUser,
} from "../helpers/selectors";
import ScrollToTop from "../components/ScrollToTop";

export const ApplicationContext = createContext();

function App() {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({});
  const applicationData = useApplicationData();
  const {
    state,
    hideSpoiler,
    handleSpoilerToggle,
    getFilteredShows,
    getAllShows,
    deleteFavourites,
    updateFavourites,
    addToWatchList,
    deleteFromWatchlist,
    logout,
    saveComment,
    loadApplicationState,
  } = applicationData;

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 500);

    const userId = localStorage.getItem("teeboUser");

    axios.get(`http://localhost:3001/api/users/${userId}`).then((res) => {
      setUser(res.data);
    });

    loadApplicationState();
  }, [state.posts.length, state.favourites.length]);

  const favouriteShows = getFavouritesByUser(state, user.id);

  console.log("user", user);

  const articleList = state.filerteredPosts.map((post) => {
    const show = getShowForPost(state, post.tvshow_id);
    const postUser = getUser(state, post.user_id);

    // This is confusing I know but...
    // user = user for the specific post
    // profileUser = the user who is logged in >>> this is used to make sure people who aren't logged in can't like posts
    return (
      <Article
        key={post.id}
        {...post}
        state={state}
        show={show}
        user={postUser}
        loggedInUser={user}
        saveComment={saveComment}
        spoiler={hideSpoiler && post.spoiler}
        getFilteredShows={getFilteredShows}
        addToWatchList={addToWatchList}
        deleteFromWatchlist={deleteFromWatchlist}
      />
    );
  });

  return (
    <ApplicationContext.Provider value={applicationData}>
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
        <main>
          {user.id && (
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
          )}
          {favouriteShows.length === 0 && user.id && (
            <h4>
              you have no favourite shows! :( <br />
              <Link to="/profile/edit">add your favourite shows</Link> to filter
              them :)
            </h4>
          )}

          {user.id && <NewPost user={user} state={state}/>}
          <section className="article-container">{articleList}</section>
        </main>
      )}
      <ScrollToTop />
      <Footer />
    </ApplicationContext.Provider>
  );
}
export default App;
