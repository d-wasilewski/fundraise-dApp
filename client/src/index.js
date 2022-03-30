import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { FundraisingProvider } from "./context/FundraisingContext";

ReactDOM.render(
  <FundraisingProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </FundraisingProvider>,
  document.getElementById("root")
);
