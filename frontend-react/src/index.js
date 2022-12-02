import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import Views from "./components/views";
import UserContext from "./components/AccountContext";
import theme from "./theme";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import { ChakraComponent } from "@chakra-ui/react";

import "./index.css";

import Scripts from "./components/Scripts";
import Header from "./components/Header";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ChakraProvider theme={theme}>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <Scripts />
        <UserContext>
          <Views />
        </UserContext>
      </ChakraProvider>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
