import React, { useEffect } from "react";
import axios from "axios";
import "./Header.scss";

import GuestActions from "./GuestActions";
import SettingsBar from "./SettingsBar";

import { ApplicationContext } from "../App";
import { AccountContext } from "../AccountContext";
import { useContext } from "react";
import useVisualMode from "../../hooks/useVisualMode";
import { redirect, useNavigate } from "react-router-dom";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
// import { getCurrentUser } from "../../helpers/selectors";

export default function Header(props) {
  // const context = useContext(ApplicationContext)
  const user = useContext(AccountContext);
  const navigate = useNavigate();

  const navigateToProfile = () => {
    navigate("/profile");
  };

  console.log(user);

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
  const logout = async () => {
    try {
      await axios({
        url: "/api/auth/logout",
        method: "POST",
      });
      console.log("successfully logged out");
    } catch (err) {
      console.log("Err", err);
    }
  };

  return (
    <>
      {mode === SHOW && (
        <SettingsBar
          toggleEditProfile={props.toggleEditProfile}
          onLogOut={logout}
        />
      )}
      <header>
        <i
          className="fa-solid fa-bars"
          onClick={document.cookie && toggleSettings}
        ></i>

        <div className="logo-name">
          <img
            className="logo-image"
            src="data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMjQgMjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTE5IDZoLTQuNTlsMi4zLTIuMjlhMSAxIDAgMSAwLTEuNDItMS40MkwxMiA1LjU5bC0zLjI5LTMuM2ExIDEgMCAxIDAtMS40MiAxLjQyTDkuNTkgNkg1YTMgMyAwIDAgMC0zIDN2MTBhMyAzIDAgMCAwIDMgM2gxNGEzIDMgMCAwIDAgMy0zVjlhMyAzIDAgMCAwLTMtM1ptLTMgMTBhMiAyIDAgMCAxLTIgMkg2YTIgMiAwIDAgMS0yLTJ2LTZhMiAyIDAgMCAxIDItMmg4YTIgMiAwIDAgMSAyIDJabTMgM2ExIDEgMCAxIDEgMS0xIDEgMSAwIDAgMS0xIDFabTAtNGExIDEgMCAxIDEgMS0xIDEgMSAwIDAgMS0xIDFabTAtNGExIDEgMCAxIDEgMS0xIDEgMSAwIDAgMS0xIDFaIiBmaWxsPSIjZjZmMWYxIiBjbGFzcz0iZmlsbC00NjQ2NDYiPjwvcGF0aD48L3N2Zz4="
            alt="logo"
          ></img>
          teebo
        </div>

        <div className="header-buttons">
          {!document.cookie && <GuestActions />}
          {document.cookie && (
            <>
              <img
                className="profile-icon header-icon"
                src=""
                alt="profile"
                onClick={props.toggleProfile}
              ></img>
              <i></i>
            </>
          )}
        </div>
      </header>
    </>
  );
}
