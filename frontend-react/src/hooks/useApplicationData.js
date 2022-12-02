import axios from "axios";

import { useState, useEffect } from "react";

export default function useApplicationData() {
  // Session states
  const [loggedIn, setLoggedIn] = useState();
  const [error, setError] = useState("");

  // Data state
  const [hideSpoiler, setHideSpoiler] = useState(false);
  const [state, setState] = useState({
    posts: [],
    filerteredPosts: [],
    shows: [],
    comments: [],
    users: [],
  });

  // const [loading, setLoading] = useState(true);

  const loadApplicationState = () => {
    Promise.all([
      axios.get("/api/posts"),
      axios.get("/api/shows"),
      axios.get("/api/comments"),
      axios.get("/api/users"),
    ]).then((res) => {
      setState((prev) => ({
        ...prev,
        posts: res[0].data,
        filerteredPosts: res[0].data,
        shows: res[1].data,
        comments: res[2].data,
        users: res[3].data,
      }));
      console.log("use app data state: ", state);
    });
  };

  const getAllShows = () => {
    setState((prev) => ({ ...prev, filerteredPosts: state.posts }));
  };

  const getFilteredShows = (id) => {
    let processedPosts = state.posts.filter((post) => post.tvshow_id === id);
    setState((prev) => ({ ...prev, filerteredPosts: processedPosts }))

  };

  const getUsers = async () => {
    return axios.get("/api/users").then((res) => {
      setState((prev) => ({ ...prev, users: res.data }));
      console.log("lolol", res.data);
      return res.data;
    });
  };

  const commentCounter = (postId) => {
    axios.post(`/api/comments/${postId}/counter`)
    .then((res) =>  console.log("res from commentcouneter", res))
    .catch((err) => console.log("err from commentcouneter", err))
  }
  
  const saveComment = (text, postId) => {
    return axios
      .post("/api/comments/new", {
        text: text,
        postId: postId,
      })
      .then((res) => {
       commentCounter(res.data.post_id)
      })
  };

  function addPost (id,data)  {
   
    return axios
      .post(`/api/posts/${id}/new`, {
      data: data
    })
    .then((res) => {
      setState((prev) => ({
        ...prev,
        posts: state.posts,
      }));
    });
};

 

  const handleSpoilerToggle = () => {
    if (hideSpoiler) {
      setHideSpoiler(false);
    } else {
      setHideSpoiler(true);
    }
  };

  return {
    state,
    setState,
    hideSpoiler,
    setHideSpoiler,
    loggedIn,
    setLoggedIn,
    error,
    setError,
    addPost,
    handleSpoilerToggle,
    getFilteredShows,
    getAllShows,
    getUsers,
    saveComment,
    loadApplicationState
  };
}
