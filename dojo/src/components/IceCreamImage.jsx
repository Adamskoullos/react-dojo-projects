import React from "react";

const IceCreamImage = ({ id }) =>
  id != null && (
    <img
      src={`${process.env.PUBLIC_URL}/ice-cream-images/ice-cream-${id}.svg`}
      alt="ice cream image"
    />
  );

export default IceCreamImage;
