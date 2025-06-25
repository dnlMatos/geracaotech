import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Layout from "../src/pages/Layout";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Layout />
  </StrictMode>
);
