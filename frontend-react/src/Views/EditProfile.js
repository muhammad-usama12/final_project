import React, { useEffect, useState } from 'react'
import { storage } from "../firebase/firebase"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

import Header from '../components/Header';
import Spacing from '../components/Spacing';
import Button from '../components/Button'
import CategoryListItem from '../components/CategoryListItem';

import useApplicationData from '../hooks/useApplicationData';
 
export default function EditProfile () {
  const [user, setUser] = useState({})
  const [error, setError] = useState(null)
  const [selectedImage, setSelectedImage] = useState(null)
  const [previewSelectedImage, setPreviewSelectedImage] = useState(null)

  const applicationData = useApplicationData();
  const {
    state,
    getFilteredShows,
    loadApplicationState,
    updateFavourites,
    deleteFavourites
  } = applicationData;

  useEffect(() => {
    loadApplicationState();

    const userId = localStorage.getItem('teeboUser');
    if (!userId) {
      // redirect to login
    }
    axios.get(`http://localhost:3001/api/users/${userId}`)
    .then(res => {
      console.log("userid response", userId, res)
      setUser(res.data)
    })
  },[])
 
  function onChange(e) {
    setUser({ ...user, [e.target.id]: e.target.value})
  }
  
  const navigate = useNavigate()

  function submitForm(e) {
    if (user.username === "") {
      return setError("you gotta be called SOMETHING");
    }
    console.log("attempt submit")
    e.preventDefault();

    if (selectedImage !== null) {
      const imageRef = ref(storage, `images/${selectedImage.name}`);
      uploadBytes(imageRef, selectedImage).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          setSelectedImage(url);
          console.log("upload success", url);
          return url;
        })
          .then((url) => {
            console.log("url after upload", url)
            const payload = { icon_url: url }
            console.log("profile update success payload", payload)
            axios.put(`http://localhost:3001/api/users/${user.id}`, payload)
          })
          .then(() => navigate("/profile"))
          .catch((err) => console.log("submit failed: ", err.message))
      })
    }
    
    setError(null)
    const payload = { bio: user.bio, username: user.username }
    console.log("profile update success payload", payload)
    axios.put(`http://localhost:3001/api/users/${user.id}`, payload)
      .then(() => navigate("/profile"))
      .catch((err) => {
        if (err.response.status === 500) {
          setError("that username is taken luv, xx")
        }
      })
  }

  const categoriesArray = state.shows;
  console.log("state: ", state)
  const categories = categoriesArray.map((category) => {
    return (
      <CategoryListItem
        edit
        state={state}
        user={user}
        updateFavourites={updateFavourites}
        deleteFavourites={deleteFavourites}
        key={category.id}
        tvShowId={category.id}
        name={category.name}
        onClick={() => getFilteredShows(category.id)}
      />
    )
  });
 
  return (
    <>
      <Header />
      <Spacing />
      <section className="edit-profile">
        <div className="profile-header">
          <label className="upload-image">
            <input
              type="file"
              name="myImage"
              id="icon_url"
              onChange={(e) => {
                if (e.target.files.length !== 0) {
                  setPreviewSelectedImage(URL.createObjectURL(e.target.files[0]));
                  setSelectedImage(e.target.files[0]);
                }
              }}
            />
            <img
              className="profile-display-picture"
              src={previewSelectedImage ? previewSelectedImage : user.icon_url}
              alt="profile"
            ></img>
            <p id="change-photo">Change Photo</p>
            <i className="fa-solid fa-circle-user"></i>
          </label>
          
          <form>
            <input
              name="username"
              type="text"
              id="username"
              placeholder="who are you king"
              value={user.username}
              onChange={onChange}
            />
            <textarea
              name="bio"
              type="text"
              id="bio"
              placeholder="tell me about yourself"
              value={user.bio}
              onChange={onChange}
            />
          </form>
        </div>
        {error !== "" && <p className="error">{error}</p>}
        <div className="edit-profile-categories">
          {categories}
        </div>
        <div className="edit-button">
          <Button confirm message="Save" onClick={submitForm}/>
        </div>
      </section>
    </>
  )
}