import React from "react";
import ReactDOM from "react-dom";
import "./app.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import App from "./App";

ReactDOM.render(
  <BrowserRouter>
     <App />
  </BrowserRouter>,
  document.getElementById("root")
);
