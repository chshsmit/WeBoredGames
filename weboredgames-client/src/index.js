import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import dotenv from 'dotenv';

dotenv.config();

ReactDOM.render(
  <App />,
  document.getElementById("root")
);
