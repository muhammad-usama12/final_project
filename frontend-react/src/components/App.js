import "./App.scss";

import Header from "./Header/index";
import Article from "./Article";
import CategoryList from "./CategoryList";
import NewPost from "./NewPost";
import Profile from "./Profile";
import EditProfile from "./Profile/EditProfile";
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
  const EDIT_PROFILE = "EDIT_PROFILE";

  const { mode, transition } = useVisualMode(DASHBOARD);

  const applicationData = useApplicationData();
  const {
    state,
    hideSpoiler,
    handleSpoilerToggle,
    getFilteredShows,
    getAllShows,
    loadApplicationState
  } = applicationData;

  useEffect(() => {
    loadApplicationState();
  }, []);

  const { user } = useContext(AccountContext);
  const favouriteShows = getFavouritesByUser(state, user.userId)

  console.log("favourite shows",favouriteShows)

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

  console.log("cookie", document.cookie);

  return (
    <ApplicationContext.Provider value={applicationData}>
      <Header
        toggleProfile={() => transition(PROFILE)}
        toggleEditProfile={() => transition(EDIT_PROFILE)}
      />
      <Spacing />
      {mode === PROFILE && <Profile />}
      <main>
        {mode === EDIT_PROFILE && <EditProfile />}
        {mode === DASHBOARD && user.loggedIn &&
          <section className="category-filters">
            <CategoryList
              shows={favouriteShows}
              hideSpoilers={handleSpoilerToggle}
              getFilteredShows={getFilteredShows}
              getAllShows={getAllShows}
            />
          </section>
        }
        {mode === DASHBOARD && favouriteShows.length === 0 && user.loggedIn &&
        <h4>you have no favourite shows! :( <br /> add your favourite shows to filter them :)</h4>}

        {mode === DASHBOARD && user.loggedIn && <NewPost />}
        {mode === DASHBOARD && (
          <section className="article-container">{articleList}</section>
        )}
      </main>
    </ApplicationContext.Provider>
  );
}
export default App;
