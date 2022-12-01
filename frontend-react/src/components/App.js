import "./App.scss";

import Header from "./Header/index";
import Article from "./Article";
import CategoryList from "./CategoryList";
import NewPost from "./NewPost";
import Profile from "./Profile"
import Spacing from "./Spacing";

import { useEffect, createContext } from "react";

import useApplicationData from "../hooks/useApplicationData";
import { getShowForPost, getUserForPost } from "../helpers/selectors";
import useVisualMode from "../hooks/useVisualMode";

export const ApplicationContext = createContext();

function App() {
  const DASHBOARD = "DASHBOARD";
  const PROFILE = "PROFILE";

  const { mode, transition } = useVisualMode(DASHBOARD)

  const applicationData = useApplicationData();
  const {
    state,
    hideSpoiler,
    handleSpoilerToggle,
    getFilteredShows,
    getAllShows,
    loadApplicationState,
  } = applicationData;

  useEffect(() => {
    loadApplicationState();
  }, []);

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
      />
      <Spacing />
      { mode === PROFILE && <Profile
      />}
      <main>
        {/* <EditProfile /> */}
        { mode === DASHBOARD &&
          <section className="category-filters">
            <CategoryList
              shows={state.shows}
              hideSpoilers={handleSpoilerToggle}
              getFilteredShows={getFilteredShows}
              getAllShows={getAllShows}
            />
          </section>
        }
          
          {/* <button onClick={getCookie}>getCookie</button> */}
          {mode === DASHBOARD && (document.cookie && <NewPost />)}
          {mode === DASHBOARD && <section className="article-container">{articleList}</section>}
      </main>
    </ApplicationContext.Provider>
  );
}
export default App;
