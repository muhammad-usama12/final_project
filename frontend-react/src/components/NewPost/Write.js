import { useState, useContext } from "react";
import { storage } from "../../firebase/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import axios from "axios";

import "./Write.scss";

import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Button from "../Button";

import { ApplicationContext } from "../App";

export default function Write(props) {
  const [text, setText] = useState("");
  const [show, setShow] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewSelectedImage, setPreviewSelectedImage] = useState(null);
  const [spoiler, setSpoiler] = useState(false);
  const [error, setError] = useState(null);

  const { state } = useContext(ApplicationContext);

  function cancel() {
    props.onCancel();
  }

  const handleChange = (e, showId) => {
    setShow(showId);
  };

  const handleSpoilerToggle = () => {
    if (spoiler) {
      setSpoiler(false);
    } else {
      setSpoiler(true);
    }
  };

  const showsArr = state.shows;
  const shows = showsArr.map((show) => {
    return {
      label: show.name,
      id: show.id,
    };
  });

  const uploadImage = () => {
    const imageRef = ref(storage, `images/${selectedImage.name}`);
    uploadBytes(imageRef, selectedImage).then((snapshot) => {
      getDownloadURL(snapshot.ref)
        .then((url) => {
          setSelectedImage(url);
          console.log("upload success", url);
          return url;
        })
        .then((url) => {
          console.log("url after save: ", url);
          props.onSave(text, url, spoiler, show);
        });
    });
  };

  const handleSubmitPost = () => {
    if (selectedImage) {
      uploadImage();
    } else {
      props.onSave(text, selectedImage, spoiler, show);
    }
  };

  return (
    <div className="write-post">
      {props.error !== null && <p className="error">{props.error}</p>}
      <form onSubmit={(event) => event.preventDefault()} autoComplete="off">
        <textarea
          name="text"
          type="text"
          placeholder="what do the people need to hear..."
          value={text}
          onChange={(event) => setText(event.target.value)}
        />
        {previewSelectedImage && (
          <img
            className="profile-display-picture"
            src={previewSelectedImage}
            alt="profile"
          ></img>
        )}
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={shows}
          isOptionEqualToValue={(option, value) => option.value === value.value}
          renderInput={(params) => (
            <TextField {...params} label="what show was that?" />
          )}
          onChange={(e, show) => handleChange(e, show.id)}
        />
      </form>

      <div className="write-buttons">
        <div className="left-buttons">
          <Button
            cancel
            className="button--cancel"
            message="cancel"
            onClick={cancel}
          />
        </div>
        <FormGroup>
          <FormControlLabel
            control={<Checkbox color="default" />}
            label="spoiler"
            onClick={handleSpoilerToggle}
          />
        </FormGroup>
        <div className="right-buttons">
          <label className="button--image pill-container" for="file-upload">
            <i className="fa-solid fa-image"></i>
          </label>
          <input
            id="file-upload"
            type="file"
            name="myImage"
            onChange={(event) => {
              if (event.target.files.length !== 0) {
                setSelectedImage(event.target.files[0]);
                setPreviewSelectedImage(
                  URL.createObjectURL(event.target.files[0])
                );
              }
            }}
          />
          <Button
            confirm
            className="button--confirm"
            message="greenlight"
            onClick={() => handleSubmitPost()}
          />
        </div>
      </div>
    </div>
  );
}
