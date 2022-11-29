import { Route, Routes } from "react-router-dom";
import Login from "./Registration/Login";
import SignUp from "./Registration/SignUp";
import Profile from "./Profile";
import App from "./App";

const Views = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/home" element={<App />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  );
};

export default Views;