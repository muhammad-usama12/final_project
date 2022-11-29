import React from "react";
import "./Header.scss";
import axios from "axios";
import SettingsBar from "./Settings/SettingsBar";
import { Link } from "react-router-dom";
import Login from "./Registration/Login";
import SignUp from "./Registration/SignUp";
import Views from "./views";

import useApplicationData from "../hooks/useApplicationData";
import useVisualMode from "../hooks/useVisualMode";

export default function Header() {
  // const LOGIN = "LOGIN";
  // const SIGNUP = "SIGNUP";
  // const { loggedIn, setLoggedIn } = useApplicationData();

  // const loginComponent = () => { 
  //   setLoggedIn(LOGIN); 
  // } 

  // const signupComponent = () => { 
  //   setLoggedIn(SIGNUP); 
  // }

  const SHOW = "SHOW";
  const HIDE = "HIDE";
  const LOGIN = "LOGIN";
  const SIGNUP = "SIGNUP";
  const { mode, transition, back } = useVisualMode(HIDE);
  function toggleSettings() {
    if (mode === SHOW) {
      back();
    } else {
      transition(SHOW);
    }
  }

  return (
    <>
      <header>
      <i className="fa-solid fa-bars" onClick={toggleSettings}></i>

        <div className="logo-name">
          <img
            className="logo-image"
            src="data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMjQgMjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTE5IDZoLTQuNTlsMi4zLTIuMjlhMSAxIDAgMSAwLTEuNDItMS40MkwxMiA1LjU5bC0zLjI5LTMuM2ExIDEgMCAxIDAtMS40MiAxLjQyTDkuNTkgNkg1YTMgMyAwIDAgMC0zIDN2MTBhMyAzIDAgMCAwIDMgM2gxNGEzIDMgMCAwIDAgMy0zVjlhMyAzIDAgMCAwLTMtM1ptLTMgMTBhMiAyIDAgMCAxLTIgMkg2YTIgMiAwIDAgMS0yLTJ2LTZhMiAyIDAgMCAxIDItMmg4YTIgMiAwIDAgMSAyIDJabTMgM2ExIDEgMCAxIDEgMS0xIDEgMSAwIDAgMS0xIDFabTAtNGExIDEgMCAxIDEgMS0xIDEgMSAwIDAgMS0xIDFabTAtNGExIDEgMCAxIDEgMS0xIDEgMSAwIDAgMS0xIDFaIiBmaWxsPSIjZjZmMWYxIiBjbGFzcz0iZmlsbC00NjQ2NDYiPjwvcGF0aD48L3N2Zz4="
            alt="logo"
          ></img>
          teebo
        </div>
        <div>
          {/* <button onClick={handleClick} type="button">Login</button>
        <button onClick={handleClick} type="button">Sign Up</button> */}
          <div>
            <Link to="/login">Login</Link>
            <Link to="/signup">SignUp</Link>
          </div>
        </div>
      </header>
      {/* {loggedIn === LOGIN ? <Login /> : null} 
      {loggedIn === SIGNUP ? <SignUp /> : null}  */}
    </>
  );
}
