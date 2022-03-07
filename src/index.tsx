import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import { QueryClientProvider, QueryClient } from "react-query";
import { RecoilRoot } from "recoil";
import { ThemeProvider } from "styled-components";
import { LightTheme } from "./theme";

const queryClient = new QueryClient();

ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={LightTheme}>
          <App />
        </ThemeProvider>
      </QueryClientProvider>
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById("root")
);
