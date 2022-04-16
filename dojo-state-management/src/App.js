import React, { useReducer } from "react";
import "./App.css";

const reducer = (state, action) => {
  switch (action.type) {
    case "buttonClick":
      return { ...state, count: state.count + 1 };
    case "setUser":
      return { ...state, user: action.user };
    default:
      return state;
  }
};

function App() {
  const [state, dispatch] = useReducer(reducer, { count: 0, user: "" });
  return (
    <div className="App">
      <h1>Welcome To The DOJO</h1>
      <div>
        <button type="button" onClick={() => dispatch({ type: "buttonClick" })}>
          Click Me
        </button>
        Current count is {state.count}
      </div>
      <div>
        <input
          type="text"
          value={state.user}
          onChange={(e) => dispatch({ type: "setUser", user: e.target.value })}
        />
        Current User value: {state.user}
      </div>
    </div>
  );
}

export default App;
