import React from "react";
import classNames from "classnames"
import "./Button.scss";

export default function Button(props) {
  const buttonClass = classNames("button", {
    "button--confirm": props.confirm,
    "button--cancel": props.cancel,
    "button--image": props.image
  });

  return (
    <button
    className={buttonClass}
    >
      {props.message}
    </button>
  );
}