## React - TS Components

- [ReactNode](#ReactNode)
- [Generic Arrow Function Components](#Generic-Arrow-Function-Components)
- [Props](#Props)

When defining prop types we can:

1. For primitive types just use the type
2. Create a specific `interface` for the props
3. Use `generics`
4. Use `ReactNode`

---

## ReactNode

`ReactNode` provides a lot of flexibility as shown in its union type definition below:

```ts
type ReactNode =
  | boolean
  | ReactChild
  | ReactFragment
  | ReactPortal
  | null
  | undefined;
// Also can be used with a string
```

---

## Generic Arrow Function Components

**Note**: When using arrow function components we need to explicitly tell the transpiler we are using generics by either adding a `comma` or by adding a constraint. This is because otherwise the transpiler does not know if this is TSX or TypeScript generic code:

```tsx
const List = <T,>({
  items,
  render,
}: {
  items: T[];
  render: (item: T) => ReactNode;
}) => {
  return (
    <ul>
      {items.map((item, index) => (
        <li key={index}>{render(item)}</li>
      ))}
    </ul>
  );
};

// Within TSX
<List
  items={[1, 2, 3, 4, 5, 6, 7, 8, 9]}
  render={(item) => (
    <div>
      <h2>This is number</h2>
      <span>{item}</span>
    </div>
  )}
/>;
```

---

## Props

Below is an example of each pattern, then below that is a detailed view of using `generics`:

```tsx
import React, { ReactNode } from "react";
import "./App.css";

// using a primitive type directly
const Heading1 = ({ title }: { title: string }) => {
  return <h1>{title}</h1>;
};

// Using a ReactNode directly
const Heading2 = ({ title }: { title: ReactNode }) => {
  return <h1>{title}</h1>;
};

// Using a callback function that returns a ReactNode
const Banner = ({
  header,
  children,
}: {
  header?: () => ReactNode;
  children: ReactNode;
}) => {
  return (
    <div>
      {header && <div>{header?.()}</div>}
      {children}
    </div>
  );
};

// Using a callback function to return children
const Banner2 = ({
  header,
  children,
}: {
  header?: () => ReactNode;
  children: () => ReactNode;
}) => {
  return (
    <div>
      {header && <div>{header?.()}</div>}
      {children()}
    </div>
  );
};

// Using generics
function List<ListItem>({
  items,
  render,
}: {
  items: ListItem[];
  render: (item: ListItem) => ReactNode;
}) {
  return (
    <ul>
      {items.map((item, index) => (
        <li key={index}>{render(item)}</li>
      ))}
    </ul>
  );
}

function App() {
  return (
    <div className="App">
      <div>
        <Heading1 title="String Title" />
        <Heading2 title={<div>Element Title</div>} />
        <Banner header={() => <h1>Title returned from function</h1>}>
          <h5>I am a sub-title</h5>
        </Banner>
        <Banner2 header={() => <h1>Title Two returned from Banner2</h1>}>
          {() => "I am a string returned from callback"}
        </Banner2>
        <List
          items={[1, 2, 3, 4, 5, 6, 7, 8, 9]}
          render={(item) => (
            <div>
              <h2>This is number</h2>
              <span>{item}</span>
            </div>
          )}
        />
      </div>
    </div>
  );
}

export default App;
```

When working with `generics` it is cleaner to use a normal `function` over an `arrow` as you do not need to create a type first.

In the below example we are naming the generic `ListItem`:

```tsx
function List<ListItem>({
  // destructured props
  items,
  render,
}: {
  // Types for each destructured prop
  items: ListItem[];
  render: (item: ListItem) => ReactNode;
}) {
  return (
    <ul>
      {items.map((item, index) => (
        <li key={index}>{render(item)}</li>
      ))}
    </ul>
  );
}

// Within the TSX
<List
  items={[1, 2, 3, 4, 5, 6, 7, 8, 9]}
  render={(item) => (
    <div>
      <h2>This is number</h2>
      <span>{item}</span>
    </div>
  )}
/>;
```

---
