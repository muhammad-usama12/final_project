import { Route, Routes } from "react-router-dom";
import Login from "./Registration/Login";
import SignUp from "./Registration/SignUp";
import Profile from "./Profile";
import PrivateRoutes from "./PrivateRoutes";
import Compilation from "./Article/Compilation";
import Guest from "./Article/Guest";
import { useContext } from "react";
import { AccountContext } from "./AccountContext";
import Header from "./Header";

const Views = () => {
  const { user } = useContext(AccountContext);
  return user.loggedIn === null ? (
    ""
  ) : (
    <>
      <Header />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/guest" element={<Guest />} />
        <Route element={<PrivateRoutes />}>
          <Route path="/dash" element={<Compilation />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
        <Route path="*" element={<Login />} />
      </Routes>
    </>
  );
};

export default Views;
