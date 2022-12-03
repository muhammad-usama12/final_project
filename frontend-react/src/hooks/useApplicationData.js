import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function useApplicationData() {
  const [error, setError] = useState(null);
  const [hideSpoiler, setHideSpoiler] = useState(false);

  const [state, setState] = useState({
    posts: [],
    filerteredPosts: [],
    shows: [],
    favourites: [],
    comments: [],
    users: [],
    loggedIn: false
  });

  const loadApplicationState = () => {
    Promise.all([
      axios.get("/api/posts"),
      axios.get("/api/shows"),
      axios.get("/api/favourites"),
      axios.get("/api/comments"),
      axios.get("/api/users"),
    ]).then((res) => {
      setState((prev) => ({
        ...prev,
        posts: res[0].data,
        filerteredPosts: res[0].data,
        shows: res[1].data,
        favourites: res[2].data,
        comments: res[3].data,
        users: res[4].data,
      }));
    });
  };

  const navigate = useNavigate()

  const getAllShows = () => {
    setState((prev) => ({ ...prev, filerteredPosts: state.posts }));
  };

  const getFilteredShows = (id) => {
    console.log("state.posts.length before", state.posts.length)
    let processedPosts = state.posts.filter((post) => post.tvshow_id === id);
    setState((prev) => ({ ...prev, filerteredPosts: processedPosts }))
    console.log("state.posts.length after", state.posts.length)
  };

  const commentCounter = (postId) => {
    return axios.post(`/api/comments/${postId}/counter`)
      .then(res => console.log("res after counter by 1", res))
      .catch((err) => console.log("err from commentcouneter", err))
  }
  
  const saveComment = async (text, postId) => {
    try {
      const response = await axios
        .post("/api/comments/new", {
          text: text,
          postId: postId,
        })
        const comments = [...state.comments]
        comments.push(response.data)
        setState({ ...state, comments })
        return (await commentCounter(response.data.post_id)).data.count
      
    
    } catch (error) {
      console.error("error from save",error)
    }
  }
 


  function addPost (id, data)  {
    return axios
      .post(`/api/posts/${id}/new`, {
      data: data
    })
    .then((res) => {
      const posts = [...state.posts]
      posts.push(res.data)
      setState({ ...state, posts })
    })
  };

  const deletePost = (id) => {
    return axios.delete(`/api/posts/${id}`)
      .then((res) => {
        const posts = [...state.posts]
        for (let i = 0; i < posts.length; i++) {
          if (posts[i].id === res.data.id) {
            posts.splice(i, 1)
          }
        }
        setState((prev) => ({...prev, posts}))
      })
      .catch((err) => console.log("delete failed", err.message));
  };



  const updateFavourites = (tvShowId, userId) => {
    if (!tvShowId) {
      return;
    }
    axios.post(`/api/favourites/new`, {
      user_id: userId,
      tvshow_id: tvShowId
    })
    .then((res) => {
      const favourites = [...state.favourites]
      favourites.push(res.data)
      setState({ ...state, favourites })
      console.log("update success")
    })
    .catch(err => console.log("update favourites failed", err.message))
  }

  const deleteFavourites = (tvShowId, userId) => {
    axios.post(`/api/favourites/`, {
      user_id: userId,
      tvshow_id: tvShowId
    })
    .then((res) => {
      console.log(res.data)
      const favourites = [...state.favourites]
      for (let i = 0; i < favourites.length; i++) {
        if (favourites[i].id === res.data.id) {
          favourites.splice(i, 1)
        }
      }
      setState((prev) => ({...prev, favourites}))
      console.log("delete success")
    })
    .catch(err => console.log("deleted favourites failed", err.message))
  }

  const logout = () => {
    axios.post(`/api/auth/logout`)
    .then(() => {
      console.log("successful log out")
      setState((prev) => ({ ...prev, loggedIn: false }));
      localStorage.clear();
      navigate("/login");
    })
    .catch(err => console.log("logout failed", err.message))
  }

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
    error,
    setError,
    handleSpoilerToggle,
    getFilteredShows,
    getAllShows,
    logout,

    addPost,
    deletePost,
    saveComment,
    updateFavourites,
    deleteFavourites,

    loadApplicationState,
  };
}
