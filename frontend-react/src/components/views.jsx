import { Route, Routes } from "react-router-dom";
import Login from "./Registration/Login";
import SignUp from "./Registration/SignUp";
import Profile from "./Profile";
import App from "./App";
import PrivateRoutes from "./PrivateRoutes";
import App_2 from "./App_2";
import Guest from "./Article/Guest";
import { useContext } from "react";
import { AccountContext } from "./AccountContext";

const Views = () => {
  const { user } = useContext(AccountContext);
  return user.loggedIn === null ? (
    ""
  ) : (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/guest" element={<Guest />} />
      <Route element={<PrivateRoutes />}>
        <Route path="/profile" element={<Profile />} />
        <Route path="/dash" element={<App_2 />} />
      </Route>
      <Route path="*" element={<Guest />} />
    </Routes>
  );
};

export default Views;
