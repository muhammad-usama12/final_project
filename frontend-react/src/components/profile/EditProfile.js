import React, { useEffect, useState, useContext } from "react";
import { storage } from "../../firebase/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { v4 } from "uuid"
import axios from "axios";

import "./Profile.scss";
import Button from "../Button";
import { ApplicationContext } from "../App";
import { AccountContext } from "../AccountContext";
import { getCurrentUser } from "../../helpers/selectors";

export default function EditProfile(props) {
  const user = useContext(AccountContext);
  const { state } = useContext(ApplicationContext);
  const currentUser = getCurrentUser(state, user.user.userId)

  const [selectedImage, setSelectedImage] = useState(null);
  const [previewSelectedImage, setPreviewSelectedImage] = useState(currentUser.icon_url || "");
  const [username, setUsername] = useState(currentUser.username || "");
  const [bio, setBio] = useState(currentUser.bio || "");
  const [error, setError] = useState(null);

  const updateProfile = (userObj, userId) => {
    console.log("userobj: ", userObj)
    return axios
      .put(`/api/users/${userId}`, userObj)
      .then((res) => {
        console.log("update success", res.data);
      })
      .catch((err) => console.log("update failed: ", err));
  }

  const uploadImage = () => {
    if (selectedImage === null) return;
    const imageRef = ref(storage, `images/${selectedImage.name}`);
    uploadBytes(imageRef, selectedImage)
      .then((snapshot) => {
        console.log("snapshot", snapshot)
        getDownloadURL(snapshot.ref)
          .then((url) => {
            setSelectedImage(url)
            console.log("url: ", url)
            console.log("upload success")
            updateProfile({
              icon_url: url
            }, user.user.userId)
            console.log("currentUser in uploadimage: ", currentUser)
          })
      })
  };

  const validate = () => {
    if (username === "") {
      setError("you gotta be called SOMETHING");
      return;
    }
    
    if (selectedImage) {
      uploadImage();
    }
    
    setError("");
    updateProfile({
      username: username,
      bio: bio,
    }, user.user.userId);
    console.log("currentuser after update profile: ", currentUser)
  }

  return (
    <section className="edit-profile">
      <div className="profile-header">
        <img
          className="profile-display-picture"
          src={previewSelectedImage}
          alt="profile"
        ></img>
        <form>
          <input
            name="show"
            type="text"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
          <textarea
            name="show"
            type="text"
            value={bio}
            onChange={(event) => setBio(event.target.value)}
          />
        </form>
      </div>

      <div className="edit-buttons">
        <label className="upload-image">
          <input
            type="file"
            name="myImage"
            onChange={(event) => {
              if (event.target.files.length !== 0) {
                setSelectedImage(event.target.files[0]);
                setPreviewSelectedImage(URL.createObjectURL(event.target.files[0]))
              }
            }}
          />
          <i className="fa-solid fa-image"></i>
        </label>
        <Button confirm message="Save" onClick={validate} />
      </div>
      {error !== "" && <section>{error}</section>}
    </section>
  );
}
