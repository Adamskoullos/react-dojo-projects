## Redux Basics

- [Typical folder structure](#Typical-folder-structure)

- [Build process](#Build-process)
- [Accessing the store](#Accessing-the-store)
- [Updating the store from components](#Updating-the-store-from-components)

---

### Typical folder structure

```js
/store
  /action-creators
      oneActions.js
  /reducers
      oneReducer
      twoReducer
      index.js // entry point for reducers

  index.js // entry point for actions
  store.js // main store
```

---

### Build process

Create a `reducer` for a feature or group of related data.
The reducer includes:

1. Initial state
2. properties for each piece of data
3. `Action type` for each way the data will be mutated

`accountReducer.js`

```js
const initialState = {
  balance: 0,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "DEPOSIT":
      return {
        ...state,
        balance: state.balance + action.payload,
      };
    case "WITHDRAW":
      return {
        ...state,
        balance: state.balance - action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
```

Create a master `reducers` object:
`/store/reducers/index.js`

```js
import { combineReducers } from "redux";

// Import all Reducers
import accountReducer from "./accountReducer";

// Add all reducers to master store object
const reducers = combineReducers({
  account: accountReducer,
});

export default reducers;
```

Then create the `store` and pull in the `reducers`.
At this stage we need to install `thunk` and apply it, this will allow us to use `dispatch` and async code within action-creators:

```
npm install redux-thunk
```

```js
import { createStore, applyMiddleware } from "redux";
import reducers from "./reducers/index";
import thunk from "redux-thunk";

const store = createStore(reducers, {}, applyMiddleware(thunk));

export default store;
```

Now we have the store in place we need to `wrap` the application with a `provider` giving the component tree access to the store:

`index.js`

```js
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
// store imports
import { Provider } from "react-redux";
import store from "./store/index";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
```

---

### Accessing the store

`useSelector` allows us to either pull in the whole store and all reducers or just pick specific reducers like the example below:

```js
import "./App.css";

import { useSelector } from "react-redux";

function App() {
  const account = useSelector((state) => state.account);
  console.log(account);
  return (
    <div className="App">
      <h1>Redux Data Flow</h1>
      <h2>{account.balance}</h2>
    </div>
  );
}

export default App;
```

---

### Updating the store from components

An `actionCreator` function is called from within a component which undertakes any data logic/async code, then `dispatches` an action to a reducer passing up the payload. The reducer then updates the state.

First we need to create a folder for `action-creators` then create a file for each reducer that includes functions for each workflow:

`accountActions.js`

```js
export const deposit = (amount) => {
  // async code here
  return (dispatch) => {
    dispatch({
      type: "DEPOSIT",
      payload: amount,
    });
  };
};

export const withdraw = (amount) => {
  return (dispatch) => {
    dispatch({
      type: "WITHDRAW",
      payload: amount,
    });
  };
};
```

One way to make these action files available easily is by creating an `index.js` in the root of the store and exporting them all at once:

```js
export * as actionCreators from "./action-creators/accountActions";
```

Then to work with action functions within the app we need to bind the `actions` with the `reducer dispatch` method. For this we need to import `actionCreators` and the binding method from redux as well as `useDispatch` from react-redux:

```js
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "./store";
```

Then within the component function we need to grab `dispatch` and then bind with actions also destructuring the action functions to be used:

```js
const dispatch = useDispatch();
const { deposit, withdraw } = bindActionCreators(actionCreators, dispatch);
```

Then finally we can use the action functions in order to update the store:

```js
<div className="App">
  <h1>Redux Data Flow</h1>
  <h2>{account.balance}</h2>
  <button onClick={() => deposit(10)}>Deposit 10</button>
  <button onClick={() => withdraw(10)}>Withdraw 10</button>
</div>
```

---
