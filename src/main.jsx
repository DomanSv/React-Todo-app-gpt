import React from "react";
import ReactDOM from "react-dom/client";

import { prepareMocks } from "./mocks";

import "./index.css";

prepareMocks().then(() => {
  ReactDOM.createRoot(document.getElementById("root")).render(<React.StrictMode>Hello World!</React.StrictMode>);
});
