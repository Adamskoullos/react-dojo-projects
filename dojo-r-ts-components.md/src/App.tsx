import React, { useContext, useState } from "react";
import { AppContext } from "./context/AppContext";
import "./App.css";

function App() {
  const { state, dispatch } = useContext(AppContext);
  const [currentUser, setCurrentUser] = useState("");
  return (
    <div className="App">
      {state.userName && <h1>{`Current user: ${state.userName}`}</h1>}
      <input
        type="text"
        value={currentUser}
        onChange={(e) => setCurrentUser(e.target.value)}
      />
      <button
        onClick={() =>
          dispatch({ type: "SET_USER_NAME", payload: currentUser })
        }
      >
        Update User
      </button>
    </div>
  );
}

export default App;
