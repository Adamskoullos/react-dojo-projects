import React, { useState } from "react";

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
