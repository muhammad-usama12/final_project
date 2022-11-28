import { Route, Routes } from "react-router-dom";
import App from "./App";
import Login from "./Registration/Login";
import SignUp from "./Registration/SignUp";

const Views = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/home" element={<App />} />
    </Routes>
  );
};

export default Views;
