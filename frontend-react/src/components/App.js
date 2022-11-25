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

  const movieList = movies.map((movie) => (
    <li key={movie.id}>
      Title: {movie.title} Release Date: {movie.release_date} Runtime(mins):{' '}
      {movie.runtime_mins}
    </li>
  ));

  return (
    <>
      <Helmet>
        <script src="https://kit.fontawesome.com/e21136580c.js" crossorigin="anonymous"></script>
      </Helmet>
      <div>
        <Header />
        <main>
          <section>
            <div className='general-filter'>
              <Category
                name="show all"
              />
              <Category
                name="blur spoilers"
              />
            </div>

            <div className='specific-filter'>
              <Category 
                name="the rehearsal"
              />
              <Category 
                name="better call saul"
              />
            </div>
          </section>
          <Create />
          {/* <Write /> */}
          <section className="article-container">
            <hr />
            <Article
              text="when is somebody gonna talk to me about the rehearsal the same way guys talk about sports :|"
              image={null}
              category="the rehearsal"
            />
            <Article
              text="what if we kissed at the pro homeless saul goodman bench 😳😳🙈"
              image="https://pbs.twimg.com/media/FiXRrxpVEAEDLx4?format=jpg&name=900x900"
              category="better call saul"
            />
          </section>
        </main>
      </div>
    </>
  );
}

export default App;
