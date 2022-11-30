import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const AccountContext = createContext();

export default function UserContext({ children }) {
  const [user, setUser] = useState({ loggedIn: null });
  const navigate = useNavigate();
  useEffect(() => {
    fetch("/api/auth/login", {
      credentials: "include",
    })
      .catch((err) => {
        setUser({ loggedIn: false });
        return;
      })
      .then((res) => {
        if (!res || res.status >= 400) {
          setUser({ loggedIn: false });
          return;
        }
        return res.json();
      })
      .then((data) => {
        if (!data) {
          console.log("not logged in");
          setUser({ loggedIn: false });
          return;
        }
        console.log("successfully logged in");
        console.log("data received upon login:", data);
        setUser({ ...data });
      });
  }, []);
  return (
    <AccountContext.Provider value={{ user, setUser }}>
      {children}
    </AccountContext.Provider>
  );
}
