import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import Views from "./components/views";
import UserContext from "./components/AccountContext";

import "./index.css";

import Scripts from "./components/Scripts";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Scripts />
      <UserContext>
        <Views />
      </UserContext>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
