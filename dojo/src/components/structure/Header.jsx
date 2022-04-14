import React from "react";
import { NavLink } from "react-router-dom";

const Header = ({ headerText, image, altText }) => {
  return (
    <header>
      <h1>
        <img src={image} alt={altText} />
        {headerText}
      </h1>
      <nav>
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? "active" : undefined)}
        >
          Menu
        </NavLink>
        <NavLink
          to="/ice-creams"
          className={({ isActive }) => (isActive ? "active" : undefined)}
        >
          Add Ice Creams
        </NavLink>
      </nav>
    </header>
  );
};

export default Header;
