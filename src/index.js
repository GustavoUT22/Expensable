import React from "react";
import ReactDOM from "react-dom";
import { Global } from "@emotion/react";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import { global, reset } from "./styles";

ReactDOM.render(
  <React.StrictMode>
    <Global styles={reset} />
    <Global styles={global} />
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
