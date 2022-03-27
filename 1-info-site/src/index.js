// import React from "react";
// import ReactDOM from "react-dom";
// import "./index.css";
// import App from "./App";

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById("root")
// );

import React from "react";
import ReactDOM from "react-dom";
import logo from "./logo.svg";

const Header = () => {
  return (
    <header>
      <nav>
        <img src={logo} width="100px" alt="logo" />
        <h1>Fun facts about React</h1>
      </nav>
    </header>
  );
};

const MainContent = () => {
  return (
    <main>
      <ul>
        <li>Was first released in 2013</li>
        <li>Was originally created by Jordan Walke</li>
        <li>Has over 100K stars on Github</li>
        <li>Is maintained by facebook</li>
        <li>Powers thousands of enterprise apps including mobile apps</li>
      </ul>
    </main>
  );
};

const Footer = () => {
  return (
    <footer>
      <h3>Really important footer</h3>
    </footer>
  );
};

const MyPage = () => {
  return (
    <div>
      <Header />
      <MainContent />
      <Footer />
    </div>
  );
};

ReactDOM.render(<MyPage />, document.getElementById("root"));
