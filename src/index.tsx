import React, { useState } from "react";
import ReactDOM from "react-dom";
import App from "./App";
import styled, { ThemeProvider } from "styled-components";
import { LightTheme, DarkTheme } from "./theme";
import { QueryClientProvider, QueryClient } from "react-query";

const queryClient = new QueryClient();

const Box = () => {
  const [isClicked, setIsClicked] = useState(false);

  const onClick = (event: React.MouseEvent<HTMLElement>) => {
    setIsClicked((current) => !current);
  };

  const Theme = styled.button`
    position: fixed;
    top: 20px;
    left: 20px;
    border-style: none;
    font-size: 30px;
    background-color: transparent;
  `;

  return (
    <>
      <Theme onClick={onClick}>{isClicked ? "☀️" : "☁️"}</Theme>

      <ThemeProvider theme={isClicked ? LightTheme : DarkTheme}>
        <App />
      </ThemeProvider>
    </>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Box />
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
