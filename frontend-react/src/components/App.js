import "./App.scss";

import Header from "./Header";
import Article from "./Article";
import CategoryList from "./CategoryList";
import NewPost from "./NewPost";
// import Profile from "./profile";
import Spacing from "./Spacing";

import { useEffect, createContext, useContext } from "react";

import useApplicationData from "../hooks/useApplicationData";
import { getShowForPost, getUserForPost, getFavouritesByUser } from "../helpers/selectors";
import useVisualMode from "../hooks/useVisualMode";
import { AccountContext } from "./AccountContext";

export const ApplicationContext = createContext();

function App() {
  const DASHBOARD = "DASHBOARD";
  const PROFILE = "PROFILE";

  const { mode, transition } = useVisualMode(DASHBOARD);

  const applicationData = useApplicationData();
  const {
    state,
    hideSpoiler,
    handleSpoilerToggle,
    getFilteredShows,
    getAllShows,
    logout,
    loadApplicationState
  } = applicationData;

  useEffect(() => {
    loadApplicationState();
  }, [state.posts.length, state.comments.length, state.favourites.length]);

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
      <Header
        toggleProfile={() => transition(PROFILE)}
        toggleDashboard={() => transition(DASHBOARD)}
        logOut={logout}
      />
      <Spacing />
        <main>
        {/* {user.loggedIn &&
          <section className="category-filters">
            <CategoryList
              shows={favouriteShows}
              hideSpoilers={handleSpoilerToggle}
              getFilteredShows={getFilteredShows}
              getAllShows={getAllShows}
            />
          </section>
        }
        {favouriteShows.length === 0 && user.loggedIn &&
        <h4>you have no favourite shows! :( <br /> add your favourite shows to filter them :)</h4>}

        {user.loggedIn && <NewPost />} */}
        <section className="article-container">{articleList}</section>
      </main>    
    </ApplicationContext.Provider>
  );
}
export default App;