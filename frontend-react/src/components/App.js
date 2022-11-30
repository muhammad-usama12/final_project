import "./App.scss";

import Header from "./Header/index";
import Article from "./Article";
import CategoryList from "./CategoryList";
import NewPost from "./NewPost";
import Profile from "./Profile";
import EditProfile from "./Profile/EditProfile";
import Views from "./views";
import UserContext from "./AccountContext";

import useApplicationData from "../hooks/useApplicationData";
import { getShowForPost, getUserForPost } from "../helpers/selectors";

function App() {
  return (
    <UserContext>
      <Views />
    </UserContext>
  );
}
export default App;
