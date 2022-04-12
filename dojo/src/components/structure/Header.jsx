import React from "react";

const Header = ({ headerText, image, altText }) => {
  return (
    <header>
      <h1>
        <img src={image} alt={altText} />
        {headerText}
      </h1>
    </header>
  );
};

export default Header;
