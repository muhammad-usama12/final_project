import axios from 'axios';

import { useState, useEffect } from "react";

export default function useApplicationData() {

  const [state, setState] = useState({
    posts: [],
    shows:[],
    comments: [],
    users: []
  });
 
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(false);

  useEffect(() => {
    Promise.all
      ([
        axios.get("/api/posts"),
        axios.get("/api/shows"),
        axios.get("/api/comments"),
      ])
      .then((response) => {
        setState(prev => ({...prev, posts: response[0].data, shows: response[1].data, comments: response[2].data}))
        console.log(state)
      })
  }, []);

  return { state }  
}