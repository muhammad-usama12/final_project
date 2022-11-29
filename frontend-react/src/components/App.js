import "./App.scss";
import "./App.scss";

import Scripts from "./Scripts";

import GuestHeader from "./GuestHeader";
import UserHeader from "./UserHeader";
import Article from "./Article";
import CategoryList from "./CategoryList";
import NewPost from "./NewPost";
import Profile from "./Profile";
import EditProfile from "./Profile/EditProfile";
import Views from "./views";

import useApplicationData from "../hooks/useApplicationData";
import SignUp from "./Registration/SignUp";

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
  console.log("cookie", document.cookie);
  return (
    <div>
      <Views />
      <Scripts />
      {document.cookie && <UserHeader />}
      {!document.cookie && <GuestHeader />}

      <main>
        {/* <EditProfile /> */}
        {/* <Profile /> */}
        <section className="category-filters">
          <CategoryList name={state} />
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
