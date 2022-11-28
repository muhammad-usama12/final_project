import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function Dropdown(props) {

  return (
    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <InputLabel id="demo-select-small">show</InputLabel>
      <Select
        labelId="demo-select-small"
        id="demo-select-small"
        value={props.shows.value}
        label="show"
        onChange={props.handleChange}
      >
        {props.shows}
      </Select>
    </FormControl>
  );
}