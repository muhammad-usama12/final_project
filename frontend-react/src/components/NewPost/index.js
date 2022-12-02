import React from "react";
import Create from "./Create";
import Write from "./Write";
import useVisualMode from "../../hooks/useVisualMode";
import { useContext } from "react";
import { ApplicationContext } from "../App";

// We pass props from App.js
export default function NewPost() {
  const context = useContext(ApplicationContext);
  const CREATE = "CREATE";
  const WRITE = "WRITE";
  console.log("context:", context);
  const save = () => {
    context.addPost().then(() => transition(CREATE));
  };

  const { mode, transition, back } = useVisualMode(CREATE);

  return (
    <>
      {mode === CREATE && <Create onClick={() => transition(WRITE)} />}
      {mode === WRITE && <Write onCancel={() => back()} onSave={save} />}
    </>
  );
}
