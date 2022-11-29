import React from "react";
import Create from "./Create";
import Write from "./Write";
import useVisualMode from "../../hooks/useVisualMode";

// We pass props from App.js
export default function NewPost() {
  const CREATE = "CREATE";
  const WRITE = "WRITE";
  
  const { mode, transition, back } = useVisualMode(CREATE);

  return (
    <>
      {mode === CREATE && (
        <Create onClick={() => transition(WRITE)} />
      )}
      {mode === WRITE && (
        <Write
          onCancel={() => back()}
          onSave={() => transition()}
        />
      )}
    </>
  );
}