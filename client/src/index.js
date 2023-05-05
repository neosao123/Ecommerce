import React from "react";
import "firebase/compat/firestore";
import "firebase/compat/auth";
// import { createStore } from 'redux'
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import userReducer from "./reducers/userReducer";
// import rootReducer from "../src/reducers";
const reducer = combineReducers({
  // here we will be adding reducers
  user: userReducer,
});

const store = configureStore({ reducer });
// const store =configureStore(rootReducer,composeWithDevTools());

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
   </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
