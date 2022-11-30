import { Route, Routes } from "react-router-dom";
import Login from "./Registration/Login";
import SignUp from "./Registration/SignUp";
import Profile from "./Profile";
<<<<<<< HEAD

=======
import App from "./App";
import PrivateRoutes from "./PrivateRoutes";
import Compilation from "./Article/Compilation";
import Guest from "./Article/Guest";
import { useContext } from "react";
import { AccountContext } from "./AccountContext";
>>>>>>> b591ee75157cbbb3e2741dad744cabb521c27257

const Views = () => {
  const { user } = useContext(AccountContext);
  return user.loggedIn === null ? (
    ""
  ) : (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
<<<<<<< HEAD
      <Route path="/profile" element={<Profile />} />
    </Routes>
  );
};
export default Views;
=======
      <Route path="/guest" element={<Guest />} />
      <Route element={<PrivateRoutes />}>
        <Route path="/dash" element={<Compilation />} />
        <Route path="/profile" element={<Profile />} />
      </Route>
      <Route path="*" element={<Login />} />
    </Routes>
  );
};

export default Views;
>>>>>>> b591ee75157cbbb3e2741dad744cabb521c27257
