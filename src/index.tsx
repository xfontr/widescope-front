import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";
import App from "./App";
import "./index.css";
import { ThemeProvider } from "styled-components";
import styledMainTheme from "./styledMainTheme";

const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={styledMainTheme}>
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);
