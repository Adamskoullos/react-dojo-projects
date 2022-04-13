## Components

- [Children Prop](#Children-Prop)
- [Conditional Rendering with if](#Conditional-Rendering-with-if)
- [Conditional Rendering with Ternary](#Conditional-Rendering-with-Ternary)
- [&& Operator](#&&-Operator)
- [Rendering JSX from an Array](#Rendering-JSX-from-an-Array)
- [Mapping an Object to view](#Mapping-an-Object-to-view)
- [Handling Side Effects (useEffect)](#Handling-Side-Effects)
- [Shallow Dependency Checks (useEffect)](#Shallow-Dependency-Checks)
- [Cleaning Up After Side Effects (useEffect)](#Cleaning-Up-After-Side-Effects)
- [useState and Closure](#useState-and-Closure)
- [Accessibility](#Accessibility)
- [Avoiding State Changes on Unmounted Components](#Avoiding-State-Changes-on-Unmounted-Components)

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

> `Functions` and `properties` defined `inside useEffect` or `outside the component` do not need to be added to the `dependency array`.

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
- The `useEffect` return a function runs only when the component is unmounted, This can be use to run any clean up code

The below example shows `useEffect` with **no dependencies** but an empty array. `useEffect` runs once on initial load invoking `subscribe`. However the `return` function is not invoked until the component unmounts at which point `unsubscribe` is invoked.

```js
useEffect(() => {
  // runs once on initial load
  subscribe();

  return () => {
    // runs once on component unmount
    unsubscribe(); // clean up function
  };
}, []);
```

The behaviour is slightly different when there are dependencies:

```js
useEffect(() => {
  // runs on initial load and then on each change passing in the new current value
  subscribe(counter); // new counter value

  return () => {
    // runs on each change and accepts the previous value, also runs on component unmount
    unsubscribe(counter); // old counter value
  };
}, [counter]);
```

---

### useState and Closure

> **Golden Rule**: when updating state with the `setState` function pass in a `new` object/array by spreading in > setState({...obj})

When working with state within `useEffect` we can ensure we are working with the current state by using the `useState` passed in callback.
The current value of the state is automatically passed in as the argument to the callback > `setTime(t => t + 1)`. This way we do not need to add `time` to the `useEffect` dependencies:

```js
const [time, setTime] = useState(0);
const [activeCounter, setActiveCounter] = useState(true);

useEffect(() => {
  let interval;

  if (activeCounter) {
    interval = setInterval(() => {
      setTime((t) => t + 1);
    }, 1000);
  }

  return () => {
    // runs on each change and accepts the previous value, also runs on component unmount
    clearInterval(interval); // old counter value
  };
}, [activeCounter]);
```

---

### Avoiding State Changes on Unmounted Components

If a call for data has been made and the user moves to another page before the data comes back and is rendered we want to put some logic in place to prevent the data from being added to an unmounted component. To do this we can add an `isMounted` switch.

```js
useEffect(() => {
  let isMounted = true;
  // Initial load
  const getData = async (url) => {
    const { data } = await axios.get(url);
    if (isMounted && data) {
      setSomeData(data);
    }
  };
  getData("/api/some-endpoint");
  // On unmount
  return () => {
    isMounted = false;
  };
}, []);

// Update data
const onSubmitHandler = async (newItem) => {
  const { data } = await axios.post("/api/endpoint", newItem);
  if (isMounted.current && data) {
    setSomeData([...someData, data]);
  }
};
```

This next example shows a loader component utilizing `useEffect` and its return function to manage the user experience when data is loading.

`isLoading` is a dependency and is initially true, which sets up the seTimeout to set setShowLoadingMessage to true after 400ms, however if the data is received in less than 400ms and `isLoading` becomes false, `useEffect` runs again this time skipping the if statement and running the return function which cancels the setTimeout and sets setShowLoadingMessage to false.

```js
import React, { useEffect, useState } from "react";

const Loader = ({ loadingMessage, isLoading }) => {
  const [showLoadingMessage, setShowLoadingMessage] = useState(false);

  useEffect(() => {
    let loadingMessageDelay;

    if (isLoading) {
      loadingMessageDelay = setTimeout(() => {
        setShowLoadingMessage(true);
      }, 4000);
    }

    return () => {
      clearTimeout(loadingMessageDelay);
      setShowLoadingMessage(false);
    };
  }, [isLoading]);

  return showLoadingMessage ? (
    <p className="loading">{loadingMessage}</p>
  ) : null;
};

export default Loader;
```

---

### Accessibility

Screen readers can update the user if a new list item is added. The below snippet comes from a parent component where a list has just been added to.

```js
const [liveText, setLiveText] = useState("");

// run within the update list function
setLiveText(`${entry.title} successfully updated.`);

//within the component function JSX
<div
  className="visually-hidden"
  aria-live="polite"
  aria-atomic="true" // reads the whole text not just the changes
>
  {liveText}
</div>;
```

This next example builds on the loader example above and adds screen reader alerts when data is loading and also when it has loaded.

The template includes an `aria-live` container set to `assertive` and `aria-atomic` is set to `true` so the full text content is read on every render.

1. Initial load: `isLoading` is passed in as `true` and within `useEffect` `isLoadingPreviousValue` is set from `null` to `true`
2. useEffect: if the data is loaded in less than 400ms:

- `isLoading` becomes false running the `else if` statement
- `setShowDoneMessage` is set to true triggering the screen reader and then via the setTimeout, turned off again after 300ms
- useEffect clean up function is run

3. If after 400ms the data is still loading the `setShowLoadingMessage` is set to true triggering the screen reader
4. When the data is finally received `isLoading` becomes false and triggers `useEffect` to run again setting the done message to true and triggering the screen reader. The cleanup function also runs resetting state and clearing setTimeouts.

```js
import React, { useEffect, useState, useRef } from "react";

const Loader = ({ loadingMessage, isLoading, doneMessage }) => {
  const [showLoadingMessage, setShowLoadingMessage] = useState(false);
  const [showDoneMessage, setShowDoneMessage] = useState(false);
  const isLoadingPreviousValue = useRef(null);

  useEffect(() => {
    let loadingMessageDelay;
    let doneMessageDelay;

    if (isLoading) {
      loadingMessageDelay = setTimeout(() => {
        setShowLoadingMessage(true);
      }, 4000);
    } else if (isLoadingPreviousValue.current) {
      setShowDoneMessage(true);
      doneMessageDelay = setTimeout(() => {
        setShowDoneMessage(false);
      }, 300);
    }

    isLoadingPreviousValue.current = isLoading;

    return () => {
      clearTimeout(loadingMessageDelay);
      clearTimeout(doneMessageDelay);
      setShowLoadingMessage(false);
      setShowDoneMessage(false);
    };
  }, [isLoading]);

  return (
    <div aria-live="assertive" aria-atomic="true">
      {showLoadingMessage && <p className="loading">{loadingMessage}</p>}
      {showDoneMessage && <p className="visually-hidden">{doneMessage}</p>}
    </div>
  );
};

export default Loader;
```

```css
.visually-hidden:not(:focus):not(:active) {
  clip: rect(0 0 0 0);
  clip-path: inset(100%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  white-space: nowrap;
  width: 1px;
}
```

---
