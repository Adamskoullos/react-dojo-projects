## Rendering View React

- [React.createElement and nested elements](#React.createElement-and-nested-elements)
- [Create view with JSX](#Create-view-with-JSX)
- [HTML and JSX differences](#HTML-and-JSX-differences)
- [Accessibility and ARIA in JSX](#Accessibility-and-ARIA-in-JSX)
- []()
- []()
- []()

---

### React.createElement and nested elements

**createElement arguments**:

1. HTML Element
2. Element properties
3. Children > could be a string or nested elements/components

```js
import React from "react";
import { createRoot } from "react-dom/client";

const articleHeading = React.createElement("h2", null, "Article Heading");
const articleBody = React.createElement("p", null, "This is the article body");
const article = React.createElement("article", null, articleHeading);
const mainHeading = React.createElement("h1", null, "Main Heading");
const main = React.createElement(
  "main",
  { id: "main" },
  mainHeading,
  article,
  articleBody
);

const container = document.getElementById("root");
const root = createRoot(container);
root.render(main);
```

### Create view with JSX

Re-working the same view as above but using `JSX`

```js
import React from "react";
import { createRoot } from "react-dom/client";

const articleHeading = <h2>Article Heading</h2>;
const articleBody = <p>This is the article body</p>;
const article = (
  <article>
    {articleHeading}
    {articleBody}
  </article>
);
const mainHeading = <h1>Main Heading One</h1>;
const main = (
  <main id="main">
    {mainHeading}
    {article}
  </main>
);

const container = document.getElementById("root");
const root = createRoot(container);
root.render(main);
```

Then final refactor to use JSX directly;

```js
import React from "react";
import { createRoot } from "react-dom/client";

const main = (
  <main>
    <h1>Main Heading</h1>
    <article>
      <h2>Article Heading</h2>
      <p>This is the article body</p>
    </article>
  </main>
);

const container = document.getElementById("root");
const root = createRoot(container);
root.render(main);
```

### HTML and JSX differences

1. Single tags need to be self closing in JSX
2. Input and label tags need to wrapped in a parent tag (React.Fragment) and label to use `htmlFor="label name"` instead of `for`
3. `classname` instead of `class`

### Accessibility and ARIA in JSX

All `aria` props are fully supported in React and written as normal (not camelCase) including `aria-label` syntax is the same in JSX.

### Using expressions JSX

The below example uses conditional classes and components via the use of the ternary:

```js
const isError = false;
const ErrorContainer = () => (
  <div className={isError ? "error" : "standard"}>
    {isError ? <p>There is an error</p> : <p>Everything is sweet</p>}
  </div>
);
```
