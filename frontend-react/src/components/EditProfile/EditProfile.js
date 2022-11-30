import React, { useEffect, useState } from "react";
import { storage } from "../../firebase/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { v4 } from "uuid"

import "../Profile/Profile.scss";

import Button from "../Button";

import { getCurrentUser } from "../../helpers/selectors";

export default function EditProfile(props) {
  const state = props.state;
  const currentUser = getCurrentUser(state, props.user.userId);

  const [save, setSave] = useState()
  const [previewSelectedImage, setPreviewSelectedImage] = useState(currentUser.icon_url);
  const [selectedImage, setSelectedImage] = useState(currentUser.icon_url);
  const [username, setUsername] = useState(currentUser.username);
  const [bio, setBio] = useState(currentUser.bio || "");
  const [error, setError] = useState(null);

  function validate() {
    if (username === "") {
      setError("you gotta be called SOMETHING");
      return;
    }
    setError("");
    uploadImage()
  }

  // updateProfile is called only when save state is changed
  useEffect(()=> {
    if (save) {
      props.updateProfile({
        username: username,
        bio: bio,
        icon_url: selectedImage
      }, props.user.userId) 
    }
  }, [ save ])

  const uploadImage = () => {
    if (selectedImage === null) return;
    const imageRef = ref(storage, `images/${selectedImage.name + v4()}`);
    uploadBytes(imageRef, selectedImage)
      .then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          setSelectedImage(url)
          setSave(true)
          console.log("url: ", url)
          console.log("upload success")
        })
      })
      .catch(err => console.log("err message: ", err.message))
  };

  return (
    <section className="edit-profile">
      <div className="profile-header">
        <img 
          className="profile-display-picture"
          src={previewSelectedImage || selectedImage}
          alt="profile"
        >
        </img>
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
            name="image"
            onChange={(event) => {
              setSelectedImage(event.target.files[0]);
              setPreviewSelectedImage(URL.createObjectURL(event.target.files[0]))
            }}
          />
          <i className="fa-solid fa-image"></i>
        </label>
        <Button confirm message="Save" onClick={validate}/>
      </div>
      {error !== "" && <section>{error}</section>}
    </section>
  );
}