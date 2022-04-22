## React / TS - Hook Typing Patterns

- [useSate](#useState)
- [Using Context and Reducer](#Using-Context-and-Reducer)
- [useReducer](#useReducer)
- [useRef](#useRef)
- [Custom Hooks](#Custom-Hooks)
- [useMemo](#useMemo)
- [Exporting props as an interface](#Exporting-props-as-an-interface)
- [Generic components using const](#Generi-components-using-const)

---

## useSate

```ts
// Initial empty array  but able to accept an array of numbers
const [arr, setArr] = useState<number[]>([]);

// Initial value of null but can be either a string or null
const [text, setText] = useState<string | null>(null);

// Initial empty array but able to take an array of specific interface or type
const [arr, setArr] = useState<ISomeInterface[]>([]);
```

---

## Using Context and Reducer

**1. Create the context and Reducer**

```tsx
import React, { createContext, useReducer } from "react";

// Interface
interface IUser {
  userName: string | null;
  age: number | null;
  email: string | null;
}

// Initial value
const initialState: IUser = {
  userName: null,
  age: null,
  email: null,
};

// Create action union type
type Action =
  | { type: "SET_USER_NAME"; payload: string }
  | { type: "SET_AGE"; payload: number }
  | { type: "SET_EMAIL"; payload: string };

// Reducer
const reducer = (state: IUser, action: Action) => {
  switch (action.type) {
    case "SET_USER_NAME":
      return {
        ...state,
        userName: action.payload,
      };
    case "SET_AGE":
      return {
        ...state,
        age: action.payload,
      };
    case "SET_EMAIL":
      return {
        ...state,
        email: action.payload,
      };
    default:
      return state;
  }
};

// create context with generic types and initial state for both state and dispatch
// 1. Add specific generic types for state and dispatch
// 2. Create initial state object with dispatch being a function that returns an object
const AppContext = createContext<{
  state: IUser;
  dispatch: React.Dispatch<Action>;
}>({ state: initialState, dispatch: () => {} });

// Create React component
// 1. Pull in state and dispatch with useReducer, passing in reducer and initial state
// 2. Use the AppContext to create the wrapper provider
// 3. Pass in state and dispatch
// 4. Create prop interface for children and assign to props

interface IProps {
  children: React.ReactNode;
}

const AppContextProvider = ({ children }: IProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

// Export the wrapper component provider and context
export { AppContextProvider, AppContext };
```

**2. Wrap the app with the wrapper Provider:**

`index.ts`

```tsx
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { AppContextProvider } from "./context/AppContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <AppContextProvider>
      <App />
    </AppContextProvider>
  </React.StrictMode>
);
```

**3. Use the context within the app:**

1. Pull in the `AppContext` and `useContext` and use them to grab `state` and `dispatch`
2. Access state directly and dispatch an action object

```tsx
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
```
