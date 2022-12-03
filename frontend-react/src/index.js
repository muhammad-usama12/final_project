import React from "react";
import ReactDOM from "react-dom/client";
import {
 createBrowserRouter,
 RouterProvider,
 Route,
} from "react-router-dom";
import "./index.css";
import Profile from "../src/components/profile";
import EditProfile from "./Views/EditProfile";
import Login from "./components/Registration/Login";
import SignUp from "./components/Registration/SignUp";
import App from "./components/App";
 
 
const router = createBrowserRouter([
 {path: "/", element:<App /> } ,
 {path: "/profile", element: <Profile /> } ,
 {path: "/profile/edit", element: <EditProfile /> } ,
 {path: "/login", element: <Login /> } ,
 {path: "/signup", element: <SignUp /> } ,
]);
 
ReactDOM.createRoot(document.getElementById("root")).render(
 <React.StrictMode>
   <RouterProvider router={router} />
 </React.StrictMode>
);
