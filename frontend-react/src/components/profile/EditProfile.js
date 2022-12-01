import React, { useState } from "react";
import { storage } from "../../firebase/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { v4 } from "uuid"
import axios from "axios";

import "./Profile.scss";
import Button from "../Button";
import { ApplicationContext } from "../App";
import { useContext } from "react";

export default function EditProfile(props) {
  const [selectedImage, setSelectedImage] = useState("");
  const [previewSelectedImage, setPreviewSelectedImage] = useState("");
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [error, setError] = useState(null);
  const [save, setSave] = useState()






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

  function validate() {
    if (username === "") {
      setError("you gotta be called SOMETHING");
      return;
    }

    setError("");
    props.onSave(username, bio);
  }

  return (
    <section className="edit-profile">
      <div className="profile-header">
        <img
          className="profile-display-picture"
          src={setPreviewSelectedImage}
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
        <Button confirm message="Save" onSave={validate} />
      </div>
      {error !== "" && <section>{error}</section>}
    </section>
  );
}
