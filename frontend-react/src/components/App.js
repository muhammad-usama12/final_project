import "./App.scss";
import "./App.scss";

import Header from "./Header";
import Article from "./article/Article";
import CategoryList from "./CategoryList";
import NewPost from "./new-post/NewPost";
import Profile from "./profile/Profile";
import EditProfile from "./profile/EditProfile";
import Views from "./views";
import Scripts from "./Scripts";

import useApplicationData from "../hooks/useApplicationData";
// import { getShowCategories } from "../helpers/selectors"

function App() {
  const { state } = useApplicationData();

  const articleList = state.posts.map((post) => {
    return (
      <Article
        key={post.id}
        text={post.text}
        img={post.image}
        show={post.show}
        likes={post.total_likes}
        comments={post.total_comments}
      />
    );
  });

  return (
    <div>
      <Views />
      <Header onClick />
      <main>
        {/* <EditProfile /> */}
        {/* <Profile /> */}
        <section className="category-filters">
          <CategoryList name={state} />
        </section>

        {/* THIS SHOWS THE NEW POST FORM DEPENDING ON THE WRITE STATE */}
        <NewPost />

        <section className="article-container">{articleList}</section>
      </main>
    </div>
  );
}

export default App;
