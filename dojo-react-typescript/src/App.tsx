import { useState } from "react";
import "./App.css";
import List from "./components/List";
import AddItem from "./components/AddItem";

export interface IPerson {
  name: string | undefined;
  age: string | undefined;
  url: string | undefined;
  note?: string | undefined;
}

const initialState = {
  name: "dace",
  age: "21",
  url: "url",
  note: "dgfdfgdfg",
};
function App() {
  const [people, setPeople] = useState<IPerson[]>([initialState]);

  return (
    <div className="App">
      <h1>People Invited to my Party</h1>
      <List people={people} />
      <AddItem people={people} setPeople={setPeople} />
    </div>
  );
}

export default App;
