### React Router

```
npm install react-router-dom --save
```

### Updating the Browser Tab Title

Below is a nice pattern for page wrapper components that utilize `helmet` to dynamically change the tab title from the passed in `headingText`.
`Helmet` allows us to alter the elements within the `head` tags of the application.

The component also allows for the `headingLevel` to be passed so the `Section` component can be used as a main page container with `h1` or a nested section container creating any other heading tag: (h2, h3, h4, h5, h6)

```
npm install react-helmet
```

```js
import React from "react";
import Helmet from "react-helmet";

const Section = ({ children, headingText, headingLevel = 1 }) => {
  const H = `h${headingLevel}`;

  return (
    <section>
      <Helmet>
        <title>{`${headingText} | Website Name`}</title>
      </Helmet>
      <H>{headingText}</H>
      {children}
    </section>
  );
};
```

### Accessible Routing

For keyboard users we can auto set the focused element to be the main heading tag on page loads. This way the user can cleanly start at the top of the page with the main heading.

To make a heading tag focusable we need to give it a `tabIndex` of `0` or less. In the below example we have given the dynamic heading tag an index of `-1` which allows us to programmatically set the element to be focused on initial load via the `useEffect` hook, but does not allow the user to select and focus the element via the keyboard. Giving a tabIndex of `0` also lets the user navigate and focus the element but we do not want this as there is no point focusing a heading tag in normal use.

```js
import React, { useEffect, useRef } from "react";
import Helmet from "react-helmet";

const Section = ({ children, headingText, headingLevel = 1 }) => {
  const H = `h${headingLevel}`;

  const headingRef = useRef(null);

  useEffect(() => {
    headingRef.current.focus();
  }, []);

  return (
    <section>
      <Helmet>
        <title>{`${headingText} | Website Name`}</title>
      </Helmet>
      <H ref={headingRef} tabIndex="-1">
        {headingText}
      </H>
      {children}
    </section>
  );
};
```
