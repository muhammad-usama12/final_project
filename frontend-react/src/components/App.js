import { useState } from "react";
import { Helmet } from "react-helmet";

import "./App.scss";

import Header from "./Header";
import Article from "./Article";
import Category from "./Category";
import Create from "./Create";
import Write from "./Write";
import useApplicationData from "../hooks/useApplicationData";
import  { getShowCategories } from "../helpers/selectors"

function App() {

const { shows } = useApplicationData();

  const showList = shows.map((show) => {
            return (
            <Article 
                  id={show.id}
                  name={show.name}
                  desc = {show.description}
                  img = {show.image_url}
            />
 )
});
  const [write, setWrite] = useState(false)

  return (
    <div>
      <Helmet>
        <script
          src="https://kit.fontawesome.com/e21136580c.js"
          crossorigin="anonymous"
        ></script>
      </Helmet>
     
    <main>
    <section className='category-filters'>
            <div className='general-filter'>
              <Category
              name={ shows }
              />
            </div>
          </section>
         
           {/* THIS SHOWS THE NEW POST FORM DEPENDING ON THE WRITE STATE */}
           { !write && <Create onClick={() => setWrite(true)} />}
          {/* THIS NEXT ONE DOESN'T WORK YET LOL */}
          {write && <Write onCancel={() => setWrite(false)} />}

          <section className="article-container">
          { showList }
          </section>  
    </main>
    </div>
  );
}

export default App;
