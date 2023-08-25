import React from "react";
import ReactDOM from "react-dom/client";
//import { createStore, combineReducers } from "redux";
//toolkit replacement of createStore and combineReducers
import { Provider } from "react-redux";

import App from "./App";
import noteReducer from "./reducers/noteReducer";
import filterReducer from "./reducers/filterReducer";
import { configureStore } from "@reduxjs/toolkit";
const store = configureStore({
  reducer: { notes: noteReducer, filter: filterReducer },
});

console.log(store.getState(), "hey");

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);
