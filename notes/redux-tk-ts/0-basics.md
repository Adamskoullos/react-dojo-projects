## Redux Toolkit with TypeScript

```
npm install react-redux @reduxjs/toolkit
```

- [Folder structure](#Folder-structure)
- [Build process](#Build-process)
- [Accessing state](#Accessing-state)
- [Updating state](#Updating-state)

---

### Folder Structure

```
/features
    reservationSlice.ts
/app
    store.ts
```

---

### Build Process

First create and configure the store:

`/app/store.ts`

```tsx
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    // slices go here
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
```

Then wrap the application with a `Provider` and pass in the `store`:

`index.tsx`

```tsx
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
// Store imports
import { Provider } from "react-redux";
import { store } from "./app/store";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
```

Now the store is in place and the whole app has access to the store, we now need to create `slices` for each group of data. Below is the pattern for creating a `slice`/`reducer`.

- We set up an `interface` to be used for the initialState

We also need to import **type** `PayloadAction` from redux toolkit that allows us to correctly set the type of the `action` and we replace the generic in this case with type string.

We then export the `reducer` so we can import it within the `store` and we also export all actions in this case `addReservation`

```ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ReservationState {
  value: string[];
}

const initialState: ReservationState = {
  value: [],
};

export const reservationsSlice = createSlice({
  name: "reservations",
  initialState,
  reducers: {
    addReservation: (state, action: PayloadAction<string>) => {
      state.value.push(action.payload);
    },
  },
});

export const { addReservation } = reservationsSlice.actions;

export default reservationsSlice.reducer;
```

Import `reducer` and add it to the `store`:

`/app/store.ts`

```ts
import { configureStore } from "@reduxjs/toolkit";
import reservationsReducer from "../features/reservationSlice";

export const store = configureStore({
  reducer: {
    reservations: reservationsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
```

---

### Accessing state

Firstly if we want to directly access the state within the store we need to import type `RootState` from the store and `useSelector` from react-redux.
The below example saves the state in a const `reservations` which can be used directly to map over:

```tsx
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import { RootState } from "./app/store";
import ReservationCard from "./components/ReservationCard";
import { addReservation } from "./features/reservationSlice";

function App() {
  const reservations = useSelector((state: RootState) => state.reservations.value);
```

```tsx
<div className="reservation-cards-container">
  {reservations.map((item) => (
    <ReservationCard name={item} key={item} />
  ))}
</div>
```

Then in the child component we create or import an interface for the props and then are able to use the props as normal:

```tsx
import React from "react";

interface ReservationCardTypes {
  name: string;
}

export default function ReservationCard({ name }: ReservationCardTypes) {
  return (
    <div key={name} className="reservation-card-container">
      {name}
    </div>
  );
}
```

---

### Updating state

To update the state we need to import both `useDispatch` in order to dispatch any action functions and also any action functions we want to use.

In the below example we are importing `addReservation`

```tsx
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import { RootState } from "./app/store";
import ReservationCard from "./components/ReservationCard";
import { addReservation } from "./features/reservationSlice";

function App() {
  const reservations = useSelector((state: RootState) => state.reservations.value);
  const dispatch = useDispatch();

  const [reservationInput, setReservationInput] = useState("");

  const addReservationHandler = () => {
    if (!reservationInput) return;

    dispatch(addReservation(reservationInput));
    setReservationInput("");
  };
```
