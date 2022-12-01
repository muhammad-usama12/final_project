import { Route, Routes } from "react-router-dom";
import Login from "./Registration/Login";
import SignUp from "./Registration/SignUp";

import App from "./App";
import { useContext } from "react";
import { AccountContext } from "./AccountContext";

const Views = () => {
  const user = useContext(AccountContext);
  console.log("Account Context User:", user);
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="*" element={<App />} />
    </Routes>
  );
};

export default Views;
