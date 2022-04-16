import React from "react";
import "./App.css";
import { AppContextProvider } from "./appContext";
import ComponentOne from "./components/CompOne";
import ComponentTwo from "./components/CompTwo";

function App() {
  return (
    <div className="App">
      <AppContextProvider>
        <h1>Welcome To The DOJO</h1>
        <ComponentOne />
        <ComponentTwo />
      </AppContextProvider>
    </div>
  );
}

export default App;
