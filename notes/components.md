## Components

- [Children Prop](#Children-Prop)
- [Conditional Rendering with if](#Conditional-Rendering-with-if)

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
