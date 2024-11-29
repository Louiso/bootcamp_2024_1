import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

import { ThemeProvider } from "@material-tailwind/react";
import { MensajeProvider } from "./context/MesajeContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider>
      <MensajeProvider>
        <App />
      </MensajeProvider>
    </ThemeProvider>
  </React.StrictMode>,
);
