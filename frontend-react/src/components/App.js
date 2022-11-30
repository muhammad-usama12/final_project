import "./App.scss";

import Views from "./views";
import UserContext from "./AccountContext";

function App() {
  return (
    <UserContext>
      <Views />
    </UserContext>
  );
}
export default App;
