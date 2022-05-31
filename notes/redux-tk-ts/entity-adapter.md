## createEntityAdapter

From `createEntityAdapter` we can create an `adapter` for a `slice`. This adapter does a few of things:

1. Allows us to create memoized selectors
2. Provides built in reducer methods to be used within the slice
3. Allows us to create a normalized initial state data structure and the methods maintain the data structure

The adapter creates and maintains a normalized data structure, example below:

```
{ ids: [1,2], entities: { 1: {}, 2: {} } }
```

---

The example below shows how to create a normalized initial state and also uses the adapter method `addOne` within the reducer `addTodo`:

`todoSlice`:

```js
import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";

export const todoAdapter = createEntityAdapter();

// Creates a memoized selector
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

The next example shows how to use `addTodo` within `dispatch`, we need to add an `id` so RTK can use it for the id within the `entities` object and maintain the normalized data structure for us:

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

The example below shows how we can use the imported `memoized` selector and its methods within `useSelector`. This example shows grabbing the `entities` object.

To create the list of todos we loop through the object grabbing each todo via `object lookup`

`TodoList`

```js
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { todoSelectors } from "../../store/todoSlice";
import { Todo } from "./Todo";

export const TodoList = () => {
  const allTodos = useSelector(todoSelectors.selectEntities);

  const todoList = [];

  for (const id in allTodos) {
    const todoItem = allTodos[id];
    todoList.push(<Todo key={todoItem.id} text={todoItem.text} />);
  }

  return (
    <div>
      <ul>{todoList}</ul>
    </div>
  );
};
```

---

When using the adapter method `updateOne` we use the following pattern.
We pass in an object with the keys: `id` and `changes`:

```js
dispatch(
  updateOne({
    id: 1,
    changes: { completed: !completed },
  })
);
```
