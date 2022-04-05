## Components

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
