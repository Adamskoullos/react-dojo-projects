import "./App.css";

import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "./store";

function App() {
  const account = useSelector((state) => state.account);
  const dispatch = useDispatch();
  const { deposit, withdraw } = bindActionCreators(actionCreators, dispatch);

  return (
    <div className="App">
      <h1>Redux Data Flow</h1>
      <h2>{account.balance}</h2>
      <button onClick={() => deposit(10)}>Deposit 10</button>
      <button onClick={() => withdraw(10)}>Withdraw 10</button>
    </div>
  );
}

export default App;
