import "./App.scss";

import GuestHeader from "./GuestHeader";
import UserHeader from "./UserHeader";
import Article from "./Article";
import CategoryList from "./CategoryList";
import NewPost from "./NewPost";
import Profile from "./Profile";
import EditProfile from "./Profile/EditProfile";
import Views from "./views";

import useApplicationData from "../hooks/useApplicationData";
import { getShowForPost } from "../helpers/selectors";

function App() {
  const { state, hideSpoiler, handleSpoilerToggle, getFilteredShows, getAllShows } = useApplicationData();

  const articleList = state.posts.map((post) => {
    const show = getShowForPost(state, post.tvshow_id);

    return (
      <Article
        key={post.id}
        {...post}
        show={show}
        spoiler={hideSpoiler && post.spoiler}
      />
    );
  });

  console.log("cookie", document.cookie);

  return (
    <div>
      <Views />
      {document.cookie && <UserHeader />}
      {!document.cookie && <GuestHeader />}

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

        <NewPost />
        <section className="article-container">
          {articleList}
        </section>
      </main>
    </div>
  );
}
export default App;
