import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet'
import axios from 'axios';
import './App.scss';

import Header from "./components/Header"
import Article from './components/Article';
import Category from './components/Category';

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

            <hr />

            <div className='specific-filter'>
              <Category 
                name="the rehearsal"
              />
            </div>
          </section>
          <Article />
        </main>
      </div>
    </>
  );
}

export default App;
