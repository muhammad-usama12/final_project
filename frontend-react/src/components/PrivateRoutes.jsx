import { useContext } from "react";
import { AccountContext } from "./AccountContext";
import Guest from "./Article/Guest";
import App_2 from "./App_2";

const { Outlet, Navigate } = require("react-router-dom");

const useAuth = () => {
  const { user } = useContext(AccountContext);
  return user && user.loggedIn;
};

export default function PrivateRoutes() {
  const isAuth = useAuth();
  return isAuth ? <Outlet /> : <Navigate to="/guest" />;
}
