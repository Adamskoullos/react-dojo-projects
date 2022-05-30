## createEntityAdapter

From `createEntityAdapter` we can create an `adapter` for a `slice`. This adapter does a few of things:

1. Allows us to create memoized selectors
2. Provides built in reducer methods to be used within the slice
3. Allows us to create a normalized initial state data structure and the methods maintain the data structure

---

`todoSlice`:

```js
import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";

export const todoAdapter = createEntityAdapter();

export const todoSelector = todoAdapter.getSelectors((state) => state.todos);

const todoSlice = createSlice({
  name: "todos",
  initialState: todoAdapter.getInitialState(), // todos: { ids: [], entities: {} }
  reducers: {
    addTodo: todoAdapter.addOne, // Adapter method
  },
});

export const { addTodo } = todoSlice.actions;
export default todoSlice.reducer;
```

`AddTodo`

```js
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../../store/todoSlice";
import { nanoid } from "@reduxjs/toolkit";

export const AddTodo = () => {
  const dispatch = useDispatch();
  const [text, setText] = useState("");
  const submit = () => {
    dispatch(addTodo({ id: nanoid(), todo: text, completed: false }));
  };

  return (
    <div>
      <input value={text} onChange={(e) => setText(e.target.value)} />
      <button onCLick={submit}>Add Todo</button>
    </div>
  );
};
```

`TodoList`

```js
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { todoSelectors } from "../../store/todoSlice";

export const TodoList = () => {
  const allTodos = useSelector(todoSelectors.selectEntities);
  return (
    <div>
      <ul></ul>
    </div>
  );
};
```
