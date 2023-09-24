import React from "react";
import ReactDOM from "react-dom/client";

import { createStore } from "redux";

const counterReducer = (state = 0, action) => {
  switch (action.type) {
    case "INCREMENT":
      return state + 1;
    case "DECREMENT":
      return state - 1;
    case "ZERO":
      return 0;
    default:
      return state;
  }
};

const store = createStore(counterReducer);
store.subscribe(() => {
  const storeNow = store.getState();
  console.log(storeNow);
});

// store.dispatch({ type: "INCREMENT" });
// store.dispatch({ type: "INCREMENT" });
// store.dispatch({ type: "INCREMENT" });
// store.dispatch({ type: "ZERO" });
// store.dispatch({ type: "DECREMENT" });

const App = () => {
  return (
    <div>
      <div>{store.getState()}</div>
      <button onClick={() => store.dispatch({ type: "INCREMENT" })}>
        plus
      </button>
      <button onClick={() => store.dispatch({ type: "DECREMENT" })}>
        minus
      </button>
      <button onClick={() => store.dispatch({ type: "ZERO" })}>zero</button>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));

const renderApp = () => {
  root.render(<App />);
};

renderApp();
store.subscribe(renderApp);
