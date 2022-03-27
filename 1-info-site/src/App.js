import logo from "./logo.svg";
import "./App.css";

function App() {
  return (
    <div>
      <div>
        <img src={logo} width="100px" alt="logo" />
      </div>
      <h1>Fun facts about React</h1>
      <ul>
        <li>Was first released in 2013</li>
        <li>Was originally created by Jordan Walke</li>
        <li>Has over 100K stars on Github</li>
        <li>Is maintained by facebook</li>
        <li>Powers thousands of enterprise apps including mobile apps</li>
      </ul>
    </div>
  );
}

export default App;
