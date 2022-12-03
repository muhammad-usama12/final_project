import React, { useEffect, useState } from 'react'
import { storage } from "../firebase/firebase"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import BeatLoader from "react-spinners/BeatLoader";

import Header from '../components/Header';
import Spacing from '../components/Spacing';
import Button from '../components/Button'
import CategoryListItem from '../components/CategoryListItem';

import useApplicationData from '../hooks/useApplicationData';
 
export default function EditProfile () {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const [user, setUser] = useState({})
  const [selectedImage, setSelectedImage] = useState(null)
  const [previewSelectedImage, setPreviewSelectedImage] = useState(null)

  const navigate = useNavigate()

  const applicationData = useApplicationData();
  const {
    state,
    getFilteredShows,
    loadApplicationState,
    updateFavourites,
    deleteFavourites,
    logout
  } = applicationData;

  setTimeout(() => {
    setLoading(false);
  }, 5000)

  useEffect(() => {
    loadApplicationState();

    const userId = localStorage.getItem('teeboUser');
    if (!userId) {
      navigate("/login");
    }
    axios.get(`http://localhost:3001/api/users/${userId}`)
    .then(res => {
      console.log("userid response", userId, res)
      setUser(res.data)
    })
  },[ state.favourites.length ])
 
  function onChange(e) {
    setUser({ ...user, [e.target.id]: e.target.value})
  }
  
  function submitForm(e) {
    setLoading(true)
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
          .then(() => {
            setError(null)
            submitText()
          })
          .then(() => navigate("/profile"))
          .catch((err) => console.log("submit failed: ", err.message))
      })
    } else {
      setError(null)
      submitText()
    }
  }

  const submitText = () => {
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
      <Header logout={logout}/>
      <Spacing />
      { loading ? 
        <BeatLoader
          className="loader"
          color={"#D9D9D9"}
          loading={loading}
          size={30}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
        :
        <>
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
                <div>
                  <input
                    name="username"
                    type="text"
                    id="username"
                    placeholder="who are you king"
                    value={user.username}
                    onChange={onChange}
                  />
                  <p>username</p>
                </div>
                <div>
                  <textarea
                    name="bio"
                    type="text"
                    id="bio"
                    placeholder="tell me about yourself"
                    value={user.bio}
                    onChange={onChange}
                  />
                  <p>bio</p>

                </div>
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
      }
    </>
  )}