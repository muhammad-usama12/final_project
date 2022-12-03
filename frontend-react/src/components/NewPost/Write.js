import { useState, useContext } from "react";
import axios from "axios";

import "./Write.scss";

import MenuItem from "@mui/material/MenuItem";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Button from "../Button";

import { ApplicationContext } from "../App";

export default function Write(props) {
  const [text, setText] = useState("");
  const [show, setShow] = useState("");
  const [selectedImage, setSelectedImage] = useState("");
  const [spoiler, setSpoiler] = useState(false);

  const { state } = useContext(ApplicationContext)

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
    return (
      {
        label: show.name,
        id: show.id
      }
    )
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
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={shows}
          isOptionEqualToValue={(option, value) => option.value === value.value}
          renderInput={(params) => <TextField {...params} label="what show was that?" />}
          onChange={(e, show) => handleChange(e, show.id)}
        />
        {/* <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
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
        </FormControl> */}
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
