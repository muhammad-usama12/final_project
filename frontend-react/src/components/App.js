import { Helmet } from "react-helmet";

import "./App.scss";

import Header from "./Header";
import Article from "./article/Article";
import CategoryList from "./CategoryList";
import NewPost from "./new-post/NewPost";

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
      />
    )
  });


  return (
    <div>
      <Helmet>
        <script
          src="https://kit.fontawesome.com/e21136580c.js"
          crossorigin="anonymous"
        ></script>
      </Helmet>
      <Header />
      <main>
        <section className='category-filters'>
          <div className='general-filter'>
            <CategoryList
              name={state}
            />
          </div>
        </section>

        {/* THIS SHOWS THE NEW POST FORM DEPENDING ON THE WRITE STATE */}
        <NewPost />

        <section className="article-container">
          {articleList}
        </section>
      </main>
    </div>
  );
}

export default App;
