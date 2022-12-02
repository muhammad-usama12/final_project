import { Route, Routes } from "react-router-dom";
import Login from "./Registration/Login";
import SignUp from "./Registration/SignUp";

import App from "./App";
import { useContext } from "react";
import { AccountContext } from "./AccountContext";
import Profile from "./Profile";
import EditProfile from "./Profile/EditProfile";
import PrivateRoutes from "../components/PrivateRoutes";

const Views = () => {
  const user = useContext(AccountContext);
  console.log("user.loggedin &&", user.user.loggedIn);
  return user.loggedIn === null ? (
    ""
  ) : (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/" element={<App />} />
    </Routes>
  );
};

export default Views;
