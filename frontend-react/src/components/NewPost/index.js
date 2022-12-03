import React from "react";
import Create from "./Create";
import Write from "./Write";
import useVisualMode from "../../hooks/useVisualMode";
import { ApplicationContext } from "../App";
import { useState, useContext} from "react";

// We pass props from App.js
export default function NewPost(props) {
  const CREATE = "CREATE";
  const WRITE = "WRITE";
  const userId = localStorage.getItem('teeboUser');
  const { addPost  } = useContext(ApplicationContext)

   
  function savePost(text, selectedImage, spoiler, show) {
    console.log("user",userId)
    if (text === "") {
      // setError("well you can't stir nothing :/");
    } else if (show === "") {
      // setError("sorry, which show again?");
    } else {
      const data = {
        text: text,
        img: selectedImage,
        spoiler: spoiler,
        show: show
      }
      addPost(userId,data)
      .then(() => transition(CREATE))
    }
  }
  
  const { mode, transition, back } = useVisualMode(CREATE);

  return (
    <>
      {mode === CREATE && (
        <Create onClick={() => transition(WRITE)} />
      )}
      {mode === WRITE && (
        <Write
          user={props.user}
          state={props.state}
          onCancel={() => back()}
          onSave={savePost}
        />
      )}
    </>
  );
}