## createAsyncThunk

### Workflow

1. Dispatch(asyncFunction) from component
2. The `createAsyncThunk` asyncFunction handles the resolved promise and `dispatches` one of three `actions`:
   - `pending`
   - `fulfilled`
   - `rejected`
3. These three actions are defined within the `extraReducers` builder function within the `slice` and it is this logic that either updates the `state` directly or dispatches to an existing action within the `reducers` object

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

```tsx

```
