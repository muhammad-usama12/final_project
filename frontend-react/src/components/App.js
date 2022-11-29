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

function App() {
  const { state, hideSpoiler, handleSpoilerToggle, filterShows } = useApplicationData();

  const articleList = state.posts.map((post) => {
    return (
      <Article
        key={post.id}
        text={post.text}
        img={post.image}
        show={post.show}
        likes={post.total_likes}
        comments={post.total_comments}
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
            name={state}
            hideSpoilers={handleSpoilerToggle}
            filterShows={filterShows}
          />
        </section>

        {/* <button onClick={getCookie}>getCookie</button> */}

        {/* THIS SHOWS THE NEW POST FORM DEPENDING ON THE WRITE STATE */}
        <NewPost />
        <section className="article-container">{articleList}</section>
      </main>
    </div>
  );
}
export default App;
