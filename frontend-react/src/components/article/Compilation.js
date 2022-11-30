import "../App.scss";

import Header from "../Header/index";
import Article from "../Article";
import CategoryList from "../CategoryList";
import NewPost from "../NewPost";
import UserContext from "../AccountContext";

import useApplicationData from "../../hooks/useApplicationData";
import { getShowForPost, getUserForPost } from "../../helpers/selectors";

function Compilation() {
  const {
    state,
    hideSpoiler,
    handleSpoilerToggle,
    getFilteredShows,
    getAllShows,
  } = useApplicationData();

  const articleList = state.posts.map((post) => {
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
    <UserContext>
      <div>
        <Header />
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
      </div>
    </UserContext>
  );
}
export default Compilation;
