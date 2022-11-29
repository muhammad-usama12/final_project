import "./Write.scss";

import Button from "../Button";
import Dropdown from "./Dropdown";
import MenuItem from '@mui/material/MenuItem';

import axios from "axios";
import useApplicationData from "../../hooks/useApplicationData";

export default function Write(props) {
  const {
    state,
    text, setText,
    show, setShow,
    selectedImage, setSelectedImage,
    error, setError
  } = useApplicationData();

  function cancel() {
    props.onCancel();
  }

  const handleChange = (event) => {
    setShow(event.target.value);
  };

  const saveProduct = () => {
    axios.post("/api/posts/new",{
        text: text,
        img: selectedImage,
        show: show
    })
      .then((res) => {
        console.log("res from write.js", res)
      });
  }

  function validate() {
    if (text === "") {
      setError("you can't stir nothing");
    }
    else if (show === "") {
      setError("what show are you even talking about??");
    }
    else {
      saveProduct()
    }
  }

  const shows = state.shows.reverse().map((show) => {
    return (
      <MenuItem
        key={show.id}
        value={show.id}
      >
        {show.name}
      </MenuItem>
    )
  });

  return (
    <div className="write-post">
      {error !== "" && <section>{error}</section>}
      <form onSubmit={event => event.preventDefault()} autoComplete="off">
        <textarea
          name="text"
          type="text"
          placeholder="what do the people need to hear..."
          value={text}
          onChange={(event) => setText(event.target.value)}
        />
        <Dropdown
          handleChange={handleChange}
          shows={shows}
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
          <div className="right-buttons">
            <label className="upload-image">
              <input
                type="file"
                name="myImage"
                onChange={(event) => {
                  if (event.target.files.length !== 0) {
                    setSelectedImage(URL.createObjectURL(event.target.files[0]))
                  }
                }}
              />
              <i className="fa-solid fa-image"></i>
            </label>
            <Button
              confirm
              className="button--confirm"
              message="greenlight"
              onClick={validate}
            />
          </div>
        </div>
    </div>
  );
}