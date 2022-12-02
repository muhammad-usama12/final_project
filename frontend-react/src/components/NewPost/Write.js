import "./Write.scss";

import { storage } from "../../firebase/firebase"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

import Button from "../Button";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { ApplicationContext } from "../App";
import { AccountContext } from "../AccountContext";
import axios from "axios";
import { useState, useContext } from "react";

export default function Write(props) {
  const [text, setText] = useState("");
  const [show, setShow] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewSelectedImage, setPreviewSelectedImage] = useState(null);
  const [spoiler, setSpoiler] = useState(false);
  const [error, setError] = useState(null);

  const { state, addPost } = useContext(ApplicationContext);
  const user = useContext(AccountContext);
  function cancel() {
    props.onCancel();
  }

  const handleChange = (event) => {
    setShow(event.target.value);
  };

  const handleSpoilerToggle = () => {
    if (spoiler) {
      setSpoiler(false);
    } else {
      setSpoiler(true);
    }
  };

  const uploadImage = () => {
    if (selectedImage === null) return;
    const imageRef = ref(storage, `images/${selectedImage.name}`);
    uploadBytes(imageRef, selectedImage).then((snapshot) => {
      console.log("snapshot", snapshot);
      getDownloadURL(snapshot.ref).then((url) => {
        setSelectedImage(url);
        console.log("upload success", url);
        updateProfile(
          {
            icon_url: url,
          },
          user.user.userId
        );
      });
    });
  };
 
  function savePost() {
    console.log("user",user.user.userId)
    if (text === "") {
      setError("well you can't stir nothing :/");
    } else if (show === "") {
      setError("sorry, which show again?");
    } else {
      const data = {
        text: text,
        img: selectedImage,
        spoiler: spoiler,
        show: show
      }
      addPost(user.user.userId,data)
    }
  }

  const shows = state.shows.reverse().map((show) => {
    return (
      <MenuItem key={show.id} value={show.id}>
        {show.name}
      </MenuItem>
    );
  });

  return (
    <div className="write-post">
      {error !== null && <p className="error">{error}</p>}
      <form onSubmit={(event) => event.preventDefault()} autoComplete="off">
        <textarea
          name="text"
          type="text"
          placeholder="what do the people need to hear..."
          value={text}
          onChange={(event) => setText(event.target.value)}
        />
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
          <InputLabel id="demo-select-small">show</InputLabel>
          <Select
            labelId="demo-select-small"
            id="demo-select-small"
            value={show}
            label="show"
            onChange={handleChange}
          >
            {shows}
          </Select>
        </FormControl>
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
            label="Spoiler"
            onClick={() => handleSpoilerToggle(spoiler, setSpoiler)}
          />
        </FormGroup>
        <div className="right-buttons">
          {/* <Button
            image
            message={<i class="fa-solid fa-camera"></i>}
          > */}
            <label className="upload-image">
              <input
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
              <img
                className="profile-display-picture"
                src={previewSelectedImage}
                alt="profile"
              ></img>
            </label>
          {/* </Button> */}
          <Button
            confirm
            className="button--confirm"
            message="greenlight"
            onClick={savePost}
          />
        </div>
      </div>
    </div>
  );
}
