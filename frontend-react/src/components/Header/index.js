import React, { useContext } from "react";
import "./Header.scss";

import Actions from "./Actions";
import { ApplicationContext } from "../App";
import { Link } from "react-router-dom";

export default function Header(props) {
  const state = useContext(ApplicationContext)

  const logo = "data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMjQgMjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTE5IDZoLTQuNTlsMi4zLTIuMjlhMSAxIDAgMSAwLTEuNDItMS40MkwxMiA1LjU5bC0zLjI5LTMuM2ExIDEgMCAxIDAtMS40MiAxLjQyTDkuNTkgNkg1YTMgMyAwIDAgMC0zIDN2MTBhMyAzIDAgMCAwIDMgM2gxNGEzIDMgMCAwIDAgMy0zVjlhMyAzIDAgMCAwLTMtM1ptLTMgMTBhMiAyIDAgMCAxLTIgMkg2YTIgMiAwIDAgMS0yLTJ2LTZhMiAyIDAgMCAxIDItMmg4YTIgMiAwIDAgMSAyIDJabTMgM2ExIDEgMCAxIDEgMS0xIDEgMSAwIDAgMS0xIDFabTAtNGExIDEgMCAxIDEgMS0xIDEgMSAwIDAgMS0xIDFabTAtNGExIDEgMCAxIDEgMS0xIDEgMSAwIDAgMS0xIDFaIiBmaWxsPSIjZjZmMWYxIiBjbGFzcz0iZmlsbC00NjQ2NDYiPjwvcGF0aD48L3N2Zz4="

  return (
      <header>
        <Link to="/">
          <div className="logo-name">
            <img
              className="logo-image"
              src={logo}
              alt="logo"
            ></img>
            teebo
          </div>
        </Link>

        <div className="header-buttons">
          <Actions 
            onLogOut={state && state.logout}
            toggleProfile={props.toggleProfile}
            toggleSettings={props.toggleEditProfile}
          />
        </div>
      </header>
  );
}
