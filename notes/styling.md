## Styling with Emotion and Styled Components

### Global Styles

```tsx
import React, { useContext, useState } from "react";
import styled from "@emotion/styled/macro";
import { jsx, css, Global, keyframes } from "@emotion/react/macro";

// Styles created outside the component
// Can use SCSS like syntax
const globalStyles = css`
  h1 {
    color: red;
  }
`;

function App() {
  return (
    <div className="App">
      {/* Global styles added to the application */}
      <Global styles={globalStyles} />
      <h1>Main Heading</h1>
    </div>
  );
}
```

---

### Using the CSS prop + reusing styles

**Note**: CSS-Prop needs the following added to the top of files using the `CSS` prop:

```ts
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react/macro";
```

```tsx
import { headingStyle } from "../styles/header";

const headingClass = css`
  ${headingStyles}
  margin: auto;
  width: 50%;
  text-align: center;
  padding: 10px 10px;
  box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.4);
`;

function App() {
  return (
    <div className="App">
      <h1 css={headingClass}>Main Heading</h1>
    </div>
  );
}
```

We can add multiple styles/classes to the `CSS` prop with the use of an array:

```tsx
<main css={[styleOne, styleTwo]}></main>
```

---

### Styled Components

```jsx
import styled from "@emotion/styled/macro";
import { css, Global, keyframes } from "@emotion/react/macro";

const H1 = styled.h1`
  margin: auto;
  width: 50%;
  text-align: center;
  padding: 10px 10px;
  box-shadow: 0px 0px 20px #b700ff9d;
  border-radius: 10px;
  font-weight: 400;
  color: #8202b1c8;
`;

function App() {
  return (
    <div className="App">
      <H1>Main Heading</H1>
    </div>
  );
}
```

We can `${interpolation}` to use JS within styles and when using a function as the example below shows, the implicit argument are the props passed into the element:

```jsx
const H1 = styled.h1`
  margin: auto;
  width: ${(props) => (props.mobile ? "100%" : "50%")};
  text-align: center;
  padding: 10px 10px;
  box-shadow: 0px 0px 20px #b700ff9d;
  border-radius: 10px;
  font-weight: 400;
  color: #8202b1c8;
`;
```
