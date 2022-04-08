## Components

- [Children Prop](#Children-Prop)
- [Conditional Rendering with if](#Conditional-Rendering-with-if)
- [Conditional Rendering with Ternary](#Conditional-Rendering-with-Ternary)
- [&& Operator](#&&-Operator)
- [Rendering JSX from an Array](#Rendering-JSX-from-an-Array)
- [Mapping an Object to view](#Mapping-an-Object-to-view)
- [Handling Side Effects (useEffect)](#Handling-Side-Effects)
- [Shallow Dependency Checks (useEffect)](#Shallow-Dependency-Checks)
- [Cleaning Up After Side Effects](#Cleaning-Up-After-Side-Effects)

---

### Children prop

The `props` object has a `children` prop available that gives us access to child components.
This allows us to create wrapper components that can be reused with different child components.

The `Section` component below is used as the wrapper component with dynamic nested child components.

`Section`:

1. Add `children` to the destructured props object
2. Add `children` to the location where the child components are to be located

`Paragraph` is used as the child component.

When using the `Section` component we need both opening and closing tags in order to nest the children components:

```js
const Paragraph = ({ text }) => <p>{text}</p>;

const Section = ({ heading, children }) => (
  <section>
    <h1>{heading}</h1>
    {children}
  </section>
);

const PageComponent = () => (
  <Section heading="Section Heading">
    <Paragraph text="Section Child Content" />
  </Section>
);
```

---

### Conditional Rendering with if

The below example shows a child component `Message` conditionally rendering nested child components `OnMessage` and `OffMessage` via the use of an if statement and being switched via component state using `useState`.

The `setIsOn` method is using a callback argument which implicitly has access to the value of `isOn` as its argument

```js
import React, { useState } from "react";

// child components to be conditionally rendered
const OnMessage = () => <span>I am on</span>;
const OffMessage = () => <span>I am off</span>;

const Message = ({ isOn }) => {
  if (isOn) {
    return <OnMessage />;
  } else {
    return <OffMessage />;
  }
};

const App = () => {
  const [isOn, setIsOn] = useState(false);

  const onClickHandler = () => {
    setIsOn((value) => !value);
  };

  return (
    <main>
      <h1>Main Heading</h1>
      <button type="button" onClick={onClickHandler} aria-pressed={isOn}>
        On/Off
      </button>
      <Message isOn={isOn} />
    </main>
  );
};
export default App;
```

We can store `JSX` in variables:

```js
let message;

if (isOn) {
  message = <OnMessage />;
} else {
  message = <OffMessage />;
}
```

And also return JSX from normal functions that are within a component function:

We can rework the above example using a function within the parent component to conditionally render the child components, instead of using the child component `Message`:

```js
// child components to be conditionally rendered
const OnMessage = () => <span>I am on</span>;
const OffMessage = () => <span>I am off</span>;

// const Message = ({ isOn }) => {
//   if (isOn) {
//     return <OnMessage />;
//   } else {
//     return <OffMessage />;
//   }
// };

const App = () => {
  const [isOn, setIsOn] = useState(false);

  const onClickHandler = () => {
    setIsOn((value) => !value);
  };

  const message = (isOn) => {
    if (isOn) {
      return <OnMessage />;
    } else {
      return <OffMessage />;
    }
  };

  return (
    <main>
      <h1>Main Heading</h1>
      <button type="button" onClick={onClickHandler} aria-pressed={isOn}>
        On/Off
      </button>
      {/* <Message isOn={isOn} /> */}
      {message(isOn)}
    </main>
  );
};
export default App;
```

---

### Conditional Rendering with Ternary

For simple conditionals it is nice to use the ternary as it provide single line concise logic

```js
<main>
  <h1>Main Heading</h1>
  <button type="button" onClick={onClickHandler} aria-pressed={isOn}>
    On/Off
  </button>
  {isOn ? <OnMessage /> : <OffMessage />}
</main>
```

---

### && Operator

The below example uses the `&&` operator to add or remove the `ErrorMessage` component to and from the dom.

```js
const App = () => {
  const [showError, setShowError] = useState(false);

  const onClickHandler = () => {
    setShowError((value) => !value);
  };

  const ErrorMessage = () => <span>Something broke</span>;

  return (
    <main>
      <h1>Main Heading</h1>
      <button type="button" onClick={onClickHandler} aria-pressed={showError}>
        Toggle Error
      </button>
      {showError && <ErrorMessage />}
    </main>
  );
};
```

Or we can do the conditional check within the child component by passing in the boolean:

```js
 const ErrorMessage = ({showError}) => showError ? <span>Something broke</span> : null;

  return (
    <main>
      <h1>Main Heading</h1>
      <button type="button" onClick={onClickHandler} aria-pressed={showError}>
        Toggle Error
      </button>
      <ErrorMessage showError={showError} />
    </main>
  );
};
```

---

### Rendering JSX from an Array

1. Each rendered item requires a unique `key` that is a `string`
2. It is better to use a property on each item for the key rather than the `index`
3. We can use `Fragment` as the root element for each item and also add the `key` to the `Fragment`
4. However the `key`cannot be used on the shorthand `Fragment` > `<>`

---

### Mapping an Object to view

If we are working with an object that we want to loop through and render to the dom we can use the below pattern.

1. Grab the keys within an array using `Object.keys()`
2. Map through the array using the `key` on the source object to grab the value of each item
3. Use each items `object key` as the `unique key`

```js
const UltimateList = () => {
  return (
    <section>
      <h1>List From Object</h1>
      <ol>
        {Object.keys(sourceObj).map((key) => (
          <li key="key">{sourceObj[key]}</li>
        ))}
      </ol>
    </section>
  );
};
```

---

### Handling Side Effects

The main **Side effect** to manage is not just Re-running all component code on every re-render.
The other main concern is managing how and what the component code effects outside of the component.

> Each time component data changes the component function is called re-rendering to the DOM

- We may not want to run all the components code every time the component function is called
- We want to update the view as fast as possible

**useEffect** is called asynchronously every time the component is re-rendered and runs the callback after the component is rendered

1. `useEffect` with no second argument array runs the callback every time the component is rendered

```js
useEffect(() => {
  // code
});
```

2. An empty array runs the `useEffect` callback on initial component load only and not on each re-render

```js
useEffect(() => {
  // code
}, []);
```

3. An array with data dependencies runs the `useEffect` callback on initial load and thereafter only if any of its dependencies have been changed

```js
useEffect(() => {
  // code
}, [dataOne, dataTwo]);
```

---

### Shallow Dependency Checks

When using dependencies within `useEffect` we need to be aware of what we are actually tracking:

- **Base Types**: (Numbers, Strings, Booleans) > `compared/checked by value`
- **Complex Types**: (Functions, Objects, Arrays) > `compared/checked by reference`

To ensure we are mutating and creating a new complex type we should assign them to `useState`and use the state in `useEffect`

---

### Cleaning Up After Side Effects

- If a side effect / function does not use anything inside the component scope we can move it outside the component
- Function const's defined outside the component scope do not need to be added to the `useEffect` dependency array
