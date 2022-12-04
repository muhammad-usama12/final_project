import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Profile from "./Views/Profile";
import EditProfile from "./Views/EditProfile";
import Scripts from "./components/Scripts";
import Login from "./components/Registration/Login";
import SignUp from "./components/Registration/SignUp";
import App from "./components/App";
import Search from "./Views/SearchTest";
import ProfileVisit from "./Views/ProfileVisit";

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/profile/:id", element: <ProfileVisit /> },
  { path: "/profile", element: <Profile /> },
  { path: "/profile/edit", element: <EditProfile /> },
  { path: "/test", element: <Search /> },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <SignUp /> },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Scripts />
    <RouterProvider router={router} />
  </React.StrictMode>
);
