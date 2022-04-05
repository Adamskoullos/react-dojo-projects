import React from "react";

const Paragraph = ({ text }) => <p>{text}</p>;

const Section = ({ heading, children }) => (
  <section>
    <h1>{heading}</h1>
    {children}
  </section>
);

const App = () => (
  <Section heading="Section Heading">
    <Paragraph text="Child content" />
  </Section>
);

export default App;
