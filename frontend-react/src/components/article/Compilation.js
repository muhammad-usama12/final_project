import { useContext } from "react";
import { AccountContext } from "../AccountContext";

import "../App.scss";

import Article from "../Article";
import CategoryList from "../CategoryList";
import NewPost from "../NewPost";
import UserContext from "../AccountContext";

import { getShowForPost, getUserForPost } from "../../helpers/selectors";

function Compilation(props) {

  const state = props.state;

  const articleList = state.posts.map((post) => {
    const show = getShowForPost(state, post.tvshow_id);
    const user = getUserForPost(state, post.user_id);

    return (
      <Article
        key={post.id}
        {...post}
        show={show}
        user={user}
        spoiler={props.hideSpoiler && post.spoiler}
      />
    );
  });

  console.log("cookie", document.cookie);

  return (
    <UserContext>
      <div>
        <main>
          <section className="category-filters">
            <CategoryList
              shows={state.shows}
              hideSpoilers={props.handleSpoilerToggle}
              getFilteredShows={props.getFilteredShows}
              getAllShows={props.getAllShows}
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
