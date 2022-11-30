import axios from "axios";

import { useState, useEffect } from "react";

export default function useApplicationData() {
  // Session states
  const [loggedIn, setLoggedIn] = useState();
  const [error, setError] = useState("");
  const [save, setSave] = useState();

  // Data state
  const [hideSpoiler, setHideSpoiler] = useState(false);
  const [state, setState] = useState({
    posts: [],
    shows: [],
    comments: [],
    users: [],
  });

  // const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      axios.get("/api/posts"),
      axios.get("/api/shows"),
      axios.get("/api/comments"),
      axios.get("/api/users"),
    ]).then((res) => {
      setState((prev) => ({
        ...prev,
        posts: res[0].data,
        shows: res[1].data,
        comments: res[2].data,
        users: res[3].data,
      }));
      console.log(state);
    });
  }, []);

  const getAllShows = () => {
    return axios.get("/api/posts").then((res) => {
      setState((prev) => ({ ...prev, posts: res.data }));
    });
  };

  const getFilteredShows = (id) => {
    return axios
      .get("/api/posts")
      .then((res) => {
        setState((prev) => ({ ...prev, posts: res.data }));
        return res.data;
      })
      .then((res) => {
        let processedPosts = res.filter((post) => post.tvshow_id === id);
        setState((prev) => ({ ...prev, posts: processedPosts }));
      });
  };

  const updateProfile = (userObj, userId) => {
    console.log("userobj: ", userObj)
    return axios
      .put(`/api/users/${userId}`, userObj)
      .then((res) => {
        console.log("update success", res.data);
      })
      .catch((err) => console.log("update failed: ", err));
  }

  const saveComment = (text, postId) => {
    return axios
      .post("/api/comments/new", {
        text: text,
        postId: postId,
      })
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

    handleSpoilerToggle,
    getFilteredShows,
    getAllShows,
    saveComment,
    updateProfile
  };
}
