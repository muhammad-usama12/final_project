import axios from 'axios';

import { useState, useEffect } from "react";

export default function useApplicationData() {

  const [state, setState] = useState({
    posts: [],
    shows:[]
  });
 
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(false);

  useEffect(() => {
    Promise.all
      ([
        axios.get("/api/posts"),
        axios.get("/api/shows")
      ])
      .then((response) => {
        setState(prev => ({...prev, posts: response[0].data, shows: response[1].data}))
      })
  }, []);

console.log(state)
  return { state }  
}