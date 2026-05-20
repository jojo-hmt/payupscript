import React from "react";
import { createRoot } from "react-dom/client";
import PayUpGenerator from "./App.jsx";
import "./styles.css";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <PayUpGenerator />
  </React.StrictMode>,
);
