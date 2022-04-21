import { divide } from "lodash";
import React, { ReactNode } from "react";
import { isTemplateSpan } from "typescript";
import "./App.css";

const Heading1 = ({ title }: { title: string }) => {
  return <h1>{title}</h1>;
};

const Heading2 = ({ title }: { title: ReactNode }) => {
  return <h1>{title}</h1>;
};

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
