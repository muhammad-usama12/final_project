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
      .then((response) => {
        setState(prev => ({...prev, posts: response[0].data, shows: response[1].data, comments: response[2].data}))
        console.log(state)
      })
  }, []);

  // const hideSpoilers = () => {
  //   return axios.get("/api/posts/hide-spoilers")
  //     .then((res) => {
  //       setState(prev => ({...prev, posts: res.data}))
  //       console.log("res after hiding spoilers", res)
  //     });
  // }

  console.log(state);

  return {
    state, setState,
    hideSpoiler, setHideSpoiler,
    text, setText,
    show, setShow,
    selectedImage, setSelectedImage,
    username, setUsername,
    bio, setBio,
    loggedIn, setLoggedIn,
    error, setError
  }  
}