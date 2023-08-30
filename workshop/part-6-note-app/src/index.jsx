import React from "react";
import ReactDOM from "react-dom/client";
import { setNotes } from "./reducers/noteReducer";
//import { createStore, combineReducers } from "redux";
//toolkit replacement of createStore and combineReducers
import noteService from "./services/notes";
import { Provider } from "react-redux";

import App from "./App";
import noteReducer from "./reducers/noteReducer";
import filterReducer from "./reducers/filterReducer";
import { configureStore } from "@reduxjs/toolkit";
const store = configureStore({
  reducer: { notes: noteReducer, filter: filterReducer },
});
noteService.getAll().then((notes) => {
  store.dispatch(setNotes(notes));
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);
