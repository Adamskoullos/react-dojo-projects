import React from "react";
import { useAppContext } from "../appContext";

const CompOne = () => {
  const { user } = useAppContext();
  return (
    <div>
      <div>Component One</div>
      <div>{user}</div>
    </div>
  );
};

export default CompOne;
