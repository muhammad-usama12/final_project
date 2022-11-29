import axios from 'axios';

import { useState, useEffect } from "react";

export default function useApplicationData() {
  // Session states
  const [loggedIn, setLoggedIn]  = useState();
  const [error, setError] = useState("");

  // Data state
  const [hideSpoiler, setHideSpoiler] = useState(false)
  const [state, setState] = useState({
    posts: [],
    shows:[],
    comments: [],
    users: []
  });
 
  // const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all
      ([
        axios.get("/api/posts"),
        axios.get("/api/shows"),
        axios.get("/api/comments"),
        axios.get("/api/users"),
      ])
      .then((res) => {
        setState(prev => ({
          ...prev,
          posts: res[0].data,
          shows: res[1].data, 
          comments: res[2].data,
          users: res[3].data
        }))
        console.log(state);
      });
  }, []);

  const getAllShows = () => {
    return axios.get("/api/posts")
      .then((res) => {
        setState(prev => ({...prev, posts: res.data}))
      });
  }

  const getFilteredShows = (state, id) => {
    return axios.get("/api/posts")
      .then((res) => {
        setState(prev => ({...prev, posts: res.data}))
        console.log("before filtering", res.data)
        return res.data;
      })
      .then((res) => {
        let processedPosts = res.filter(post => post.tvshow_id === id);
        console.log("after filtering shows: ", processedPosts)
        setState(prev => ({...prev, posts: processedPosts}));
      })
  }

  const getUsers = async () => {
    return axios.get("/api/users")
      .then((res) => {
        setState(prev => ({...prev, users: res.data}))
        console.log("lolol", res.data)
        return res.data;
      })
  };

  const saveComment = (text, postId) => {
    axios.post("/api/comments/new",{
        text: text,
        postId: postId
    })
      .then((res) => {
        console.log("res from commentForm.js: ", res)
      });
  }

  const handleSpoilerToggle = () => {
    if (hideSpoiler) {
      setHideSpoiler(false);
    } else {
      setHideSpoiler(true)
    }
  }

  console.log("state: ", state);

  return {
    state, setState,
    hideSpoiler, setHideSpoiler,
    loggedIn, setLoggedIn,
    error, setError,

    handleSpoilerToggle,
    getFilteredShows,
    getAllShows,
    getUsers,
    saveComment
  }  
}