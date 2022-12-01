import "./App.scss";

import Header from "./Header/index";
import Article from "./Article";
import CategoryList from "./CategoryList";
import NewPost from "./NewPost";
import UserContext from "./AccountContext";
import { useEffect, useContext, createContext } from "react";
import useApplicationData from "../hooks/useApplicationData";
import { getShowForPost, getUserForPost } from "../helpers/selectors";
import Spacing from "./Spacing";

export const ApplicationContext = createContext();

function App() {
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
      <Header />
      <Spacing />
      <main>
        {/* <EditProfile /> */}
        {/* <Profile /> */}
        <section className="category-filters">
          <CategoryList
            shows={state.shows}
            hideSpoilers={handleSpoilerToggle}
            getFilteredShows={getFilteredShows}
            getAllShows={getAllShows}
          />
        </section>
        {/* <button onClick={getCookie}>getCookie</button> */}
        {document.cookie && <NewPost />}
        <section className="article-container">{articleList}</section>
      </main>
    </ApplicationContext.Provider>
  );
}
export default App;
