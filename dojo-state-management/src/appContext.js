import React, { createContext, useContext, useState } from "react";

// Create global context
export const AppContext = createContext();

// Create wrapper so only one import is required when using within components
export const useAppContext = () => useContext(AppContext);

// Export context provider to wrap the application so all components within app have access
export const AppContextProvider = ({ children }) => {
  // Create the shared global state object
  const [state, setState] = useState({
    user: "Adam",
    setUserName: (name) => setState({ ...state, user: name }),
  });
  return (
    <AppContext.Provider value={{ ...state }}>{children}</AppContext.Provider>
  );
};
