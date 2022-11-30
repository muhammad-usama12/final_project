import { useContext } from "react";
import { AccountContext } from "./AccountContext";

const { Outlet, Navigate } = require("react-router-dom");

const useAuth = () => {
  const { user } = useContext(AccountContext);
  return user && user.loggedIn;
};

export default function PrivateRoutes() {
  const isAuth = useAuth();
  return isAuth ? <Outlet /> : <Navigate to="/login" />;
}
