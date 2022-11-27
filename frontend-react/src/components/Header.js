import React from "react";
import "./Header.scss"
import SettingsBar from "./settings/SettingsBar";
import useVisualMode from "../hooks/useVisualMode";

export default function Header() {
  const SHOW = "SHOW";
  const HIDE = "HIDE";
  
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
      {mode === SHOW && <SettingsBar />}
      <header>
        <i
          className="fa-solid fa-bars"
          onClick={toggleSettings}
        >
        </i>

        <div className="logo-name">
          <img
            className="logo-image"
            src="data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMjQgMjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTE5IDZoLTQuNTlsMi4zLTIuMjlhMSAxIDAgMSAwLTEuNDItMS40MkwxMiA1LjU5bC0zLjI5LTMuM2ExIDEgMCAxIDAtMS40MiAxLjQyTDkuNTkgNkg1YTMgMyAwIDAgMC0zIDN2MTBhMyAzIDAgMCAwIDMgM2gxNGEzIDMgMCAwIDAgMy0zVjlhMyAzIDAgMCAwLTMtM1ptLTMgMTBhMiAyIDAgMCAxLTIgMkg2YTIgMiAwIDAgMS0yLTJ2LTZhMiAyIDAgMCAxIDItMmg4YTIgMiAwIDAgMSAyIDJabTMgM2ExIDEgMCAxIDEgMS0xIDEgMSAwIDAgMS0xIDFabTAtNGExIDEgMCAxIDEgMS0xIDEgMSAwIDAgMS0xIDFabTAtNGExIDEgMCAxIDEgMS0xIDEgMSAwIDAgMS0xIDFaIiBmaWxsPSIjZjZmMWYxIiBjbGFzcz0iZmlsbC00NjQ2NDYiPjwvcGF0aD48L3N2Zz4="
            alt="logo"
          >
          </img>
          teebo
        </div>

        <img 
          className="profile-icon"
          src="https://i.pinimg.com/474x/ce/9c/ab/ce9cab218f2849c81f230e4296fd120c.jpg"
          alt="profile"
        >
        </img>
      </header>
    </>
  );
}