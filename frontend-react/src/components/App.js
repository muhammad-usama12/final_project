import { useState } from "react";
import { Helmet } from "react-helmet";

import "./App.scss";

import Header from "./Header";
import Article from "./Article";
import Category from "./Category";
import Create from "./Create";
import Write from "./Write";
import Views from "./views";
import useApplicationData from "../hooks/useApplicationData";
// import { getShowCategories } from "../helpers/selectors"

function App() {
  const [write, setWrite] = useState(false);

  const { state } = useApplicationData();

  const showList = state.posts.map((post) => {
    return <Article key={post.id} text={post.text} img={post.image} />;
  });

  return (
    <div>
      <Views />
      <Helmet>
        <script
          src="https://kit.fontawesome.com/e21136580c.js"
          crossorigin="anonymous"
        ></script>
      </Helmet>

      <main>
        <section className="category-filters">
          <div className="general-filter">
            <Category name={state} />
          </div>
        </section>

        {/* THIS SHOWS THE NEW POST FORM DEPENDING ON THE WRITE STATE */}
        {!write && <Create onClick={() => setWrite(true)} />}
        {/* THIS NEXT ONE DOESN'T WORK YET LOL */}
        {write && <Write onCancel={() => setWrite(false)} />}

        <section className="article-container">{showList}</section>
      </main>
    </div>
  );
}

export default App;
