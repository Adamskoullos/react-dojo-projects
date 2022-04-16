import React from "react";
import { useAppContext } from "../appContext";

const CompTwo = () => {
  const { user, setUserName } = useAppContext();
  return (
    <div>
      <div>Component Two</div>
      <input
        type="text"
        value={user}
        onChange={(e) => setUserName(e.target.value)}
      />
    </div>
  );
};

export default CompTwo;
