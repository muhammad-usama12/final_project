import "./Write.scss";

import Button from "../Button";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { ApplicationContext } from "../App";
import axios from "axios";
import { useState, useContext } from "react";

export default function Write(props) {
  const [text, setText] = useState("");
  const [show, setShow] = useState("");
  const [selectedImage, setSelectedImage] = useState("");
  const [spoiler, setSpoiler] = useState(false);

  const { state } = useContext(ApplicationContext)

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

  const shows = state.shows.reverse().map((show) => {
    return (
      <MenuItem key={show.id} value={show.id}>
        {show.name}
      </MenuItem>
    );
  });

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
        <input
          name="image-link"
          type="text"
          placeholder="got a spicy image link?"
          value={selectedImage}
          onChange={(event) => setSelectedImage(event.target.value)}
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
            onClick={handleSpoilerToggle}
          />
        </FormGroup>
        <div className="right-buttons">
          <Button
            confirm
            className="button--confirm"
            message="greenlight"
            onClick={() => props.onSave(text,selectedImage,spoiler,show)}
          />
        </div>
      </div>
    </div>
  );
}
