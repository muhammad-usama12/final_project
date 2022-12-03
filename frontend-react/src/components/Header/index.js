import React from "react";
import "./Header.scss";
import ToggleColorMode from "../ToggleColorMode";

import { Link } from "react-router-dom";

export default function Header(props) {
  // const logo =
  //   "data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMjQgMjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTE5IDZoLTQuNTlsMi4zLTIuMjlhMSAxIDAgMSAwLTEuNDItMS40MkwxMiA1LjU5bC0zLjI5LTMuM2ExIDEgMCAxIDAtMS40MiAxLjQyTDkuNTkgNkg1YTMgMyAwIDAgMC0zIDN2MTBhMyAzIDAgMCAwIDMgM2gxNGEzIDMgMCAwIDAgMy0zVjlhMyAzIDAgMCAwLTMtM1ptLTMgMTBhMiAyIDAgMCAxLTIgMkg2YTIgMiAwIDAgMS0yLTJ2LTZhMiAyIDAgMCAxIDItMmg4YTIgMiAwIDAgMSAyIDJabTMgM2ExIDEgMCAxIDEgMS0xIDEgMSAwIDAgMS0xIDFabTAtNGExIDEgMCAxIDEgMS0xIDEgMSAwIDAgMS0xIDFabTAtNGExIDEgMCAxIDEgMS0xIDEgMSAwIDAgMS0xIDFaIiBmaWxsPSIjZjZmMWYxIiBjbGFzcz0iZmlsbC00NjQ2NDYiPjwvcGF0aD48L3N2Zz4=";

  const profile = props.profile;

  return (
    <div className="App">
      <nav className="Navbar">
        <Link to="/">
          <h2>teebo</h2>
        </Link>
        <ul>
          <li>{!document.cookie && <Link to="/signup">Sign Up</Link>}</li>
          <li>{!document.cookie && <Link to="/login">Log In</Link>}</li>
          <li>
            {document.cookie && (
              <Link to="#" onClick={props.profile}>
                Profile
              </Link>
            )}
          </li>
          <li className="conditional">
            {document.cookie && (
              <Link to="#" onClick={props.logout}>
                Logout
              </Link>
            )}
          </li>
          <li className="conditional">
            <Link to="#" onClick={props.edit}>
              Edit Profile
            </Link>
          </li>
        </ul>
      </nav>
      <div className="header-buttons"></div>
    </div>
  );
}

// import React from "react";
// import "./Header.scss";

// import Actions from "./Actions";
// import { Link } from "react-router-dom";

// export default function Header(props) {

//   const logo = "data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMjQgMjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTE5IDZoLTQuNTlsMi4zLTIuMjlhMSAxIDAgMSAwLTEuNDItMS40MkwxMiA1LjU5bC0zLjI5LTMuM2ExIDEgMCAxIDAtMS40MiAxLjQyTDkuNTkgNkg1YTMgMyAwIDAgMC0zIDN2MTBhMyAzIDAgMCAwIDMgM2gxNGEzIDMgMCAwIDAgMy0zVjlhMyAzIDAgMCAwLTMtM1ptLTMgMTBhMiAyIDAgMCAxLTIgMkg2YTIgMiAwIDAgMS0yLTJ2LTZhMiAyIDAgMCAxIDItMmg4YTIgMiAwIDAgMSAyIDJabTMgM2ExIDEgMCAxIDEgMS0xIDEgMSAwIDAgMS0xIDFabTAtNGExIDEgMCAxIDEgMS0xIDEgMSAwIDAgMS0xIDFabTAtNGExIDEgMCAxIDEgMS0xIDEgMSAwIDAgMS0xIDFaIiBmaWxsPSIjZjZmMWYxIiBjbGFzcz0iZmlsbC00NjQ2NDYiPjwvcGF0aD48L3N2Zz4="

//   return (
//       <header>
//         <Link to="/">
//           <div className="logo-name" onClick={props.toggleDashboard}>
//             <img
//               className="logo-image"
//               src={logo}
//               alt="logo"
//             ></img>
//             teebo
//           </div>
//         </Link>

//         <div className="header-buttons">
//           <Actions
//             logOut={props.logOut}
//             toggleProfile={props.toggleProfile}
//             toggleSettings={props.toggleEditProfile}
//           />
//         </div>
//       </header>
//   );
// }
