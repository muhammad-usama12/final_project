import React, { useEffect, useState } from "react";
import axios from "axios";

import "./Profile.scss";
import Button from "../Button";
import { ApplicationContext } from "../App";
import { useContext } from "react";

export default function EditProfile(props) {
  const [selectedImage, setSelectedImage] = useState("");
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [error, setError] = useState(null);

  const { getUsers } = useContext(ApplicationContext);

  useEffect(() => {
    getUsers()
      .then((res) => {
        const user = res.data[0];
        console.log("user: ", user);

        setSelectedImage(user.icon_url);
        setUsername(user.username);
        setBio(user.bio);
      })
      .catch((err) => setError(err.message));
  }, []);

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
          src={selectedImage}
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
                setSelectedImage(URL.createObjectURL(event.target.files[0]));
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
