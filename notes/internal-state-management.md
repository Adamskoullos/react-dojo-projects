## State Management

### useReducer

`useReducer` can be used instead of multiple `useState` declarations. It can be placed above/outside the component function separating the state logic from the UI. This way all state is cleanly located in an organized and consistent manner.

1. import `useReducer`
2. Create state with initial values within component function:

```js
const [state, dispatch] = useReducer(reducer, { count: 0, user: "" });
```

3. Create `reducer` function above/outside component function using a `switch` with a `case` for each `action`

```js
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
```
