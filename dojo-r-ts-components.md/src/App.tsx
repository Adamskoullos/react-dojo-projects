/** @jsxImportSource @emotion/react */
// import React, { useContext, useState } from "react";
import styled from "@emotion/styled/macro";
import { css, Global, keyframes } from "@emotion/react/macro";
import { ReactNode } from "react";

const H1 = styled.h1`
  margin: auto;
  width: 50%;
  text-align: center;
  padding: 10px 10px;
  box-shadow: 0px 0px 20px #b700ff9d;
  border-radius: 10px;
  font-weight: 400;
  color: #8202b1c8;
`;

function App() {
  return (
    <div className="App">
      <H1>Main Heading</H1>
    </div>
  );
}

export default App;
