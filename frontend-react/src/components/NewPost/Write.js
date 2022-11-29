import "./Write.scss";

import Button from "../Button";
import Dropdown from "./Dropdown";
import MenuItem from '@mui/material/MenuItem';

import axios from "axios";
import useApplicationData from "../../hooks/useApplicationData";

export default function Write(props) {
  const {
    state, setState,
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

  const addPost = () => {
    axios.post("/api/posts/new",{
        text: text,
        img: selectedImage,
        show: show
    })
      .then((res) => {
        setState(prev => ({...prev, posts: [...prev.posts, res.data] }))
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
      addPost()
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
        <input
          name="image-link"
          type="text"
          placeholder="got a spicy image link?"
          value={selectedImage}
          onChange={(event) => setSelectedImage(event.target.value)}
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