## React - TypeScript Basics

- [useState](#useState)
- [Passing props down](#Passing-props-down)
- [Functions](#Functions)
- [Typical workflow](#Typical-workflow)

---

### useState

```ts
export interface IPerson {
  name: string | undefined;
  age: string | undefined;
  url: string | undefined;
  note?: string | undefined;
}

const initialState = {
  name: "dace",
  age: "21",
  url: "url",
  note: "dgfdfgdfg",
}

function App() {
  const [people, setPeople] = useState<IPerson[]>([initialState]);

```

---

### Passing props down

Building on from the `people` state above we can pass props down as normal:

```js
<List people={people} />
```

However we need to handle them in the child component.
The `IPerson` interface is imported and used within `IProps`.

We have two options to tell our component that props is of type `IProps`:

Method 1:

```ts
import React from "react";
import { IPerson } from "../App";

interface IProps {
  people: IPerson[];
}

const renderList = (items: IPerson[]): JSX.Element[] =>
  items.map((item) => <li key={item.name}>{item.name}</li>);

const List = ({ people }: IProps) => {
  return <ul>{renderList(people)}</ul>;
};

export default List;
```

or Method 2 directly assigning the component type with the type of the passed in props.

1. First assign type `functional component` to component: `React.FC`
2. Then assign the props type to be passed in: `React.FC<IProps>`

Then we can destruct props as normal:

```ts
const List: React.FC<IProps> = ({ people }) => {
  return <ul>{renderList(people)}</ul>;
};
```

---

### Functions

The below example uses a `renderList` function, which takes in an array of objects with the type `IPerson` > `IPerson[]`.

The function is returning an array of JSX elements: `JSX.Element[]`

From this TypeScript knows what each `item` should have:

```ts
import React from "react";

interface IPerson {
  name: string;
  age: number;
  url: string;
  note?: string;
}

interface IProps {
  people: IPerson[];
}

const renderList = (items: IPerson[]): JSX.Element[] =>
  items.map((item) => <li key={item.name}>{item.name}</li>);

const List: React.FC<IProps> = ({ people }) => {
  return <ul>{renderList(people)}</ul>;
};

export default List;
```

---

### Typical workflow

Starting in the parent component we create the core interface to be shared and make it a named export.

We initialize state with type `IPerson[]` with an initial value and pass down the props:

```tsx
export interface IPerson {
  name: string | undefined;
  age: string | undefined;
  url: string | undefined;
  note?: string | undefined;
}

const initialState = {
  name: "dace",
  age: "21",
  url: "url",
  note: "dgfdfgdfg",
};
function App() {
  const [people, setPeople] = useState<IPerson[]>([initialState]);

  return (
    <div className="App">
      <h1>People Invited to my Party</h1>
      <List people={people} />
      <AddItem people={people} setPeople={setPeople} />
    </div>
  );
}

export default App;
```

Then in the `List` component we import the `IPerson` interface and use it in `IProps`.

The `renderList` function argument is of type `IPerson[]` and returns `JSX.Element[]`

And the `List` component is of type `React.FC` and has props passed in of type `<IProps>` > `React.FC<IProps>`

```tsx
import React from "react";
import { IPerson } from "../App";

interface IProps {
  people: IPerson[];
}

const renderList = (items: IPerson[]): JSX.Element[] =>
  items.map((item) => <li key={item.name}>{item.name}</li>);

const List: React.FC<IProps> = ({ people }) => {
  return <ul>{renderList(people)}</ul>;
};

export default List;
```

Then in the `AddItem` component we are importing `IPerson` again and also setting the method prop `setPeople` to the react specific type also passing in `IPerson[]` as the argument type:

```tsx
interface IProps {
  people: IPerson[];
  setPeople: React.Dispatch<React.SetStateAction<IPerson[]>>;
}
```

We are setting the `onChange` event types for both `input` and `textarea` elements:

```tsx
const onFormChangeHandler = (
  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
): void => {
  setFormState({
    ...formState,
    [e.target.name]: e.target.value,
  });
};
```

And again for the `form submit` event:

```tsx
const submitHandler = (e: React.FormEvent<HTMLFormElement>): void => {
  e.preventDefault();
  setPeople([...people, formState]);
  setFormState({ ...initialState });
};
```

Here is the full `AddItem` component:

```tsx
import React, { useState } from "react";
import { IPerson } from "../App";

interface IProps {
  people: IPerson[];
  setPeople: React.Dispatch<React.SetStateAction<IPerson[]>>;
}

const initialState = {
  name: "",
  age: "",
  url: "",
  note: "",
};

const AddItem: React.FC<IProps> = ({ people, setPeople }) => {
  const [formState, setFormState] = useState<IPerson>(initialState);

  const onFormChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    setPeople([...people, formState]);
    setFormState({ ...initialState });
  };

  return (
    <form onSubmit={submitHandler}>
      <label htmlFor="name">Name</label>
      <input
        type="text"
        name="name"
        value={formState?.name}
        onChange={onFormChangeHandler}
      />
      <label htmlFor="name">Age</label>
      <input
        type="text"
        name="age"
        value={formState?.age}
        onChange={onFormChangeHandler}
      />
      <label htmlFor="url">Url</label>
      <input
        type="text"
        name="url"
        value={formState?.url}
        onChange={onFormChangeHandler}
      />
      <label htmlFor="note">Note</label>
      <textarea
        name="note"
        value={formState?.note}
        onChange={onFormChangeHandler}
      />
      <button type="submit">Add Person</button>
    </form>
  );
};

export default AddItem;
```
