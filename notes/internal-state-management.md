## State Management

- [useReducer](#useReducer)
- [useContext](#useContext)

---

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
    case "setCount":
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
        <button type="button" onClick={() => dispatch({ type: "setCount" })}>
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

---

### useContext

useContext is a good option when working with state that is shared between components that do not have a direct parent/child relationship.

The below example shows the context being used as an app wide shared global state:
`appContext.js`

```js
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
```

`App.js`

```js
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
```

`Some Component`

```js
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
```
