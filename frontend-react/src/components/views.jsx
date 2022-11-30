import { Route, Routes } from "react-router-dom";
import { useContext } from "react";

import Login from "./Registration/Login";
import SignUp from "./Registration/SignUp";
import Profile from "./Profile";
import EditProfile from "./EditProfile/EditProfile";
import PrivateRoutes from "./PrivateRoutes";
import Compilation from "./Article/Compilation";
import Guest from "./Article/Guest";

import Header from "./Header";
import Spacing from "./Spacing";

import { AccountContext } from "./AccountContext";
import useApplicationData from "../hooks/useApplicationData";

const Views = () => {
  const {
    state,
    hideSpoiler,
    handleSpoilerToggle,
    getFilteredShows,
    getAllShows,
    updateProfile
  } = useApplicationData();

  const { user } = useContext(AccountContext);

  return user.loggedIn === null ? (
    ""
  ) : (
    <>
      <Header user={user} state={state}/>
      <Spacing />

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/guest" element={<Guest />} />
        <Route path="/dash" element={<Compilation 
          state={state}
          hideSpoiler={hideSpoiler}
          getFilteredShows={getFilteredShows}
          getAllShows={getAllShows}
          handleSpoilerToggle={handleSpoilerToggle}
        />} />
        <Route element={<PrivateRoutes />}>
          <Route path="/profile" element={<Profile
            state={state}
            user={user}
            getAllShows={getAllShows}
          />} />
          <Route path="/profile/edit" element={<EditProfile
            state={state}
            user={user}
            updateProfile={updateProfile}
          />} />
        </Route>
        
        <Route path="*" element={<Login />} />
      </Routes>
    </>
  );
};

export default Views;
