import { combineReducers } from "redux";
import searchReducer from "./searchReducer";
import userReducer from "./userReducer";

const reducer = combineReducers({
  // here we will be adding reducers
  search: searchReducer,
  user: userReducer,
});

export default reducer;
