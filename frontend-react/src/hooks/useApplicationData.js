import axios from 'axios';

import { useState, useEffect } from "react";

export default function useApplicationData() {

  const [shows, setShows] = useState([]);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(false);

  useEffect(() => {
    Promise.all
      ([
        axios.get("/api/movies")
      ])
      .then((response) => {
        setShows(response[0].data)
      })
  }, []);

console.log("shows",shows)
  return { shows }  
}