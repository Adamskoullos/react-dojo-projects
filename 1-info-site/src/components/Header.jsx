import React from "react";
import logo from "../logo.svg";

const Header = () => {
  return (
    <header>
      <nav>
        <img src={logo} width="100px" alt="logo" />
        <span>React Course - Project 1</span>
      </nav>
    </header>
  );
};

export default Header;
