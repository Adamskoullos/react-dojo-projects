## State Management

- [useReducer](#useReducer)
- [useContext](#useContext)
- [Using useContext with useReducer](#Using-useContext-with-useReducer)

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

This next example extract `chatReducer` out into it own file where the state and logic are housed. The exported `useChatReducer` does all the work creating and setting up a reducer and wrap `useReducer` providing a single import:

`chatReducer.js`

```js
import { useReducer } from "react";

const initialState = {
  messages: [
    { id: 1, content: "Hey", from: "me" },
    { id: 2, content: "How are you", from: "Steve" },
    { id: 3, content: "I am good", from: "me" },
    { id: 4, content: "whats up", from: "me" },
    { id: 5, content: "all good", from: "Steve" },
  ],
  currentMessage: "",
};

const reducer = (state, action) => {
  console.log(state);
  switch (action.type) {
    case "setMessages":
      return { ...state, messages: action.messages };
    case "addMessage":
      return {
        ...state,
        currentMessage: "",
        messages: [
          ...state.messages,
          {
            id: state.messages.length + 1,
            content: action.message,
            from: action.from,
          },
        ],
      };
    case "setCurrentMessage":
      return { ...state, currentMessage: action.message };
  }
};

export const useChatReducer = () => useReducer(reducer, initialState);
```

Then it can be used within components in a very clean manner:

```js
import { useChatReducer } from "./reducers/chatReducer";

function App() {
  const [state, dispatch] = useChatReducer();

  const scrollRef = useScrollToBottom(state.messages);
  return (
    <div className="App" style={styles.wrapper}>
      <div style={styles.container} ref={(ref) => (scrollRef.current = ref)}>
        {state.messages.map((message) => (
          <Message key={message.id} message={message} />
        ))}
      </div>
      <Input
        value={state.currentMessage}
        onChange={(message) => dispatch({ type: "setCurrentMessage", message })}
        onEnter={(message) =>
          dispatch({ type: "addMessage", message, from: "me" })
        }
      />
    </div>
  );
}
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

---

### Using useContext with useReducer

Starting with `chatReducer.js` we extract a features state and actions into its own file:

```js
import { useReducer } from "react";

const initialState = {
  messages: [
    { id: 1, content: "Hey", from: "me" },
    { id: 2, content: "How are you", from: "Steve" },
    { id: 3, content: "I am good", from: "me" },
    { id: 4, content: "whats up", from: "me" },
    { id: 5, content: "all good", from: "Steve" },
  ],
  currentMessage: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "setMessages":
      return { ...state, messages: action.messages };
    case "addMessage":
      return {
        ...state,
        currentMessage: "",
        messages: [
          ...state.messages,
          {
            id: state.messages.length + 1,
            content: action.message,
            from: action.from,
          },
        ],
      };
    case "setCurrentMessage":
      return { ...state, currentMessage: action.message };
  }
};

export const useChatReducer = () => useReducer(reducer, initialState);
```

We can then create the context `useChatContext.js` also extracting this out into its own file.
We pull in `useChatReducer` and pass `state` and `dispatch` in to the provider value in this instance as an object.

```js
import React, { createContext, useContext } from "react";
import { useChatReducer } from "../reducers/chatReducer";

const ChatContext = createContext();

// React Component
export const ChatProvider = ({ children }) => {
  const [state, dispatch] = useChatReducer();

  return (
    <ChatContext.Provider value={{ state, dispatch }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => useContext(ChatContext);
```

We then need to wrap the application (`App.js`) with the provider in order to make both `state` and `dispatch` available throughout the component tree. To do this we first create an `AppContainer` component and use it wrap the `App.js`. The example below does this underneath the `App` component function within the same file:

```js
export default App;

export const AppContainer = () => {
  return (
    <ChatProvider>
      <App />
    </ChatProvider>
  );
};
```

We then alter `index.js` to use `AppContainer`:

```js
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { AppContainer } from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AppContainer />
  </React.StrictMode>
);
```

Now the system has been wired up we can now pull in `state` and `dispatch` via `useChat` and use them directly in any component:

```js
import React from "react";
import { useChat } from "../hooks/useChatContext";

export const Input = () => {
  const { state, dispatch } = useChat();
  return (
    <textarea
      style={{ padding: 12 }}
      value={state.currentMessage}
      onChange={(e) =>
        dispatch({ type: "setCurrentMessage", message: e.target.value })
      }
      onKeyUp={(e) =>
        e.key === "Enter"
          ? dispatch({
              type: "addMessage",
              message: e.target.value,
              from: "me",
            })
          : null
      }
    />
  );
};
```
