import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import './App.scss';

import Header from "./Header";
import Article from './Article';
import Category from './Category';
import Create from './Create';
import Write from './Write'

function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const getMovies = async () => {
    try {
      const result = await axios({
        url: '/api/movies',
        method: 'GET',
      });

      setLoading(false);
      setMovies(result.data);

      console.log(result.data);
    } catch (err) {
      setLoading(false);
      setError(err.message);
    }
  };

  useEffect(() => {
    getMovies();
  }, []);


  const movieList = movies.map((movie) => {
            return (
            <Article 
                  id={movie.id}
                  category={movie.title}
            />
 )
});



  //

  const [write, setWrite] = useState(false)

  return (
    <div>
      <Helmet>
        <script src="https://kit.fontawesome.com/e21136580c.js" crossorigin="anonymous"></script>
      </Helmet>
    <main>
          <section className='category-filters'>
            <div className='general-filter'>
              <Category
                name="show all"
              />
              <Category
                name="blur spoilers"
              />
            </div>

            {/* THESE ARE HARD CODED CATEGORY EXAMPLES */}
            <div className='specific-filter'>
              <Category 
                name="the rehearsal"
              />
              <Category 
                name="better call saul"
              />
            </div>
       
          </section>
           {/* THIS SHOWS THE NEW POST FORM DEPENDING ON THE WRITE STATE */}
           { !write && <Create onClick={() => setWrite(true)} />}
          {/* THIS NEXT ONE DOESN'T WORK YET LOL */}
          { write && <Write onCancel={() => setWrite(false)} /> }

          <section className="article-container">
          { movieList }
          </section>  
    </main>
    </div>
  );
}

export default App;
