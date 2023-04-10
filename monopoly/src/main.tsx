import "./index.css";

import { Leva } from "leva";
import React from "react";
import ReactDOM from "react-dom/client";

import App from "./components/App";

const container = document.querySelector("#root");
const root = ReactDOM.createRoot(container as HTMLDivElement);

root.render(
  <React.StrictMode>
    <App />
    <Leva hidden />
  </React.StrictMode>
);
