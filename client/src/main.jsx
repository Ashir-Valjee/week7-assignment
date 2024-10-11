import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
// we need a routing provider

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
