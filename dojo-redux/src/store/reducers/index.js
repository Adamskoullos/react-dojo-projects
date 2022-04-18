import { combineReducers } from "redux";

// Import all Reducers
import accountReducer from "./accountReducer";

// Add all reducers to master store object
const reducers = combineReducers({
  account: accountReducer,
});

export default reducers;
