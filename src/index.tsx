import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";
import App from "./components/App/App";
import { ThemeProvider } from "styled-components";
import styledMainTheme from "./styles/styledMainTheme";
import GlobalStyles from "./styles/GlobalStyles";
import "@fontsource/manrope/400.css";
import "@fontsource/manrope/700.css";
import { BrowserRouter } from "react-router-dom";
import * as serviceWorkersRegistration from "./serviceWorkerRegistration";

const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={styledMainTheme}>
        <BrowserRouter>
          <GlobalStyles />
          <App />
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);

serviceWorkersRegistration.register();
