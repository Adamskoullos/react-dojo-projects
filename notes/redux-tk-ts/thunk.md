## createAsyncThunk

### Workflow

1. Dispatch(asyncFunction) from component
2. The `createAsyncThunk` asyncFunction handles the resolved promise and `dispatches` one of three `actions`:
   - `pending`
   - `fulfilled`
   - `rejected`
3. These three actions are defined within the `extraReducers` builder function within the `slice` and it is this logic that updates the `state`

---

### Dev Process Overview

1. Create the async function
2. Add the `extraReducers` builder function to the slice
3. Add logic for each `action` updating the state as required:
   - `pending`
   - `fulfilled`
   - `rejected`
4. export `actions`
5. Pull `useDispatch` and any `action` functions into component and use within `useEffect`

---

### Patterns

Above the `slice` we can create any `createAsyncThunk` requests. The returned value is the `action.payload` within the `extraReducers` builder.

When typing for `createAsyncThunk` we type any payloadCreator arguments and also the returned payloadCreator value using type assertion: `as`.

`/features/reservationsSlice`:

```tsx
import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

type Reservation = string;

interface ReservationState {
  reservations: Reservation[];
  status: "loading" | "success" | "failed" | "idle";
  error: null | string;
}

const initialState: ReservationState = {
  reservations: [],
  status: "idle",
  error: null,
};

export const getReservations = createAsyncThunk(
  "reservations/getReservations",
  async () => {
    try {
      const res = await axios.get("url");
      return [...res.data] as Reservation[];
    } catch (err) {
      return err.message;
    }
  }
);

export const addReservation = createAsyncThunk(
  "reservations/addReservation",
  async (newItem: Reservation) => {
    try {
      const res = await axios.post("url", newItem);
      return res.data as Reservation;
    } catch (err) {
      return err.message;
    }
  }
);
```

Then within the slice we can create the `extraReducers` builder function and add each case for each request.

The returned value from the `createAsyncThunk` request is piped through as the `action.payload`.

**Note**: When using `TypeScript` we need to use the builder function. If typing is properly done in the Thunk

```tsx
export const reservationsSlice = createSlice({
  name: "reservations",
  initialState,
  reducers: {
    //
  },
  extraReducers(builder){
     builder
      // getReservations >>>>>>>>>>>>>>>>>>>>>>>>>>>>
      .(getReservations.pending, (state, action) => {
         state.status = 'loading';
      })
      .(getReservations.fulfilled, (state, action) => {
         state.status = 'success';
         state.reservations = action.payload;
      });
      .(getReservations.rejected, (state, action) => {
         state.status = 'failed';
         state.error = action.error.message;
      });
      // addReservation >>>>>>>>>>>>>>>>>>>>>>>>>>>
      .(addReservation.fulfilled, (state, action) => {
         state.reservations.push(action.payload);
      });
  }
});

export default reservationsSlice.reducer;
```

Then if its data like the above reservations that we want to load into the store as the application initially loads we can do this directly within `index.ts`.

As we have the `store` we can directly access `dispatch`:

```tsx
// Store imports
import { Provider } from "react-redux";
import { store } from "./app/store";
// Import createAsyncThunk request function
import { getReservations } from "./features/reservationSlice";

store.dispatch(getReservations());

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

Or we can access the slice state as normal within components:

```tsx
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import { RootState } from "./app/store";
import ReservationCard from "./components/ReservationCard";
import { addReservation, getReservations } from "./features/reservationSlice";

function App() {
  const reservations = useSelector((state: RootState) => state.reservations.reservations);
  const status = useSelector((state: RootState) => state.reservations.status);
  const error = useSelector((state: RootState) => state.reservations.error);
```

We can dispatch the async request within `useEffect`:

```tsx
const dispatch = useDispatch();

useEffect(() => {
  dispatch(getReservations());
}, []);
```

```tsx
<div className="reservation-cards-container">
  {reservations.map((item) => (
    <ReservationCard name={item} key={item} />
  ))}
</div>
```
