import React from "react";
import ReactDOM from "react-dom/client";
import { createStore } from "redux";
import noteReducer from "./reducers/noteReducer";

const store = createStore(noteReducer);

store.dispatch({
  type: "NEW_NOTE",
  payload: {
    content: "the app state is in redux store",
    important: false,
    id: 1,
  },
});

store.dispatch({
  type: "NEW_NOTE",
  payload: {
    content: "state changes are made with actions",
    important: true,
    id: 2,
  },
});

const eventHandler = (id) => {
  store.dispatch({
    type: "TOGGLE_IMPORTANCE",
    payload: {
      id: id,
    },
  });
};

const App = () => {
  return (
    <div>
      <ul>
        {store.getState().map((note) => (
          <li key={note.id}>
            {note.content}{" "}
            <button
              onClick={() => {
                eventHandler(note.id);
              }}
            >
              {note.important ? "important" : "not important"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
const renderApp = () => {
  root.render(<App />);
};
renderApp();
store.subscribe(renderApp);
