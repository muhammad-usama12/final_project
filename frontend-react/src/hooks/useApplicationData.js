import axios from 'axios';

import { useState, useEffect } from "react";

export default function useApplicationData() {
  // Form states
  const [text, setText] = useState("");
  const [show, setShow] = useState("");

  // Edit Profile states
  const [selectedImage, setSelectedImage] = useState("");
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("i don't like to talk about myself");

  // Session states
  const [loggedIn, setLoggedIn]  = useState();
  const [error, setError] = useState("");

  // Data state
  const [hideSpoiler, setHideSpoiler] = useState(false)
  const [state, setState] = useState({
    posts: [],
    shows:[],
    comments: []
  });
 
  // const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all
      ([
        axios.get("/api/posts"),
        axios.get("/api/shows"),
        axios.get("/api/comments"),
      ])
      .then((res) => {
        setState(prev => ({...prev, posts: res[0].data, shows: res[1].data, comments: res[2].data}))
        console.log(state)
      })
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
        console.log("lolol", res.data)
        return res.data;
      })
      .then((res) => {
        let processedPosts = res.filter(post => post.tvshow_id === id);
        console.log("after filtering shows: ", processedPosts)
        setState(prev => ({...prev, posts: processedPosts}));
      })
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
    text, setText,
    show, setShow,
    selectedImage, setSelectedImage,
    username, setUsername,
    bio, setBio,
    loggedIn, setLoggedIn,
    error, setError,

    handleSpoilerToggle,
    getFilteredShows,
    getAllShows
  }  
}